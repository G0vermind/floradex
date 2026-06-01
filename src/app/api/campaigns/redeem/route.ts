import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 })
  }

  try {
    const { qrSecret, codeText } = await req.json()

    if (!qrSecret && !codeText) {
      return NextResponse.json({ error: 'Informe um QR Code ou código de texto.' }, { status: 400 })
    }

    // Busca a campanha pelo qrSecret OU pelo codeText
    const campaign = await prisma.campaign.findFirst({
      where: {
        OR: [
          qrSecret ? { qrSecret } : {},
          codeText ? { codeText: codeText.toUpperCase() } : {},
        ],
        isActive: true,
      },
    })

    if (!campaign) {
      return NextResponse.json({ error: 'Campanha não encontrada ou inativa.' }, { status: 404 })
    }

    // Verifica expiração
    if (campaign.expiresAt && new Date() > campaign.expiresAt) {
      return NextResponse.json({ error: 'Esta campanha expirou.' }, { status: 400 })
    }

    // Verifica limite de usos
    if (campaign.maxUses !== null && campaign.currentUses >= campaign.maxUses) {
      return NextResponse.json({ error: 'Esta campanha atingiu o limite de participações.' }, { status: 400 })
    }

    // Verifica se usuário já resgatou esta campanha
    const alreadyRedeemed = await prisma.campaignRedemption.findFirst({
      where: { userId: session.user.id!, campaignId: campaign.id },
    })

    if (alreadyRedeemed) {
      return NextResponse.json({ error: 'Você já participou desta campanha.' }, { status: 400 })
    }

    // Executa resgate em transação
    const result = await prisma.$transaction(async (tx) => {
      // 1. Credita leafs ao usuário
      const updatedUser = await tx.user.update({
        where: { id: session.user.id! },
        data: { offChainLeafs: { increment: campaign.leafReward } },
        select: { offChainLeafs: true },
      })

      // 2. Cria registro de resgate
      const redemption = await tx.campaignRedemption.create({
        data: {
          userId: session.user.id!,
          campaignId: campaign.id,
          leafsEarned: campaign.leafReward,
        },
      })

      // 3. Cria carimbo (stamp) se a campanha for de uma empresa
      if (campaign.companyId) {
        const company = await tx.company.findUnique({ where: { id: campaign.companyId } })
        if (company) {
          await tx.stamp.create({
            data: {
              userId: session.user.id!,
              companyId: company.id,
              partnerName: company.tradeName,
              partnerCategory: company.category,
              stampImageUrl: company.stampImageUrl,
            },
          })
        }
      }

      // 4. Incrementa contador de usos
      await tx.campaign.update({
        where: { id: campaign.id },
        data: { currentUses: { increment: 1 } },
      })

      return { redemption, newLeafs: updatedUser.offChainLeafs }
    })

    return NextResponse.json({
      success: true,
      message: `Parabéns! Você ganhou 🍃 ${campaign.leafReward} Leafs${campaign.companyId ? ' + um carimbo' : ''}!`,
      leafReward: campaign.leafReward,
      totalLeafs: result.newLeafs,
      campaignTitle: campaign.title,
    })
  } catch (error: any) {
    console.error('[redeem] Error:', error)
    return NextResponse.json({ error: 'Erro interno ao processar o resgate.' }, { status: 500 })
  }
}

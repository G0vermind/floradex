import { NextRequest } from 'next/server'
import { headers } from 'next/headers'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { generateMonthlySecret, makeDeviceHash } from '@/lib/crypto'

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }
  const userId = session.user.id

  let body: { qrSecret?: string; latitude?: number; longitude?: number }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'INVALID_BODY' }, { status: 400 })
  }

  const { qrSecret, latitude, longitude } = body

  if (!qrSecret || typeof qrSecret !== 'string') {
    return Response.json({ error: 'QR_INVALID' }, { status: 400 })
  }

  // 5. Device fingerprint (soft anti-fraud)
  const headersList = await headers()
  const userAgent = headersList.get('user-agent') ?? ''
  const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? request.headers.get('x-real-ip')
    ?? 'unknown'
  const deviceHash = makeDeviceHash(userAgent, ip)

  // 1. First, check if it's a Campaign QR Code
  const campaign = await prisma.campaign.findFirst({
    where: {
      OR: [
        { qrSecret: qrSecret },
        { codeText: qrSecret }
      ]
    },
    include: { company: true },
  })

  if (campaign) {
    if (!campaign.isActive) {
      return Response.json({ error: 'CAMPAIGN_INACTIVE' }, { status: 403 })
    }
    if (campaign.expiresAt && campaign.expiresAt < new Date()) {
      return Response.json({ error: 'QR_EXPIRED' }, { status: 410 })
    }
    if (campaign.maxUses && campaign.currentUses >= campaign.maxUses) {
      return Response.json({ error: 'MAX_USES_REACHED' }, { status: 429 })
    }
    if (campaign.companyId && !campaign.company?.isActive) {
      return Response.json({ error: 'PARTNER_INACTIVE' }, { status: 403 })
    }

    const existingRedemption = await prisma.campaignRedemption.findFirst({
      where: { userId: userId, campaignId: campaign.id },
    })
    
    if (existingRedemption) {
      return Response.json({ error: 'CAMPAIGN_REDEEMED' }, { status: 429 })
    }

    const txActions: any[] = [
      prisma.campaignRedemption.create({
        data: { userId, campaignId: campaign.id, leafsEarned: campaign.leafReward }
      }),
      prisma.campaign.update({
        where: { id: campaign.id },
        data: { currentUses: { increment: 1 } }
      }),
      prisma.user.update({
        where: { id: userId },
        data: { offChainLeafs: { increment: campaign.leafReward } }
      })
    ]

    if (campaign.companyId && campaign.company) {
      txActions.push(
        prisma.stamp.create({
          data: {
            userId: userId,
            companyId: campaign.company.id,
            partnerName: campaign.company.tradeName,
            partnerCategory: campaign.company.category,
            stampImageUrl: campaign.company.stampImageUrl,
          }
        })
      )
    }

    const txResult = await prisma.$transaction(txActions)
    const updatedUser = txResult[2]

    return Response.json({
      success: true,
      partnerName: campaign.company?.tradeName || 'Campanha LeafPass',
      partnerCategory: campaign.company?.category || 'OUTRO',
      stampImageUrl: campaign.imageUrl || campaign.company?.stampImageUrl || undefined,
      earned: campaign.leafReward,
      newBalance: updatedUser.offChainLeafs,
      stamp: txResult[3] || null,
      websiteUrl: (campaign.company as any)?.websiteUrl,
      instagramUrl: (campaign.company as any)?.instagramUrl,
      whatsappNumber: (campaign.company as any)?.whatsappNumber,
      howToBuyText: (campaign.company as any)?.howToBuyText,
    })
  }

  // 2. If not a campaign, check if it's a Company monthly secret
  const company = await prisma.company.findFirst({
    where: { monthlyQrSecret: qrSecret },
  })

  if (!company) {
    return Response.json({ error: 'QR_INVALID' }, { status: 404 })
  }

  if (!company.isActive) {
    return Response.json({ error: 'PARTNER_INACTIVE' }, { status: 403 })
  }

  const expectedSecret = generateMonthlySecret(company.id)
  if (company.monthlyQrSecret !== expectedSecret) {
    return Response.json({ error: 'QR_EXPIRED' }, { status: 410 })
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const existingScan = await prisma.scanLog.findFirst({
    where: { userId: userId, companyId: company.id, scannedAt: { gte: today } },
  })
  if (existingScan) {
    return Response.json({ error: 'SCAN_LIMIT_REACHED' }, { status: 429 })
  }

  const todayCount = await prisma.scanLog.count({
    where: { userId: userId, scannedAt: { gte: today } },
  })
  if (todayCount >= 20) {
    return Response.json({ error: 'DAILY_LIMIT' }, { status: 429 })
  }

  const [stamp, , updatedUser] = await prisma.$transaction([
    prisma.stamp.create({
      data: {
        userId: userId,
        companyId: company.id,
        partnerName: company.tradeName,
        partnerCategory: company.category,
        stampImageUrl: company.stampImageUrl,
      },
    }),
    prisma.scanLog.create({
      data: { userId: userId, companyId: company.id, ipAddress: ip, deviceHash, latitude, longitude },
    }),
    prisma.user.update({
      where: { id: userId },
      data: { offChainLeafs: { increment: company.rewardAmount } },
    }),
  ])

  return Response.json({
    success: true,
    partnerName: company.tradeName,
    partnerCategory: company.category,
    stampImageUrl: company.stampImageUrl,
    earned: company.rewardAmount,
    newBalance: updatedUser.offChainLeafs,
    stamp,
    websiteUrl: (company as any).websiteUrl,
    instagramUrl: (company as any).instagramUrl,
    whatsappNumber: (company as any).whatsappNumber,
    howToBuyText: (company as any).howToBuyText,
  })
}

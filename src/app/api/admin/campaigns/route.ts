import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { nanoid } from 'nanoid'

export async function GET() {
  const session = await auth()
  const role = (session?.user as any)?.role
  if (!session || !['ADMIN', 'COMPANY'].includes(role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const where = role === 'COMPANY'
    ? { company: { userId: session.user.id! } }
    : {}

  const campaigns = await prisma.campaign.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: { company: { select: { tradeName: true } } },
  })

  return NextResponse.json(campaigns)
}

export async function POST(req: Request) {
  const session = await auth()
  const role = (session?.user as any)?.role
  if (!session || !['ADMIN', 'COMPANY'].includes(role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await req.json()
    const { title, description, leafReward, imageUrl, codeText, maxUses, expiresAt, isActive, companyId: bodyCompanyId } = data

    // Determina companyId se for uma empresa criando a campanha
    let companyId: string | null = null
    if (role === 'COMPANY') {
      const company = await prisma.company.findUnique({ where: { userId: session.user.id! } })
      if (!company) return NextResponse.json({ error: 'Empresa não encontrada.' }, { status: 400 })
      companyId = company.id
    } else if (role === 'ADMIN') {
      companyId = bodyCompanyId || null
    }

    const campaign = await prisma.campaign.create({
      data: {
        title,
        description,
        leafReward: Number(leafReward),
        imageUrl: imageUrl || null,
        qrSecret: nanoid(32),
        codeText: codeText ? codeText.toUpperCase() : null,
        maxUses: maxUses ? Number(maxUses) : null,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        isActive: isActive ?? true,
        companyId,
      },
    })

    return NextResponse.json(campaign)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

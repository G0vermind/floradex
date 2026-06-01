import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await auth()
  const role = (session?.user as any)?.role
  if (!session || !['ADMIN', 'COMPANY'].includes(role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await req.json()
    const { title, description, leafReward, imageUrl, codeText, maxUses, expiresAt, isActive, companyId: bodyCompanyId } = data

    const updateData: any = {
      title,
      description,
      leafReward: Number(leafReward),
      imageUrl: imageUrl || null,
      codeText: codeText ? codeText.toUpperCase() : null,
      maxUses: maxUses ? Number(maxUses) : null,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
      isActive: isActive ?? true,
    }

    if (role === 'ADMIN') {
      updateData.companyId = bodyCompanyId || null
    }

    const campaign = await prisma.campaign.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(campaign)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await auth()
  const role = (session?.user as any)?.role
  if (!session || !['ADMIN', 'COMPANY'].includes(role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await prisma.campaign.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

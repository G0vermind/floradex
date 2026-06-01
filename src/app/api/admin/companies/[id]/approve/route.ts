import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await auth()
  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const company = await prisma.company.update({
      where: { id },
      data: { isActive: true },
    })

    return NextResponse.json({ success: true, company })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

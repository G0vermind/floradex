import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { generateMonthlySecret } from '@/lib/crypto'

export async function POST(request: Request) {
  const session = await auth()
  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return Response.json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  let body: {
    tradeName?: string
    legalName?: string
    email?: string
    cnpj?: string
    category?: string
    city?: string
    state?: string
    description?: string
    rewardAmount?: number
    isActive?: boolean
  }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'INVALID_BODY' }, { status: 400 })
  }

  const { tradeName, legalName, email, cnpj, category, city, state, description, rewardAmount, isActive } = body

  if (!tradeName || !legalName || !email || !category || !city || !state) {
    return Response.json({ error: 'MISSING_FIELDS' }, { status: 400 })
  }

  // Create user first
  const existingUser = await prisma.user.findUnique({ where: { email } })
  if (existingUser) {
    return Response.json({ error: 'Email já está em uso.' }, { status: 400 })
  }

  const user = await prisma.user.create({
    data: {
      name: tradeName,
      email,
      role: 'COMPANY',
    }
  })

  // Create company
  const company = await prisma.company.create({
    data: {
      userId: user.id,
      tradeName,
      legalName,
      cnpj: cnpj || null,
      category,
      city,
      state,
      description: description ?? null,
      rewardAmount: rewardAmount ?? 10,
      isActive: isActive ?? true,
      monthlyQrSecret: 'pending',
    },
  })

  // Now generate the real secret with the actual ID
  const monthlyQrSecret = generateMonthlySecret(company.id)
  const updated = await prisma.company.update({
    where: { id: company.id },
    data: { monthlyQrSecret },
  })

  return Response.json({ success: true, company: updated }, { status: 201 })
}

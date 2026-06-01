import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(request: Request, ctx: RouteContext<'/api/admin/companies/[id]'>) {
  const session = await auth()
  if (!session || (session.user as any)?.role !== 'ADMIN') {
    return Response.json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  const { id } = await ctx.params

  let body: {
    tradeName?: string
    legalName?: string
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

  const company = await prisma.company.findUnique({ where: { id } })
  if (!company) return Response.json({ error: 'NOT_FOUND' }, { status: 404 })

  const updated = await prisma.company.update({
    where: { id },
    data: {
      ...(body.tradeName !== undefined && { tradeName: body.tradeName }),
      ...(body.legalName !== undefined && { legalName: body.legalName }),
      ...(body.cnpj !== undefined && { cnpj: body.cnpj }),
      ...(body.category !== undefined && { category: body.category }),
      ...(body.city !== undefined && { city: body.city }),
      ...(body.state !== undefined && { state: body.state }),
      ...(body.description !== undefined && { description: body.description }),
      ...(body.rewardAmount !== undefined && { rewardAmount: body.rewardAmount }),
      ...(body.isActive !== undefined && { isActive: body.isActive }),
    },
  })

  return Response.json({ success: true, company: updated })
}

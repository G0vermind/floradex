import { prisma } from '@/lib/prisma'
import { generateMonthlySecret } from '@/lib/crypto'

export async function GET(request: Request) {
  // Bearer token auth
  const auth = request.headers.get('authorization')
  const expectedToken = `Bearer ${process.env.CRON_SECRET}`
  if (auth !== expectedToken) {
    return Response.json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  const companies = await prisma.company.findMany({
    where: { isActive: true },
    select: { id: true },
  })

  let updated = 0
  for (const company of companies) {
    const newSecret = generateMonthlySecret(company.id)
    await prisma.company.update({
      where: { id: company.id },
      data: { monthlyQrSecret: newSecret },
    })
    updated++
  }

  return Response.json({
    success: true,
    updated,
    month: new Date().toISOString().slice(0, 7),
  })
}

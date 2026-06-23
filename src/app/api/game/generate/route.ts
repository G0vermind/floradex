import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { formatClaimCode } from '@/lib/crypto'

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }
  const userId = session.user.id

  let body: { amount?: number; stellarAddress?: string }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'INVALID_BODY' }, { status: 400 })
  }

  const { amount, stellarAddress } = body

  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return Response.json({ error: 'INVALID_AMOUNT' }, { status: 400 })
  }

  if (!stellarAddress || typeof stellarAddress !== 'string') {
    return Response.json({ error: 'STELLAR_ADDRESS_REQUIRED' }, { status: 400 })
  }

  // Fetch current user balance
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { offChainLeafs: true },
  })

  if (!user) {
    return Response.json({ error: 'USER_NOT_FOUND' }, { status: 404 })
  }

  if (user.offChainLeafs < amount) {
    return Response.json({ error: 'INSUFFICIENT_BALANCE' }, { status: 400 })
  }

  // Atomic: deduct balance + create claim code + save stellar address
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

  const [, claimCode] = await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: {
        offChainLeafs: { decrement: amount },
        stellarAddress,
      },
    }),
    prisma.claimCode.create({
      data: {
        userId: userId,
        amount,
      },
    }),
  ])

  const formattedCode = formatClaimCode(claimCode.id)

  return Response.json({
    success: true,
    code: formattedCode,
    rawCode: claimCode.id,
    amount,
    expiresAt: expiresAt.toISOString(),
  })
}

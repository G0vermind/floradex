import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }
  const userId = session.user.id

  let body: { code?: string }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'INVALID_BODY' }, { status: 400 })
  }

  const { code } = body
  if (!code) {
    return Response.json({ error: 'CODE_REQUIRED' }, { status: 400 })
  }

  // Find claim by either rawCode (cuid) or formatted code
  const claimCode = await prisma.claimCode.findFirst({
    where: {
      OR: [{ id: code }, { code }],
      userId: userId,
    },
  })

  if (!claimCode) {
    return Response.json({ error: 'CODE_NOT_FOUND' }, { status: 404 })
  }

  if (claimCode.status === 'REDEEMED') {
    return Response.json({ error: 'ALREADY_REDEEMED' }, { status: 409 })
  }

  if (claimCode.status === 'EXPIRED' || claimCode.expiresAt < new Date()) {
    await prisma.claimCode.update({ where: { id: claimCode.id }, data: { status: 'EXPIRED' } })
    return Response.json({ error: 'CODE_EXPIRED' }, { status: 410 })
  }

  // Feature-flagged Stellar transfer
  const stellarEnabled = process.env.STELLAR_ENABLED === 'true'
  let txHash: string | null = null

  if (stellarEnabled) {
    try {
      const { Keypair, Asset, Operation, TransactionBuilder, Networks, BASE_FEE } = await import('@stellar/stellar-sdk')
      const { Horizon } = await import('@stellar/stellar-sdk')

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { stellarAddress: true },
      })

      if (!user?.stellarAddress) {
        return Response.json({ error: 'NO_STELLAR_ADDRESS' }, { status: 400 })
      }

      const server = new Horizon.Server('https://horizon.stellar.org')
      const relayerKeypair = Keypair.fromSecret(process.env.RELAYER_SECRET_KEY!)
      const tokenId = process.env.NEXT_PUBLIC_LEAF_TOKEN_ID!

      const [issuerPublicKey] = tokenId.split(':')
      const leafAsset = new Asset('LEAF', issuerPublicKey)

      const sourceAccount = await server.loadAccount(relayerKeypair.publicKey())
      const tx = new TransactionBuilder(sourceAccount, {
        fee: BASE_FEE,
        networkPassphrase: Networks.PUBLIC,
      })
        .addOperation(
          Operation.payment({
            destination: user.stellarAddress,
            asset: leafAsset,
            amount: claimCode.amount.toString(),
          })
        )
        .setTimeout(30)
        .build()

      tx.sign(relayerKeypair)
      const result = await server.submitTransaction(tx)
      txHash = result.hash
    } catch (err) {
      console.error('Stellar transfer failed:', err)
      return Response.json({ error: 'STELLAR_TRANSFER_FAILED' }, { status: 500 })
    }
  } else {
    // Stub for Phase 1 — mark as redeemed with mock hash
    txHash = `mock_tx_${Date.now()}_${claimCode.id.slice(-8)}`
  }

  // Mark as redeemed
  await prisma.claimCode.update({
    where: { id: claimCode.id },
    data: {
      status: 'REDEEMED',
      txHash,
      redeemedAt: new Date(),
    },
  })

  return Response.json({
    success: true,
    txHash,
    amount: claimCode.amount,
    stellarEnabled,
  })
}

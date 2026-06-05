import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import PassportClient from '@/components/ui/PassportClient'
import type { StampData } from '@/components/ui/PassportPage'
import type { PartnerCategory } from '@/components/ui/StampSVG'

export const metadata = {
  title: 'Meu Passaporte — LeafPass',
  description: 'Seu passaporte de fidelidade com carimbos de parceiros certificados.',
}

export default async function LeafPassPage() {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const userId = session.user.id!

  const [user, stamps] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, offChainLeafs: true },
    }),
    prisma.stamp.findMany({
      where: { userId: userId },
      orderBy: { scannedAt: 'asc' },
      select: { id: true, partnerName: true, partnerCategory: true, scannedAt: true },
    }),
  ])

  if (!user) redirect('/api/auth/signout?callbackUrl=/login')

  const stampData: StampData[] = stamps.map((s) => ({
    id: s.id,
    partnerName: s.partnerName,
    partnerCategory: s.partnerCategory as PartnerCategory,
    scannedAt: s.scannedAt.toISOString(),
  }))

  return (
    <PassportClient
      user={{
        id: user.id,
        name: user.name || "",
        email: user.email || "",
        offChainLeafs: user.offChainLeafs,
      }}
      stamps={stampData}
    />
  )
}

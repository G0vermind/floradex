import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import RedeemClient from './RedeemClient'

export const metadata = {
  title: 'Converter Folhas — LeafPass',
}

export default async function RedeemPage() {
  const session = await auth()
  if (!session?.user) redirect('/login')

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true, offChainLeafs: true },
  })

  if (!user) redirect('/login')

  const projects = await prisma.socialProject.findMany({
    where: { isActive: true },
    orderBy: { costInLeafs: 'asc' }
  })

  return <RedeemClient balance={user.offChainLeafs} userName={user.name} projects={projects} />
}

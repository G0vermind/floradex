'use server'

import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

async function requireAdmin() {
  const session = await auth()
  if (!session || (session.user as any)?.role !== 'ADMIN') {
    throw new Error('Não autorizado')
  }
  return session.user
}

export async function createProject(formData: FormData) {
  await requireAdmin()
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const costInLeafs = Number(formData.get('costInLeafs'))
  const imageUrl = (formData.get('imageUrl') as string) || null

  await prisma.socialProject.create({
    data: { title, description, costInLeafs, imageUrl, isActive: true }
  })
  
  revalidatePath('/admin/projects')
  redirect('/admin/projects')
}

export async function toggleProjectStatus(id: string) {
  await requireAdmin()
  const p = await prisma.socialProject.findUnique({ where: { id } })
  if (p) {
    await prisma.socialProject.update({
      where: { id },
      data: { isActive: !p.isActive }
    })
    revalidatePath('/admin/projects')
    revalidatePath('/leafpass/redeem')
  }
}

// User Redemption Action
export async function redeemProject(projectId: string) {
  const session = await auth()
  if (!session || !session.user?.id) {
    return { error: 'Não autorizado' }
  }

  const userId = session.user.id

  try {
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { id: userId } })
      const project = await tx.socialProject.findUnique({ where: { id: projectId } })

      if (!user || !project) throw new Error('Dados não encontrados.')
      if (!project.isActive) throw new Error('Este projeto não está ativo no momento.')
      if (user.offChainLeafs < project.costInLeafs) throw new Error('Saldo de folhas insuficiente.')

      // Deduct leafs
      const newBalance = user.offChainLeafs - project.costInLeafs
      await tx.user.update({
        where: { id: userId },
        data: { offChainLeafs: newBalance }
      })

      // Generate Voucher Code
      const randStr = Math.random().toString(36).substring(2, 6).toUpperCase()
      const randNum = Math.floor(1000 + Math.random() * 9000)
      const code = `R-${randStr}-${randNum}`

      // Create Record
      const record = await tx.redemptionHistory.create({
        data: {
          userId,
          projectId,
          amountPaid: project.costInLeafs,
          voucherCode: code,
          status: 'PENDING'
        }
      })

      return record
    })

    revalidatePath('/leafpass')
    revalidatePath('/leafpass/redeem')
    
    return { success: true, voucherCode: result.voucherCode, projectName: (await prisma.socialProject.findUnique({where: {id: projectId}}))?.title }
  } catch (error: any) {
    return { error: error.message || 'Erro ao processar o resgate.' }
  }
}

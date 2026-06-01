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

export async function createCampaign(formData: FormData) {
  await requireAdmin()
  const title = formData.get('title') as string
  const code = (formData.get('code') as string).toUpperCase()
  const rewardLeafs = Number(formData.get('rewardLeafs'))
  const partnerId = formData.get('partnerId') as string
  const maxUsesRaw = formData.get('maxUses') as string
  const maxUses = maxUsesRaw ? Number(maxUsesRaw) : null

  // Check if code exists
  const existing = await (prisma as any).campaign.findUnique({ where: { code } })
  if (existing) {
    throw new Error('Este código promocional já está em uso.')
  }

  await (prisma as any).campaign.create({
    data: { title, code, rewardLeafs, maxUses, partnerId, isActive: true }
  })
  
  revalidatePath('/admin/campaigns')
  redirect('/admin/campaigns')
}

export async function toggleCampaignStatus(id: string) {
  await requireAdmin()
  const c = await (prisma as any).campaign.findUnique({ where: { id } })
  if (c) {
    await (prisma as any).campaign.update({
      where: { id },
      data: { isActive: !c.isActive }
    })
    revalidatePath('/admin/campaigns')
  }
}

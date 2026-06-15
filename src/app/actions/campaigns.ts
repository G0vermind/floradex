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
  const description = formData.get('description') as string || ''
  const codeText = (formData.get('codeText') as string)?.toUpperCase() || undefined
  const leafReward = Number(formData.get('leafReward'))
  const companyId = formData.get('companyId') as string || null
  const maxUsesRaw = formData.get('maxUses') as string
  const expiresAtRaw = formData.get('expiresAt') as string
  const maxUses = maxUsesRaw ? Number(maxUsesRaw) : null
  const expiresAt = expiresAtRaw ? new Date(expiresAtRaw) : null

  // Validate required fields
  if (!title || !leafReward || leafReward <= 0) {
    throw new Error('Título e recompensa são obrigatórios.')
  }

  // Check if codeText exists (if provided)
  if (codeText) {
    const existing = await prisma.campaign.findFirst({
      where: { codeText },
    })
    if (existing) {
      throw new Error('Este código promocional já está em uso.')
    }
  }

  // Generate a unique QR secret if not provided
  const qrSecret = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`

  await prisma.campaign.create({
    data: {
      title,
      description,
      leafReward,
      codeText,
      qrSecret,
      maxUses,
      expiresAt,
      companyId,
      isActive: true,
    },
  })

  revalidatePath('/admin/campaigns')
  redirect('/admin/campaigns')
}

export async function updateCampaign(id: string, formData: FormData) {
  await requireAdmin()
  const title = formData.get('title') as string
  const description = formData.get('description') as string || ''
  const leafReward = Number(formData.get('leafReward'))
  const maxUsesRaw = formData.get('maxUses') as string
  const expiresAtRaw = formData.get('expiresAt') as string
  const maxUses = maxUsesRaw ? Number(maxUsesRaw) : null
  const expiresAt = expiresAtRaw ? new Date(expiresAtRaw) : null

  if (!title || !leafReward || leafReward <= 0) {
    throw new Error('Título e recompensa são obrigatórios.')
  }

  await prisma.campaign.update({
    where: { id },
    data: {
      title,
      description,
      leafReward,
      maxUses,
      expiresAt,
    },
  })

  revalidatePath('/admin/campaigns')
  redirect('/admin/campaigns')
}

export async function toggleCampaignStatus(id: string) {
  await requireAdmin()
  const campaign = await prisma.campaign.findUnique({ where: { id } })
  if (campaign) {
    await prisma.campaign.update({
      where: { id },
      data: { isActive: !campaign.isActive },
    })
    revalidatePath('/admin/campaigns')
  }
}

export async function deleteCampaign(id: string) {
  await requireAdmin()
  await prisma.campaign.delete({ where: { id } })
  revalidatePath('/admin/campaigns')
  redirect('/admin/campaigns')
}

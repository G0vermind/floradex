import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  const allAchievements = await prisma.achievementDefinition.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'asc' },
  })

  const userAchievements = await prisma.userAchievement.findMany({
    where: { userId: session.user.id },
  })

  const userMap = new Map(userAchievements.map((ua) => [ua.achievementId, ua]))

  const result = allAchievements.map((ach) => {
    const ua = userMap.get(ach.id)
    return {
      id: ach.id,
      slug: ach.slug,
      name: ach.name,
      description: ach.description,
      icon: ach.icon,
      category: ach.category,
      tierThresholds: ach.tierThresholds,
      currentProgress: ua?.currentProgress ?? 0,
      currentTier: ua?.currentTier ?? 0,
      lastProgressAt: ua?.lastProgressAt?.toISOString() ?? null,
    }
  })

  return Response.json(result)
}

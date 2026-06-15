import { prisma } from '@/lib/prisma'
import { calculateTier } from './achievements'

/**
 * Update achievements and missions for a user after a successful scan
 */
export async function processGamificationOnScan(
  userId: string,
  companyId: string,
  isFirstVisitAtCompany: boolean
) {
  try {
    const now = new Date()
    const hour = now.getHours()
    const isEarlyBird = hour < 8

    // 1. Determine which achievements to progress
    const increments: Record<string, number> = {
      'ajudante-natureza': 1,
      'colecionador': 1,
      'primeiro-passo': 1,
    }

    if (isFirstVisitAtCompany) {
      increments['explorador'] = 1
    } else {
      increments['frequentador'] = 1
    }

    if (isEarlyBird) {
      increments['madrugador'] = 1
    }

    // Process achievements in a single transaction per achievement
    for (const [slug, amount] of Object.entries(increments)) {
      const def = await prisma.achievementDefinition.findUnique({
        where: { slug },
      })
      if (!def || !def.isActive) continue

      // Use upsert for atomic operation
      const thresholds = JSON.parse(def.tierThresholds) as number[]
      
      await prisma.$transaction(async (tx) => {
        let userAch = await tx.userAchievement.findUnique({
          where: { userId_achievementId: { userId, achievementId: def.id } },
        })

        const currentProgress = (userAch?.currentProgress ?? 0) + amount
        const newTier = calculateTier(currentProgress, def.tierThresholds)

        if (userAch) {
          userAch = await tx.userAchievement.update({
            where: { id: userAch.id },
            data: {
              currentProgress,
              currentTier: newTier,
              lastProgressAt: now,
            },
          })
        } else {
          userAch = await tx.userAchievement.create({
            data: {
              userId,
              achievementId: def.id,
              currentProgress,
              currentTier: newTier,
            },
          })
        }

        return userAch
      })
    }

    // 2. Process missions - cleanup expired missions first
    await cleanupExpiredMissions(userId)

    const activeMissions = await prisma.mission.findMany({
      where: {
        isActive: true,
        OR: [
          { requirementAction: 'scan' },
          { requirementAction: 'visit_unique' },
          { requirementAction: 'scan_early' },
        ],
      },
    })

    for (const mission of activeMissions) {
      let shouldProgress = false
      if (mission.requirementAction === 'scan') shouldProgress = true
      if (mission.requirementAction === 'visit_unique' && isFirstVisitAtCompany)
        shouldProgress = true
      if (mission.requirementAction === 'scan_early' && isEarlyBird)
        shouldProgress = true

      if (!shouldProgress) continue

      await prisma.$transaction(async (tx) => {
        const userMission = await tx.userMission.findUnique({
          where: { userId_missionId: { userId, missionId: mission.id } },
        })

        if (userMission?.isCompleted) return

        const newProgress = (userMission?.progress ?? 0) + 1
        const isCompleted = newProgress >= mission.requirementCount

        if (userMission) {
          await tx.userMission.update({
            where: { id: userMission.id },
            data: {
              progress: newProgress,
              isCompleted,
              completedAt: isCompleted ? now : undefined,
            },
          })
        } else {
          await tx.userMission.create({
            data: {
              userId,
              missionId: mission.id,
              progress: newProgress,
              isCompleted,
              completedAt: isCompleted ? now : undefined,
            },
          })
        }
      })
    }
  } catch (error) {
    console.error('Error processing gamification:', error)
    // Don't throw, we don't want to fail the scan if gamification fails
  }
}

/**
 * Clean up expired daily/weekly missions for a user
 */
async function cleanupExpiredMissions(userId: string) {
  const now = new Date()
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  
  // Calculate start of week (Monday)
  const dayOfWeek = now.getDay() || 7
  const startOfWeek = new Date(startOfDay)
  startOfWeek.setDate(startOfWeek.getDate() - (dayOfWeek - 1))

  // Reset daily missions
  const dailyMissions = await prisma.mission.findMany({
    where: { type: 'DAILY', isActive: true },
    select: { id: true },
  })

  for (const mission of dailyMissions) {
    await prisma.userMission.updateMany({
      where: {
        userId,
        missionId: mission.id,
        startedAt: { lt: startOfDay },
        isCompleted: false,
      },
      data: {
        progress: 0,
        isCompleted: false,
        completedAt: null,
        claimedAt: null,
        startedAt: now,
      },
    })
  }

  // Reset weekly missions
  const weeklyMissions = await prisma.mission.findMany({
    where: { type: 'WEEKLY', isActive: true },
    select: { id: true },
  })

  for (const mission of weeklyMissions) {
    await prisma.userMission.updateMany({
      where: {
        userId,
        missionId: mission.id,
        startedAt: { lt: startOfWeek },
        isCompleted: false,
      },
      data: {
        progress: 0,
        isCompleted: false,
        completedAt: null,
        claimedAt: null,
        startedAt: now,
      },
    })
  }
}

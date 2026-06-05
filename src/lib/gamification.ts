import { prisma } from '@/lib/prisma'
import { calculateTier } from './achievements'

/**
 * Update achievements and missions for a user after a successful scan
 */
export async function processGamificationOnScan(userId: string, companyId: string, isFirstVisitAtCompany: boolean) {
  try {
    const hour = new Date().getHours()
    const isEarlyBird = hour < 8

    // 1. Determine which achievements to progress
    const increments: Record<string, number> = {
      'ajudante-natureza': 1,
      'colecionador': 1,
      'primeiro-passo': 1, // Only matters once, but we can increment safely
    }

    if (isFirstVisitAtCompany) {
      increments['explorador'] = 1
    } else {
      increments['frequentador'] = 1
    }

    if (isEarlyBird) {
      increments['madrugador'] = 1
    }

    // Process achievements
    for (const [slug, amount] of Object.entries(increments)) {
      const def = await prisma.achievementDefinition.findUnique({ where: { slug } })
      if (!def) continue

      const userAch = await prisma.userAchievement.findUnique({
        where: { userId_achievementId: { userId, achievementId: def.id } },
      })

      const currentProgress = (userAch?.currentProgress ?? 0) + amount
      const newTier = calculateTier(currentProgress, def.tierThresholds)

      if (userAch) {
        await prisma.userAchievement.update({
          where: { id: userAch.id },
          data: {
            currentProgress,
            currentTier: newTier,
            lastProgressAt: new Date(),
          },
        })
      } else {
        await prisma.userAchievement.create({
          data: {
            userId,
            achievementId: def.id,
            currentProgress,
            currentTier: newTier,
          },
        })
      }
    }

    // 2. Process missions
    // Find active missions that match this action
    const activeMissions = await prisma.mission.findMany({
      where: {
        isActive: true,
        OR: [
          { requirementAction: 'scan' },
          { requirementAction: 'visit_unique' },
          { requirementAction: 'scan_early' },
        ]
      }
    })

    for (const mission of activeMissions) {
      // Check conditions
      let shouldProgress = false
      if (mission.requirementAction === 'scan') shouldProgress = true
      if (mission.requirementAction === 'visit_unique' && isFirstVisitAtCompany) shouldProgress = true
      if (mission.requirementAction === 'scan_early' && isEarlyBird) shouldProgress = true

      if (!shouldProgress) continue

      const userMission = await prisma.userMission.findUnique({
        where: { userId_missionId: { userId, missionId: mission.id } }
      })

      if (userMission?.isCompleted) continue // Already done

      const newProgress = (userMission?.progress ?? 0) + 1
      const isCompleted = newProgress >= mission.requirementCount

      if (userMission) {
        await prisma.userMission.update({
          where: { id: userMission.id },
          data: {
            progress: newProgress,
            isCompleted,
            completedAt: isCompleted ? new Date() : null,
          }
        })
      } else {
        await prisma.userMission.create({
          data: {
            userId,
            missionId: mission.id,
            progress: newProgress,
            isCompleted,
            completedAt: isCompleted ? new Date() : null,
          }
        })
      }
    }

  } catch (error) {
    console.error('Error processing gamification:', error)
    // Don't throw, we don't want to fail the scan if gamification fails
  }
}

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  const missions = await prisma.mission.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'asc' },
  })

  const userMissions = await prisma.userMission.findMany({
    where: { userId: session.user.id },
  })

  const userMap = new Map(userMissions.map((um) => [um.missionId, um]))

  const result = missions.map((m) => {
    const um = userMap.get(m.id)
    return {
      id: m.id,
      title: m.title,
      description: m.description,
      icon: m.icon,
      type: m.type,
      requirementAction: m.requirementAction,
      requirementCount: m.requirementCount,
      rewardLeafs: m.rewardLeafs,
      expiresAt: m.expiresAt?.toISOString() ?? null,
      progress: um?.progress ?? 0,
      isCompleted: um?.isCompleted ?? false,
      completedAt: um?.completedAt?.toISOString() ?? null,
      claimedAt: um?.claimedAt?.toISOString() ?? null,
    }
  })

  return Response.json(result)
}

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return Response.json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  let body: { missionId?: string }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'INVALID_BODY' }, { status: 400 })
  }

  if (!body.missionId) {
    return Response.json({ error: 'MISSION_ID_REQUIRED' }, { status: 400 })
  }

  const userMission = await prisma.userMission.findUnique({
    where: {
      userId_missionId: { userId: session.user.id, missionId: body.missionId },
    },
    include: { mission: true },
  })

  if (!userMission) {
    return Response.json({ error: 'MISSION_NOT_FOUND' }, { status: 404 })
  }

  if (!userMission.isCompleted) {
    return Response.json({ error: 'MISSION_NOT_COMPLETED' }, { status: 400 })
  }

  if (userMission.claimedAt) {
    return Response.json({ error: 'ALREADY_CLAIMED' }, { status: 400 })
  }

  // Claim the reward
  await prisma.$transaction([
    prisma.userMission.update({
      where: { id: userMission.id },
      data: { claimedAt: new Date() },
    }),
    prisma.user.update({
      where: { id: session.user.id },
      data: { offChainLeafs: { increment: userMission.mission.rewardLeafs } },
    }),
  ])

  return Response.json({
    success: true,
    leafsEarned: userMission.mission.rewardLeafs,
  })
}

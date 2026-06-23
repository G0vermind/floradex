import { prisma } from '@/lib/prisma';

/**
 * Função de verificação no Backend para as Missões Virtuais.
 * Sempre que o utilizador executa uma ação real (ex: abrir pacote, equipar carta),
 * esta função é chamada no server-side para auditar e incrementar o progresso de forma segura.
 */
export async function processMissionAction(userId: string, actionType: 'extract_pack' | 'equip_board' | 'scan', count: number = 1) {
  try {
    await prisma.$transaction(async (tx: any) => {
      // 1. Encontrar todas as missões ativas do utilizador que exigem esta ação
      const activeUserMissions = await tx.userMission.findMany({
        where: {
          userId,
          isCompleted: false,
          mission: {
            isActive: true,
            requirementAction: actionType,
          }
        },
        include: {
          mission: true
        }
      });

      for (const um of activeUserMissions) {
        const newProgress = um.progress + count;
        const isNowCompleted = newProgress >= um.mission.requirementCount;

        // 2. Atualizar o progresso
        await tx.userMission.update({
          where: { id: um.id },
          data: {
            progress: newProgress,
            isCompleted: isNowCompleted,
            completedAt: isNowCompleted ? new Date() : null,
          }
        });

        // 3. Se foi concluída, verificar e atribuir recompensa
        if (isNowCompleted && um.mission.rewardLeafs > 0) {
          // Recompensa direta
          await tx.user.update({
            where: { id: userId },
            data: { offChainLeafs: { increment: um.mission.rewardLeafs } }
          });
          
          // Marca como resgatado (ou pode ficar à espera de um botão "Claim" no UI)
          await tx.userMission.update({
            where: { id: um.id },
            data: { claimedAt: new Date() }
          });
        }
      }
    });
    return { success: true };
  } catch (error) {
    console.error('Erro na verificação de missões virtuais:', error);
    return { success: false };
  }
}

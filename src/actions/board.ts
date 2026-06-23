'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { processMissionAction } from '@/lib/missions';

export async function equipCard(userId: string, kingdom: string, elementId: number) {
  try {
    return await prisma.$transaction(async (tx: any) => {
      // Verifica se o user tem o elemento no inventário
      const inventoryItem = await tx.userInventory.findUnique({
        where: { userId_elementId: { userId, elementId } }
      });

      if (!inventoryItem || inventoryItem.amount < 1) {
        throw new Error('Não possui esta carta.');
      }

      // Garante que existe MatrizBoard para o user
      let board = await tx.matrizBoard.findUnique({
        where: { userId }
      });

      if (!board) {
        board = await tx.matrizBoard.create({
          data: { userId, baseBiomass: 12.5 }
        });
      }

      // Substitui ou cria o BoardSlot para este reino
      const existingSlot = await tx.boardSlot.findUnique({
        where: { boardId_kingdom: { boardId: board.id, kingdom } }
      });

      if (existingSlot) {
        await tx.boardSlot.update({
          where: { id: existingSlot.id },
          data: { elementId }
        });
      } else {
        await tx.boardSlot.create({
          data: { boardId: board.id, kingdom, elementId }
        });
      }

      revalidatePath('/board');
      
      // Valida missão de equipar no tabuleiro
      await processMissionAction(userId, 'equip_board', 1);

      return { success: true };
    });
  } catch (error) {
    console.error('Erro ao equipar carta:', error);
    return { success: false };
  }
}

export async function unequipCard(userId: string, kingdom: string) {
  try {
    const board = await prisma.matrizBoard.findUnique({
      where: { userId }
    });

    if (!board) return { success: false };

    await prisma.boardSlot.delete({
      where: { boardId_kingdom: { boardId: board.id, kingdom } }
    });

    revalidatePath('/board');
    return { success: true };
  } catch (error) {
    console.error('Erro ao desequipar carta:', error);
    return { success: false };
  }
}

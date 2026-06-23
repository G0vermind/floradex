'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export type PackType = 'COMMON' | 'ELITE';
export type PackQuantity = 1 | 5 | 10;

export interface DropResult {
  id: number;
  name: string;
  kingdom: string;
  rarity: string;
  emoji: string;
  scientificName: string;
}

const COMMON_PRICE = 100;
const ELITE_PRICE = 500;

export async function openPacks(userId: string | undefined, packType: PackType, quantity: PackQuantity) {
  try {
    return await prisma.$transaction(async (tx: any) => {
      
      const user = userId 
        ? await tx.user.findUnique({ where: { id: userId }, select: { id: true, offChainLeafs: true } })
        : await tx.user.findFirst({ select: { id: true, offChainLeafs: true } });

      if (!user) {
        return { success: false, message: 'Usuário não encontrado.' };
      }

      const unitPrice = packType === 'COMMON' ? COMMON_PRICE : ELITE_PRICE;
      const totalCost = unitPrice * quantity;

      if (user.offChainLeafs < totalCost) {
        return { success: false, message: `Folhas insuficientes. Necessário: ${totalCost} Lf.` };
      }

      // Debita o custo
      await tx.user.update({
        where: { id: user.id },
        data: { offChainLeafs: { decrement: totalCost } }
      });

      const drops: DropResult[] = [];

      for (let i = 0; i < quantity; i++) {
        const roll = Math.random();
        let drawnElementId;

        if (packType === 'COMMON') {
          // COMMON Pack: 80% Flora de Base, 20% Fungi. (NUNCA dropa Polinizador/Lendário).
          if (roll <= 0.8) {
            const floraOptions = [101, 102, 103];
            drawnElementId = floraOptions[Math.floor(Math.random() * floraOptions.length)];
          } else {
            const fungiOptions = [201, 202];
            drawnElementId = fungiOptions[Math.floor(Math.random() * fungiOptions.length)];
          }
        } else {
          // ELITE Pack: 40% Flora de Base, 45% Fungi, 15% Polinizador Catalisador (Lendário).
          if (roll <= 0.4) {
            const floraOptions = [101, 102, 103];
            drawnElementId = floraOptions[Math.floor(Math.random() * floraOptions.length)];
          } else if (roll <= 0.85) {
            const fungiOptions = [201, 202];
            drawnElementId = fungiOptions[Math.floor(Math.random() * fungiOptions.length)];
          } else {
            const pollOptions = [301, 302]; 
            drawnElementId = pollOptions[Math.floor(Math.random() * pollOptions.length)];
          }
        }

        // Buscar dados
        const card = await tx.symbioticElement.findUnique({
          where: { id: drawnElementId }
        });

        if (!card) {
          throw new Error('Carta sorteada não encontrada no catálogo.');
        }

        // Adicionar ao Array de Retorno
        drops.push({
          id: card.id,
          name: card.name,
          kingdom: card.kingdom,
          rarity: card.rarity,
          emoji: card.emoji,
          scientificName: card.scientificName
        });

        // Adicionar ao Banco
        const existingInv = await tx.userInventory.findUnique({
          where: { userId_elementId: { userId: user.id, elementId: card.id } }
        });

        if (existingInv) {
          await tx.userInventory.update({
            where: { id: existingInv.id },
            data: { amount: { increment: 1 } }
          });
        } else {
          await tx.userInventory.create({
            data: {
              userId: user.id,
              elementId: card.id,
              amount: 1
            }
          });
        }
      }
      
      revalidatePath('/', 'layout');

      return { 
        success: true, 
        cards: drops,
        newBalance: user.offChainLeafs - totalCost
      };
    });
  } catch (error) {
    console.error('Erro na Server Action openPacks:', error);
    return { success: false, message: 'Falha na sintetização do pacote.' };
  }
}

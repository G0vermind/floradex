'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const PACK_COST = 100;

export async function buyEcosystemPack(userId?: string) {
  try {
    return await prisma.$transaction(async (tx: any) => {
      // Fallback para desenvolvimento local: pega o primeiro usuário caso não venha o ID
      const user = userId 
        ? await tx.user.findUnique({ where: { id: userId }, select: { id: true, offChainLeafs: true } })
        : await tx.user.findFirst({ select: { id: true, offChainLeafs: true } });

      if (!user) {
        return { success: false, message: 'Usuário não encontrado.' };
      }

      if (user.offChainLeafs < PACK_COST) {
        return { success: false, message: 'Folhas insuficientes.' };
      }

      // Debita o custo
      await tx.user.update({
        where: { id: user.id },
        data: { offChainLeafs: { decrement: PACK_COST } }
      });

      // Algoritmo Gacha: Reinos Botânicos
      const roll = Math.random();
      let drawnCard;

      if (roll > 0.95) {
        // 5% - Polinizador Catalisador
        const poll = [
          { name: 'Abelha Nativa Uruçu', desc: 'Melipona scutellaris. Espécie sem ferrão, essencial para o fluxo gênico florestal.' },
          { name: 'Beija-flor-rubi', desc: 'Clytolaema rubricauda. Altíssimo metabolismo, acelera polinização em sub-bosques.' }
        ];
        const pick = poll[Math.floor(Math.random() * poll.length)];
        drawnCard = { 
          id: 301, 
          kingdom: 'Polinizador Catalisador', 
          name: pick.name, 
          description: pick.desc, 
          theme: 'pollinator',
          emoji: '✨'
        };
      } else if (roll > 0.70) {
        // 25% - Rede Micelial
        const fungi = [
          { name: 'Cogumelo Bioluminescente', desc: 'Neonothopanus gardneri. Emite luz fria atraindo insetos para dispersão de esporos noturna.' },
          { name: 'Esporos de Micélio', desc: 'Hifas subterrâneas formadoras da "Wood Wide Web" para troca de água e carbono.' }
        ];
        const pick = fungi[Math.floor(Math.random() * fungi.length)];
        drawnCard = { 
          id: 201, 
          kingdom: 'Rede Micelial', 
          name: pick.name, 
          description: pick.desc, 
          theme: 'fungi',
          emoji: '🍄'
        };
      } else {
        // 70% - Flora de Base
        const flora = [
          { name: 'Musgo Esmeralda', desc: 'Bryophyta. Absorve a água da chuva como uma esponja, estabilizando a umidade.' },
          { name: 'Samambaia Ancestral', desc: 'Pteridophyta. Fornece cobertura vital do solo contra a erosão direta.' },
          { name: 'Porção de Terra Preta', desc: 'Solo antropogênico contendo biocarvão, altíssima retenção de nutrientes.' }
        ];
        const pick = flora[Math.floor(Math.random() * flora.length)];
        drawnCard = { 
          id: 101, 
          kingdom: 'Flora de Base', 
          name: pick.name, 
          description: pick.desc, 
          theme: 'flora',
          emoji: '🌿'
        };
      }

      // Atualiza o saldo global na barra de navegação superior
      revalidatePath('/', 'layout');

      return { 
        success: true, 
        card: drawnCard,
        newBalance: user.offChainLeafs - PACK_COST
      };
    });
  } catch (error) {
    console.error('Erro na Server Action buyEcosystemPack:', error);
    return { success: false, message: 'Erro de conexão com a rede.' };
  }
}

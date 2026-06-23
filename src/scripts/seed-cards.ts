import { prisma } from '../lib/prisma';

const SYMBIOTIC_ELEMENTS = [
  { 
    id: 101, name: 'Musgo Esmeralda', kingdom: 'flora', rarity: 'common', 
    emoji: '🌿', scientificName: 'Bryophyta emeraldus', theme: 'flora',
    description: 'Retém umidade essencial para o microclima do solo, criando um ambiente perfeito para novas raízes.',
    nurtureDesc: 'Fornece umidade constante para as raízes jovens do Mogno Africano.',
    bonusEffect: '+20% Retenção Água'
  },
  { 
    id: 102, name: 'Samambaia Ancestral', kingdom: 'flora', rarity: 'common', 
    emoji: '🪴', scientificName: 'Pteridophyta antiqua', theme: 'flora',
    description: 'Pioneira na ciclagem de nutrientes foliares e cobertura vital contra a erosão.',
    nurtureDesc: 'Sua sombra protege o solo, estabilizando a temperatura da Árvore Matriz.',
    bonusEffect: '+15% Sombra'
  },
  { 
    id: 103, name: 'Terra Preta', kingdom: 'flora', rarity: 'rare', 
    emoji: '🪨', scientificName: 'Terra preta de índio', theme: 'flora',
    description: 'Solo antropogênico riquíssimo em carbono.', 
    nurtureDesc: 'Base estrutural perfeita.',
    bonusEffect: '+50% Retenção Nutrientes'
  },
  { 
    id: 201, name: 'Cogumelo Bioluminescente', kingdom: 'fungi', rarity: 'rare', 
    emoji: '🍄', scientificName: 'Neonothopanus gardneri', theme: 'fungi',
    description: 'Emite luz fria atraindo insetos noturnos. Fundamental na decomposição de madeira morta.',
    nurtureDesc: 'As suas hifas quebram minerais complexos, entregando-os diretamente ao Mogno.',
    bonusEffect: '+35% Absorção Minerais'
  },
  { 
    id: 202, name: 'Esporos de Micélio', kingdom: 'fungi', rarity: 'common', 
    emoji: '🦠', scientificName: 'Mycelium network', theme: 'fungi',
    description: 'A rede de comunicação invisível.', 
    nurtureDesc: 'Conecta árvores distantes.',
    bonusEffect: '+10% Conectividade'
  },
  { 
    id: 301, name: 'Abelha Uruçu', kingdom: 'pollinator', rarity: 'legendary', 
    emoji: '🐝', scientificName: 'Melipona scutellaris', theme: 'pollinator',
    description: 'Espécie nativa sem ferrão, com altíssima taxa de polinização em copas altas.',
    nurtureDesc: 'Garante o fluxo gênico e a frutificação saudável do Mogno Africano.',
    bonusEffect: '100% Taxa de Frutificação'
  },
  { 
    id: 302, name: 'Beija-flor-rubi', kingdom: 'pollinator', rarity: 'rare', 
    emoji: '🐦', scientificName: 'Clytolaema rubricauda', theme: 'pollinator',
    description: 'Altíssimo metabolismo, acelera polinização em sub-bosques.',
    nurtureDesc: 'Crucial para as flores menores da matriz.',
    bonusEffect: '+40% Ciclagem Rápida'
  }
];

async function main() {
  console.log('🌱 Semeando os Elementos Simbióticos no Compêndio...');
  
  for (const element of SYMBIOTIC_ELEMENTS) {
    await prisma.symbioticElement.upsert({
      where: { id: element.id },
      update: element,
      create: element,
    });
  }
  
  console.log('✅ Compêndio populado com sucesso!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

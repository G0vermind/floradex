import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { FloraDexClient, SymbioticElementProps } from './FloraDexClient';

export default async function FloraDexPage() {
  const session = await auth();
  const userId = session?.user?.id;
  
  // Fallback para desenvolvimento local: pega o primeiro utilizador se não estiver autenticado
  const user = userId 
    ? await prisma.user.findUnique({ where: { id: userId } })
    : await prisma.user.findFirst();

  if (!user) {
    return (
      <div className="flex h-full items-center justify-center text-stone-500 font-mono text-sm">
        Faça login para ver o seu Compêndio.
      </div>
    );
  }

  // Busca todo o catálogo disponível na Base de Dados
  const allElements = await prisma.symbioticElement.findMany({
    orderBy: { id: 'asc' }
  });
  
  // Busca apenas as cartas que o utilizador já tirou nos pacotes
  const inventory = await prisma.userInventory.findMany({
    where: { userId: user.id }
  });

  // Mapeia o catálogo cruzando com o que o utilizador possui
  const elementsData: SymbioticElementProps[] = allElements.map((el) => {
    const inv = inventory.find(i => i.elementId === el.id);
    return {
      id: el.id,
      name: el.name,
      kingdom: el.kingdom as 'flora' | 'fungi' | 'pollinator',
      rarity: el.rarity as 'common' | 'rare' | 'legendary',
      isDiscovered: !!inv && inv.amount > 0,
      amount: inv ? inv.amount : 0,
      emoji: el.emoji,
      scientificName: el.scientificName,
      desc: el.description,
      nurture: el.nurtureDesc
    };
  });

  return <FloraDexClient elements={elementsData} />;
}

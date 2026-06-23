import { auth } from '@/auth';
import { BoardClient } from './BoardClient';

export default async function BoardPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return (
      <div className="flex h-full items-center justify-center text-stone-500 font-mono text-sm">
        Faça login para ver o seu Tabuleiro.
      </div>
    );
  }

  // A arquitetura Web3 não usa mais Server Components com Prisma para o Tabuleiro.
  // Os dados vêm do hook useTabuleiroData (Soroban) no BoardClient.
  return (
    <BoardClient 
      ownerAddress={userId}
    />
  );
}

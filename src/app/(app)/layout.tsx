import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { FloraDexTopBar } from '@/components/ui/layout/FloraDexTopBar';
import { FloraDexBottomNav } from '@/components/ui/layout/FloraDexBottomNav';

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const userId = session?.user?.id;
  
  const user = userId 
    ? await prisma.user.findUnique({ where: { id: userId } })
    : await prisma.user.findFirst();

  return (
    <div className="min-h-screen bg-slate-900 bg-linear-to-br from-slate-900 via-slate-900 to-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Background ambient light effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-copper-600/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-slate-600/5 rounded-full blur-[100px]" />
      </div>

      <FloraDexTopBar 
        userName={user?.name || "Guardião"} 
        leafBalance={user?.offChainLeafs || 0} 
      />

      {/* Main Content Area: Padding to account for fixed Top and Bottom bars */}
      <main className="flex-1 pt-16 pb-20 md:pb-0 relative z-10 overflow-x-hidden overflow-y-auto">
        {/* We wrap children in a wide container for desktop usage */}
        <div className="w-full max-w-400 mx-auto min-h-full flex flex-col">
          {children}
        </div>
      </main>

      <FloraDexBottomNav />
    </div>
  );
}

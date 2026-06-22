import { FloraDexTopBar } from '@/components/ui/layout/FloraDexTopBar';
import { FloraDexBottomNav } from '@/components/ui/layout/FloraDexBottomNav';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-900 bg-linear-to-br from-slate-900 via-slate-900 to-emerald-950 text-slate-100 flex flex-col font-sans">
      {/* Background ambient light effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-[100px]" />
      </div>

      <FloraDexTopBar />

      {/* Main Content Area: Padding to account for fixed Top and Bottom bars */}
      <main className="flex-1 pt-16 pb-20 relative z-10 overflow-y-auto">
        {/* We wrap children in a max-width container for desktop usage, though it's mobile-first */}
        <div className="max-w-md mx-auto w-full h-full p-4">
          {children}
        </div>
      </main>

      <FloraDexBottomNav />
    </div>
  );
}

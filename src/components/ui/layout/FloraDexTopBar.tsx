import { Leaf } from 'lucide-react';

export function FloraDexTopBar() {
  // TODO: Fetch real user session and balance later
  const userName = "Guardião";
  const userEra = "Semente de Mudança";
  const leafBalance = 1250;

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-slate-900/80 backdrop-blur-md border-b border-emerald-900/50 z-50 flex items-center justify-between px-4">
      {/* Left side: Avatar & Era */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-emerald-800 border border-emerald-600 flex items-center justify-center shrink-0">
          <span className="text-emerald-100 font-bold text-sm">
            {userName.charAt(0)}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-slate-200 text-sm font-medium leading-none">
            {userName}
          </span>
          <span className="text-emerald-400/80 text-xs mt-1">
            {userEra}
          </span>
        </div>
      </div>

      {/* Right side: Balance */}
      <div className="flex items-center bg-emerald-950/50 border border-emerald-800/50 rounded-full px-3 py-1.5 gap-2 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
        <span className="text-emerald-400 font-bold text-sm tracking-wide">
          {leafBalance.toLocaleString('pt-BR')}
        </span>
        <Leaf className="w-4 h-4 text-emerald-400 drop-shadow-[0_0_5px_rgba(52,211,153,0.8)] fill-emerald-400/20" />
      </div>
    </header>
  );
}

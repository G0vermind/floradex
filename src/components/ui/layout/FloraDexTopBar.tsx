import { Leaf } from 'lucide-react';

interface FloraDexTopBarProps {
  userName?: string;
  leafBalance?: number;
}

export function FloraDexTopBar({ userName = "Guardião", leafBalance = 0 }: FloraDexTopBarProps) {
  const userEra = "Semente de Mudança";

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-slate-900/60 backdrop-blur-xl border-b border-emerald-900/30 z-50 flex items-center justify-between px-4 md:px-12">
      {/* Left side: Avatar & Era */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-emerald-900/80 border border-emerald-500/20 flex items-center justify-center shrink-0 shadow-inner">
          <span className="text-emerald-50 font-serif font-bold text-sm">
            {userName.charAt(0)}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-slate-100 text-sm font-medium tracking-wide">
            {userName}
          </span>
          <span className="text-emerald-400/70 text-[11px] uppercase tracking-wider font-semibold mt-0.5">
            {userEra}
          </span>
        </div>
      </div>

      {/* Right side: Balance */}
      <div className="flex items-center bg-emerald-950/40 border border-emerald-800/30 rounded-full px-3 py-1.5 gap-2 shadow-[0_4px_12px_rgba(4,47,34,0.3)] backdrop-blur-md">
        <span className="text-emerald-300 font-serif font-bold text-sm tracking-wide">
          {leafBalance.toLocaleString('pt-BR')}
        </span>
        <Leaf className="w-4 h-4 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]" />
      </div>
    </header>
  );
}

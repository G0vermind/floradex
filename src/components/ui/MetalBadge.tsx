import React from 'react';

interface MetalBadgeProps {
  rarity: 'common' | 'uncommon' | 'rare' | 'legendary' | 'mythic';
  children: React.ReactNode;
  className?: string;
}

export function MetalBadge({ rarity, children, className = '' }: MetalBadgeProps) {
  const colors = {
    common: 'text-slate-400 border-slate-600',
    uncommon: 'text-brass-400 border-brass-500 shadow-[0_0_12px_rgba(212,163,50,0.25)]',
    rare: 'text-copper-400 border-copper-500 shadow-[0_0_16px_rgba(212,137,74,0.35)]',
    legendary: 'text-amber-300 border-copper-400 shadow-[0_0_24px_rgba(212,137,74,0.5)] animate-pulse-slow',
    mythic: 'text-teal-300 border-teal-400 shadow-mythic ring-1 ring-teal-400/30'
  };

  return (
    <div className={`
      inline-flex items-center px-2 py-1 rounded-full border bg-slate-900
      font-mono text-[9px] font-bold uppercase tracking-[0.15em] leading-none
      ${colors[rarity]} ${className}
    `}>
      {children}
    </div>
  );
}

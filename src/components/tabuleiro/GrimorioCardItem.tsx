'use client';

import { GuardianInstance } from '@/hooks/useTabuleiroData';
import { motion } from 'framer-motion';

interface GrimorioCardItemProps {
  guardian: GuardianInstance;
  isSelected?: boolean;
  onClick: () => void;
}

export function GrimorioCardItem({ guardian, isSelected, onClick }: GrimorioCardItemProps) {
  
  // Oracle Color System
  const getOracleColor = () => {
    const hoursSinceUpdate = (Date.now() - guardian.lastOracleUpdate) / 3600000;
    if (hoursSinceUpdate <= 6) return 'text-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'; // 🟢
    if (hoursSinceUpdate <= 24) return 'text-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]'; // 🟡
    return 'text-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'; // 🔴
  };

  const isLocked = guardian.transferLockedUntil > Date.now();

  return (
    <motion.button
      initial="rest"
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative w-full aspect-3/4 panel-emboss rounded-lg border flex flex-col transition-all cursor-pointer overflow-hidden ${
        isSelected ? 'border-copper-300 ring-2 ring-copper-400 shadow-[0_0_20px_rgba(192,94,53,0.5)]' : 'border-copper-500 hover:border-copper-400'
      }`}
    >
      {/* Top Badges */}
      <div className="absolute top-2 left-2 right-2 flex justify-between z-20 pointer-events-none">
        <div className="bg-slate-900/90 border border-slate-700 px-1.5 py-0.5 rounded text-[8px] font-mono text-copper-300 font-bold uppercase tracking-wider backdrop-blur-sm">
          TIER {guardian.tier}
        </div>
        <div className="bg-slate-900/90 border border-slate-700 px-1.5 py-0.5 rounded text-[8px] font-mono text-slate-300 font-bold uppercase tracking-wider backdrop-blur-sm">
          {guardian.element === 'Terra' ? '🌳' : guardian.element === 'Água' ? '💧' : guardian.element === 'Fogo' ? '🔥' : '💨'} {guardian.element}
        </div>
      </div>

      {/* Lock Badge */}
      {isLocked && (
        <div className="absolute top-8 right-2 bg-red-900/80 border border-red-500/50 px-1.5 py-0.5 rounded text-[7px] font-mono text-red-200 font-bold uppercase tracking-widest z-20 backdrop-blur-sm shadow-[0_0_10px_rgba(239,68,68,0.4)]">
          🔒 LOCK
        </div>
      )}

      {/* Imagem */}
      <div className="w-full h-[55%] bg-slate-900 relative flex items-center justify-center overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-copper-900/40 to-transparent" />
         <span className="text-6xl drop-shadow-[0_0_20px_rgba(192,94,53,0.5)] z-10">{guardian.imageUrl}</span>
      </div>

      {/* Detalhes (45%) */}
      <div className="flex-1 flex flex-col bg-slate-950 w-full text-left border-t border-copper-800">
        
        {/* Header */}
        <div className="p-2 border-b border-slate-800">
          <h4 className="font-serif text-[12px] text-copper-200 leading-tight truncate" title={guardian.speciesName}>{guardian.speciesName}</h4>
          <p className="font-mono text-[8px] text-slate-500 uppercase tracking-widest mt-0.5">
            {guardian.phase} · {guardian.rarity === 3 ? 'LENDÁRIA' : guardian.rarity === 2 ? 'RARA' : guardian.rarity === 1 ? 'UC' : 'COMUM'}
          </p>
        </div>

        {/* Stats de Batalha/Recursos */}
        <div className="flex-1 p-2 flex flex-col justify-center gap-1.5 bg-[#0a0f0d]">
          <div className="flex justify-between items-center text-[9px] font-mono font-bold uppercase text-slate-400">
            <span>ATK <span className="text-copper-300">{guardian.atk}</span></span>
            <span>DEF <span className="text-copper-300">{guardian.def}</span></span>
          </div>
          <div className="flex justify-between items-center text-[9px] font-mono font-bold text-slate-400">
            <span className="truncate">🌿 <span className="text-emerald-400">{guardian.biomassKg}</span><span className="text-[7px]">KG</span></span>
            <span className="truncate">⚡ <span className="text-cyan-400">{guardian.carbonG}</span><span className="text-[7px]">G</span></span>
          </div>
        </div>

        {/* Oracle Status Footer */}
        <div className="h-6 flex items-center justify-between px-2 bg-slate-900 border-t border-slate-800">
           <span className="font-mono text-[7px] text-slate-500 uppercase tracking-widest">
             Oracle: {Math.floor((Date.now() - guardian.lastOracleUpdate) / 3600000)}h atrás
           </span>
           <div className={`w-2 h-2 rounded-full bg-current ${getOracleColor()}`} />
        </div>

      </div>
    </motion.button>
  );
}

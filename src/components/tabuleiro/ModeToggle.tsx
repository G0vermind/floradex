'use client';

import { EcosystemType, PhaseType, RarityType } from '@/hooks/useTabuleiroData';
import { motion } from 'framer-motion';

interface ModeToggleProps {
  mode: 'inventario' | 'grimorio';
  setMode: (mode: 'inventario' | 'grimorio') => void;
  inventoryCount: number;
  grimorioCount: number;
}

export function ModeToggle({ mode, setMode, inventoryCount, grimorioCount }: ModeToggleProps) {
  return (
    <div className="flex gap-2 p-1 panel-deboss rounded-xl mb-6 mx-auto max-w-fit">
      <button
        onClick={() => setMode('inventario')}
        className={`relative px-6 py-2 rounded-lg font-mono text-[10px] uppercase tracking-widest transition-all duration-300 ${
          mode === 'inventario' ? 'text-copper-100 font-bold' : 'text-slate-500 hover:text-slate-300'
        }`}
      >
        {mode === 'inventario' && (
          <motion.div layoutId="mode-bg" className="absolute inset-0 panel-emboss border border-copper-400 rounded-lg shadow-[0_0_15px_rgba(192,94,53,0.3)]" />
        )}
        <span className="relative z-10 flex items-center gap-2">
          INVENTÁRIO <span className="panel-deboss px-1.5 py-0.5 rounded text-[9px]">{inventoryCount}</span>
        </span>
      </button>
      
      <button
        onClick={() => setMode('grimorio')}
        className={`relative px-6 py-2 rounded-lg font-mono text-[10px] uppercase tracking-widest transition-all duration-300 ${
          mode === 'grimorio' ? 'text-copper-100 font-bold' : 'text-slate-500 hover:text-slate-300'
        }`}
      >
        {mode === 'grimorio' && (
          <motion.div layoutId="mode-bg" className="absolute inset-0 panel-emboss border border-copper-400 rounded-lg shadow-[0_0_15px_rgba(192,94,53,0.3)]" />
        )}
        <span className="relative z-10 flex items-center gap-2">
          GRIMÓRIO <span className="panel-deboss px-1.5 py-0.5 rounded text-[9px]">{grimorioCount}</span>
        </span>
      </button>
    </div>
  );
}

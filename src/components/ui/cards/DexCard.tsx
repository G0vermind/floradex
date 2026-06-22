'use client';

import { motion } from 'framer-motion';

interface DexCardProps {
  id: string | number;
  name: string;
  kingdom: 'flora' | 'fungi' | 'pollinator';
  rarity: 'common' | 'rare' | 'legendary';
  isDiscovered: boolean;
  amount: number;
  emoji: string;
  onClick: () => void;
}

export function DexCard({ name, kingdom, isDiscovered, amount, emoji, onClick }: DexCardProps) {
  
  const getThemeStyles = () => {
    if (!isDiscovered) {
      return {
        bg: 'bg-[#1a1714]',
        border: 'border-stone-800',
        text: 'text-stone-600',
        glow: ''
      };
    }
    
    switch (kingdom) {
      case 'pollinator':
        return {
          bg: 'bg-linear-to-b from-amber-900/40 to-[#1a1714]',
          border: 'border-amber-700/50',
          text: 'text-amber-400',
          glow: 'shadow-[0_0_15px_rgba(245,158,11,0.15)]'
        };
      case 'fungi':
        return {
          bg: 'bg-linear-to-b from-fuchsia-900/40 to-[#1a1714]',
          border: 'border-cyan-700/50',
          text: 'text-cyan-400',
          glow: 'shadow-[0_0_15px_rgba(6,182,212,0.15)]'
        };
      case 'flora':
      default:
        return {
          bg: 'bg-linear-to-b from-emerald-900/40 to-[#1a1714]',
          border: 'border-emerald-700/50',
          text: 'text-emerald-400',
          glow: 'shadow-[0_0_15px_rgba(16,185,129,0.1)]'
        };
    }
  };

  const theme = getThemeStyles();

  return (
    <motion.button
      whileHover={isDiscovered ? { y: -4, scale: 1.02 } : {}}
      whileTap={isDiscovered ? { scale: 0.95 } : {}}
      onClick={isDiscovered ? onClick : undefined}
      className={`relative aspect-3/4 rounded-md overflow-hidden flex flex-col items-center justify-center p-2 text-center border transition-colors duration-500 w-full ${theme.bg} ${theme.border} ${theme.glow} ${!isDiscovered && 'cursor-not-allowed grayscale-[0.8]'}`}
    >
      {/* Badge de Quantidade */}
      {isDiscovered && amount > 1 && (
        <div className="absolute top-1.5 right-1.5 bg-stone-900 text-stone-200 text-[9px] font-mono px-1.5 py-0.5 rounded-sm border border-stone-700 z-10 shadow-md">
          x{amount}
        </div>
      )}
      
      {/* Container do Ícone */}
      <div 
        className={`w-12 h-12 rounded-full mb-3 relative flex items-center justify-center border ${
          isDiscovered 
            ? `border-stone-700/50 bg-[#0a0a0a] shadow-inner` 
            : 'border-stone-800/50 bg-[#111]'
        }`}
      >
        {isDiscovered ? (
          <span className="text-2xl drop-shadow-md grayscale-[0.2] contrast-125">{emoji}</span>
        ) : (
          <span className="text-stone-700 text-xl font-serif">?</span>
        )}
      </div>
      
      {/* Nome Botânico */}
      <span 
        className={`text-[9px] font-serif tracking-widest uppercase leading-tight ${theme.text}`}
      >
        {isDiscovered ? name : 'Desconhecido'}
      </span>
      
      {/* Reino em Letras Miúdas */}
      {isDiscovered && (
        <span className="text-[7px] font-mono text-stone-500 mt-1 uppercase">
          {kingdom === 'flora' ? 'Flora de Base' : kingdom === 'fungi' ? 'Rede Micelial' : 'Polinizador'}
        </span>
      )}
    </motion.button>
  );
}

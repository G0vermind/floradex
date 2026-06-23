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

export function DexCard({ name, kingdom, rarity, isDiscovered, amount, emoji, onClick }: DexCardProps) {
  
  const getThemeStyles = () => {
    if (!isDiscovered) {
      return {
        cardBorder: 'border-slate-800/80',
        glow: 'hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]',
        imageBg: 'from-slate-900/50 to-slate-950',
        imageBorder: 'border-slate-800',
        textColor: 'text-slate-600',
        badgeBg: 'bg-slate-900',
        badgeText: 'text-slate-700',
      };
    }
    
    switch (kingdom) {
      case 'pollinator':
        return {
          cardBorder: 'border-amber-600/30',
          glow: 'hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:border-amber-500/50',
          imageBg: 'from-amber-900/40 via-amber-950/20 to-[#0a0f0d]',
          imageBorder: 'border-amber-700/30',
          textColor: 'text-amber-400',
          badgeBg: 'bg-amber-950/50',
          badgeText: 'text-amber-500',
        };
      case 'fungi':
        return {
          cardBorder: 'border-cyan-600/30',
          glow: 'hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:border-cyan-500/50',
          imageBg: 'from-cyan-900/40 via-cyan-950/20 to-[#0a0f0d]',
          imageBorder: 'border-cyan-700/30',
          textColor: 'text-cyan-400',
          badgeBg: 'bg-cyan-950/50',
          badgeText: 'text-cyan-500',
        };
      case 'flora':
      default:
        return {
          cardBorder: 'border-[#b87333]/30', // Cobre
          glow: 'hover:shadow-[0_0_20px_rgba(192,94,53,0.2)] hover:border-[#b87333]/60',
          imageBg: 'from-emerald-900/40 via-emerald-950/20 to-[#0a0f0d]', // Verde orgânico para Flora
          imageBorder: 'border-emerald-700/30',
          textColor: 'text-emerald-400',
          badgeBg: 'bg-emerald-950/50',
          badgeText: 'text-emerald-500',
        };
    }
  };

  const theme = getThemeStyles();
  
  // Derivando um multiplicador fictício baseado na raridade para o Badge
  const multiplier = rarity === 'legendary' ? '+0.5x' : rarity === 'rare' ? '+0.2x' : '+0.1x';

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={isDiscovered ? { y: -4 } : {}}
      whileTap={isDiscovered ? { scale: 0.98 } : {}}
      onClick={isDiscovered ? onClick : undefined}
      className={`relative w-full aspect-3/4 flex flex-col p-2 md:p-3 rounded-2xl transition-all duration-300 bg-black/40 backdrop-blur-md border shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] ${theme.cardBorder} ${theme.glow} ${!isDiscovered && 'cursor-not-allowed'}`}
    >
      {/* 1. Área Superior: Imagem com Gradiente Radial */}
      <div 
        className={`w-full aspect-square rounded-xl mb-3 flex items-center justify-center relative overflow-hidden bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] ${theme.imageBg} border shadow-[inset_0_4px_15px_rgba(0,0,0,0.6)] ${theme.imageBorder}`}
      >
        {isDiscovered ? (
          <span className="text-4xl md:text-5xl drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] transform hover:scale-110 transition-transform duration-500">{emoji}</span>
        ) : (
          <span className="text-5xl brightness-0 opacity-20 transform scale-90">{emoji}</span>
        )}
      </div>
      
      {/* 2. Rodapé: Nome Botânico */}
      <div className="flex-1 flex flex-col justify-between w-full">
        <h3 
          className={`text-[10px] md:text-xs font-serif font-bold text-center uppercase tracking-wider leading-tight w-full line-clamp-2 ${isDiscovered ? 'text-slate-200' : 'text-slate-600'}`}
        >
          {isDiscovered ? name : 'Espécime Não Catalogado'}
        </h3>
        
        {/* 3. Badges (Status como na Referência) */}
        <div className="flex items-center justify-between mt-2 w-full">
          <div className={`px-2 py-1 rounded-md text-[8px] md:text-[9px] font-sans font-bold tracking-widest ${theme.badgeBg} ${theme.badgeText} border border-white/5`}>
            {isDiscovered ? multiplier : '???'}
          </div>
          
          <div className={`px-2 py-1 rounded-md text-[8px] md:text-[9px] font-sans font-bold tracking-widest ${theme.badgeBg} ${theme.badgeText} border border-white/5`}>
            {isDiscovered ? `x${amount}` : 'x0'}
          </div>
        </div>
      </div>

    </motion.button>
  );
}

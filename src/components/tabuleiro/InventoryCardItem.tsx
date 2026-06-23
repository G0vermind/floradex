'use client';

import { InventoryCard } from '@/hooks/useTabuleiroData';
import { motion } from 'framer-motion';

interface InventoryCardItemProps {
  card: InventoryCard;
  isSelected?: boolean;
  onClick: () => void;
}

export function InventoryCardItem({ card, isSelected, onClick }: InventoryCardItemProps) {
  
  const getRarityStyles = () => {
    switch (card.rarity) {
      case 3: return 'bg-amber-400 text-amber-950 shadow-[0_0_10px_rgba(251,191,36,0.6)]'; // Legendary
      case 2: return 'bg-copper-600 text-copper-100 shadow-[0_0_8px_rgba(192,94,53,0.4)]'; // Rare
      case 1: return 'bg-brass-500 text-brass-950'; // Uncommon
      case 0: 
      default: return 'hidden'; // Common não tem badge
    }
  };

  const getRarityLabel = () => {
    switch (card.rarity) {
      case 3: return 'LENDÁRIA';
      case 2: return 'RARA';
      case 1: return 'UC';
      case 0: return '';
    }
  };

  return (
    <motion.button
      initial="rest"
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative w-full aspect-3/4 panel-emboss rounded-lg border flex flex-col transition-all cursor-pointer overflow-hidden ${
        isSelected ? 'border-copper-400 ring-2 ring-copper-400 shadow-[0_0_20px_rgba(192,94,53,0.4)]' : 'border-copper-700 hover:border-copper-500'
      }`}
    >
      {/* Imagem (60%) */}
      <div className="w-full h-[60%] bg-slate-900 border-b border-copper-800 relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-emerald-900/30 to-transparent" />
        <span className="text-6xl drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] z-10">{card.imageUrl}</span>
        
        {/* Badge Raridade (Top Left) */}
        {card.rarity > 0 && (
          <div className={`absolute top-2 left-2 px-1.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider z-20 ${getRarityStyles()}`}>
            {getRarityLabel()}
          </div>
        )}

        {/* Badge Quantidade (Top Right) */}
        <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold copper-frame text-copper-200 z-20">
          ×{card.quantity}
        </div>
      </div>

      {/* Detalhes Base (40%) */}
      <div className="flex-1 flex flex-col p-2 bg-slate-950 w-full text-left justify-between">
        <div>
          <h4 className="font-serif text-[12px] text-copper-200 leading-tight truncate" title={card.name}>{card.name}</h4>
          <p className="font-mono text-[8px] text-slate-500 uppercase tracking-widest mt-1 truncate">
            {card.ecosystem} {card.rarity > 0 && `· ${getRarityLabel()}`}
          </p>
        </div>
        
        <div className="font-mono text-[9px] text-copper-400 font-bold uppercase tracking-wider bg-slate-900/80 px-2 py-1 rounded border border-slate-800 text-center">
          BASE: {card.baseBiomassKg} KG
        </div>
      </div>
    </motion.button>
  );
}

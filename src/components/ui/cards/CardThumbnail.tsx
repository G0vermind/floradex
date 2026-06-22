'use client';

import { motion } from 'framer-motion';

interface CardThumbnailProps {
  name: string;
  isDiscovered: boolean;
  amount: number;
}

export function CardThumbnail({ name, isDiscovered, amount }: CardThumbnailProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      className={`relative aspect-3/4 rounded-xl overflow-hidden flex flex-col items-center justify-center p-2 text-center border-2 transition-colors duration-300 ${
        isDiscovered 
          ? 'bg-linear-to-b from-emerald-800/40 to-slate-900 border-emerald-500/40 shadow-[0_4px_20px_rgba(16,185,129,0.15)]' 
          : 'bg-[#1C1613] border-slate-800/50 opacity-80' // forest-soil vibe
      }`}
    >
      {/* Badge de Quantidade */}
      {isDiscovered && amount > 0 && (
        <div className="absolute top-2 right-2 bg-emerald-500 text-slate-900 text-[10px] font-black px-1.5 py-0.5 rounded-full z-10 shadow-md">
          x{amount}
        </div>
      )}
      
      {/* Placeholder da Ilustração da Carta */}
      <div 
        className={`w-14 h-14 rounded-full mb-3 relative flex items-center justify-center ${
          isDiscovered 
            ? 'bg-linear-to-br from-emerald-400 to-teal-700 shadow-[0_0_20px_rgba(52,211,153,0.4)]' 
            : 'bg-slate-800'
        }`}
      >
        {isDiscovered ? (
          <span className="text-xl">🌿</span>
        ) : (
          <span className="text-slate-600 text-2xl font-black">?</span>
        )}
      </div>
      
      {/* Nome da Carta */}
      <span 
        className={`text-[10px] font-bold uppercase tracking-wide leading-tight ${
          isDiscovered ? 'text-emerald-100' : 'text-slate-600'
        }`}
      >
        {isDiscovered ? name : 'Desconhecida'}
      </span>
    </motion.div>
  );
}

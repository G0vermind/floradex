'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type SlotType = 'flora' | 'fungi' | 'pollinator';

interface EquippedCard {
  id: number;
  name: string;
  kingdom: SlotType;
  emoji: string;
  bonus: string;
}

// Inventário mockado do utilizador para usar no tabuleiro
const MOCK_INVENTORY = {
  flora: [
    { id: 101, name: 'Musgo Esmeralda', kingdom: 'flora' as const, emoji: '🌿', bonus: '+20% Retenção Água' },
    { id: 102, name: 'Samambaia Ancestral', kingdom: 'flora' as const, emoji: '🪴', bonus: '+15% Sombra' }
  ],
  fungi: [
    { id: 201, name: 'Cogumelo Bioluminescente', kingdom: 'fungi' as const, emoji: '🍄', bonus: '+35% Absorção Minerais' }
  ],
  pollinator: [
    { id: 301, name: 'Abelha Uruçu', kingdom: 'pollinator' as const, emoji: '🐝', bonus: '100% Taxa de Frutificação' }
  ]
};

export default function BoardPage() {
  const [equipped, setEquipped] = useState<Record<SlotType, EquippedCard | null>>({
    flora: null,
    fungi: null,
    pollinator: null
  });
  const [activeSlotSelection, setActiveSlotSelection] = useState<SlotType | null>(null);

  // Status da Árvore Matriz (dNFT)
  const baseBiomass = 12.5;
  const growthRate = 1.2 + (equipped.flora ? 0.2 : 0) + (equipped.fungi ? 0.35 : 0) + (equipped.pollinator ? 1.0 : 0);

  const handleEquip = (card: EquippedCard) => {
    setEquipped(prev => ({ ...prev, [card.kingdom]: card }));
    setActiveSlotSelection(null);
  };

  const unequip = (slot: SlotType) => {
    setEquipped(prev => ({ ...prev, [slot]: null }));
  };

  // Cores de cada slot
  const getSlotColor = (slot: SlotType) => {
    switch (slot) {
      case 'pollinator': return 'amber';
      case 'fungi': return 'cyan';
      case 'flora': return 'emerald';
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#14120E] text-slate-200 relative overflow-hidden">
      
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-900/40 rounded-full blur-[80px]" />
        {equipped.fungi && <div className="absolute bottom-10 left-10 w-40 h-40 bg-cyan-900/50 rounded-full blur-[60px]" />}
        {equipped.pollinator && <div className="absolute top-20 right-10 w-40 h-40 bg-amber-900/40 rounded-full blur-[60px]" />}
      </div>

      {/* HEADER: STATUS DO dNFT */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 pt-4 px-4 flex justify-between items-start"
      >
        <div>
          <h1 className="text-xl font-serif text-stone-200 tracking-wider">Mogno Africano</h1>
          <p className="text-[10px] font-mono text-emerald-500/80">dNFT #4021 • Fase: Crescimento</p>
        </div>
        <div className="text-right bg-stone-900/80 border border-stone-800 p-2 rounded-md shadow-inner backdrop-blur-sm">
          <p className="text-[9px] font-mono text-stone-500 uppercase tracking-widest">Biomassa (kg)</p>
          <p className="text-lg font-serif text-emerald-400">
            {baseBiomass.toFixed(1)} <span className="text-xs text-stone-400">({growthRate.toFixed(1)}x/dia)</span>
          </p>
        </div>
      </motion.div>

      {/* CENTRO: A ÁRVORE MATRIZ */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <motion.div
          animate={{ 
            y: [0, -5, 0],
            scale: growthRate > 1.2 ? [1, 1.02, 1] : 1 
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative flex items-center justify-center"
        >
          {/* Aura da Árvore */}
          <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full scale-150" />
          
          <div className="text-9xl drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] relative z-20 grayscale-[0.2] contrast-125">
            🌳
          </div>

          {/* Partículas de Simbiose subindo */}
          {equipped.flora && (
            <motion.div animate={{ y: [-20, -60], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-0 text-emerald-400 text-sm z-30">✨</motion.div>
          )}
          {equipped.fungi && (
            <motion.div animate={{ y: [0, -80], opacity: [0, 1, 0], x: -40 }} transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }} className="absolute bottom-10 text-cyan-400 text-sm z-30">✨</motion.div>
          )}
          {equipped.pollinator && (
            <motion.div animate={{ y: [20, -40], opacity: [0, 1, 0], x: 40 }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="absolute top-10 text-amber-400 text-sm z-30">✨</motion.div>
          )}
        </motion.div>
      </div>

      {/* RODAPÉ: SLOTS DE SIMBIOSE */}
      <div className="relative z-10 bg-stone-900/50 backdrop-blur-xl border-t border-stone-800/80 p-4 pb-8">
        <h3 className="text-[10px] font-mono text-stone-500 uppercase tracking-widest text-center mb-3">
          Rede de Nutrição
        </h3>
        
        <div className="flex justify-around items-center max-w-sm mx-auto">
          {(['flora', 'fungi', 'pollinator'] as SlotType[]).map((slotType) => {
            const card = equipped[slotType];
            const color = getSlotColor(slotType);
            const isSelected = activeSlotSelection === slotType;

            return (
              <div key={slotType} className="flex flex-col items-center gap-2">
                <button
                  onClick={() => card ? unequip(slotType) : setActiveSlotSelection(isSelected ? null : slotType)}
                  className={`w-16 h-20 rounded-md border-2 transition-all relative overflow-hidden flex items-center justify-center ${
                    card 
                      ? `bg-[#0a0a0a] border-${color}-600/80 shadow-[0_0_15px_rgba(var(--color-${color}-500),0.3)]` 
                      : isSelected
                        ? 'bg-stone-800 border-stone-400 border-dashed'
                        : 'bg-stone-900/50 border-stone-800 border-dashed hover:border-stone-600'
                  }`}
                >
                  {card ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center">
                      <span className="text-2xl drop-shadow-lg">{card.emoji}</span>
                    </motion.div>
                  ) : (
                    <span className="text-stone-700 text-sm font-mono">+</span>
                  )}
                  
                  {/* Etiqueta de Reino no fundo do slot */}
                  {!card && (
                    <div className="absolute bottom-1 w-full text-center opacity-30">
                      <span className="text-[7px] font-mono uppercase tracking-widest text-stone-500">
                        {slotType}
                      </span>
                    </div>
                  )}
                </button>
                {card && (
                  <span className={`text-[8px] font-mono text-${color}-400 text-center max-w-16 leading-tight`}>
                    {card.bonus}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* DRAWER: SELEÇÃO DE CARTAS */}
      <AnimatePresence>
        {activeSlotSelection && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setActiveSlotSelection(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute bottom-0 left-0 w-full bg-[#111] border-t border-stone-800 rounded-t-2xl z-50 p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-serif text-stone-300 uppercase tracking-widest">
                  Equipar: {activeSlotSelection === 'flora' ? 'Flora de Base' : activeSlotSelection === 'fungi' ? 'Rede Micelial' : 'Polinizador'}
                </h3>
                <button onClick={() => setActiveSlotSelection(null)} className="text-stone-500 text-xl">&times;</button>
              </div>

              <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                {MOCK_INVENTORY[activeSlotSelection].map((card) => {
                  const color = getSlotColor(card.kingdom);
                  return (
                    <motion.button
                      key={card.id}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleEquip(card)}
                      className={`shrink-0 w-28 h-40 rounded-md bg-linear-to-b from-[#1a1a1a] to-[#0a0a0a] border border-${color}-800/40 p-3 flex flex-col items-center justify-between text-center snap-center hover:border-${color}-500/60 shadow-lg`}
                    >
                      <div className={`w-10 h-10 rounded-full border border-${color}-900/50 bg-[#111] flex items-center justify-center shadow-inner`}>
                        <span className="text-xl">{card.emoji}</span>
                      </div>
                      <span className={`text-[10px] font-serif text-stone-300`}>{card.name}</span>
                      <span className={`text-[8px] font-mono text-${color}-400/80 bg-${color}-950/30 px-1 py-0.5 rounded border border-${color}-900/30`}>
                        {card.bonus}
                      </span>
                    </motion.button>
                  );
                })}
                {MOCK_INVENTORY[activeSlotSelection].length === 0 && (
                  <div className="w-full py-8 text-center text-stone-600 font-mono text-xs">
                    Nenhum espécime disponível no inventário.
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
    </div>
  );
}

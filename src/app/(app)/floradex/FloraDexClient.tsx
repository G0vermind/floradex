'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DexCard } from '@/components/ui/cards/DexCard';
import { MetalModal } from '@/components/ui/MetalModal';
import { Sprout, Sun, Wind, Box } from 'lucide-react';

export type SymbioticElementProps = {
  id: number;
  name: string;
  kingdom: 'flora' | 'fungi' | 'pollinator';
  rarity: 'common' | 'rare' | 'legendary';
  isDiscovered: boolean;
  amount: number;
  emoji: string;
  scientificName: string;
  desc: string;
  nurture: string;
};

type FilterType = 'all' | 'flora' | 'fungi' | 'pollinator';

export function FloraDexClient({ elements }: { elements: SymbioticElementProps[] }) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedCard, setSelectedCard] = useState<SymbioticElementProps | null>(null);

  const closeModal = () => setSelectedCard(null);

  const filteredElements = elements.filter(el => activeFilter === 'all' || el.kingdom === activeFilter);

  // Filter Tabs
  const filterTabs: { id: FilterType; label: string; icon: React.ElementType }[] = [
    { id: 'all', label: 'Todos', icon: Box },
    { id: 'flora', label: 'Flora', icon: Sprout },
    { id: 'fungi', label: 'Fungi', icon: Wind },
    { id: 'pollinator', label: 'Polinizadores', icon: Sun },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)] w-full text-slate-200">
      
      {/* MAIN AREA */}
      <main className="flex-1 flex flex-col bg-[#0c1410] bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-emerald-950/20 via-[#0c1410] to-[#0c1410] p-4 md:p-8 lg:px-12 relative z-10 overflow-hidden">
        
        {/* Cabeçalho e Filtros */}
        <div className="flex flex-col gap-6 mb-8 mt-2">
          <div>
            <h1 className="text-3xl md:text-5xl font-serif copper-text tracking-wider mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              FloraDex
            </h1>
            <p className="text-xs text-emerald-600/80 font-mono tracking-[0.2em] uppercase font-bold">
              Coleção de Sementes & Dispositivos
            </p>
          </div>

          {/* Componente de Abas/Filtros Premium */}
          <div className="flex flex-wrap gap-3">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`relative px-5 py-2.5 rounded-full flex items-center gap-2 transition-all duration-300 z-10 ${
                    isActive ? 'text-white' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="floradex-filter"
                      className="absolute inset-0 panel-emboss bg-slate-800/80 rounded-full border border-slate-600/50 shadow-[0_0_20px_rgba(0,0,0,0.5)] -z-10"
                    />
                  )}
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-600'}`} />
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grelha de Cartas */}
        <div className="flex-1 overflow-y-auto pr-2 pb-24 md:pb-8 scrollbar-none [&::-webkit-scrollbar]:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-2 min-[480px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6"
            >
              {filteredElements.map((item) => (
                <DexCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  kingdom={item.kingdom}
                  rarity={item.rarity}
                  isDiscovered={item.isDiscovered}
                  amount={item.amount}
                  emoji={item.emoji}
                  onClick={() => setSelectedCard(item)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </main>

      {/* Modal / Drawer Glassmorphism */}
      <MetalModal 
        isOpen={!!selectedCard} 
        onClose={closeModal} 
        title={selectedCard?.isDiscovered ? selectedCard.name : 'Espécie Desconhecida'}
      >
        {selectedCard && (
          <div className="flex flex-col">
            <div className="flex justify-center mb-6 mt-2" style={{ perspective: 1000 }}>
              <motion.div
                whileHover={{ rotateX: 5, rotateY: -5, scale: 1.05 }}
                className="w-40 h-56 rounded-xl card-slot border-4 border-copper-800/80 shadow-[0_15px_30px_rgba(0,0,0,0.8)] flex items-center justify-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/5 to-white/0 opacity-0 hover:opacity-100 transition-all pointer-events-none transform -skew-x-12" />
                <span className="text-6xl drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] grayscale-[0.2] contrast-125">{selectedCard.emoji}</span>
              </motion.div>
            </div>

            <div className="text-center mb-6 border-b border-slate-800 pb-4">
              <p className="text-[10px] font-sans font-bold uppercase tracking-widest text-slate-500">
                {selectedCard.isDiscovered ? selectedCard.scientificName : 'Nome Científico não catalogado'}
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <h4 className="text-[10px] font-sans font-bold uppercase tracking-widest text-copper-600 mb-2">Descrição Botânica</h4>
                <p className="text-xs font-sans text-slate-300 leading-relaxed text-justify">
                  {selectedCard.isDiscovered ? selectedCard.desc : 'Continue extraindo ativos na Caixa-Forte para descobrir as propriedades desta espécie.'}
                </p>
              </div>
              
              {selectedCard.isDiscovered && (
                <div className="panel-deboss p-4 rounded-xl border border-slate-800">
                  <h4 className="text-[10px] font-sans font-bold uppercase tracking-widest text-copper-500 mb-2 flex items-center gap-2">
                    <span className="text-copper-400">🔗</span> Simbiose com a Matriz
                  </h4>
                  <p className="text-[11px] font-sans text-slate-400 leading-relaxed font-bold">
                    "{selectedCard.nurture}"
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </MetalModal>
    </div>
  );
}

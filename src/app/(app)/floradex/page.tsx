'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DexCard } from '@/components/ui/cards/DexCard';

// Dados Mockados Científicos
const MOCK_SYMBIOSIS = [
  { 
    id: 101, name: 'Musgo Esmeralda', kingdom: 'flora' as const, rarity: 'common' as const, 
    isDiscovered: true, amount: 4, emoji: '🌿', scientificName: 'Bryophyta emeraldus',
    desc: 'Retém umidade essencial para o microclima do solo, criando um ambiente perfeito para novas raízes.',
    nurture: 'Fornece umidade constante para as raízes jovens do Mogno Africano.'
  },
  { 
    id: 102, name: 'Samambaia Ancestral', kingdom: 'flora' as const, rarity: 'common' as const, 
    isDiscovered: true, amount: 1, emoji: '🪴', scientificName: 'Pteridophyta antiqua',
    desc: 'Pioneira na ciclagem de nutrientes foliares e cobertura vital contra a erosão.',
    nurture: 'Sua sombra protege o solo, estabilizando a temperatura da Árvore Matriz.'
  },
  { 
    id: 103, name: 'Terra Preta', kingdom: 'flora' as const, rarity: 'rare' as const, 
    isDiscovered: false, amount: 0, emoji: '🪨', scientificName: 'Terra preta de índio',
    desc: 'Solo antropogênico riquíssimo em carbono.', nurture: 'Base estrutural perfeita.'
  },
  { 
    id: 201, name: 'Cogumelo Bioluminescente', kingdom: 'fungi' as const, rarity: 'rare' as const, 
    isDiscovered: true, amount: 2, emoji: '🍄', scientificName: 'Neonothopanus gardneri',
    desc: 'Emite luz fria atraindo insetos noturnos. Fundamental na decomposição de madeira morta.',
    nurture: 'As suas hifas quebram minerais complexos, entregando-os diretamente ao Mogno.'
  },
  { 
    id: 202, name: 'Esporos de Micélio', kingdom: 'fungi' as const, rarity: 'common' as const, 
    isDiscovered: false, amount: 0, emoji: '🦠', scientificName: 'Mycelium network',
    desc: 'A rede de comunicação invisível.', nurture: 'Conecta árvores distantes.'
  },
  { 
    id: 301, name: 'Abelha Uruçu', kingdom: 'pollinator' as const, rarity: 'legendary' as const, 
    isDiscovered: true, amount: 1, emoji: '🐝', scientificName: 'Melipona scutellaris',
    desc: 'Espécie nativa sem ferrão, com altíssima taxa de polinização em copas altas.',
    nurture: 'Garante o fluxo gênico e a frutificação saudável do Mogno Africano.'
  },
];

export default function FloraDexPage() {
  const [activeTab, setActiveTab] = useState<'symbiosis' | 'jewels'>('symbiosis');
  const [selectedCard, setSelectedCard] = useState<typeof MOCK_SYMBIOSIS[0] | null>(null);

  // Fecha o modal se clicar fora
  const closeModal = () => setSelectedCard(null);

  const getModalTheme = (kingdom: string) => {
    switch (kingdom) {
      case 'pollinator': return 'from-amber-900 to-[#0a0a0a] border-amber-600/50 shadow-amber-900/50 text-amber-400';
      case 'fungi': return 'from-fuchsia-900 to-[#0a0a0a] border-cyan-600/50 shadow-fuchsia-900/50 text-cyan-400';
      case 'flora':
      default: return 'from-emerald-900 to-[#0a0a0a] border-emerald-600/50 shadow-emerald-900/50 text-emerald-400';
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#14120E] text-slate-200">
      
      {/* Cabeçalho */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 pt-4 text-center"
      >
        <h1 className="text-2xl font-serif text-transparent bg-clip-text bg-linear-to-r from-stone-300 to-stone-500 mb-1 tracking-widest uppercase">
          Compêndio
        </h1>
        <p className="text-xs text-stone-500 font-mono">
          Registro Botânico & Simbiótico
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="flex p-1 bg-[#1a1714] rounded-md mb-6 border border-stone-800/60 shadow-inner">
        <button
          onClick={() => setActiveTab('symbiosis')}
          className={`relative flex-1 py-2 text-xs font-serif tracking-widest uppercase transition-all duration-300 z-10 ${
            activeTab === 'symbiosis' ? 'text-stone-200' : 'text-stone-600 hover:text-stone-400'
          }`}
        >
          {activeTab === 'symbiosis' && (
            <motion.div
              layoutId="floradex-tab"
              className="absolute inset-0 bg-[#2a2520] rounded shadow-[0_0_10px_rgba(0,0,0,0.5)] -z-10"
            />
          )}
          Rede Simbiótica
        </button>
        <button
          onClick={() => setActiveTab('jewels')}
          className={`relative flex-1 py-2 text-xs font-serif tracking-widest uppercase transition-all duration-300 z-10 ${
            activeTab === 'jewels' ? 'text-stone-200' : 'text-stone-600 hover:text-stone-400'
          }`}
        >
          {activeTab === 'jewels' && (
            <motion.div
              layoutId="floradex-tab"
              className="absolute inset-0 bg-[#2a2520] rounded shadow-[0_0_10px_rgba(0,0,0,0.5)] -z-10"
            />
          )}
          Joias de Impacto
        </button>
      </div>

      {/* Grelha de Cartas */}
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          {activeTab === 'symbiosis' && (
            <motion.div
              key="symbiosis"
              initial={{ opacity: 0, filter: 'blur(5px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 pb-10"
            >
              {MOCK_SYMBIOSIS.map((item) => (
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
          )}

          {activeTab === 'jewels' && (
            <motion.div
              key="jewels"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-stone-800 rounded-md bg-[#110f0c]"
            >
              <span className="text-4xl mb-4 grayscale brightness-50">💠</span>
              <h3 className="text-sm font-serif text-stone-400 tracking-widest uppercase">Sem Registos</h3>
              <p className="text-xs text-stone-600 mt-2 max-w-64 font-mono">
                As joias de impacto são esculpidas através de ações no mundo real.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Modal / Drawer Glassmorphism */}
      <AnimatePresence>
        {selectedCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`relative w-full max-w-sm bg-linear-to-b ${getModalTheme(selectedCard.kingdom)} p-px rounded-lg shadow-2xl z-10 overflow-hidden`}
            >
              <div className="w-full h-full bg-[#0a0a0a]/90 rounded-lg flex flex-col p-6">
                
                {/* Botão Fechar */}
                <button 
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-stone-500 hover:text-stone-300 z-20"
                >
                  ✕
                </button>
                
                {/* Carta em Destaque 3D */}
                <div className="flex justify-center mb-6 mt-4" style={{ perspective: 1000 }}>
                  <motion.div
                    whileHover={{ rotateX: 5, rotateY: -5, scale: 1.05 }}
                    className={`w-40 h-56 rounded-md bg-linear-to-b from-stone-800 to-[#111] border border-stone-700 shadow-2xl flex items-center justify-center relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/5 to-white/0 opacity-0 hover:opacity-100 transition-all pointer-events-none transform -skew-x-12" />
                    <span className="text-6xl drop-shadow-2xl grayscale-[0.2] contrast-125">{selectedCard.emoji}</span>
                  </motion.div>
                </div>

                {/* Textos */}
                <div className="text-center mb-6 border-b border-stone-800 pb-4">
                  <h2 className="text-xl font-serif text-stone-200 mb-1">{selectedCard.name}</h2>
                  <p className="text-xs font-mono italic text-stone-500">{selectedCard.scientificName}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-stone-600 mb-1">Descrição Botânica</h4>
                    <p className="text-sm font-serif text-stone-300 leading-relaxed">
                      {selectedCard.desc}
                    </p>
                  </div>
                  
                  <div className="bg-stone-900/50 p-3 rounded border border-stone-800">
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-stone-600 mb-1 flex items-center gap-1">
                      <span>🔗</span> Simbiose com a Matriz
                    </h4>
                    <p className="text-xs font-serif text-emerald-400/90 leading-relaxed italic">
                      "{selectedCard.nurture}"
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

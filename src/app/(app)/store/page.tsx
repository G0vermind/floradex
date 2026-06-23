'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { openPacks, PackType, PackQuantity, DropResult } from '@/actions/store';
import { MetalToast } from '@/components/ui/MetalToast';
import { Database, Zap, ArrowRight, ShieldCheck } from 'lucide-react';

type StoreState = 'idle' | 'opening' | 'revealed';

export default function StorePage() {
  const [storeState, setStoreState] = useState<StoreState>('idle');
  const [toast, setToast] = useState<{ isVisible: boolean; message: string }>({ isVisible: false, message: '' });
  const [revealedCards, setRevealedCards] = useState<DropResult[]>([]);
  const [selectedPack, setSelectedPack] = useState<PackType | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<PackQuantity>(1);

  const handlePurchase = async (type: PackType, qty: PackQuantity) => {
    setSelectedPack(type);
    setSelectedQuantity(qty);
    setToast(prev => ({ ...prev, isVisible: false }));
    setStoreState('opening');

    const result = await openPacks(undefined, type, qty); // userId é undefined por padrao, o server action tenta achar. Em prod passariamos algo.

    if (!result || !result.success) {
      setStoreState('idle');
      setToast({ isVisible: true, message: result?.message || 'Erro na transação' });
      setTimeout(() => setToast(prev => ({ ...prev, isVisible: false })), 3000);
      return;
    }

    // Delay visual de sintetização laboratorial
    setTimeout(() => {
      setRevealedCards(result.cards || []);
      setStoreState('revealed');
    }, 2000);
  };

  const closeReveal = () => {
    setRevealedCards([]);
    setStoreState('idle');
    setSelectedPack(null);
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const staggerItem: Variants = {
    hidden: { opacity: 0, y: 50, rotateY: 90 },
    show: { opacity: 1, y: 0, rotateY: 0, transition: { type: 'spring', damping: 15 } }
  };

  const getRarityText = (rarity: string) => {
    if (rarity === 'legendary') return 'LENDÁRIA';
    if (rarity === 'rare') return 'RARA';
    return 'COMUM';
  };

  return (
    <div className="flex flex-col min-h-full w-full relative bg-slate-950 text-slate-200">
      
      {/* Background ambient light */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 mix-blend-screen">
        <div className="absolute top-[20%] left-[20%] w-150 h-150 bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[20%] w-150 h-150 bg-copper-500/10 rounded-full blur-[120px]" />
      </div>

      {/* HEADER DA LOJA */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative z-10 pt-6 pb-4 border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm"
      >
        <h1 className="text-2xl md:text-3xl font-serif copper-text mb-1 tracking-widest uppercase">
          Mercado Genético
        </h1>
        <p className="text-[9px] md:text-[10px] text-slate-500 font-mono uppercase tracking-[0.3em] font-bold">
          Sintetize novos espécimes para o seu Grimório
        </p>
      </motion.div>

      {/* ÁREA PRINCIPAL DA LOJA */}
      <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto p-4 md:p-6 lg:px-8 gap-6 relative z-10 items-stretch justify-center pb-20 md:pb-6">
        
        {/* MÓDULO ESQUERDO: COMMON PACK */}
        <div className="w-full lg:w-1/2 panel-emboss rounded-3xl border border-emerald-900/40 p-6 flex flex-col relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:-translate-y-1">
           <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-[80px] pointer-events-none" />
           
           <div className="flex items-center gap-3 mb-4">
             <div className="p-3 panel-deboss rounded-lg border border-emerald-900/50">
               <Database className="w-6 h-6 text-emerald-500" />
             </div>
             <div>
               <h2 className="text-xl font-serif text-emerald-100 uppercase tracking-wider">Pacote Simbiótico</h2>
               <p className="font-mono text-[9px] text-emerald-600 uppercase tracking-widest font-bold">Classe: Base / Comum</p>
             </div>
           </div>

           <div className="flex-1 flex flex-col items-center justify-center py-4 min-h-55">
              <div className="w-40 h-48 rounded-xl border border-emerald-800/80 bg-emerald-950/30 flex items-center justify-center relative overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.15)] group">
                 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-emerald-800/40 to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />
                 <span className="text-6xl drop-shadow-[0_0_20px_rgba(16,185,129,0.5)] group-hover:scale-110 transition-transform duration-500">🌿</span>
              </div>
           </div>

           <div className="flex flex-col gap-3 mt-auto border-t border-emerald-900/30 pt-4">
              <div className="font-mono text-[8px] text-slate-500 uppercase tracking-widest text-center mb-1">
                 Probabilidades: 80% Flora · 20% Fungi
              </div>
              <div className="grid grid-cols-3 gap-3">
                 {[1, 5, 10].map((qty) => (
                   <button 
                     key={`common-${qty}`}
                     onClick={() => handlePurchase('COMMON', qty as PackQuantity)}
                     disabled={storeState === 'opening'}
                     className="panel-deboss flex flex-col items-center justify-center py-2 rounded-lg border border-emerald-900/30 hover:border-emerald-500/50 hover:bg-emerald-950/20 transition-all group disabled:opacity-50"
                   >
                     <span className="font-serif text-lg text-emerald-200 group-hover:text-emerald-100">{qty}x</span>
                     <span className="font-mono text-[8px] text-emerald-600 font-bold uppercase tracking-widest mt-1">
                       -{100 * qty} Lf
                     </span>
                   </button>
                 ))}
              </div>
           </div>
        </div>

        {/* MÓDULO DIREITO: ELITE PACK */}
        <div className="w-full lg:w-1/2 panel-emboss rounded-3xl border border-copper-700/50 p-6 flex flex-col relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-transform duration-500 hover:-translate-y-1">
           <div className="absolute bottom-0 left-0 w-80 h-80 bg-copper-600/10 rounded-full blur-[80px] pointer-events-none" />
           <div className="absolute top-0 right-0 w-full h-1 bg-linear-to-r from-transparent via-copper-500 to-transparent opacity-50" />
           
           <div className="flex items-center gap-3 mb-4">
             <div className="p-3 panel-deboss rounded-lg border border-copper-700/50 shadow-[0_0_15px_rgba(192,94,53,0.3)]">
               <Zap className="w-6 h-6 text-copper-400" />
             </div>
             <div>
               <h2 className="text-xl font-serif text-copper-100 uppercase tracking-wider">Cápsula de Elite</h2>
               <p className="font-mono text-[9px] text-copper-500 uppercase tracking-widest font-bold">Classe: Avançada / Catalisador</p>
             </div>
           </div>

           <div className="flex-1 flex flex-col items-center justify-center py-4 min-h-55">
              <div className="w-48 h-56 rounded-2xl border border-copper-600/80 bg-slate-900 flex items-center justify-center relative overflow-hidden shadow-[0_0_50px_rgba(192,94,53,0.3)] group">
                 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-copper-800/50 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                 {/* Holo effect */}
                 <div className="absolute inset-0 bg-linear-to-b from-transparent via-copper-400/10 to-transparent h-[200%] animate-[scan_3s_linear_infinite]" />
                 <span className="text-7xl drop-shadow-[0_0_30px_rgba(192,94,53,0.8)] z-10 group-hover:scale-110 transition-transform duration-500">🧬</span>
              </div>
           </div>

           <div className="flex flex-col gap-3 mt-auto border-t border-copper-900/40 pt-4">
              <div className="font-mono text-[8px] text-copper-500/70 uppercase tracking-widest text-center mb-1">
                 Chances: 40% Flora · 45% Fungi · 15% Polinizador (Lendário)
              </div>
              <div className="grid grid-cols-3 gap-3">
                 {[1, 5, 10].map((qty) => (
                   <button 
                     key={`elite-${qty}`}
                     onClick={() => handlePurchase('ELITE', qty as PackQuantity)}
                     disabled={storeState === 'opening'}
                     className="panel-deboss flex flex-col items-center justify-center py-2 rounded-lg border border-copper-800/50 hover:border-copper-400 hover:shadow-[inset_0_0_20px_rgba(192,94,53,0.2)] transition-all group disabled:opacity-50"
                   >
                     <span className="font-serif text-xl text-copper-300 group-hover:text-copper-100">{qty}x</span>
                     <span className="font-mono text-[8px] text-copper-500 font-bold uppercase tracking-widest mt-1 group-hover:text-copper-400">
                       -{500 * qty} Lf
                     </span>
                   </button>
                 ))}
              </div>
           </div>
        </div>

      </div>

      {/* OVERLAY DE LOADING / SINTETIZAÇÃO */}
      <AnimatePresence>
        {storeState === 'opening' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex flex-col items-center justify-center"
          >
             <div className="relative w-32 h-32 flex items-center justify-center mb-8">
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                 className={`absolute inset-0 rounded-full border-4 border-dashed border-t-transparent ${selectedPack === 'ELITE' ? 'border-copper-500' : 'border-emerald-500'}`}
               />
               <ShieldCheck className={`w-12 h-12 ${selectedPack === 'ELITE' ? 'text-copper-400' : 'text-emerald-400'}`} />
             </div>
             <h2 className="font-serif text-2xl text-slate-200 tracking-widest uppercase mb-2">
               Sintetizando Dados
             </h2>
             <p className="font-mono text-[10px] text-slate-500 uppercase tracking-[0.3em]">
               Estabelecendo conexão on-chain...
             </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* OVERLAY DE REVELAÇÃO (THE REVEAL) */}
      <AnimatePresence>
        {storeState === 'revealed' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950 z-100 flex flex-col overflow-y-auto"
          >
             {/* Efeitos Fullscreen */}
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-copper-900/20 via-slate-950 to-slate-950 pointer-events-none" />

             <div className="w-full flex-1 flex flex-col items-center justify-center p-4 md:p-12 relative z-10 min-h-screen">
               
               <motion.h2 
                 initial={{ y: -30, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 transition={{ delay: 0.3 }}
                 className="text-2xl md:text-4xl font-serif copper-text tracking-widest uppercase mb-12 text-center"
               >
                 Extração Concluída
               </motion.h2>

               {/* GRID DE CARTAS ANIMADO */}
               <motion.div 
                 variants={staggerContainer}
                 initial="hidden"
                 animate="show"
                 className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 w-full max-w-300 mb-16"
               >
                 {revealedCards.map((card, index) => (
                   <motion.div 
                     key={`${card.id}-${index}`}
                     variants={staggerItem}
                     className="aspect-3/4 panel-emboss rounded-xl border border-copper-700/50 flex flex-col overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
                   >
                     {/* Imagem */}
                     <div className="flex-1 bg-slate-900 flex items-center justify-center relative border-b border-copper-900/50">
                       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-copper-800/30 to-transparent" />
                       <span className="text-5xl md:text-6xl drop-shadow-[0_0_15px_rgba(192,94,53,0.4)] z-10">{card.emoji}</span>
                       
                       {card.rarity === 'legendary' && (
                         <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider bg-amber-400 text-amber-950 shadow-[0_0_10px_rgba(251,191,36,0.6)] z-20">
                           LENDÁRIA
                         </div>
                       )}
                     </div>

                     {/* Footer do Card */}
                     <div className="bg-slate-950 p-3 flex flex-col text-center">
                       <h3 className="font-serif text-[11px] md:text-xs text-copper-200 uppercase truncate">{card.name}</h3>
                       <p className="font-mono text-[8px] text-slate-500 uppercase tracking-widest mt-1">
                         {card.kingdom} · {getRarityText(card.rarity)}
                       </p>
                     </div>
                   </motion.div>
                 ))}
               </motion.div>

               <motion.button
                 initial={{ opacity: 0, y: 30 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 1 }}
                 onClick={closeReveal}
                 className="copper-frame px-8 py-4 rounded-xl font-mono text-[11px] uppercase tracking-[0.2em] font-bold text-copper-100 flex items-center gap-3 hover:shadow-[0_0_30px_rgba(192,94,53,0.5)] transition-all"
               >
                 Enviar para a FloraDex <ArrowRight className="w-4 h-4" />
               </motion.button>
               
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <MetalToast 
        isVisible={toast.isVisible}
        type="error"
        code="SYS_ERR"
        message={toast.message}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
        position="top"
      />
    </div>
  );
}

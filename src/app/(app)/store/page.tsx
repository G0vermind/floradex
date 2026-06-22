'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { buyEcosystemPack } from '@/actions/store';

type StoreState = 'idle' | 'opening' | 'revealed';

export default function StorePage() {
  const [storeState, setStoreState] = useState<StoreState>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [revealedCard, setRevealedCard] = useState<any>(null);

  const handleExtractSample = async () => {
    setErrorMsg(null);
    setStoreState('opening');

    const result = await buyEcosystemPack();

    if (!result || !result.success) {
      setStoreState('idle');
      setErrorMsg(result?.message || 'Erro desconhecido');
      return;
    }

    // Delay simulado de extração laboratorial/científica
    setTimeout(() => {
      setRevealedCard(result.card);
      setStoreState('revealed');
    }, 1800);
  };

  const saveToFloraDex = () => {
    setRevealedCard(null);
    setStoreState('idle');
  };

  // Define os temas visuais com base no "Reino" da carta
  const getThemeStyles = (theme: string) => {
    switch (theme) {
      case 'pollinator':
        return {
          bg: 'from-amber-600 to-amber-950',
          border: 'border-amber-500/50',
          glow: 'shadow-[0_0_50px_rgba(245,158,11,0.4)]',
          textHl: 'text-amber-400',
          badge: 'bg-amber-950/80 border-amber-500/50 text-amber-300'
        };
      case 'fungi':
        return {
          bg: 'from-fuchsia-900 to-[#0A0514]',
          border: 'border-cyan-500/50',
          glow: 'shadow-[0_0_50px_rgba(6,182,212,0.4)]',
          textHl: 'text-cyan-400',
          badge: 'bg-[#1a0f2e]/80 border-cyan-500/50 text-cyan-300'
        };
      case 'flora':
      default:
        return {
          bg: 'from-[#1A2E1A] to-[#0A120A]',
          border: 'border-emerald-700/50',
          glow: 'shadow-[0_0_30px_rgba(16,185,129,0.15)]',
          textHl: 'text-emerald-400',
          badge: 'bg-[#0f1f0f]/80 border-emerald-700/50 text-emerald-300'
        };
    }
  };

  return (
    <div className="flex flex-col h-full w-full relative pt-4 bg-[#14120E] text-slate-200">
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-2xl font-black text-transparent bg-clip-text bg-linear-to-r from-stone-300 to-stone-500 mb-1 tracking-widest uppercase text-[15px]">
          Análise de Campo
        </h1>
        <p className="text-xs text-stone-400/80 font-medium">
          Extração de Amostras do Ecossistema
        </p>
      </motion.div>

      {errorMsg && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-950/50 border border-red-900 text-red-400 p-3 rounded-lg text-center text-sm mb-6 max-w-sm mx-auto w-full"
        >
          {errorMsg}
        </motion.div>
      )}

      <div className="flex-1 flex flex-col items-center justify-center relative">
        <AnimatePresence mode="wait">
          
          {/* ESTADO: PACOTE CIENTÍFICO (IDLE / OPENING) */}
          {(storeState === 'idle' || storeState === 'opening') && (
            <motion.div
              key="pack"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: storeState === 'idle' ? [0, -8, 0] : 0,
                rotateZ: storeState === 'opening' ? [-1, 1, -2, 2, -1, 1, 0] : 0
              }}
              exit={{ opacity: 0, scale: 1.1, filter: 'blur(15px)', transition: { duration: 0.6 } }}
              transition={{ 
                y: { repeat: Infinity, duration: 4, ease: 'easeInOut' },
                rotateZ: { repeat: Infinity, duration: 0.2 }
              }}
              className="relative flex flex-col items-center z-10"
            >
              {/* Design do Pacote: Frasco de Amostra Botânica */}
              <div className="w-48 h-64 bg-[#0a0a09] rounded-sm border border-stone-800 shadow-[0_20px_40px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center p-4 relative overflow-hidden before:absolute before:inset-0 before:bg-linear-to-b before:from-stone-800/10 before:to-transparent">
                
                {/* Rótulo Científico */}
                <div className="w-full h-3/4 bg-[#ece4d8] rounded-sm border border-stone-300 p-3 flex flex-col items-center justify-between relative shadow-inner">
                  
                  <div className="w-full border-b border-stone-400/50 pb-2 text-center">
                    <span className="text-[#3a352a] font-serif text-[10px] uppercase tracking-[0.2em]">Specimen</span>
                  </div>
                  
                  <div className="w-12 h-12 rounded-full border border-stone-400/50 flex items-center justify-center opacity-80">
                     <svg className="w-6 h-6 text-[#3a352a]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                  </div>
                  
                  <div className="w-full flex justify-between items-end mt-2 opacity-60">
                     <span className="text-[#3a352a] font-mono text-[8px]">BATCH: {new Date().getFullYear()}</span>
                     <span className="text-[#3a352a] font-mono text-[8px]">Lv: 1</span>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* ESTADO: REVELAÇÃO DA CARTA SIMBIÓTICA */}
          {storeState === 'revealed' && revealedCard && (
            <motion.div
              key="card"
              initial={{ opacity: 0, scale: 0.6, rotateY: 90, z: -100 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0, z: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 100, mass: 1 }}
              className="relative z-20 flex flex-col items-center"
            >
              {/* Efeito Tilt 3D estilo carta premium */}
              <motion.div
                whileHover={{ rotateX: 5, rotateY: -5, scale: 1.02 }}
                className={`w-72 h-96 p-px bg-linear-to-br ${getThemeStyles(revealedCard.theme).bg} rounded-md relative overflow-hidden ${getThemeStyles(revealedCard.theme).glow}`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Borda holográfica suave */}
                <div className={`absolute inset-0 border ${getThemeStyles(revealedCard.theme).border} rounded-md z-10 pointer-events-none`} />
                
                {/* Reflexo */}
                <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/5 to-white/0 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none transform -skew-x-12 z-20" />
                
                {/* Corpo do Compêndio Botânico */}
                <div className="w-full h-full bg-[#111] rounded-md flex flex-col p-5 relative z-0">
                  
                  {/* Etiqueta superior */}
                  <div className="w-full flex justify-between items-start mb-6">
                    <div className={`px-2 py-0.5 text-[9px] uppercase tracking-widest font-mono border rounded-sm ${getThemeStyles(revealedCard.theme).badge}`}>
                      {revealedCard.kingdom}
                    </div>
                    <span className="font-mono text-[10px] text-stone-600">ID: {revealedCard.id}</span>
                  </div>
                  
                  {/* Ilustração científica */}
                  <div className={`w-full flex-1 border border-stone-800 rounded bg-[#0a0a0a] flex items-center justify-center mb-4 relative overflow-hidden shadow-inner`}>
                     {/* Fundo abstrato orgânico dependendo do tema */}
                     <div className={`absolute inset-0 opacity-20 bg-linear-to-t ${getThemeStyles(revealedCard.theme).bg}`} />
                     <span className="text-6xl z-10 drop-shadow-2xl grayscale brightness-125 contrast-125">
                       {revealedCard.emoji}
                     </span>
                  </div>
                  
                  {/* Dados Biológicos */}
                  <div className="w-full text-left">
                    <h2 className={`text-lg font-serif mb-1 ${getThemeStyles(revealedCard.theme).textHl}`}>
                      {revealedCard.name}
                    </h2>
                    <p className="text-xs text-stone-400 font-serif leading-relaxed italic">
                      "{revealedCard.description}"
                    </p>
                  </div>

                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8"
              >
                <button
                  onClick={saveToFloraDex}
                  className="px-6 py-3 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-300 font-serif tracking-wider text-sm rounded-md transition-all active:scale-95"
                >
                  Guardar na FloraDex
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* BOTÃO DE EXTRAÇÃO */}
      <AnimatePresence>
        {storeState !== 'revealed' && (
          <motion.div 
            initial={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-auto pt-8 flex justify-center z-10 pb-4"
          >
            <button
              onClick={handleExtractSample}
              disabled={storeState === 'opening'}
              className={`w-full max-w-70 py-4 rounded-md font-serif text-sm tracking-wider transition-all flex justify-center items-center gap-3 backdrop-blur-md border ${
                storeState === 'opening' 
                  ? 'bg-stone-900/50 border-stone-800 text-stone-500 cursor-not-allowed' 
                  : 'bg-stone-800/80 border-stone-700 text-stone-200 hover:bg-stone-700/80 active:scale-95 hover:border-emerald-900/50 shadow-lg'
              }`}
            >
              {storeState === 'opening' ? 'Extraindo amostra...' : 'Revelar Ecossistema'}
              {storeState !== 'opening' && (
                <span className="bg-stone-950 px-2 py-0.5 rounded text-xs font-mono flex items-center gap-1 border border-stone-800">
                  -100 Lf
                </span>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

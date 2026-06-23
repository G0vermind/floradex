'use client';

import { GuardianInstance, InventoryCard } from '@/hooks/useTabuleiroData';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldAlert, ArrowRightLeft, ExternalLink } from 'lucide-react';

interface CardDetailDrawerProps {
  isOpen: boolean;
  card: GuardianInstance | InventoryCard | null;
  mode: 'inventario' | 'grimorio';
  onClose: () => void;
}

export function CardDetailDrawer({ isOpen, card, mode, onClose }: CardDetailDrawerProps) {
  const isGrimorio = mode === 'grimorio';
  const guardian = isGrimorio ? (card as GuardianInstance) : null;
  const inventory = !isGrimorio ? (card as InventoryCard) : null;

  const getRarityText = (rarity: number) => {
    switch(rarity) {
      case 3: return 'LENDÁRIA';
      case 2: return 'RARA';
      case 1: return 'INCOMUM';
      case 0: return 'COMUM';
      default: return 'DESCONHECIDO';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && card && (
        <>
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-100 lg:bg-transparent lg:backdrop-blur-none"
          />
          <motion.div
            key="drawer-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-100 panel-emboss border-l border-copper-700/50 shadow-[-20px_0_50px_rgba(0,0,0,0.8)] z-101 flex flex-col overflow-y-auto"
          >
        
        {/* HEADER DRAWER */}
        <div className="flex justify-between items-center p-4 border-b border-slate-800 bg-slate-950/50 sticky top-0 z-10 backdrop-blur-md">
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-copper-400">Inspeção Detalhada</h2>
          <button onClick={onClose} className="p-2 panel-deboss rounded-md text-slate-400 hover:text-copper-400 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6">
          
          {/* CARTA GIGANTE */}
          <div className="w-full aspect-3/4 panel-emboss rounded-xl border border-copper-700/50 p-3 bg-slate-900 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] relative flex items-center justify-center overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-copper-900/40 to-transparent" />
             <span className="text-8xl drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] z-10">{card.imageUrl}</span>
          </div>

          {/* CABEÇALHO DADOS */}
          <div className="flex flex-col gap-1 text-center border-b border-slate-800 pb-4">
            <h1 className="font-serif text-2xl text-copper-200 tracking-wide uppercase">{isGrimorio ? guardian?.speciesName : inventory?.name}</h1>
            <p className="font-mono text-[9px] uppercase tracking-widest text-slate-400">
              {isGrimorio ? `Espécime #${guardian?.nftId.substring(0,6)} · ${guardian?.phase} · Tier ${guardian?.tier}` : `Base Seminal · Quantidade: ${inventory?.quantity}`}
            </p>
            <div className="mt-2 inline-flex items-center justify-center">
              <span className="px-2 py-1 panel-deboss rounded border border-slate-800 font-mono text-[8px] text-copper-400 uppercase tracking-widest">
                Raridade: {getRarityText(card.rarity)}
              </span>
            </div>
          </div>

          {/* ATRIBUTOS (GRIMORIO) */}
          {isGrimorio && guardian && (
            <div className="flex flex-col gap-3">
              <h3 className="font-mono text-[9px] uppercase tracking-widest text-copper-500 mb-1">── Atributos de Batalha ──</h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="panel-deboss p-2 text-center rounded border border-slate-800">
                  <p className="font-mono text-[8px] text-slate-500 uppercase tracking-widest">ATK</p>
                  <p className="font-mono text-sm font-bold text-copper-200 mt-1">{guardian.atk}</p>
                </div>
                <div className="panel-deboss p-2 text-center rounded border border-slate-800">
                  <p className="font-mono text-[8px] text-slate-500 uppercase tracking-widest">DEF</p>
                  <p className="font-mono text-sm font-bold text-copper-200 mt-1">{guardian.def}</p>
                </div>
                <div className="panel-deboss p-2 text-center rounded border border-slate-800">
                  <p className="font-mono text-[8px] text-slate-500 uppercase tracking-widest">HP</p>
                  <p className="font-mono text-sm font-bold text-emerald-400 mt-1">{guardian.hp}</p>
                </div>
              </div>
              <div className="flex justify-between items-center text-[9px] font-mono uppercase tracking-widest text-slate-400 mt-2 px-1">
                <span>Elemento: <span className="text-copper-300 font-bold">{guardian.element}</span></span>
                <span>Ecossistema: <span className="text-copper-300 font-bold">{guardian.ecosystem}</span></span>
              </div>
            </div>
          )}

          {/* DADOS ORACLE / BASE */}
          <div className="flex flex-col gap-3">
            <h3 className="font-mono text-[9px] uppercase tracking-widest text-copper-500 mb-1">── Dados Biológicos ──</h3>
            <div className="panel-deboss p-3 rounded-lg border border-slate-800 flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">Biomassa Real</span>
                <span className="font-mono text-[10px] font-bold text-emerald-400">{isGrimorio ? guardian?.biomassKg : inventory?.baseBiomassKg} KG</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">Carbono Extraído</span>
                <span className="font-mono text-[10px] font-bold text-cyan-400">{isGrimorio ? guardian?.carbonG : inventory?.baseCarbonG} G</span>
              </div>
              {isGrimorio && guardian && (
                <>
                  <div className="w-full h-px bg-slate-800 my-1" />
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">Última Att Oracle</span>
                    <span className="font-mono text-[9px] text-slate-300">há {Math.floor((Date.now() - guardian.lastOracleUpdate) / 3600000)}h</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* HISTÓRICO */}
          {isGrimorio && guardian && (
             <div className="flex flex-col gap-3">
               <h3 className="font-mono text-[9px] uppercase tracking-widest text-copper-500 mb-1">── Registro Ledger ──</h3>
               <div className="flex flex-col gap-1 text-[9px] font-mono text-slate-400 tracking-wider">
                 <p>Plantado em: {new Date(guardian.mintedAt).toLocaleDateString()}</p>
                 <p>Hash On-chain: {guardian.nftId}...7x8q</p>
                 <p className="mt-2 text-emerald-500">✓ Lock Encerrado</p>
               </div>
             </div>
          )}

          {/* AÇÕES */}
          <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-slate-800">
             {isGrimorio ? (
               <>
                <button className="w-full copper-frame rounded py-3 font-mono text-[10px] uppercase tracking-widest font-bold text-copper-100 hover:shadow-[0_0_15px_rgba(192,94,53,0.4)] transition-all">
                  Remover do Deck
                </button>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button className="panel-emboss rounded py-2 font-mono text-[9px] uppercase tracking-widest text-slate-300 hover:text-copper-300 transition-colors flex items-center justify-center gap-2 border border-slate-700">
                    <ArrowRightLeft className="w-3 h-3" /> Transferir
                  </button>
                  <button className="panel-emboss rounded py-2 font-mono text-[9px] uppercase tracking-widest text-slate-300 hover:text-copper-300 transition-colors flex items-center justify-center gap-2 border border-slate-700">
                    <ExternalLink className="w-3 h-3" /> Explorer
                  </button>
                </div>
               </>
             ) : (
               <button className="w-full copper-frame rounded py-3 font-mono text-[10px] uppercase tracking-widest font-bold text-copper-100 hover:shadow-[0_0_15px_rgba(192,94,53,0.4)] transition-all flex items-center justify-center gap-2">
                 <ShieldAlert className="w-4 h-4" /> Ativar no Grimório
               </button>
             )}
          </div>

        </div>
      </motion.div>
      </>
      )}
    </AnimatePresence>
  );
}

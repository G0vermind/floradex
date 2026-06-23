'use client';

import { EcosystemType, PhaseType, RarityType } from '@/hooks/useTabuleiroData';
import { motion } from 'framer-motion';

export interface FilterState {
  ecosystem: EcosystemType[];
  rarity: RarityType[];
  phase: PhaseType[];
}

interface FilterPanelProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

const ECOSYSTEMS: { label: string; value: EcosystemType; icon: string; color: string }[] = [
  { label: 'CERRADO', value: 'Cerrado', icon: '🌳', color: 'amber-600' },
  { label: 'AMAZÔNIA', value: 'Amazônia', icon: '🌿', color: 'emerald-600' },
  { label: 'MATA ATLÂNTICA', value: 'Mata Atlântica', icon: '🍃', color: 'teal-600' },
  { label: 'CAATINGA', value: 'Caatinga', icon: '🌵', color: 'orange-700' },
  { label: 'PANTANAL', value: 'Pantanal', icon: '💧', color: 'cyan-700' },
];

const RARITIES: { label: string; value: RarityType; bg: string }[] = [
  { label: 'COMMON', value: 0, bg: 'bg-slate-600' },
  { label: 'UNCOMMON', value: 1, bg: 'bg-brass-500' },
  { label: 'RARE', value: 2, bg: 'bg-copper-600' },
  { label: 'LEGENDARY', value: 3, bg: 'bg-amber-400' },
];

const PHASES: { label: string; value: PhaseType }[] = [
  { label: 'MUDA', value: 'Muda' },
  { label: 'JOVEM', value: 'Jovem' },
  { label: 'ADULTO', value: 'Adulto' },
  { label: 'LENDÁRIO', value: 'Guardião Lendário' },
];

export function FilterPanel({ filters, setFilters }: FilterPanelProps) {
  
  const toggleEcosystem = (val: EcosystemType) => {
    setFilters(prev => ({
      ...prev,
      ecosystem: prev.ecosystem.includes(val) 
        ? prev.ecosystem.filter(e => e !== val)
        : [...prev.ecosystem, val]
    }));
  };

  const toggleRarity = (val: RarityType) => {
    setFilters(prev => ({
      ...prev,
      rarity: prev.rarity.includes(val) 
        ? prev.rarity.filter(r => r !== val)
        : [...prev.rarity, val]
    }));
  };

  const togglePhase = (val: PhaseType) => {
    setFilters(prev => ({
      ...prev,
      phase: prev.phase.includes(val) 
        ? prev.phase.filter(p => p !== val)
        : [...prev.phase, val]
    }));
  };

  return (
    <aside className="w-55 panel-emboss rounded-xl border border-copper-700/50 p-4 hidden lg:flex flex-col gap-6 h-fit sticky top-24 shrink-0 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      
      <div>
        <h3 className="font-mono text-[10px] uppercase tracking-widest text-copper-400 mb-3 pb-2 border-b border-copper-900/50">
          Filtros Biológicos
        </h3>
        
        <div className="flex flex-col gap-2">
          <button 
            onClick={() => setFilters(prev => ({ ...prev, ecosystem: [] }))}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-[9px] uppercase tracking-widest transition-all ${
              filters.ecosystem.length === 0 ? 'bg-copper-900/40 text-copper-300 border border-copper-700/50' : 'text-slate-500 hover:bg-slate-800/50'
            }`}
          >
            <span>🌐</span> TODOS
          </button>
          
          {ECOSYSTEMS.map(eco => {
            const isActive = filters.ecosystem.includes(eco.value);
            return (
              <button 
                key={eco.value}
                onClick={() => toggleEcosystem(eco.value)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-[9px] uppercase tracking-widest transition-all ${
                  isActive 
                    ? `bg-${eco.color}/20 text-${eco.color} border border-${eco.color}/50 shadow-[0_0_10px_rgba(var(--tw-colors-${eco.color}-500),0.2)]` 
                    : 'text-slate-500 hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                <span>{eco.icon}</span> {eco.label}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <h3 className="font-mono text-[10px] uppercase tracking-widest text-copper-400 mb-3 pb-2 border-b border-copper-900/50">
          Raridade
        </h3>
        <div className="flex flex-wrap gap-2">
          {RARITIES.map(r => {
            const isActive = filters.rarity.includes(r.value);
            return (
              <button
                key={r.value}
                onClick={() => toggleRarity(r.value)}
                className={`px-2 py-1.5 rounded-md font-mono text-[8px] uppercase tracking-widest transition-all border ${
                  isActive 
                    ? 'panel-emboss border-copper-500 text-copper-200' 
                    : 'panel-deboss border-slate-800 text-slate-500'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${r.bg} ${isActive ? 'shadow-[0_0_8px_rgba(255,255,255,0.4)]' : 'opacity-50'}`} />
                  {r.label}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <h3 className="font-mono text-[10px] uppercase tracking-widest text-copper-400 mb-3 pb-2 border-b border-copper-900/50">
          Fase de Crescimento
        </h3>
        <div className="flex flex-col gap-1.5">
          {PHASES.map(p => {
             const isActive = filters.phase.includes(p.value);
             return (
               <button
                 key={p.value}
                 onClick={() => togglePhase(p.value)}
                 className={`text-left px-3 py-2 rounded-md font-mono text-[9px] uppercase tracking-widest transition-all ${
                   isActive ? 'bg-slate-800 text-copper-300' : 'text-slate-500 hover:text-slate-300'
                 }`}
               >
                 {p.label}
               </button>
             )
          })}
        </div>
      </div>

    </aside>
  );
}

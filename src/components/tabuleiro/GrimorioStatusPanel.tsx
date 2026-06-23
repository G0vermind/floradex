'use client';

import { GrimorioStatus } from '@/hooks/useTabuleiroData';
import { EcosystemGauge } from './EcosystemGauge';
import { motion } from 'framer-motion';

interface GrimorioStatusPanelProps {
  status: GrimorioStatus | null;
  selectedCardId: string | number | null;
}

export function GrimorioStatusPanel({ status, selectedCardId }: GrimorioStatusPanelProps) {
  if (!status) return null;

  const hoursSinceSync = Math.floor((Date.now() - status.lastOracleSync) / 3600000);
  const oracleColor = hoursSinceSync <= 6 ? '🟢' : hoursSinceSync <= 24 ? '🟡' : '🔴';

  return (
    <aside className="w-70 panel-emboss rounded-xl border border-copper-700/50 p-4 hidden lg:flex flex-col gap-6 h-fit sticky top-24 shrink-0 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      
      {/* HEADER */}
      <h3 className="font-mono text-[10px] uppercase tracking-widest text-copper-400 pb-2 border-b border-copper-900/50">
        Status do Grimório
      </h3>

      {/* MÉTRICAS (2x2 Grid) */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-widest text-copper-400">Biomassa Total</p>
          <p className="font-mono text-xl font-bold text-copper-200">
            {status.totalBiomassKg.toFixed(1)} <span className="text-[10px] text-slate-400">KG</span>
          </p>
        </div>
        <div>
          <p className="font-mono text-[9px] uppercase tracking-widest text-copper-400">Carbono Total</p>
          <p className="font-mono text-xl font-bold text-copper-200">
            {(status.totalCarbonG / 1000).toFixed(1)} <span className="text-[10px] text-slate-400">K G</span>
          </p>
        </div>
        <div>
          <p className="font-mono text-[9px] uppercase tracking-widest text-copper-400">ATK Total</p>
          <p className="font-mono text-xl font-bold text-copper-200">{status.totalAtk}</p>
        </div>
        <div>
          <p className="font-mono text-[9px] uppercase tracking-widest text-copper-400">DEF Total</p>
          <p className="font-mono text-xl font-bold text-copper-200">{status.totalDef}</p>
        </div>
      </div>

      {/* GAUGES DE BIODIVERSIDADE */}
      <div className="flex flex-col gap-2">
        <EcosystemGauge 
          label="Biodiversidade Geral" 
          count={status.biodiversityScore} 
          percentage={(status.biodiversityScore / status.maxSlots) * 100} 
          hasSynergy={false}
        />
        
        <div className="w-full h-px bg-slate-800 my-2" />

        {Object.entries(status.ecosystemSynergies)
          .sort((a, b) => b[1].count - a[1].count)
          .map(([eco, data]) => (
            <EcosystemGauge 
              key={eco}
              label={eco}
              count={data.count}
              percentage={data.percentage}
              hasSynergy={data.synergyBonus > 0}
            />
        ))}
      </div>

      {/* ORACLE INFO */}
      <div className="panel-deboss rounded-lg p-3 border border-slate-800 flex flex-col gap-2">
        <div>
          <p className="font-mono text-[8px] uppercase tracking-widest text-slate-500">Última Sincronização</p>
          <p className="font-mono text-[10px] text-slate-300">{hoursSinceSync}h atrás {oracleColor}</p>
        </div>
        <div>
          <p className="font-mono text-[8px] uppercase tracking-widest text-slate-500">Próxima Atualização</p>
          <p className="font-mono text-[10px] text-slate-300">~{24 - hoursSinceSync}h</p>
        </div>
        <button className="mt-2 w-full panel-emboss rounded border border-slate-700 py-1.5 font-mono text-[9px] uppercase tracking-widest text-copper-300 hover:border-copper-500 hover:text-copper-100 transition-colors">
          Renovar TTL
        </button>
      </div>

      {/* AÇÕES PRINCIPAIS */}
      <div className="flex flex-col gap-2 mt-auto">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!selectedCardId}
          className={`w-full copper-frame rounded-lg py-3 px-4 font-mono text-[11px] uppercase tracking-widest font-bold transition-colors ${
            selectedCardId 
              ? 'text-copper-100 hover:shadow-[0_0_15px_rgba(192,94,53,0.4)]' 
              : 'text-slate-500 opacity-50 cursor-not-allowed'
          }`}
        >
          Ativar Muda no Grimório
        </motion.button>
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!selectedCardId}
          className={`w-full panel-emboss rounded-lg py-3 px-4 font-mono text-[10px] uppercase tracking-widest transition-colors ${
            selectedCardId ? 'text-copper-300 border-copper-700/50 hover:border-copper-500' : 'text-slate-600 opacity-50 cursor-not-allowed border-slate-800'
          }`}
        >
          Forjar Guardião
        </motion.button>
      </div>

    </aside>
  );
}

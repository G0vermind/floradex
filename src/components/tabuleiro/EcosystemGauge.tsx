'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface EcosystemGaugeProps {
  label: string;
  count: number;
  percentage: number;
  hasSynergy: boolean;
}

export function EcosystemGauge({ label, count, percentage, hasSynergy }: EcosystemGaugeProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Anima de 0 até a porcentagem real ao montar
    const timeout = setTimeout(() => setWidth(percentage), 100);
    return () => clearTimeout(timeout);
  }, [percentage]);

  const colorClass = hasSynergy 
    ? 'from-amber-600 to-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.5)]' 
    : 'from-copper-700 to-copper-400';

  return (
    <div className="flex flex-col gap-1 mb-3">
      <div className="flex justify-between items-end">
        <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">{label}</span>
        <span className="font-mono text-[8px] uppercase text-slate-500">{count} guardiões</span>
      </div>
      
      <div className="w-full h-2 panel-deboss rounded-full overflow-hidden relative border border-slate-800">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`h-full rounded-full bg-linear-to-r ${colorClass}`}
        />
      </div>
      
      {hasSynergy && (
        <span className="font-mono text-[7px] text-amber-500 font-bold uppercase tracking-widest mt-0.5">
          ✦ Sinergia Ativa: +15% ATK
        </span>
      )}
    </div>
  );
}

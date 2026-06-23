'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Leaf, Zap } from 'lucide-react';
import { useTilt } from '@/hooks/useTilt';

interface DnftCardProps {
  name: string;
  imageSrc: string;
  biomass: number;
  multiplier: number;
  phase?: string;
  className?: string;
}

export function DnftCard({ name, imageSrc, biomass, multiplier, phase = "Mutação", className = '' }: DnftCardProps) {
  const { ref, onMouseMove, onMouseLeave, onMouseEnter } = useTilt(15);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      style={{
        transformStyle: "preserve-3d",
      }}
      className={`relative w-full aspect-2/3 rounded-2xl copper-frame p-3 group perspective-1000 ${className}`}
    >
      {/* Specular Light Reflection Sweep (Shimmer) */}
      <div className="absolute inset-0 z-50 pointer-events-none rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <motion.div
          initial={{ x: '-100%', y: '-100%' }}
          whileHover={{ x: '100%', y: '100%' }}
          transition={{ duration: 1.5, ease: "linear", repeat: Infinity, repeatDelay: 1 }}
          className="absolute inset-0 w-[200%] h-[200%] bg-linear-to-br from-transparent via-white/20 to-transparent rotate-45"
        />
      </div>

      {/* Decorative Hardware / Rivets */}
      <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-copper-900 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.3)]" />
      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-copper-900 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.3)]" />
      <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-copper-900 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.3)]" />
      <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-copper-900 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.3)]" />

      {/* The Central Art Container (Debossed) */}
      <div 
        style={{ transform: "translateZ(30px)" }}
        className="relative w-full h-[65%] rounded-t-xl overflow-hidden card-slot border border-slate-900/50"
      >
        <Image 
          src={imageSrc}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover scale-105 transition-transform duration-500 group-hover:scale-110"
        />
        {/* Holographic Glow overlay on hover */}
        <div className="absolute inset-0 bg-copper-500/0 group-hover:bg-copper-400/20 mix-blend-overlay transition-colors duration-500" />
        <div className="absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] pointer-events-none" />
      </div>

      {/* The Nameplate / Info Panel (Anodized Metal) */}
      <div 
        style={{ transform: "translateZ(20px)" }}
        className="relative w-full h-[35%] panel-deboss rounded-b-xl flex flex-col p-4 z-10"
      >
        {/* Top dividing etched line */}
        <div className="absolute top-0 left-4 right-4 h-px bg-slate-950 border-b border-copper-800/30" />

        {/* Title */}
        <h2 className="font-serif font-bold text-lg text-center mt-1 copper-text uppercase tracking-widest leading-tight">
          {name}
        </h2>
        <p className="text-[9px] font-sans text-center text-slate-500 uppercase tracking-widest mt-1">
          Fase: {phase}
        </p>

        {/* Stats Grid */}
        <div className="flex-1 flex items-end justify-between px-2 pb-1">
          <div className="flex flex-col items-center">
            <Leaf className="w-4 h-4 text-copper-500 mb-1 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]" />
            <span className="text-[10px] text-slate-500 font-sans uppercase">Biomassa</span>
            <span className="text-sm font-bold text-slate-200">{biomass.toFixed(1)}kg</span>
          </div>

          <div className="w-px h-8 bg-slate-950 border-r border-slate-800/50 self-end mb-1" />

          <div className="flex flex-col items-center">
            <Zap className="w-4 h-4 text-brass-400 mb-1 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]" />
            <span className="text-[10px] text-slate-500 font-sans uppercase">Multiplicador</span>
            <span className="text-sm font-bold text-brass-400">{multiplier.toFixed(1)}x</span>
          </div>
        </div>
      </div>

    </motion.div>
  );
}

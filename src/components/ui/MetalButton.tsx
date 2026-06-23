'use client';

import { motion } from 'framer-motion';
import { cardVariants } from '@/lib/variants';
import { Loader2 } from 'lucide-react';
import React from 'react';

interface MetalButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: React.ReactNode;
}

export function MetalButton({ isLoading, disabled, children, className = '', ...props }: MetalButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      variants={cardVariants}
      initial="rest"
      whileHover={isDisabled ? 'rest' : 'hover'}
      whileTap={isDisabled ? 'rest' : 'tap'}
      disabled={isDisabled}
      className={`
        relative overflow-hidden panel-emboss rounded flex items-center justify-center px-4 py-3
        font-mono text-xs uppercase tracking-widest font-bold transition-colors metal-focus
        ${isDisabled ? 'opacity-50 cursor-not-allowed border-slate-700' : 'text-copper-200 cursor-pointer hover:text-copper-100'}
        ${className}
      `}
      {...props as any}
    >
      {isLoading && (
        <Loader2 className="w-4 h-4 animate-spin text-copper-400 mr-2" />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}

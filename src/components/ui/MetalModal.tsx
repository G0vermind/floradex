'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { modalVariants } from '@/lib/variants';
import { X } from 'lucide-react';
import React, { useEffect } from 'react';

interface MetalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function MetalModal({ isOpen, onClose, title, children }: MetalModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
          />
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-md panel-emboss shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-6"
          >
            <div className="flex items-center justify-between border-b border-copper-800/30 pb-4 mb-4">
              <h2 className="font-serif text-xl font-bold text-copper-100">{title}</h2>
              <button 
                onClick={onClose}
                className="text-slate-500 hover:text-copper-400 p-1 panel-deboss rounded-md transition-colors metal-focus cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-slate-300 font-sans text-sm">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

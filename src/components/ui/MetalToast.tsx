'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';
import { easing } from '@/lib/animation';

type ToastType = 'info' | 'success' | 'warning' | 'error';

interface MetalToastProps {
  isVisible: boolean;
  type: ToastType;
  code: string;
  message: string;
  onClose: () => void;
  position?: 'top' | 'bottom';
}

export function MetalToast({ isVisible, type, code, message, onClose, position = 'top' }: MetalToastProps) {
  const styles = {
    info:    { border: 'border-copper-700', icon: <Info className="w-5 h-5 text-copper-400" />, text: 'text-copper-200' },
    success: { border: 'border-emerald-700', icon: <CheckCircle className="w-5 h-5 text-emerald-400" />, text: 'text-emerald-300' },
    warning: { border: 'border-brass-600', icon: <AlertTriangle className="w-5 h-5 text-brass-400" />, text: 'text-brass-300' },
    error:   { border: 'border-red-800', icon: <XCircle className="w-5 h-5 text-red-400" />, text: 'text-red-300' },
  };

  const style = styles[type];

  const posClasses = position === 'top' 
    ? 'top-[calc(5rem_+_env(safe-area-inset-top))] sm:top-20' 
    : 'bottom-[calc(6rem_+_env(safe-area-inset-bottom))] sm:bottom-4';

  const initialAnim = position === 'top' ? { y: -20, opacity: 0 } : { x: 40, opacity: 0 };
  const animateAnim = position === 'top' ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 };
  const exitAnim = position === 'top' ? { y: -20, opacity: 0 } : { x: 40, opacity: 0 };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={initialAnim}
          animate={{ ...animateAnim, transition: { duration: 0.3, ease: easing.surfaceReveal } }}
          exit={{ ...exitAnim, transition: { duration: 0.2, ease: easing.surfaceRetract } }}
          className={`fixed ${posClasses} left-4 right-4 sm:left-auto z-50 sm:w-full max-w-sm panel-emboss ${style.border} p-4 pr-10`}
        >
          <button 
            onClick={onClose}
            className="absolute top-2 right-2 text-slate-500 hover:text-slate-300 p-1 metal-focus rounded cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-start gap-3">
            <div className="mt-0.5 shrink-0">
              {style.icon}
            </div>
            <div className="flex flex-col">
              <span className={`font-mono text-[10px] uppercase tracking-widest font-bold ${style.text}`}>
                {code}
              </span>
              <span className="font-sans text-[11px] uppercase tracking-wider text-slate-400 mt-1 leading-snug">
                {message}
              </span>
            </div>
          </div>
          
          {/* Decorative Progress bar like line */}
          <div className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-copper-600 to-transparent w-full opacity-50" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

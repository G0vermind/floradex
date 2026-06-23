'use client';

import { Scan, BookOpen, Store, Sprout, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  { name: 'Scanner', href: '/scan', icon: Scan },
  { name: 'FloraDex', href: '/floradex', icon: BookOpen },
  { name: 'Loja', href: '/store', icon: Store },
  { name: 'Tabuleiro', href: '/board', icon: Sprout },
  { name: 'Missões', href: '/missions', icon: Target },
];

export function FloraDexBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-slate-900 border-t border-slate-700 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] z-50 px-1 sm:px-2 pb-safe">
      {/* Decorative top metallic line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-copper-600/50 to-transparent opacity-50" />
      
      <ul className="flex items-center justify-between h-full max-w-md mx-auto relative z-10">
        {TABS.map((tab) => {
          const isActive = pathname === tab.href || pathname.startsWith(`${tab.href}/`);
          const Icon = tab.icon;

          return (
            <li key={tab.name} className="flex-1 flex justify-center">
              <Link
                href={tab.href}
                className="flex flex-col items-center justify-center w-full h-full gap-1 group"
              >
                <motion.div
                  whileTap={{ scale: 0.9, y: 2 }}
                  initial={{ scale: 1 }}
                  animate={{ 
                    scale: isActive ? 1.05 : 1,
                    y: isActive ? -2 : 0
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  className={`p-2 rounded-xl transition-all duration-300 relative ${
                    isActive 
                      ? 'panel-emboss shadow-[0_0_15px_rgba(192,94,53,0.3)]' 
                      : 'panel-deboss group-hover:bg-slate-800'
                  }`}
                >
                  <Icon 
                    className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 ${
                      isActive ? 'text-copper-400 drop-shadow-[0_0_5px_rgba(217,119,54,0.8)]' : 'text-slate-500 group-hover:text-copper-600'
                    }`} 
                    strokeWidth={isActive ? 2.5 : 2} 
                  />
                  {/* Active glowing dot */}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-copper-400 shadow-[0_0_5px_rgba(217,119,54,0.8)]"
                    />
                  )}
                </motion.div>
                
                <span 
                  className={`text-[8px] sm:text-[9px] font-sans font-bold uppercase tracking-wider transition-colors duration-300 ${
                    isActive ? 'text-copper-400' : 'text-slate-600 group-hover:text-slate-400'
                  }`}
                >
                  {tab.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

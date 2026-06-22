'use client';

import { Scan, BookOpen, Store, Sprout } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  { name: 'Scanner', href: '/scan', icon: Scan },
  { name: 'FloraDex', href: '/floradex', icon: BookOpen },
  { name: 'Loja', href: '/store', icon: Store },
  { name: 'Tabuleiro', href: '/board', icon: Sprout },
];

export function FloraDexBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 bg-slate-900/90 backdrop-blur-xl border-t border-emerald-900/50 z-50 px-2 pb-safe">
      <ul className="flex items-center justify-around h-full max-w-md mx-auto">
        {TABS.map((tab) => {
          const isActive = pathname === tab.href || pathname.startsWith(`${tab.href}/`);
          const Icon = tab.icon;

          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                className="flex flex-col items-center justify-center w-full h-full gap-1"
              >
                <motion.div
                  whileTap={{ scale: 0.8 }}
                  initial={{ scale: 1 }}
                  animate={{ 
                    scale: isActive ? 1.15 : 1,
                    y: isActive ? -4 : 0
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  className={`p-2 rounded-xl transition-colors duration-300 ${
                    isActive 
                      ? 'bg-emerald-500/20 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                      : 'text-slate-400 hover:text-emerald-300/70'
                  }`}
                >
                  <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
                </motion.div>
                
                <span 
                  className={`text-[10px] font-medium transition-colors duration-300 ${
                    isActive ? 'text-emerald-400 drop-shadow-[0_0_2px_rgba(52,211,153,0.5)]' : 'text-slate-500'
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

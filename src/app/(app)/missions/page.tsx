'use client';

import { useState } from 'react';
import { Target, Hash, Share2, MessageCircle } from 'lucide-react';
import { MetalButton } from '@/components/ui/MetalButton';
import { MetalToast } from '@/components/ui/MetalToast';

export default function MissionsPage() {
  const [completedMissions, setCompletedMissions] = useState<number[]>([]);
  const [toast, setToast] = useState<{ isVisible: boolean; code: string; message: string }>({ isVisible: false, code: '', message: '' });

  const MISSIONS = [
    { id: 1, title: 'Siga no Twitter/X', reward: 50, icon: Hash },
    { id: 2, title: 'Compartilhe sua Árvore', reward: 100, icon: Share2 },
    { id: 3, title: 'Comunidade Discord', reward: 75, icon: MessageCircle },
  ];

  const handleCompleteMission = (id: number) => {
    if (completedMissions.includes(id)) return;
    setCompletedMissions(prev => [...prev, id]);
    
    const mission = MISSIONS.find(m => m.id === id);
    if (mission) {
      setToast({
        isVisible: true,
        code: 'TX_SUCCESS',
        message: `Recompensa de +${mission.reward} Lf reivindicada.`,
      });
      // Auto dismiss after 3s
      setTimeout(() => setToast(prev => ({ ...prev, isVisible: false })), 3000);
    }
  };

  return (
    <div className="flex flex-col min-h-full w-full relative pt-4 bg-slate-900 text-slate-200 pb-8">
      
      {/* Background radial glow */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 mix-blend-screen">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-96 h-96 bg-copper-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="mb-8 text-center relative z-10">
        <h1 className="text-2xl font-serif copper-text mb-1 tracking-widest uppercase text-[15px]">
          Impacto Social
        </h1>
        <p className="text-xs text-copper-400/80 font-sans uppercase tracking-widest font-bold">
          Missões e Recompensas
        </p>
      </div>

      <div className="flex-1 flex flex-col gap-4 px-4 pb-8 max-w-md mx-auto w-full relative z-10">
        {MISSIONS.map((mission) => {
          const isCompleted = completedMissions.includes(mission.id);
          const Icon = mission.icon;
          
          return (
            <div 
              key={mission.id}
              className={`w-full p-4 rounded-xl flex items-center justify-between ${
                isCompleted 
                  ? 'panel-deboss opacity-70' 
                  : 'panel-emboss group hover:border-copper-800'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg panel-deboss flex items-center justify-center shrink-0">
                  <Icon className={`w-5 h-5 ${isCompleted ? 'text-copper-600' : 'text-copper-400 group-hover:scale-110 transition-transform'}`} />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="font-sans font-bold text-sm text-slate-200">{mission.title}</span>
                  <span className="text-[10px] font-sans text-slate-500 uppercase tracking-widest">Recompensa: <span className="text-copper-400 font-bold">+{mission.reward} Lf</span></span>
                </div>
              </div>
              
              <MetalButton
                onClick={() => handleCompleteMission(mission.id)}
                disabled={isCompleted}
                className="px-6 py-2"
              >
                {isCompleted ? 'Feito' : 'Go'}
              </MetalButton>
            </div>
          );
        })}
      </div>

      <MetalToast 
        isVisible={toast.isVisible}
        type="success"
        code={toast.code}
        message={toast.message}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />
    </div>
  );
}

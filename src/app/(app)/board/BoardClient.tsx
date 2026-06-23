'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTabuleiroData, GuardianInstance, InventoryCard } from '@/hooks/useTabuleiroData';
import { FilterPanel, FilterState } from '@/components/tabuleiro/FilterPanel';
import { ModeToggle } from '@/components/tabuleiro/ModeToggle';
import { CardGrid } from '@/components/tabuleiro/CardGrid';
import { Pagination } from '@/components/tabuleiro/Pagination';
import { GrimorioStatusPanel } from '@/components/tabuleiro/GrimorioStatusPanel';
import { CardDetailDrawer } from '@/components/tabuleiro/CardDetailDrawer';
import { MetalSkeleton } from '@/components/ui/MetalSkeleton';
import { Database } from 'lucide-react';

interface BoardClientProps {
  ownerAddress: string;
}

export function BoardClient({ ownerAddress }: BoardClientProps) {
  const { inventory, guardians, grimorioStatus, isLoading, error } = useTabuleiroData(ownerAddress);

  const [activeMode, setActiveMode] = useState<'inventario' | 'grimorio'>('inventario');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCardId, setSelectedCardId] = useState<string | number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const [filters, setFilters] = useState<FilterState>({
    ecosystem: [],
    rarity: [],
    phase: []
  });

  // Filtragem (simplificada para o exemplo)
  const filteredInventory = inventory.filter(card => {
    if (filters.ecosystem.length > 0 && !filters.ecosystem.includes(card.ecosystem)) return false;
    if (filters.rarity.length > 0 && !filters.rarity.includes(card.rarity)) return false;
    return true;
  });

  const filteredGuardians = guardians.filter(guardian => {
    if (filters.ecosystem.length > 0 && !filters.ecosystem.includes(guardian.ecosystem)) return false;
    if (filters.rarity.length > 0 && !filters.rarity.includes(guardian.rarity)) return false;
    if (filters.phase.length > 0 && !filters.phase.includes(guardian.phase)) return false;
    return true;
  });

  const activeItemsCount = activeMode === 'inventario' ? filteredInventory.length : filteredGuardians.length;
  const itemsPerPage = 12;
  const totalPages = Math.ceil(activeItemsCount / itemsPerPage);

  const handleModeChange = (mode: 'inventario' | 'grimorio') => {
    setActiveMode(mode);
    setCurrentPage(1);
    setSelectedCardId(null);
  };

  const handleSelectCard = (id: string | number) => {
    setSelectedCardId(id);
    setIsDrawerOpen(true);
  };

  const selectedCard = activeMode === 'inventario' 
    ? inventory.find(c => c.speciesId === selectedCardId) || null
    : guardians.find(c => c.nftId === selectedCardId) || null;

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-slate-950">
        <h2 className="text-xl font-serif text-copper-300 mb-2">Falha na Sincronização On-Chain</h2>
        <p className="font-mono text-xs text-slate-500 uppercase tracking-widest">{error}</p>
        <button className="mt-6 copper-frame px-6 py-2 rounded-lg font-mono text-[10px] uppercase tracking-widest text-copper-100">
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col w-full relative overflow-hidden bg-slate-950 pb-8">
      
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-200 h-200 bg-copper-500/10 rounded-full blur-[150px]" />
      </div>

      {/* TCG 3-COLUMN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_280px] gap-6 p-4 md:p-8 w-full max-w-400 mx-auto relative z-10 h-full">
        
        {/* COLUNA ESQUERDA: FILTROS */}
        <FilterPanel filters={filters} setFilters={setFilters} />

        {/* COLUNA CENTRAL: GRID & CONTEÚDO */}
        <div className="flex flex-col flex-1 h-full min-h-150">
          
          <ModeToggle 
            mode={activeMode} 
            setMode={handleModeChange} 
            inventoryCount={inventory.length} 
            grimorioCount={guardians.length} 
          />

          <div className="w-full flex justify-between items-center mb-4 px-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-copper-400 font-bold">
              {activeItemsCount} ESPÉCIMES ENCONTRADOS
            </span>
            <select className="bg-transparent font-mono text-[9px] uppercase tracking-widest text-slate-400 outline-none border-none cursor-pointer text-right">
              <option>MAIS RECENTE</option>
              <option>RARIDADE ↓</option>
              <option>BIOMASSA ↓</option>
            </select>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-3/4 rounded-lg overflow-hidden">
                  <MetalSkeleton className="w-full h-full" />
                </div>
              ))}
            </div>
          ) : activeItemsCount === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 panel-deboss rounded-xl border border-slate-800">
               <Database className="w-12 h-12 text-slate-700 mb-4" />
               <h2 className="text-xl font-serif text-slate-300 mb-2">Compartimento Vazio</h2>
               <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest leading-relaxed max-w-sm">
                 Nenhuma espécie encontrada com os filtros atuais. Altere os parâmetros ou adquira novos dados botânicos.
               </p>
            </div>
          ) : (
            <div className="flex-1">
              <CardGrid 
                mode={activeMode}
                inventoryItems={filteredInventory}
                grimorioItems={filteredGuardians}
                selectedCardId={selectedCardId}
                onSelectCard={handleSelectCard}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
              />
            </div>
          )}

          {!isLoading && totalPages > 1 && (
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={setCurrentPage} 
            />
          )}

        </div>

        {/* COLUNA DIREITA: STATUS */}
        <GrimorioStatusPanel 
          status={grimorioStatus} 
          selectedCardId={selectedCardId}
        />

      </div>

      {/* DRAWER DE DETALHE DE CARTA */}
      <CardDetailDrawer 
        isOpen={isDrawerOpen}
        card={selectedCard}
        mode={activeMode}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}

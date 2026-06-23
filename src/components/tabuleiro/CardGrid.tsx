'use client';

import { GuardianInstance, InventoryCard } from '@/hooks/useTabuleiroData';
import { InventoryCardItem } from './InventoryCardItem';
import { GrimorioCardItem } from './GrimorioCardItem';
import { motion, AnimatePresence } from 'framer-motion';

interface CardGridProps {
  mode: 'inventario' | 'grimorio';
  inventoryItems: InventoryCard[];
  grimorioItems: GuardianInstance[];
  selectedCardId: string | number | null;
  onSelectCard: (id: string | number) => void;
  currentPage: number;
  itemsPerPage: number;
}

export function CardGrid({ 
  mode, 
  inventoryItems, 
  grimorioItems, 
  selectedCardId, 
  onSelectCard,
  currentPage,
  itemsPerPage 
}: CardGridProps) {

  const items = mode === 'inventario' ? inventoryItems : grimorioItems;
  
  // Paginação Local
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${mode}-${currentPage}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4"
        >
          {paginatedItems.map((item) => {
            const id = mode === 'inventario' 
              ? (item as InventoryCard).speciesId 
              : (item as GuardianInstance).nftId;

            return mode === 'inventario' ? (
              <InventoryCardItem
                key={id}
                card={item as InventoryCard}
                isSelected={selectedCardId === id}
                onClick={() => onSelectCard(id)}
              />
            ) : (
              <GrimorioCardItem
                key={id}
                guardian={item as GuardianInstance}
                isSelected={selectedCardId === id}
                onClick={() => onSelectCard(id)}
              />
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

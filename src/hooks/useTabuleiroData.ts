import { useState, useEffect } from 'react';
import { calculateGrimorioStatus } from '@/lib/grimorioCalculations';

// Tipos extraídos da arquitetura Soroban (Smart Contracts)
export type RarityType = 0 | 1 | 2 | 3; // 0=Common, 1=Uncommon, 2=Rare, 3=Legendary
export type TierType = 0 | 1 | 2 | 3; // 0=Muda, 1=Jovem, 2=Adulto, 3=Lendário
export type EcosystemType = 'Cerrado' | 'Amazônia' | 'Mata Atlântica' | 'Caatinga' | 'Pantanal';
export type PhaseType = 'Muda' | 'Jovem' | 'Adulto' | 'Guardião Lendário';
export type ElementType = 'Terra' | 'Ar' | 'Fogo' | 'Água';

export interface InventoryCard {
  speciesId: number;
  name: string;
  rarity: RarityType;
  baseBiomassKg: number;
  baseCarbonG: number;
  ecosystem: EcosystemType;
  quantity: number;
  imageUrl: string;
  maxSupply: number | null;
}

export interface GuardianInstance {
  nftId: string;
  owner: string;
  speciesId: number;
  speciesName: string;
  tier: TierType;
  phase: PhaseType;
  biomassKg: number;
  carbonG: number;
  rarity: RarityType;
  ecosystem: EcosystemType;
  mintedAt: number;
  lastOracleUpdate: number;
  transferLockedUntil: number;
  deckSlot: number | null;
  imageUrl: string;
  atk: number;
  def: number;
  hp: number;
  element: ElementType;
}

export interface GrimorioStatus {
  totalBiomassKg: number;
  totalCarbonG: number;
  totalAtk: number;
  totalDef: number;
  biodiversityScore: number;
  ecosystemSynergies: {
    [ecosystem: string]: {
      count: number;
      percentage: number;
      synergyBonus: number;
    }
  };
  activeGuardians: number;
  maxSlots: number;
  lastOracleSync: number;
}

// DADOS MOCKADOS TEMPORÁRIOS PARA O FRONTEND
const MOCK_INVENTORY: InventoryCard[] = [
  { speciesId: 1, name: 'Mogno Africano', rarity: 2, baseBiomassKg: 0.5, baseCarbonG: 220, ecosystem: 'Cerrado', quantity: 3, imageUrl: '🌳', maxSupply: null },
  { speciesId: 2, name: 'Jacarandá', rarity: 3, baseBiomassKg: 0.8, baseCarbonG: 300, ecosystem: 'Mata Atlântica', quantity: 1, imageUrl: '🍃', maxSupply: 5000 },
  { speciesId: 3, name: 'Ipê Amarelo', rarity: 1, baseBiomassKg: 0.3, baseCarbonG: 150, ecosystem: 'Cerrado', quantity: 5, imageUrl: '🌲', maxSupply: null },
  { speciesId: 4, name: 'Seringueira', rarity: 2, baseBiomassKg: 0.6, baseCarbonG: 280, ecosystem: 'Amazônia', quantity: 2, imageUrl: '🌿', maxSupply: null },
  { speciesId: 5, name: 'Mandacaru', rarity: 1, baseBiomassKg: 0.2, baseCarbonG: 100, ecosystem: 'Caatinga', quantity: 10, imageUrl: '🌵', maxSupply: null },
  { speciesId: 6, name: 'Vitória Régia', rarity: 2, baseBiomassKg: 0.4, baseCarbonG: 180, ecosystem: 'Amazônia', quantity: 4, imageUrl: '🌸', maxSupply: null },
  { speciesId: 7, name: 'Pau-Brasil', rarity: 3, baseBiomassKg: 0.9, baseCarbonG: 400, ecosystem: 'Mata Atlântica', quantity: 2, imageUrl: '🌳', maxSupply: 1000 },
];

const MOCK_GUARDIANS: GuardianInstance[] = [
  {
    nftId: '0x00A3F7', owner: 'GUTO', speciesId: 1, speciesName: 'Mogno Africano', tier: 2, phase: 'Adulto', 
    biomassKg: 18.3, carbonG: 2100, rarity: 2, ecosystem: 'Cerrado', mintedAt: Date.now() - 30 * 86400000, 
    lastOracleUpdate: Date.now() - 2 * 3600000, transferLockedUntil: Date.now() + 60 * 86400000, deckSlot: 1, 
    imageUrl: '🌳', atk: 35, def: 28, hp: 120, element: 'Terra'
  },
  {
    nftId: '0x00B2A1', owner: 'GUTO', speciesId: 2, speciesName: 'Jacarandá Místico', tier: 3, phase: 'Guardião Lendário', 
    biomassKg: 45.2, carbonG: 5300, rarity: 3, ecosystem: 'Mata Atlântica', mintedAt: Date.now() - 120 * 86400000, 
    lastOracleUpdate: Date.now() - 25 * 3600000, transferLockedUntil: Date.now() - 1 * 86400000, deckSlot: 2, 
    imageUrl: '🍃', atk: 85, def: 60, hp: 300, element: 'Ar'
  },
  {
    nftId: '0x00C4D9', owner: 'GUTO', speciesId: 3, speciesName: 'Ipê Amarelo', tier: 1, phase: 'Jovem', 
    biomassKg: 4.1, carbonG: 450, rarity: 1, ecosystem: 'Cerrado', mintedAt: Date.now() - 5 * 86400000, 
    lastOracleUpdate: Date.now() - 10 * 3600000, transferLockedUntil: Date.now() + 85 * 86400000, deckSlot: 3, 
    imageUrl: '🌲', atk: 12, def: 8, hp: 50, element: 'Fogo'
  },
];

export function useTabuleiroData(ownerAddress: string) {
  const [inventory, setInventory] = useState<InventoryCard[]>([]);
  const [guardians, setGuardians] = useState<GuardianInstance[]>([]);
  const [grimorioStatus, setGrimorioStatus] = useState<GrimorioStatus | null>(null);
  const [oracleReport, setOracleReport] = useState<any>(null);
  const [guardianProfile, setGuardianProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOnChainData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Simulação de chamada aos Contratos Soroban
      await new Promise(resolve => setTimeout(resolve, 1500)); // Delay artificial de rede
      
      setInventory(MOCK_INVENTORY);
      setGuardians(MOCK_GUARDIANS);
      
      const status = calculateGrimorioStatus(MOCK_GUARDIANS);
      setGrimorioStatus(status);
      
      setOracleReport({ lastUpdate: Date.now() - 2 * 3600000, nextUpdate: Date.now() + 22 * 3600000 });
      setGuardianProfile({ xp: 4500, level: 12, era: 'Semente de Mudança' });
      
    } catch (err: any) {
      setError(err.message || 'CONTRACT_READ_FAILED');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (ownerAddress) fetchOnChainData();
  }, [ownerAddress]);

  return {
    inventory,
    guardians,
    grimorioStatus,
    oracleReport,
    guardianProfile,
    isLoading,
    error,
    refetch: fetchOnChainData,
  };
}

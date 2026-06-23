import { GuardianInstance, GrimorioStatus } from '@/hooks/useTabuleiroData';

export function calculateGrimorioStatus(guardians: GuardianInstance[]): GrimorioStatus {
  let totalBiomassKg = 0;
  let totalCarbonG = 0;
  let totalAtk = 0;
  let totalDef = 0;
  let latestOracleSync = 0;
  
  const uniqueSpecies = new Set<number>();
  const ecosystemCounts: Record<string, number> = {};

  guardians.forEach((guardian) => {
    totalBiomassKg += guardian.biomassKg;
    totalCarbonG += guardian.carbonG;
    totalAtk += guardian.atk;
    totalDef += guardian.def;
    
    uniqueSpecies.add(guardian.speciesId);
    
    ecosystemCounts[guardian.ecosystem] = (ecosystemCounts[guardian.ecosystem] || 0) + 1;
    
    if (guardian.lastOracleUpdate > latestOracleSync) {
      latestOracleSync = guardian.lastOracleUpdate;
    }
  });

  const activeGuardians = guardians.length;
  
  const ecosystemSynergies: GrimorioStatus['ecosystemSynergies'] = {};
  
  for (const [eco, count] of Object.entries(ecosystemCounts)) {
    ecosystemSynergies[eco] = {
      count,
      percentage: activeGuardians > 0 ? (count / activeGuardians) * 100 : 0,
      synergyBonus: count >= 3 ? 15 : 0 // Exemplo: 15% de bônus se tiver 3 ou mais do mesmo ecossistema
    };
  }

  return {
    totalBiomassKg,
    totalCarbonG,
    totalAtk,
    totalDef,
    biodiversityScore: uniqueSpecies.size,
    ecosystemSynergies,
    activeGuardians,
    maxSlots: 12, // Tamanho padrão do grimório
    lastOracleSync: latestOracleSync || Date.now(),
  };
}

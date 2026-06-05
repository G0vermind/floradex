// ─────────────────────────────────────────
// SISTEMA DE CONQUISTAS / TROFÉUS
// Graduação baseada em valor real de gemas
// ─────────────────────────────────────────

export const TIER_NAMES = [
  'Nenhum',       // 0
  'Bronze',       // 1
  'Prata',        // 2
  'Ouro',         // 3
  'Topázio',      // 4
  'Ametista',     // 5
  'Safira',       // 6
  'Esmeralda',    // 7
  'Rubi',         // 8
  'Alexandrita',  // 9
  'Diamante',     // 10
] as const

export type TierName = (typeof TIER_NAMES)[number]
export type TierLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export interface TierColors {
  primary: string
  secondary: string
  glow: string
  bg: string
}

export const TIER_COLORS: Record<number, TierColors> = {
  0:  { primary: '#5C5C5C', secondary: '#3A3A3A', glow: 'rgba(92,92,92,0.2)',   bg: 'rgba(92,92,92,0.08)' },
  1:  { primary: '#CD7F32', secondary: '#A0522D', glow: 'rgba(205,127,50,0.3)', bg: 'rgba(205,127,50,0.08)' },
  2:  { primary: '#C0C0C0', secondary: '#808080', glow: 'rgba(192,192,192,0.3)', bg: 'rgba(192,192,192,0.08)' },
  3:  { primary: '#FFD700', secondary: '#DAA520', glow: 'rgba(255,215,0,0.4)',   bg: 'rgba(255,215,0,0.08)' },
  4:  { primary: '#FFC87C', secondary: '#FF8C00', glow: 'rgba(255,200,124,0.35)', bg: 'rgba(255,200,124,0.08)' },
  5:  { primary: '#9966CC', secondary: '#7B2D8E', glow: 'rgba(153,102,204,0.4)', bg: 'rgba(153,102,204,0.08)' },
  6:  { primary: '#0F52BA', secondary: '#082567', glow: 'rgba(15,82,186,0.4)',   bg: 'rgba(15,82,186,0.08)' },
  7:  { primary: '#50C878', secondary: '#006B3C', glow: 'rgba(80,200,120,0.4)',  bg: 'rgba(80,200,120,0.08)' },
  8:  { primary: '#E0115F', secondary: '#9B111E', glow: 'rgba(224,17,95,0.4)',   bg: 'rgba(224,17,95,0.08)' },
  9:  { primary: '#008B8B', secondary: '#7B3F61', glow: 'rgba(0,139,139,0.4)',   bg: 'rgba(0,139,139,0.08)' },
  10: { primary: '#B9F2FF', secondary: '#E8E8FF', glow: 'rgba(185,242,255,0.5)', bg: 'rgba(185,242,255,0.1)' },
}

export type AchievementCategory = 'VISITA' | 'SOCIAL' | 'COLETA' | 'ESPECIAL'

export interface AchievementSeed {
  slug: string
  name: string
  description: string
  icon: string
  category: AchievementCategory
  tierThresholds: number[]
}

export const DEFAULT_ACHIEVEMENTS: AchievementSeed[] = [
  {
    slug: 'ajudante-natureza',
    name: 'Ajudante da Natureza',
    description: 'Visite viveiros e parceiros ecológicos',
    icon: '🌱',
    category: 'VISITA',
    tierThresholds: [1, 5, 20, 50, 100, 200, 350, 500, 750, 1000],
  },
  {
    slug: 'explorador',
    name: 'Explorador',
    description: 'Visite parceiros diferentes',
    icon: '🧭',
    category: 'VISITA',
    tierThresholds: [1, 3, 5, 10, 20, 35, 50, 75, 100, 150],
  },
  {
    slug: 'colecionador',
    name: 'Colecionador de Carimbos',
    description: 'Acumule carimbos no seu passaporte',
    icon: '📮',
    category: 'COLETA',
    tierThresholds: [1, 10, 25, 50, 100, 200, 400, 600, 800, 1000],
  },
  {
    slug: 'frequentador',
    name: 'Frequentador Fiel',
    description: 'Retorne ao mesmo parceiro várias vezes',
    icon: '🔄',
    category: 'VISITA',
    tierThresholds: [2, 5, 10, 25, 50, 100, 150, 250, 400, 500],
  },
  {
    slug: 'madrugador',
    name: 'Madrugador Verde',
    description: 'Escaneie antes das 8h da manhã',
    icon: '🌅',
    category: 'ESPECIAL',
    tierThresholds: [1, 3, 7, 15, 30, 50, 80, 120, 200, 365],
  },
  {
    slug: 'social-floresta',
    name: 'Guardião da Floresta Social',
    description: 'Contribua para projetos sociais',
    icon: '🌳',
    category: 'SOCIAL',
    tierThresholds: [1, 3, 5, 10, 20, 30, 50, 75, 100, 150],
  },
  {
    slug: 'primeiro-passo',
    name: 'Primeiro Passo',
    description: 'Complete seu primeiro scan',
    icon: '👣',
    category: 'ESPECIAL',
    tierThresholds: [1, 2, 3, 5, 7, 10, 15, 20, 30, 50],
  },
  {
    slug: 'cafe-lover',
    name: 'Amante do Café',
    description: 'Visite cafeterias parceiras',
    icon: '☕',
    category: 'VISITA',
    tierThresholds: [1, 3, 10, 20, 40, 70, 100, 150, 250, 400],
  },
]

export interface MissionSeed {
  title: string
  description: string
  icon: string
  type: 'DAILY' | 'WEEKLY' | 'SPECIAL'
  requirementAction: string
  requirementCount: number
  rewardLeafs: number
  rewardAchievementSlug?: string
}

export const DEFAULT_MISSIONS: MissionSeed[] = [
  {
    title: 'Primeira Visita do Dia',
    description: 'Escaneie pelo menos 1 parceiro hoje',
    icon: '📍',
    type: 'DAILY',
    requirementAction: 'scan',
    requirementCount: 1,
    rewardLeafs: 5,
    rewardAchievementSlug: 'ajudante-natureza',
  },
  {
    title: 'Explorador Semanal',
    description: 'Visite 3 parceiros diferentes esta semana',
    icon: '🗺️',
    type: 'WEEKLY',
    requirementAction: 'visit_unique',
    requirementCount: 3,
    rewardLeafs: 25,
    rewardAchievementSlug: 'explorador',
  },
  {
    title: 'Turista Verde',
    description: 'Acumule 5 carimbos esta semana',
    icon: '🏷️',
    type: 'WEEKLY',
    requirementAction: 'scan',
    requirementCount: 5,
    rewardLeafs: 40,
    rewardAchievementSlug: 'colecionador',
  },
  {
    title: 'Madrugada Sustentável',
    description: 'Escaneie um parceiro antes das 8h',
    icon: '🌄',
    type: 'DAILY',
    requirementAction: 'scan_early',
    requirementCount: 1,
    rewardLeafs: 15,
    rewardAchievementSlug: 'madrugador',
  },
]

/**
 * Calculate the tier (0–10) for a given progress value against thresholds
 */
export function calculateTier(progress: number, thresholdsJson: string): TierLevel {
  const thresholds: number[] = JSON.parse(thresholdsJson)
  let tier = 0
  for (let i = 0; i < thresholds.length; i++) {
    if (progress >= thresholds[i]) {
      tier = i + 1
    } else {
      break
    }
  }
  return Math.min(tier, 10) as TierLevel
}

/**
 * Get progress percentage towards the next tier
 */
export function getNextTierProgress(progress: number, thresholdsJson: string): { percent: number; nextThreshold: number | null; currentThreshold: number } {
  const thresholds: number[] = JSON.parse(thresholdsJson)
  const currentTier = calculateTier(progress, thresholdsJson)
  
  if (currentTier >= 10) {
    return { percent: 100, nextThreshold: null, currentThreshold: thresholds[9] }
  }

  const currentThreshold = currentTier > 0 ? thresholds[currentTier - 1] : 0
  const nextThreshold = thresholds[currentTier]
  const range = nextThreshold - currentThreshold
  const achieved = progress - currentThreshold
  
  return {
    percent: range > 0 ? Math.min(100, Math.round((achieved / range) * 100)) : 0,
    nextThreshold,
    currentThreshold,
  }
}

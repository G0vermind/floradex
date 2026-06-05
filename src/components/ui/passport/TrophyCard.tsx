'use client'

import { motion } from 'framer-motion'
import GemBadge from './GemBadge'

export interface TrophyData {
  id: string
  name: string
  description: string
  tier?: number // added tier to match achievement logic
  tierName: string
  tierColor: string
  targetCount: number
  isUnlocked: boolean
  unlockedAt?: string | null
  currentProgress?: number
}

interface TrophyCardProps {
  trophy: TrophyData
  index: number
}

export default function TrophyCard({ trophy, index }: TrophyCardProps) {
  const isLocked = !trophy.isUnlocked
  const progress = trophy.currentProgress ?? 0
  const percentage = Math.min(100, Math.round((progress / trophy.targetCount) * 100))
  
  // Use the specific tier color for a rich background, but subtle
  const glowColor = isLocked ? 'rgba(255,255,255,0.05)' : trophy.tierColor
  const tierLevel = trophy.tier ?? 0

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      style={{
        background: `linear-gradient(145deg, rgba(25,35,30,0.9) 0%, rgba(15,25,20,0.95) 100%)`,
        borderRadius: '12px',
        padding: '1rem',
        border: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: isLocked ? 'none' : `inset 0 0 20px ${glowColor}15, 0 4px 12px rgba(0,0,0,0.2)`
      }}
    >
      {/* Subtle background glow based on tier */}
      {!isLocked && (
        <div 
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: `radial-gradient(circle at 10% 50%, ${glowColor}15 0%, transparent 60%)`,
            pointerEvents: 'none'
          }}
        />
      )}

      {/* Gem Badge */}
      <div style={{ filter: isLocked ? 'grayscale(100%) opacity(0.5)' : 'none', zIndex: 1 }}>
        <GemBadge tier={tierLevel as any} size="md" />
      </div>

      <div style={{ flex: 1, zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
          <h3 
            style={{ 
              color: isLocked ? 'rgba(245,240,232,0.5)' : 'var(--leaf-cream)', 
              fontSize: '14px', 
              fontWeight: 600,
              fontFamily: 'var(--font-sans)',
              textShadow: isLocked ? 'none' : `0 0 10px ${glowColor}40`
            }}
          >
            {trophy.name}
          </h3>
          <span 
            style={{ 
              fontSize: '10px', 
              color: isLocked ? 'rgba(245,240,232,0.4)' : trophy.tierColor,
              fontWeight: 700,
              fontFamily: 'var(--font-sans)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              background: isLocked ? 'rgba(255,255,255,0.05)' : `${glowColor}15`,
              padding: '2px 6px',
              borderRadius: '4px',
              border: `1px solid ${isLocked ? 'transparent' : glowColor}30`
            }}
          >
            {trophy.tierName}
          </span>
        </div>
        
        <p style={{ color: 'rgba(245,240,232,0.6)', fontSize: '11px', lineHeight: 1.4, marginBottom: '8px', fontFamily: 'var(--font-sans)' }}>
          {trophy.description}
        </p>

        {/* Progress Bar */}
        {!isLocked ? (
          <div style={{ fontSize: '10px', color: trophy.tierColor, fontWeight: 600, fontFamily: 'var(--font-sans)' }}>
            ✓ DESBLOQUEADO
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'rgba(245,240,232,0.4)', marginBottom: '4px', fontFamily: 'var(--font-sans)' }}>
              <span>PROGRESSO</span>
              <span>{progress} / {trophy.targetCount}</span>
            </div>
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  background: 'rgba(245,240,232,0.3)',
                  borderRadius: '2px',
                }}
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

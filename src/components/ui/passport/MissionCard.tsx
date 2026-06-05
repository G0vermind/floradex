'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export interface MissionData {
  id: string
  title: string
  description: string
  leafReward?: number
  rewardLeafs?: number // some parts use rewardLeafs
  progress: number
  target: number
  isCompleted: boolean
  claimedAt?: string | null
}

interface MissionCardProps {
  mission: MissionData
  index: number
  onClaim?: (missionId: string) => void
}

export default function MissionCard({ mission, index, onClaim }: MissionCardProps) {
  const [claiming, setClaiming] = useState(false)
  const percentage = Math.min(100, Math.round((mission.progress / mission.target) * 100))
  const canClaim = mission.isCompleted && !mission.claimedAt
  const isClaimed = !!mission.claimedAt
  const reward = mission.leafReward || mission.rewardLeafs || 0

  const handleClaim = async () => {
    if (onClaim) {
      setClaiming(true)
      await onClaim(mission.id)
      setClaiming(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      style={{
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '12px',
        padding: '1rem',
        border: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-sans)', color: 'var(--leaf-cream)', fontSize: '14px', fontWeight: 600, marginBottom: '2px' }}>
            {mission.title}
          </h3>
          <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(245,240,232,0.6)', fontSize: '12px', lineHeight: 1.4 }}>
            {mission.description}
          </p>
        </div>
        <div
          style={{
            background: 'rgba(201,168,76,0.1)',
            color: 'var(--leaf-gold-light)',
            padding: '4px 8px',
            borderRadius: '16px',
            fontSize: '11px',
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            whiteSpace: 'nowrap',
          }}
        >
          +{reward} 🍃
        </div>
      </div>

      {/* Progress or Claim Button */}
      {isClaimed ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--leaf-gold)', fontSize: '12px', fontFamily: 'var(--font-sans)', fontWeight: 600, marginTop: '0.25rem' }}>
          <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'rgba(201,168,76,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          RECOMPENSA RESGATADA
        </div>
      ) : canClaim ? (
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleClaim}
          disabled={claiming}
          className="animate-pulse-gold"
          style={{
            background: 'linear-gradient(135deg, var(--leaf-gold), var(--leaf-gold-light))',
            color: 'var(--leaf-ink)',
            border: 'none',
            borderRadius: '8px',
            padding: '8px',
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: '12px',
            cursor: claiming ? 'wait' : 'pointer',
            opacity: claiming ? 0.6 : 1,
            marginTop: '0.25rem',
            width: '100%'
          }}
        >
          {claiming ? '⏳ PROCESSANDO...' : 'RESGATAR RECOMPENSA'}
        </motion.button>
      ) : (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'rgba(245,240,232,0.5)', marginBottom: '4px', fontFamily: 'var(--font-sans)' }}>
            <span>PROGRESSO</span>
            <span>{mission.progress} / {mission.target}</span>
          </div>
          <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, var(--leaf-gold-dark, #A68636), var(--leaf-gold))',
                borderRadius: '3px',
              }}
            />
          </div>
        </div>
      )}
    </motion.div>
  )
}

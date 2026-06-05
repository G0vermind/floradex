'use client'

import { motion } from 'framer-motion'

export type PassportSection = 'stamps' | 'trophies' | 'missions' | 'profile'

interface PassportTabsProps {
  active: PassportSection
  onChange: (section: PassportSection) => void
  trophyCount?: number
  missionCount?: number
}

const TABS: { key: PassportSection; icon: string; label: string }[] = [
  { key: 'stamps', icon: '📜', label: 'CARIMBOS' },
  { key: 'trophies', icon: '🏆', label: 'TROFÉUS' },
  { key: 'missions', icon: '🎯', label: 'MISSÕES' },
  { key: 'profile', icon: '👤', label: 'PERFIL' },
]

export default function PassportTabs({ active, onChange, trophyCount, missionCount }: PassportTabsProps) {
  return (
    <div style={{ display: 'flex', gap: '0.25rem', padding: '0.25rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
      {TABS.map((tab) => {
        const isActive = active === tab.key
        const badgeCount = tab.key === 'trophies' ? trophyCount : tab.key === 'missions' ? missionCount : undefined
        return (
          <motion.button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.2rem',
              padding: '0.5rem 0.25rem',
              background: isActive ? 'rgba(201,168,76,0.12)' : 'transparent',
              border: 'none',
              borderBottom: isActive ? '2px solid var(--leaf-gold)' : '2px solid transparent',
              cursor: 'pointer',
              flex: 1,
              position: 'relative',
              transition: 'background 0.2s',
            }}
          >
            <span style={{ fontSize: '1.1rem', lineHeight: 1 }}>{tab.icon}</span>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '10px',
                letterSpacing: '0.143px',
                color: isActive ? 'var(--leaf-gold-light)' : 'rgba(245,240,232,0.45)',
                fontWeight: isActive ? 700 : 500,
                textTransform: 'uppercase',
                transition: 'color 0.2s',
              }}
            >
              {tab.label}
            </span>

            {/* Badge for counts */}
            {badgeCount !== undefined && badgeCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{
                  position: 'absolute',
                  top: '2px',
                  right: '12%',
                  background: tab.key === 'missions' ? '#E0115F' : 'var(--leaf-gold)',
                  color: tab.key === 'missions' ? '#fff' : 'var(--leaf-ink)',
                  fontSize: '9px',
                  fontWeight: 700,
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-sans)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {badgeCount}
              </motion.span>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}

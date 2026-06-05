'use client'

import { TIER_COLORS, TIER_NAMES, type TierLevel } from '@/lib/achievements'

interface GemBadgeProps {
  tier: TierLevel
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

const SIZES = { sm: 28, md: 48, lg: 80 }

export default function GemBadge({ tier, size = 'md', showLabel = false, className = '' }: GemBadgeProps) {
  const s = SIZES[size]
  const colors = TIER_COLORS[tier] ?? TIER_COLORS[0]
  const name = TIER_NAMES[tier]

  if (tier === 0) {
    return (
      <div className={className} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <svg width={s} height={s} viewBox="0 0 64 64" aria-label="Sem tier">
          <circle cx="32" cy="32" r="28" fill="rgba(92,92,92,0.15)" stroke="#5C5C5C" strokeWidth="2" strokeDasharray="4,4" />
          <text x="32" y="37" textAnchor="middle" fontSize="18" fill="#5C5C5C">?</text>
        </svg>
        {showLabel && <span style={{ fontSize: size === 'sm' ? '0.55rem' : '0.7rem', color: '#5C5C5C', fontWeight: 600 }}>{name}</span>}
      </div>
    )
  }

  return (
    <div className={`gem-badge ${className}`} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div
        className={tier >= 9 ? 'gem-shimmer' : tier >= 6 ? 'gem-glow' : ''}
        style={{
          position: 'relative',
          filter: tier >= 8 ? `drop-shadow(0 0 ${size === 'lg' ? 8 : 4}px ${colors.glow})` : undefined,
        }}
      >
        <svg width={s} height={s} viewBox="0 0 64 64" aria-label={`Tier ${name}`}>
          <defs>
            {/* Gem gradient */}
            <linearGradient id={`gem-grad-${tier}-${s}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={colors.primary} />
              <stop offset="45%" stopColor={colors.secondary} />
              <stop offset="100%" stopColor={colors.primary} />
            </linearGradient>
            {/* Diamond iridescent gradient */}
            {tier === 10 && (
              <linearGradient id={`gem-iris-${s}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#B9F2FF" />
                <stop offset="25%" stopColor="#E8DAEF" />
                <stop offset="50%" stopColor="#ABEBC6" />
                <stop offset="75%" stopColor="#F9E79F" />
                <stop offset="100%" stopColor="#FADBD8" />
              </linearGradient>
            )}
            {/* Metallic sheen for gold+ */}
            {tier >= 3 && (
              <radialGradient id={`gem-sheen-${tier}-${s}`} cx="35%" cy="35%" r="50%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </radialGradient>
            )}
          </defs>

          {/* Outer glow ring */}
          <circle
            cx="32" cy="32" r="30"
            fill="none"
            stroke={colors.primary}
            strokeWidth="1"
            opacity={0.3}
          />

          {/* Main gem shape — hexagonal/diamond cut */}
          <polygon
            points="32,4 56,20 56,44 32,60 8,44 8,20"
            fill={tier === 10 ? `url(#gem-iris-${s})` : `url(#gem-grad-${tier}-${s})`}
            stroke={colors.primary}
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Inner facets */}
          <polygon
            points="32,12 48,24 48,40 32,52 16,40 16,24"
            fill="none"
            stroke={colors.primary}
            strokeWidth="1"
            opacity={0.4}
          />

          {/* Center facet lines */}
          <line x1="32" y1="12" x2="32" y2="52" stroke={colors.primary} strokeWidth="0.5" opacity={0.3} />
          <line x1="16" y1="24" x2="48" y2="40" stroke={colors.primary} strokeWidth="0.5" opacity={0.3} />
          <line x1="48" y1="24" x2="16" y2="40" stroke={colors.primary} strokeWidth="0.5" opacity={0.3} />

          {/* Metallic sheen overlay */}
          {tier >= 3 && (
            <polygon
              points="32,4 56,20 56,44 32,60 8,44 8,20"
              fill={`url(#gem-sheen-${tier}-${s})`}
            />
          )}

          {/* Tier number */}
          <text
            x="32" y="37"
            textAnchor="middle"
            fontSize={s >= 48 ? '16' : '12'}
            fontWeight="800"
            fill={tier >= 6 ? '#FFFFFF' : tier >= 3 ? '#2C1810' : '#FFFFFF'}
            style={{ textShadow: tier >= 6 ? '0 1px 3px rgba(0,0,0,0.5)' : 'none' }}
          >
            {tier}
          </text>
        </svg>
      </div>
      {showLabel && (
        <span
          style={{
            fontSize: size === 'sm' ? '0.55rem' : size === 'md' ? '0.65rem' : '0.8rem',
            color: colors.primary,
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {name}
        </span>
      )}
    </div>
  )
}

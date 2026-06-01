'use client'

export type PartnerCategory =
  | 'ESCOLA'
  | 'HOTEL'
  | 'CAFE'
  | 'COMERCIO'
  | 'ONG'
  | 'OUTRO'

interface StampColors {
  ring: string
  fill: string
  text: string
}

const STAMP_COLORS: Record<PartnerCategory, StampColors> = {
  ESCOLA:   { ring: '#3B4F8C', fill: '#EEF0F8', text: '#3B4F8C' },
  HOTEL:    { ring: '#2D5A3D', fill: '#EEF5F0', text: '#2D5A3D' },
  CAFE:     { ring: '#6B3F2A', fill: '#F5EDE8', text: '#6B3F2A' },
  COMERCIO: { ring: '#7A5C00', fill: '#FBF5E0', text: '#7A5C00' },
  ONG:      { ring: '#5A2D82', fill: '#F3EEF8', text: '#5A2D82' },
  OUTRO:    { ring: '#4A4A4A', fill: '#F0F0F0', text: '#4A4A4A' },
}

const CATEGORY_ICONS: Record<PartnerCategory, React.ReactNode> = {
  ESCOLA: (
    <g transform="translate(50,50)">
      {/* Open book icon */}
      <rect x="-14" y="-10" width="12" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
      <rect x="2" y="-10" width="12" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
      <line x1="0" y1="-10" x2="0" y2="6" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="-11" y1="-4" x2="-4" y2="-4" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="-11" y1="0" x2="-4" y2="0" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="4" y1="-4" x2="11" y2="-4" stroke="currentColor" strokeWidth="1.5"/>
      <line x1="4" y1="0" x2="11" y2="0" stroke="currentColor" strokeWidth="1.5"/>
    </g>
  ),
  HOTEL: (
    <g transform="translate(50,50)">
      {/* Tree/house icon */}
      <polygon points="0,-16 -12,2 12,2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <polygon points="0,-10 -15,6 15,6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
      <rect x="-4" y="6" width="8" height="10" rx="1" fill="none" stroke="currentColor" strokeWidth="2"/>
    </g>
  ),
  CAFE: (
    <g transform="translate(50,50)">
      {/* Coffee cup */}
      <path d="M-12,-4 L-12,10 Q-12,16 -4,16 L4,16 Q12,16 12,10 L12,-4 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M12,2 Q20,2 20,8 Q20,14 12,14" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M-6,-4 Q-4,-12 0,-10 Q4,-8 6,-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </g>
  ),
  COMERCIO: (
    <g transform="translate(50,50)">
      {/* Shopping bag */}
      <path d="M-12,-2 L-10,-14 Q-10,-16 -8,-16 L8,-16 Q10,-16 10,-14 L12,-2 Q14,0 12,0 L-12,0 Q-14,0 -12,-2 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <rect x="-12" y="0" width="24" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M-6,-16 Q-6,-22 0,-22 Q6,-22 6,-16" fill="none" stroke="currentColor" strokeWidth="2"/>
    </g>
  ),
  ONG: (
    <g transform="translate(50,50)">
      {/* Leaf/hand */}
      <path d="M0,-16 Q12,-8 12,4 Q12,16 0,16 Q-12,16 -12,4 Q-12,-8 0,-16 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M0,-16 L0,16" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,3"/>
    </g>
  ),
  OUTRO: (
    <g transform="translate(50,50)">
      {/* Location pin */}
      <circle cx="0" cy="-6" r="8" fill="none" stroke="currentColor" strokeWidth="2"/>
      <path d="M-8,-6 Q-8,4 0,16 Q8,4 8,-6" fill="none" stroke="currentColor" strokeWidth="2"/>
      <circle cx="0" cy="-6" r="3" fill="currentColor"/>
    </g>
  ),
}

interface StampSVGProps {
  partnerName: string
  category: PartnerCategory
  date?: string
  size?: number
  opacity?: number
  rotation?: number
  className?: string
}

export default function StampSVG({
  partnerName,
  category,
  date,
  size = 96,
  opacity = 0.88,
  rotation = 0,
  className = '',
}: StampSVGProps) {
  const colors = STAMP_COLORS[category] ?? STAMP_COLORS.OUTRO
  const id = `stamp-${category}-${partnerName.replace(/\s+/g, '')}`.toLowerCase()

  // Truncate name for arc text
  const displayName = partnerName.length > 20 ? partnerName.slice(0, 18) + '…' : partnerName

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={{
        opacity,
        transform: `rotate(${rotation}deg)`,
        filter: 'blur(0.2px)',
        flexShrink: 0,
      }}
      role="img"
      aria-label={`Carimbo de ${partnerName}`}
    >
      <defs>
        {/* Text path for partner name arc */}
        <path
          id={`arc-top-${id}`}
          d="M 15,50 A 35,35 0 1,1 85,50"
        />
        <path
          id={`arc-bottom-${id}`}
          d="M 20,58 A 30,30 0 0,0 80,58"
        />
        {/* Ink bleed filter */}
        <filter id={`ink-${id}`} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" result="noise"/>
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.5" xChannelSelector="R" yChannelSelector="G"/>
        </filter>
      </defs>

      {/* Outer decorative ring */}
      <circle
        cx="50" cy="50" r="47"
        fill="none"
        stroke={colors.ring}
        strokeWidth="1.5"
        strokeDasharray="2,4"
        opacity="0.5"
      />

      {/* Main ring */}
      <circle
        cx="50" cy="50" r="42"
        fill={colors.fill}
        stroke={colors.ring}
        strokeWidth="3.5"
        filter={`url(#ink-${id})`}
      />

      {/* Inner ring */}
      <circle
        cx="50" cy="50" r="34"
        fill="none"
        stroke={colors.ring}
        strokeWidth="1"
        opacity="0.4"
      />

      {/* Partner name on top arc */}
      <text
        fontFamily="'Courier Prime', monospace"
        fontSize="7.5"
        fontWeight="700"
        fill={colors.text}
        letterSpacing="1.5"
        textAnchor="middle"
      >
        <textPath href={`#arc-top-${id}`} startOffset="50%">
          {displayName.toUpperCase()}
        </textPath>
      </text>

      {/* Category icon in center */}
      <g color={colors.ring} opacity="0.9">
        {CATEGORY_ICONS[category]}
      </g>

      {/* Date at bottom if provided */}
      {date && (
        <text
          fontFamily="'Courier Prime', monospace"
          fontSize="6"
          fill={colors.text}
          textAnchor="middle"
          opacity="0.7"
        >
          <textPath href={`#arc-bottom-${id}`} startOffset="50%">
            {date}
          </textPath>
        </text>
      )}

      {/* Category label bottom */}
      {!date && (
        <text
          x="50" y="72"
          fontFamily="'Courier Prime', monospace"
          fontSize="5.5"
          fill={colors.text}
          textAnchor="middle"
          opacity="0.6"
          letterSpacing="1"
        >
          {category}
        </text>
      )}
    </svg>
  )
}

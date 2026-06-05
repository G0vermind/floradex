'use client'

import { motion } from 'framer-motion'

interface PassportCoverProps {
  userName: string
  totalStamps: number
  onOpen: () => void
}

export default function PassportCover({ userName, totalStamps, onOpen }: PassportCoverProps) {
  return (
    <motion.button
      onClick={onOpen}
      whileHover={{ scale: 1.02, rotateY: 5 }}
      whileTap={{ scale: 0.98 }}
      style={{
        background: 'linear-gradient(135deg, #1B3A2D 0%, #0D1F17 100%)',
        borderRadius: '2px 16px 16px 2px',
        width: '100%',
        maxWidth: '320px',
        aspectRatio: '1 / 1.4',
        padding: '2rem',
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '20px 0 30px rgba(0,0,0,0.5), inset -2px 0 10px rgba(255,255,255,0.05)',
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Textured spine */}
      <div 
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: '32px',
          background: 'linear-gradient(90deg, #8B6508 0%, #D4AF37 50%, #8B6508 100%)',
          borderRadius: '2px 0 0 2px',
          boxShadow: 'inset -2px 0 5px rgba(0,0,0,0.4)',
          borderRight: '1px solid rgba(0,0,0,0.5)',
          opacity: 0.9,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
      >
        {/* Bindings on the spine */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} style={{ width: '100%', height: '4px', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.2)' }} />
        ))}
      </div>

      <div style={{ marginLeft: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, justifyContent: 'center' }}>
        {/* Emblem */}
        <div style={{ marginBottom: '2rem', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))' }}>
          <svg width="80" height="80" viewBox="0 0 100 100">
            <path d="M50 5 L90 25 L90 60 C90 85 50 95 50 95 C50 95 10 85 10 60 L10 25 Z" fill="url(#gold-grad)" stroke="#FFF" strokeWidth="1" strokeOpacity="0.3" />
            <path d="M50 15 L80 30 L80 58 C80 75 50 85 50 85 C50 85 20 75 20 58 L20 30 Z" fill="none" stroke="#6B4C1A" strokeWidth="2" />
            <circle cx="50" cy="45" r="8" fill="#6B4C1A" />
            <path d="M50 45 L50 70 M40 55 L60 55" stroke="#6B4C1A" strokeWidth="2" />
            
            <defs>
              <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E2C46E" />
                <stop offset="50%" stopColor="#C9A84C" />
                <stop offset="100%" stopColor="#8A6E24" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Title */}
        <h2 style={{ fontFamily: 'var(--font-sans)', color: '#C9A84C', fontSize: '18px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
          PASSAPORTE
        </h2>
        <h1 style={{ fontFamily: 'var(--font-serif)', color: '#E2C46E', fontSize: '28px', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '3rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
          florestas.social
        </h1>

        {/* User info */}
        <div style={{ marginTop: 'auto', textAlign: 'center', width: '100%' }}>
          <div style={{ width: '40px', height: '2px', background: '#C9A84C', margin: '0 auto 1rem', opacity: 0.5 }} />
          <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--leaf-cream)', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
            {userName}
          </p>
          <p style={{ fontFamily: 'var(--font-sans)', color: '#C9A84C', fontSize: '10px', letterSpacing: '0.05em' }}>
            {totalStamps} CARIMBOS COLETADOS
          </p>
        </div>
      </div>
      
      {/* Texture overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.08%22 mix-blend-mode=%22overlay%22/%3E%3C/svg%3E")',
        opacity: 0.4,
        pointerEvents: 'none',
        borderRadius: 'inherit'
      }} />
    </motion.button>
  )
}

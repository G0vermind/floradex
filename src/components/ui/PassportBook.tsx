'use client'

import { motion } from 'framer-motion'
import StampSVG, { type PartnerCategory } from './StampSVG'

interface PassportBookProps {
  isOpen: boolean
  partnerName: string
  partnerCategory: PartnerCategory
  earned: number
}

export default function PassportBook({ isOpen, partnerName, partnerCategory, earned }: PassportBookProps) {
  return (
    <div 
      style={{ 
        perspective: '1200px', 
        width: '100%', 
        maxWidth: '350px', 
        height: '450px',
        position: 'relative',
        margin: '0 auto'
      }}
    >
      {/* Book Container */}
      <div 
        style={{ 
          width: '100%', 
          height: '100%', 
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Left Page (The Cover, which rotates open) */}
        <motion.div
          initial={false}
          animate={{ rotateY: isOpen ? -160 : 0 }}
          transition={{ type: 'spring', stiffness: 60, damping: 20 }}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            transformOrigin: 'left center',
            transformStyle: 'preserve-3d',
            zIndex: 10,
          }}
        >
          {/* Cover - Front */}
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, #1B3A2D 0%, #11261D 100%)',
              border: '2px solid rgba(201,168,76,0.5)',
              borderRadius: '4px 16px 16px 4px',
              backfaceVisibility: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'inset -5px 0 15px rgba(0,0,0,0.5), 5px 10px 20px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ color: 'var(--leaf-gold)', marginBottom: '1rem' }}>
              <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h2 className="font-serif" style={{ color: 'var(--leaf-gold-light)', fontSize: '1.5rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Leaf Pass
            </h2>
            <div style={{ width: '40px', height: '2px', background: 'var(--leaf-gold)', margin: '1rem 0' }} />
            <p style={{ color: 'rgba(201,168,76,0.7)', fontSize: '0.8rem', letterSpacing: '0.2em' }}>PASSPORT</p>
          </div>

          {/* Cover - Inside (Back of the front cover) */}
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              background: '#F5F0E8', // Paper color
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: '4px 16px 16px 4px',
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)', // Flipped
              boxShadow: 'inset 5px 0 15px rgba(0,0,0,0.1)',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {/* Stamp placeholders or pattern could go here */}
            <div style={{ opacity: 0.1, backgroundImage: 'radial-gradient(#1B3A2D 1px, transparent 1px)', backgroundSize: '20px 20px', width: '100%', height: '100%' }} />
          </div>
        </motion.div>

        {/* Right Page (The inside page that stays still) */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            background: '#FDFBF7', // Lighter paper color
            border: '1px solid rgba(0,0,0,0.1)',
            borderRadius: '4px 16px 16px 4px',
            boxShadow: 'inset -5px 0 15px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
        >
          {isOpen && (
            <motion.div
              initial={{ scale: 2.5, opacity: 0, rotate: -15 }}
              animate={{ scale: 1, opacity: 0.95, rotate: 2 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 350, damping: 15 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
              <StampSVG
                partnerName={partnerName}
                category={partnerCategory}
                date={new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                size={180}
                opacity={1}
                rotation={0}
              />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                style={{
                  marginTop: '1.5rem',
                  background: 'rgba(52, 211, 153, 0.1)',
                  color: '#047857',
                  padding: '0.5rem 1rem',
                  borderRadius: '999px',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  fontFamily: 'var(--font-serif)',
                  border: '1px solid rgba(52, 211, 153, 0.3)'
                }}
              >
                +{earned} Folhas
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

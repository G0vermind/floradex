'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { logout } from '@/app/actions/auth'
import type { StampData } from '@/components/ui/PassportPage'
import PassportCover from './passport/PassportCover'
import PassportTabs, { type PassportSection } from './passport/PassportTabs'
import StampCollection from './passport/StampCollection'
import TrophyCard, { type TrophyData } from './passport/TrophyCard'
import MissionCard, { type MissionData } from './passport/MissionCard'

interface PassportClientProps {
  user: {
    id: string
    name: string
    email: string
    offChainLeafs: number
  }
  stamps: StampData[]
}

export default function PassportClient({ user, stamps }: PassportClientProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<PassportSection>('stamps')
  const [achievements, setAchievements] = useState<TrophyData[]>([])
  const [missions, setMissions] = useState<MissionData[]>([])
  const [isLoadingData, setIsLoadingData] = useState(false)

  // Fetch gamification data when passport opens
  useEffect(() => {
    if (isOpen && achievements.length === 0 && missions.length === 0) {
      setIsLoadingData(true)
      Promise.all([
        fetch('/api/leafpass/achievements').then(res => res.json()),
        fetch('/api/leafpass/missions').then(res => res.json())
      ]).then(([achData, missData]) => {
        if (Array.isArray(achData)) setAchievements(achData)
        if (Array.isArray(missData)) setMissions(missData)
        setIsLoadingData(false)
      }).catch(err => {
        console.error('Failed to load gamification data', err)
        setIsLoadingData(false)
      })
    }
  }, [isOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleClaimMission = async (missionId: string) => {
    try {
      const res = await fetch('/api/leafpass/missions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ missionId }),
      })
      const data = await res.json()
      if (data.success) {
        setMissions(prev =>
          prev.map(m =>
            m.id === missionId
              ? { ...m, claimedAt: new Date().toISOString() }
              : m
          )
        )
      }
    } catch (err) {
      console.error('Failed to claim mission', err)
    }
  }

  const unclaimedMissionsCount = missions.filter(m => m.isCompleted && !m.claimedAt).length

  return (
    <div
      style={{
        minHeight: '100dvh',
        paddingBottom: '7rem',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <header
        style={{
          background: 'linear-gradient(180deg, rgba(27,58,45,0.98) 0%, rgba(27,58,45,0.85) 100%)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(201,168,76,0.2)',
          padding: '1rem',
          position: 'sticky',
          top: 0,
          zIndex: 40,
        }}
      >
        <div className="container-lg" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1
              className="text-gold-gradient"
              style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700, letterSpacing: '0.05em', lineHeight: 1.1 }}
            >
              🌿 LeafPass
            </h1>
            <Link href="/" style={{ fontSize: '12px', color: 'rgba(245,240,232,0.6)', textDecoration: 'none', display: 'block', marginTop: '2px' }}>
              ← Site Institucional
            </Link>
            <p
              style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'rgba(245,240,232,0.5)', letterSpacing: '0.08em', marginTop: '2px', textTransform: 'uppercase' }}
            >
              {user.name}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="folhas-badge">
              🍃 {Math.round(user.offChainLeafs)}
            </div>
            <form action={logout}>
              <button
                type="submit"
                style={{ 
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'white',
                  padding: '6px 12px', 
                  fontSize: '12px', 
                  borderRadius: '4px', 
                  fontFamily: 'var(--font-sans)',
                  cursor: 'pointer'
                }}
              >
                SAIR
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="container-lg" style={{ padding: '2rem 1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AnimatePresence mode="wait">
          {!isOpen ? (
            // CLOSED STATE (COVER)
            <motion.div
              key="closed"
              exit={{ opacity: 0, scale: 0.9, rotateY: 90 }}
              transition={{ duration: 0.4 }}
              style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <PassportCover
                userName={user.name}
                totalStamps={stamps.length}
                onOpen={() => setIsOpen(true)}
              />
            </motion.div>
          ) : (
            // OPEN STATE (PAGES)
            <motion.div
              key="open"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: '480px', margin: '0 auto', width: '100%' }}
            >
              {/* Back button */}
              <button
                onClick={() => setIsOpen(false)}
                style={{ 
                  alignSelf: 'flex-start', 
                  marginBottom: '1.5rem', 
                  padding: '8px 16px', 
                  fontSize: '12px', 
                  fontFamily: 'var(--font-sans)',
                  background: 'transparent',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  opacity: 0.8
                }}
              >
                ← FECHAR PASSAPORTE
              </button>

              {/* Tabs */}
              <PassportTabs
                active={activeSection}
                onChange={setActiveSection}
                missionCount={unclaimedMissionsCount}
                trophyCount={0}
              />

              {/* Tab Content */}
              <div style={{ marginTop: '1.5rem', flex: 1 }}>
                <AnimatePresence mode="wait">
                  {activeSection === 'stamps' && (
                    <motion.div
                      key="stamps"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <StampCollection stamps={stamps} />
                    </motion.div>
                  )}

                  {activeSection === 'trophies' && (
                    <motion.div
                      key="trophies"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
                    >
                      {isLoadingData ? (
                        <p style={{ textAlign: 'center', color: 'rgba(245,240,232,0.5)', padding: '2rem', fontFamily: 'var(--font-sans)', fontSize: '12px' }}>Carregando troféus...</p>
                      ) : achievements.length > 0 ? (
                        achievements.map((ach, i) => (
                          <TrophyCard key={ach.id} trophy={ach} index={i} />
                        ))
                      ) : (
                        <p style={{ textAlign: 'center', color: 'rgba(245,240,232,0.5)', fontFamily: 'var(--font-sans)', fontSize: '12px' }}>Nenhum troféu encontrado.</p>
                      )}
                    </motion.div>
                  )}

                  {activeSection === 'missions' && (
                    <motion.div
                      key="missions"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
                    >
                      {isLoadingData ? (
                        <p style={{ textAlign: 'center', color: 'rgba(245,240,232,0.5)', padding: '2rem', fontFamily: 'var(--font-sans)', fontSize: '12px' }}>Carregando missões...</p>
                      ) : missions.length > 0 ? (
                        missions.map((mission, i) => (
                          <MissionCard
                            key={mission.id}
                            mission={mission}
                            index={i}
                            onClaim={handleClaimMission}
                          />
                        ))
                      ) : (
                        <p style={{ textAlign: 'center', color: 'rgba(245,240,232,0.5)', fontFamily: 'var(--font-sans)', fontSize: '12px' }}>Nenhuma missão ativa.</p>
                      )}
                    </motion.div>
                  )}

                  {activeSection === 'profile' && (
                    <motion.div
                      key="profile"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="metric-card" style={{ padding: '2rem', textAlign: 'center' }}>
                        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👤</div>
                        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--leaf-gold-light)', marginBottom: '0.25rem' }}>
                          {user.name}
                        </h2>
                        <p style={{ fontFamily: 'var(--font-sans)', color: 'rgba(245,240,232,0.6)', marginBottom: '2rem', fontSize: '14px' }}>{user.email}</p>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                          <div style={{ background: 'rgba(245,240,232,0.05)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--leaf-gold)', fontWeight: 500, letterSpacing: '0.143px', textTransform: 'uppercase' }}>FOLHAS</p>
                            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--leaf-cream)', marginTop: '4px' }}>{Math.round(user.offChainLeafs)}</p>
                          </div>
                          <div style={{ background: 'rgba(245,240,232,0.05)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--leaf-gold)', fontWeight: 500, letterSpacing: '0.143px', textTransform: 'uppercase' }}>CARIMBOS</p>
                            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--leaf-cream)', marginTop: '4px' }}>{stamps.length}</p>
                          </div>
                        </div>

                        {user.offChainLeafs >= 10 && (
                          <div style={{ marginTop: '2rem' }}>
                            <Link href="/app/redeem" className="btn-ghost" style={{ width: '100%', background: 'linear-gradient(135deg, var(--leaf-gold), var(--leaf-gold-light))', color: 'var(--leaf-ink)', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 700 }}>
                              Converter Folhas em Tokens
                            </Link>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FAB */}
      <Link 
        href="/app/scan" 
        className="fab"
      >
        <span style={{ fontSize: '1.2rem' }}>📷</span>
        Escanear Local
      </Link>
    </div>
  )
}

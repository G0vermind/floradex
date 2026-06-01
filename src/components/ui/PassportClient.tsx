'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import PassportPage, { type StampData } from '@/components/ui/PassportPage'
import { logout } from '@/app/actions/auth'

interface PassportClientProps {
  user: {
    id: string
    name: string
    email: string
    offChainLeafs: number
  }
  stamps: StampData[]
}

const CELLS_PER_PAGE = 12

export default function PassportClient({ user, stamps }: PassportClientProps) {
  const totalPages = Math.max(1, Math.ceil((stamps.length + 1) / CELLS_PER_PAGE))
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(0)

  const goNext = () => {
    if (page < totalPages - 1) {
      setDirection(1)
      setPage((p) => p + 1)
    }
  }

  const goPrev = () => {
    if (page > 0) {
      setDirection(-1)
      setPage((p) => p - 1)
    }
  }

  const pageStamps = stamps.slice(page * CELLS_PER_PAGE, (page + 1) * CELLS_PER_PAGE)

  return (
    <div
      style={{
        minHeight: '100dvh',
        paddingBottom: '7rem',
        position: 'relative',
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
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1
              className="font-serif text-gold-gradient"
              style={{ fontSize: '1.4rem', fontWeight: 700, letterSpacing: '0.05em', lineHeight: 1.1 }}
            >
              🌿 LeafPass
            </h1>
            <p
              className="font-mono"
              style={{ fontSize: '0.7rem', color: 'rgba(245,240,232,0.5)', letterSpacing: '0.08em', marginTop: '2px' }}
            >
              {user.name.toUpperCase()}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="folhas-badge">
              🍃 {Math.round(user.offChainLeafs)}
            </div>
            <form action={logout}>
              <button
                type="submit"
                className="btn-ghost"
                style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}
              >
                Sair
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Passport body */}
      <div className="container" style={{ paddingTop: '1.5rem' }}>
        {/* Folhas summary */}
        <div
          className="glass-card"
          style={{
            padding: '1rem 1.25rem',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <p className="font-mono" style={{ fontSize: '0.7rem', color: 'rgba(245,240,232,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Folhas acumuladas
            </p>
            <p className="font-serif" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--leaf-gold-light)', lineHeight: 1.1 }}>
              🍃 {Math.round(user.offChainLeafs)}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p className="font-mono" style={{ fontSize: '0.7rem', color: 'rgba(245,240,232,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Carimbos
            </p>
            <p className="font-serif" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--leaf-cream)', lineHeight: 1.1 }}>
              {stamps.length}
            </p>
          </div>
        </div>

        {/* Passport book */}
        <div className="passport-book" style={{ padding: '0.75rem 0.75rem 1.25rem' }}>
          <div className="passport-spine" />
          <div style={{ marginLeft: '16px' }}>
            <AnimatePresence mode="wait" custom={direction}>
              <PassportPage
                key={page}
                stamps={pageStamps}
                pageNumber={page + 1}
                totalPages={totalPages}
                direction={direction}
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              marginTop: '1rem',
            }}
          >
            <button
              onClick={goPrev}
              disabled={page === 0}
              className="btn-ghost"
              style={{ fontSize: '1.25rem', padding: '0.375rem 0.875rem', opacity: page === 0 ? 0.3 : 1 }}
            >
              ←
            </button>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > page ? 1 : -1); setPage(i) }}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    border: 'none',
                    cursor: 'pointer',
                    background: i === page ? 'var(--leaf-gold)' : 'rgba(245,240,232,0.2)',
                    transition: 'background 0.2s',
                    padding: 0,
                  }}
                />
              ))}
            </div>
            <button
              onClick={goNext}
              disabled={page === totalPages - 1}
              className="btn-ghost"
              style={{ fontSize: '1.25rem', padding: '0.375rem 0.875rem', opacity: page === totalPages - 1 ? 0.3 : 1 }}
            >
              →
            </button>
          </div>
        )}

        {/* Redeem link */}
        {user.offChainLeafs >= 10 && (
          <div style={{ marginTop: '1.25rem' }}>
            <Link
              href="/leafpass/redeem"
              className="btn-ghost"
              style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}
            >
              💚 Converter {Math.round(user.offChainLeafs)} Folhas em tokens
            </Link>
          </div>
        )}
      </div>

      {/* FAB */}
      <Link href="/leafpass/scan" className="fab" id="btn-scan-fab">
        <span style={{ fontSize: '1.2rem' }}>📷</span>
        Escanear Local
      </Link>
    </div>
  )
}

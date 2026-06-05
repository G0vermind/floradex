'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PassportPage, { type StampData } from '@/components/ui/PassportPage'

interface StampCollectionProps {
  stamps: StampData[]
}

const CELLS_PER_PAGE = 12

export default function StampCollection({ stamps }: StampCollectionProps) {
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
    <div>
      {/* Passport book content */}
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
            marginTop: '0.75rem',
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
                  background: i === page ? 'var(--color-ai-lime)' : 'rgba(255,255,255,0.1)',
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
    </div>
  )
}

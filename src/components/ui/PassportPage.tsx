'use client'

import { motion, AnimatePresence } from 'framer-motion'
import StampSVG, { type PartnerCategory } from '@/components/ui/StampSVG'

export interface StampData {
  id: string
  partnerName: string
  partnerCategory: PartnerCategory
  scannedAt: string
}

interface PassportPageProps {
  stamps: StampData[]
  pageNumber: number
  totalPages: number
  direction?: number
}

const CELLS_PER_PAGE = 12

export default function PassportPage({
  stamps,
  pageNumber,
  totalPages,
  direction = 0,
}: PassportPageProps) {
  const cells = Array.from({ length: CELLS_PER_PAGE })

  return (
    <motion.div
      key={pageNumber}
      custom={direction}
      initial={{ rotateY: direction > 0 ? 45 : -45, opacity: 0 }}
      animate={{ rotateY: 0, opacity: 1 }}
      exit={{ rotateY: direction < 0 ? 45 : -45, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 220, damping: 28 }}
      style={{ perspective: 1000 }}
    >
      <div
        className="passport-paper"
        style={{
          borderRadius: '8px',
          padding: '1.5rem',
          minHeight: '360px',
        }}
      >
        {/* Page header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <span
            className="font-mono"
            style={{ fontSize: '0.65rem', letterSpacing: '0.12em', color: 'var(--leaf-ink-faded)', textTransform: 'uppercase' }}
          >
            LeafPass
          </span>
          <span
            className="font-mono"
            style={{ fontSize: '0.65rem', color: 'var(--leaf-ink-faded)', letterSpacing: '0.08em' }}
          >
            PÁG. {pageNumber} / {totalPages}
          </span>
        </div>

        {/* Stamp grid — 3 columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            justifyItems: 'center',
          }}
        >
          {cells.map((_, i) => {
            const stamp = stamps[i]
            const date = stamp
              ? new Date(stamp.scannedAt).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: '2-digit',
                })
              : null

            if (stamp) {
              return (
                <motion.div
                  key={stamp.id}
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 18,
                    delay: i * 0.04,
                  }}
                  title={`${stamp.partnerName} — ${date}`}
                  style={{ cursor: 'pointer' }}
                  whileHover={{ scale: 1.12 }}
                >
                  <StampSVG
                    partnerName={stamp.partnerName}
                    category={stamp.partnerCategory}
                    date={date ?? undefined}
                    size={90}
                    rotation={Math.round((Math.random() - 0.5) * 6)}
                  />
                </motion.div>
              )
            }

            return (
              <div key={`empty-${i}`} className="stamp-cell-empty">
                ?
              </div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

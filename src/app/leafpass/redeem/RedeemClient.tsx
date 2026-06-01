'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { redeemProject } from '@/app/actions/projects'
import { QRCodeSVG } from 'qrcode.react'

interface SocialProject {
  id: string
  title: string
  description: string
  costInLeafs: number
  imageUrl: string | null
}

interface RedeemClientProps {
  balance: number
  userName: string | null
  projects: SocialProject[]
}

export default function RedeemClient({ balance, userName, projects }: RedeemClientProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [voucher, setVoucher] = useState<{ code: string; projectTitle: string } | null>(null)
  const [error, setError] = useState('')

  const handleRedeem = async (projectId: string) => {
    setError('')
    setLoadingId(projectId)
    const res = await redeemProject(projectId)
    setLoadingId(null)

    if (res.error) {
      setError(res.error)
    } else if (res.success && res.voucherCode) {
      setVoucher({
        code: res.voucherCode,
        projectTitle: res.projectName || 'Projeto Social'
      })
    }
  }

  return (
    <div style={{ minHeight: '100dvh', paddingBottom: '4rem', background: 'linear-gradient(180deg, var(--leaf-green-dark) 0%, #0D1F17 100%)' }}>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem',
          position: 'sticky',
          top: 0,
          background: 'rgba(13,31,23,0.85)',
          backdropFilter: 'blur(12px)',
          zIndex: 40,
        }}
      >
        <Link href="/leafpass" className="btn-ghost" style={{ fontSize: '0.9rem', padding: '0.4rem 0.75rem' }}>
          ← Passaporte
        </Link>
        <div style={{ textAlign: 'right' }}>
          <p className="font-mono" style={{ fontSize: '0.65rem', color: 'rgba(245,240,232,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Seu Saldo
          </p>
          <p className="font-serif" style={{ color: 'var(--leaf-gold-light)', fontWeight: 700, fontSize: '1.1rem' }}>
            🍃 {Math.round(balance)} Folhas
          </p>
        </div>
      </header>

      <div className="container" style={{ paddingTop: '1.5rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h1 className="font-serif text-gold-gradient" style={{ fontSize: '2rem', fontWeight: 700, lineHeight: 1.1 }}>
            Vitrine de Projetos
          </h1>
          <p style={{ color: 'rgba(245,240,232,0.7)', fontSize: '0.9rem', marginTop: '0.5rem', lineHeight: 1.5 }}>
            Use suas Folhas acumuladas para apoiar projetos socioambientais reais ou resgatar benefícios em parceiros.
          </p>
        </div>

        {error && (
          <div style={{ background: 'rgba(139,46,46,0.2)', border: '1px solid rgba(139,46,46,0.4)', borderRadius: '8px', padding: '0.75rem', color: '#FCA5A5', fontSize: '0.875rem', marginBottom: '1.5rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {projects.map((p) => {
            const canAfford = balance >= p.costInLeafs
            const isLoading = loadingId === p.id

            return (
              <div key={p.id} className="glass-card animate-fade-in" style={{ padding: '0', overflow: 'hidden' }}>
                {p.imageUrl && (
                  <div style={{ width: '100%', height: '140px', background: `url(${p.imageUrl}) center/cover no-repeat` }} />
                )}
                <div style={{ padding: '1.25rem' }}>
                  <h2 className="font-serif" style={{ fontSize: '1.2rem', color: 'var(--leaf-gold-light)', fontWeight: 700, marginBottom: '0.5rem' }}>
                    {p.title}
                  </h2>
                  <p style={{ color: 'rgba(245,240,232,0.7)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                    {p.description}
                  </p>
                  
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ color: canAfford ? 'var(--leaf-gold)' : 'rgba(245,240,232,0.4)', fontWeight: 700, fontSize: '1.1rem' }}>
                      🍃 {p.costInLeafs}
                    </div>
                    
                    <button
                      onClick={() => handleRedeem(p.id)}
                      disabled={!canAfford || isLoading}
                      className={canAfford ? 'btn-gold' : 'btn-ghost'}
                      style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                    >
                      {isLoading ? '⏳ Processando...' : canAfford ? 'Apoiar / Resgatar' : `Faltam ${Math.round(p.costInLeafs - balance)} folhas`}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}

          {projects.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'rgba(245,240,232,0.5)' }}>
              Nenhum projeto disponível no momento. Volte mais tarde!
            </div>
          )}
        </div>
      </div>

      {/* Voucher Modal */}
      <AnimatePresence>
        {voucher && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0,0,0,0.8)',
              backdropFilter: 'blur(8px)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem'
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-card"
              style={{ width: '100%', maxWidth: '360px', padding: '2rem 1.5rem', textAlign: 'center', position: 'relative' }}
            >
              <button 
                onClick={() => setVoucher(null)}
                style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'rgba(245,240,232,0.5)', fontSize: '1.5rem', cursor: 'pointer' }}
              >
                ×
              </button>
              
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>💚</div>
              <h2 className="font-serif text-gold-gradient" style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Resgate Confirmado!
              </h2>
              <p style={{ color: 'rgba(245,240,232,0.8)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Você resgatou com sucesso: <strong>{voucher.projectTitle}</strong>
              </p>

              <div style={{ background: '#fff', padding: '1rem', borderRadius: '12px', display: 'inline-block', marginBottom: '1rem' }}>
                <QRCodeSVG value={voucher.code} size={200} level="H" />
              </div>

              <div style={{ background: 'rgba(245,240,232,0.1)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
                <p className="font-mono" style={{ fontSize: '0.7rem', color: 'var(--leaf-gold)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Código do Voucher</p>
                <p className="font-mono" style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', letterSpacing: '0.1em' }}>
                  {voucher.code}
                </p>
              </div>

              <p style={{ fontSize: '0.8rem', color: 'rgba(245,240,232,0.5)' }}>
                Apresente este QR Code ou informe o código no estabelecimento parceiro, se necessário.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

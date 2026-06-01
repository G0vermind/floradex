'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import PassportBook from '@/components/ui/PassportBook'
import CompanyShowcase from '@/components/ui/CompanyShowcase'
import { type PartnerCategory } from '@/components/ui/StampSVG'

type ScanState = 'idle' | 'scanning' | 'manual_entry' | 'success' | 'error'

interface ScanResult {
  partnerName: string
  partnerCategory: PartnerCategory
  earned: number
  newBalance?: number
  stampImageUrl?: string
  websiteUrl?: string
  instagramUrl?: string
  whatsappNumber?: string
  howToBuyText?: string
}

const ERROR_MESSAGES: Record<string, string> = {
  QR_INVALID:        'QR Code não reconhecido. Certifique-se de escanear o código do parceiro.',
  QR_EXPIRED:        'Este QR Code ou campanha expirou.',
  SCAN_LIMIT_REACHED:'Você já visitou este local hoje. Volte amanhã para ganhar mais Folhas!',
  PARTNER_INACTIVE:  'Este estabelecimento ainda não está ativo na rede LeafPass.',
  DAILY_LIMIT:       'Você atingiu o limite diário de 20 scans. Continue amanhã!',
  UNAUTHORIZED:      'Você precisa estar logado para escanear.',
  CAMPAIGN_INACTIVE: 'Esta campanha está inativa no momento.',
  MAX_USES_REACHED:  'Esta campanha já atingiu o limite máximo de resgates.',
  CAMPAIGN_REDEEMED: 'Você já resgatou esta campanha.',
  DEFAULT:           'Algo deu errado. Tente novamente.',
}

export default function ScanPage() {
  const router = useRouter()
  const scannerRef = useRef<HTMLDivElement>(null)
  const html5QrCodeRef = useRef<InstanceType<typeof import('html5-qrcode')['Html5Qrcode']> | null>(null)

  const [scanState, setScanState] = useState<ScanState>('idle')
  const [result, setResult] = useState<ScanResult | null>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [manualCode, setManualCode] = useState('')

  const startScanner = async () => {
    setScanState('scanning')
    try {
      const { Html5Qrcode } = await import('html5-qrcode')
      const scanner = new Html5Qrcode('qr-reader')
      html5QrCodeRef.current = scanner

      await scanner.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 220, height: 220 } },
        (decodedText) => {
          scanner.stop().catch(() => {})
          handleScan(decodedText)
        },
        undefined
      )
    } catch {
      setScanState('error')
      setErrorMsg('Não foi possível acessar a câmera. Verifique as permissões.')
    }
  }

  const stopScanner = () => {
    html5QrCodeRef.current?.stop().catch(() => {})
    html5QrCodeRef.current = null
  }

  useEffect(() => {
    return () => stopScanner()
  }, [])

  const getLocation = (): Promise<{ latitude: number; longitude: number } | null> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) return resolve(null)
      navigator.geolocation.getCurrentPosition(
        (pos) => resolve({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
        () => resolve(null),
        { timeout: 4000 }
      )
    })
  }

  const handleScan = async (qrSecret: string) => {
    setLoading(true)
    setScanState('idle')
    const geo = await getLocation()

    try {
      const res = await fetch('/api/leafpass/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qrSecret, ...geo }),
      })
      const data = await res.json()

      if (res.ok) {
        setResult({
          partnerName: data.partnerName,
          partnerCategory: data.partnerCategory,
          earned: data.earned,
          newBalance: data.newBalance,
          stampImageUrl: data.stampImageUrl,
          websiteUrl: data.websiteUrl,
          instagramUrl: data.instagramUrl,
          whatsappNumber: data.whatsappNumber,
          howToBuyText: data.howToBuyText,
        })
        setScanState('success')
        // Play stamp sound via Web Audio API
        try {
          const ctx = new AudioContext()
          const osc = ctx.createOscillator()
          const gain = ctx.createGain()
          osc.connect(gain)
          gain.connect(ctx.destination)
          osc.frequency.setValueAtTime(180, ctx.currentTime)
          osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.15)
          gain.gain.setValueAtTime(0.3, ctx.currentTime)
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2)
          osc.start(ctx.currentTime)
          osc.stop(ctx.currentTime + 0.2)
        } catch {}
      } else {
        const code = data.error as string
        setErrorMsg(ERROR_MESSAGES[code] ?? ERROR_MESSAGES.DEFAULT)
        setScanState('error')
      }
    } catch {
      setErrorMsg(ERROR_MESSAGES.DEFAULT)
      setScanState('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(180deg, var(--leaf-green-dark) 0%, #0D1F17 100%)',
      }}
    >
      {/* Header */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '1rem',
          gap: '0.75rem',
        }}
      >
        <Link
          href="/leafpass"
          className="btn-ghost"
          style={{ fontSize: '0.9rem', padding: '0.5rem 0.875rem' }}
          onClick={stopScanner}
        >
          {['idle', 'scanning', 'manual_entry'].includes(scanState) ? '← Cancelar' : '← Voltar'}
        </Link>
        <span
          className="font-serif"
          style={{ color: 'var(--leaf-gold-light)', fontSize: '1.1rem', fontWeight: 600 }}
        >
          Escanear Parceiro
        </span>
      </header>

      {/* Content area */}
      <div
        className="container"
        style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', paddingBottom: '2rem' }}
      >
        <AnimatePresence mode="wait">
          {/* IDLE STATE */}
          {scanState === 'idle' && !loading && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{ textAlign: 'center', width: '100%' }}
            >
              <div
                style={{
                  width: '200px',
                  height: '200px',
                  margin: '0 auto 1.5rem',
                  borderRadius: '16px',
                  background: 'rgba(245,240,232,0.04)',
                  border: '2px dashed rgba(201,168,76,0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem',
                }}
              >
                📷
              </div>
              <p style={{ color: 'rgba(245,240,232,0.7)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                Aponte para o QR Code do<br />estabelecimento parceiro
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '280px', margin: '0 auto' }}>
                <button id="btn-start-scan" onClick={startScanner} className="btn-gold">
                  🌿 Iniciar Scanner
                </button>
                <button onClick={() => setScanState('manual_entry')} className="btn-ghost">
                  ⌨️ Digitar código manual
                </button>
              </div>
            </motion.div>
          )}

          {/* MANUAL ENTRY STATE */}
          {scanState === 'manual_entry' && !loading && (
            <motion.div
              key="manual"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{ textAlign: 'center', width: '100%', maxWidth: '320px' }}
            >
              <h2 className="font-serif" style={{ color: 'var(--leaf-gold-light)', fontSize: '1.5rem', marginBottom: '1rem' }}>
                Código do Parceiro
              </h2>
              <p style={{ color: 'rgba(245,240,232,0.7)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                Digite o código de verificação exibido abaixo do QR Code do estabelecimento.
              </p>
              
              <input 
                type="text" 
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                placeholder="Ex: abcd-1234"
                className="input-field"
                style={{ textAlign: 'center', marginBottom: '1.25rem', letterSpacing: '0.1em' }}
                autoFocus
              />
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button 
                  onClick={() => handleScan(manualCode)} 
                  className="btn-primary"
                  disabled={!manualCode.trim()}
                >
                  Verificar Código
                </button>
                <button onClick={() => setScanState('idle')} className="btn-ghost">
                  Voltar
                </button>
              </div>
            </motion.div>
          )}

          {/* SCANNING STATE */}
          {scanState === 'scanning' && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ width: '100%', position: 'relative' }}
            >
              <div className="scanner-overlay" style={{ borderRadius: '16px', overflow: 'hidden', maxWidth: '340px', margin: '0 auto' }}>
                <div id="qr-reader" ref={scannerRef} style={{ width: '100%' }} />
                {/* Corner overlays */}
                <div className="scanner-corner scanner-corner-tl" />
                <div className="scanner-corner scanner-corner-tr" />
                <div className="scanner-corner scanner-corner-bl" />
                <div className="scanner-corner scanner-corner-br" />
                <div className="scan-line" />
              </div>
              <p
                style={{
                  textAlign: 'center',
                  marginTop: '1.25rem',
                  color: 'rgba(245,240,232,0.6)',
                  fontSize: '0.9rem',
                }}
              >
                Posicione o QR Code dentro do quadro
              </p>
            </motion.div>
          )}

          {/* LOADING STATE */}
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: 'center' }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                style={{ fontSize: '3rem', marginBottom: '1rem', display: 'inline-block' }}
              >
                🌿
              </motion.div>
              <p style={{ color: 'rgba(245,240,232,0.7)' }}>Verificando carimbo…</p>
            </motion.div>
          )}

          {/* SUCCESS STATE */}
          {scanState === 'success' && result && (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: 'center', width: '100%' }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', perspective: '1200px' }}
              >
                <PassportBook 
                  isOpen={true} 
                  partnerName={result.partnerName} 
                  partnerCategory={result.partnerCategory} 
                  earned={result.earned} 
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2
                  className="font-serif"
                  style={{ fontSize: '1.75rem', color: 'var(--leaf-gold-light)', marginBottom: '0.5rem' }}
                >
                  {result.partnerName}
                </h2>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'rgba(201,168,76,0.15)',
                    border: '1px solid rgba(201,168,76,0.35)',
                    borderRadius: '999px',
                    padding: '0.4rem 1.25rem',
                    marginBottom: '1.5rem',
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>🍃</span>
                  <span className="font-serif" style={{ fontSize: '1.3rem', color: 'var(--leaf-gold-light)', fontWeight: 700 }}>
                    + {result.earned} Folhas!
                  </span>
                </div>

                {result.newBalance !== undefined && (
                  <p style={{ color: 'rgba(245,240,232,0.6)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    Novo saldo: 🍃 {Math.round(result.newBalance)}
                  </p>
                )}

                <Link href="/leafpass" className="btn-primary" style={{ display: 'inline-flex' }}>
                  Ver meu Passaporte
                </Link>

                {/* Vitrine B2B */}
                <CompanyShowcase 
                  partnerName={result.partnerName}
                  partnerCategory={result.partnerCategory}
                  logoUrl={result.stampImageUrl}
                  websiteUrl={result.websiteUrl}
                  instagramUrl={result.instagramUrl}
                  whatsappNumber={result.whatsappNumber}
                  howToBuyText={result.howToBuyText}
                />
              </motion.div>
            </motion.div>
          )}

          {/* ERROR STATE */}
          {scanState === 'error' && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ textAlign: 'center', width: '100%' }}
            >
              <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>❌</div>
              <p
                style={{
                  color: 'rgba(245,240,232,0.85)',
                  lineHeight: 1.6,
                  maxWidth: '300px',
                  margin: '0 auto 1.5rem',
                }}
              >
                {errorMsg}
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button id="btn-retry-scan" onClick={() => setScanState('idle')} className="btn-primary">
                  Tentar novamente
                </button>
                <Link href="/leafpass" className="btn-ghost">
                  Voltar
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

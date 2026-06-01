'use client'

import { useEffect, useState } from 'react'

interface CampaignQrDisplayProps {
  qrSecret: string
  campaignTitle: string
  codeText?: string | null
  leafReward: number
  size?: number
}

export default function CampaignQrDisplay({
  qrSecret,
  campaignTitle,
  codeText,
  leafReward,
  size = 220,
}: CampaignQrDisplayProps) {
  const [dataUrl, setDataUrl] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const QRCode = (await import('qrcode')).default
      const url = await QRCode.toDataURL(qrSecret, {
        width: size,
        margin: 2,
        color: { dark: '#1B3A2D', light: '#F5F0E8' },
      })
      if (!cancelled) setDataUrl(url)
    })()
    return () => { cancelled = true }
  }, [qrSecret, size])

  const download = () => {
    if (!dataUrl) return
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = `campanha-${campaignTitle.toLowerCase().replace(/\s+/g, '-')}.png`
    a.click()
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      {/* QR Code */}
      <div style={{
        background: 'white',
        padding: '1rem',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      }}>
        {dataUrl ? (
          <img
            src={dataUrl}
            alt={`QR Code – ${campaignTitle}`}
            style={{ width: size, height: size, display: 'block', imageRendering: 'pixelated' }}
          />
        ) : (
          <div style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>
            Gerando...
          </div>
        )}
      </div>

      {/* Recompensa */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--leaf-gold)' }}>
          🍃 +{leafReward} Leafs
        </div>
        {codeText && (
          <div style={{ marginTop: '0.5rem' }}>
            <span style={{ color: 'rgba(245,240,232,0.6)', fontSize: '0.8rem' }}>Código alternativo: </span>
            <code style={{
              padding: '0.25rem 0.75rem',
              background: 'rgba(201,168,76,0.15)',
              border: '1px solid rgba(201,168,76,0.3)',
              borderRadius: '6px',
              color: 'var(--leaf-gold-light)',
              fontSize: '1rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
            }}>
              {codeText}
            </code>
          </div>
        )}
      </div>

      {/* Botão Download */}
      <button
        onClick={download}
        disabled={!dataUrl}
        style={{
          padding: '0.5rem 1.5rem',
          background: 'transparent',
          border: '1px solid rgba(201,168,76,0.4)',
          borderRadius: '8px',
          color: 'var(--leaf-gold)',
          fontSize: '0.85rem',
          cursor: dataUrl ? 'pointer' : 'not-allowed',
          opacity: dataUrl ? 1 : 0.4,
        }}
      >
        ↓ Baixar QR Code
      </button>
    </div>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'

interface QrCodeDisplayProps {
  secret: string
  partnerName: string
}

export default function QrCodeDisplay({ secret, partnerName }: QrCodeDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dataUrl, setDataUrl] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const QRCode = (await import('qrcode')).default
      const url = await QRCode.toDataURL(secret, {
        width: 120,
        margin: 1,
        color: { dark: '#1B3A2D', light: '#F5F0E8' },
      })
      if (!cancelled) setDataUrl(url)
    })()
    return () => { cancelled = true }
  }, [secret])

  const download = () => {
    if (!dataUrl) return
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = `qr-${partnerName.toLowerCase().replace(/\s+/g, '-')}.png`
    a.click()
  }

  if (!dataUrl) return <span style={{ color: 'rgba(245,240,232,0.3)', fontSize: '0.75rem' }}>…</span>

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <img
        src={dataUrl}
        alt={`QR Code ${partnerName}`}
        style={{ width: '48px', height: '48px', borderRadius: '4px', imageRendering: 'pixelated' }}
      />
      <button
        onClick={download}
        className="btn-ghost"
        style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem' }}
        title="Download QR"
      >
        ↓
      </button>
    </div>
  )
}

'use client'

import { useState } from 'react'

type PaymentMethod = 'pix' | 'card'
type PriceKey = 'BROTO_MONTHLY' | 'RAIZ_MONTHLY' | 'FLORESTA_MONTHLY'

interface Props {
  priceKey: PriceKey
  method: PaymentMethod
  label: string
  className?: string
  style?: React.CSSProperties
}

export function CheckoutButton({ priceKey, method, label, className, style }: Props) {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceKey, paymentMethod: method }),
      })
      const data = await res.json()
      if (data.error) {
        alert(data.error)
        setLoading(false)
        return
      }
      if (data.url) {
        window.location.href = data.url
      }
    } catch (e) {
      alert('Erro ao iniciar checkout')
      setLoading(false)
    }
  }

  return (
    <button onClick={handleClick} disabled={loading} className={className} style={{...style, opacity: loading ? 0.7 : 1, cursor: loading ? 'wait' : 'pointer'}}>
      {loading ? 'Redirecionando...' : label}
    </button>
  )
}

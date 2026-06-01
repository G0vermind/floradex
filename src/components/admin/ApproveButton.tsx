'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ApproveButton({ companyId }: { companyId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleApprove = async () => {
    setLoading(true)
    try {
      await fetch(`/api/admin/companies/${companyId}/approve`, { method: 'POST' })
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleApprove}
      disabled={loading}
      style={{
        fontSize: '0.75rem',
        padding: '0.3rem 0.7rem',
        background: 'rgba(74,124,89,0.25)',
        border: '1px solid rgba(74,124,89,0.5)',
        borderRadius: '6px',
        color: '#4ade80',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.6 : 1,
        whiteSpace: 'nowrap',
      }}
    >
      {loading ? '...' : '✓ Aprovar'}
    </button>
  )
}

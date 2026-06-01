'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type CampaignData = {
  id?: string
  title: string
  description: string
  leafReward: number
  imageUrl: string | null
  codeText: string | null
  maxUses: number | null
  expiresAt: string | null
  isActive: boolean
  qrSecret?: string
  companyId?: string | null
}

interface CampaignFormProps {
  initialData?: CampaignData
  basePath?: string // '/admin/campaigns' ou '/dashboard/empresa/campaigns'
  companies?: { id: string, tradeName: string }[]
}

export default function CampaignForm({ initialData, basePath = '/admin/campaigns', companies }: CampaignFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    leafReward: initialData?.leafReward || 10,
    imageUrl: initialData?.imageUrl || '',
    codeText: initialData?.codeText || '',
    maxUses: initialData?.maxUses?.toString() || '',
    expiresAt: initialData?.expiresAt ? new Date(initialData.expiresAt).toISOString().slice(0, 16) : '',
    isActive: initialData?.isActive ?? true,
    companyId: initialData?.companyId || '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }))
    } else if (name === 'leafReward') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const url = initialData?.id
        ? `/api/admin/campaigns/${initialData.id}`
        : '/api/admin/campaigns'

      const method = initialData?.id ? 'PUT' : 'POST'

      const body = {
        ...formData,
        maxUses: formData.maxUses ? Number(formData.maxUses) : null,
        expiresAt: formData.expiresAt || null,
        imageUrl: formData.imageUrl || null,
        codeText: formData.codeText || null,
        companyId: formData.companyId || null,
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const d = await res.json()
        throw new Error(d.error || 'Erro ao salvar campanha')
      }

      router.push(basePath)
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.65rem 0.875rem',
    background: 'rgba(13, 31, 23, 0.6)',
    border: '1px solid rgba(201,168,76,0.25)',
    borderRadius: '8px',
    color: 'var(--leaf-cream)',
    fontSize: '0.95rem',
    outline: 'none',
    boxSizing: 'border-box',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '0.4rem',
    fontSize: '0.75rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--leaf-gold)',
    fontFamily: 'var(--font-mono)',
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '640px' }}>
      {error && (
        <div style={{ color: '#ff6b6b', background: 'rgba(255,50,50,0.1)', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,50,50,0.3)' }}>
          {error}
        </div>
      )}

      {/* QR Secret (somente leitura na edição) */}
      {initialData?.qrSecret && (
        <div className="glass-card" style={{ padding: '1rem', background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.2)' }}>
          <p style={{ ...labelStyle, marginBottom: '0.5rem' }}>QR Secret (gerado automaticamente)</p>
          <code style={{ color: 'var(--leaf-gold-light)', fontSize: '0.8rem', wordBreak: 'break-all' }}>
            {initialData.qrSecret}
          </code>
          <p style={{ color: 'rgba(245,240,232,0.5)', fontSize: '0.75rem', marginTop: '0.5rem' }}>
            Este é o valor codificado no QR Code. Veja o QR na tela de detalhe.
          </p>
        </div>
      )}

      {companies && companies.length > 0 && (
        <div>
          <label htmlFor="companyId" style={labelStyle}>Empresa Parceira (Opcional)</label>
          <select id="companyId" name="companyId" style={inputStyle} value={formData.companyId} onChange={handleChange as any}>
            <option value="">-- Nenhuma (Campanha Global) --</option>
            {companies.map(c => (
              <option key={c.id} value={c.id}>{c.tradeName}</option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label htmlFor="title" style={labelStyle}>Título da Campanha *</label>
        <input id="title" name="title" required style={inputStyle} value={formData.title} onChange={handleChange} placeholder="Ex: Visite o Museu Nacional" />
      </div>

      <div>
        <label htmlFor="description" style={labelStyle}>Descrição / Instruções *</label>
        <textarea id="description" name="description" required rows={4} style={{ ...inputStyle, resize: 'vertical' }} value={formData.description} onChange={handleChange} placeholder="Descreva o que o participante precisa fazer para resgatar..." />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label htmlFor="leafReward" style={labelStyle}>🍃 Leafs que o usuário ganha *</label>
          <input id="leafReward" name="leafReward" type="number" min="1" step="0.5" required style={inputStyle} value={formData.leafReward} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="codeText" style={labelStyle}>Código de texto (opcional)</label>
          <input id="codeText" name="codeText" style={inputStyle} value={formData.codeText || ''} onChange={handleChange} placeholder="Ex: VISITA25" />
          <small style={{ color: 'rgba(245,240,232,0.4)', fontSize: '0.7rem' }}>Alternativo ao QR Code</small>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label htmlFor="maxUses" style={labelStyle}>Limite de Usos (opcional)</label>
          <input id="maxUses" name="maxUses" type="number" min="1" style={inputStyle} value={formData.maxUses || ''} onChange={handleChange} placeholder="Vazio = ilimitado" />
        </div>
        <div>
          <label htmlFor="expiresAt" style={labelStyle}>Expira em (opcional)</label>
          <input id="expiresAt" name="expiresAt" type="datetime-local" style={inputStyle} value={formData.expiresAt || ''} onChange={handleChange} />
        </div>
      </div>

      <div>
        <label htmlFor="imageUrl" style={labelStyle}>URL da Imagem / Banner (opcional)</label>
        <input id="imageUrl" name="imageUrl" type="url" style={inputStyle} value={formData.imageUrl || ''} onChange={handleChange} placeholder="https://..." />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <input id="isActive" name="isActive" type="checkbox" checked={formData.isActive} onChange={handleChange} style={{ width: '1.2rem', height: '1.2rem', accentColor: 'var(--leaf-gold)' }} />
        <label htmlFor="isActive" style={{ ...labelStyle, marginBottom: 0, textTransform: 'none', fontSize: '0.9rem' }}>
          Campanha ativa (visível para os usuários)
        </label>
      </div>

      <button type="submit" disabled={loading} style={{ alignSelf: 'flex-start', padding: '0.75rem 2.5rem', background: 'linear-gradient(135deg, #C9A84C, #E8C96A)', color: '#0D1F17', fontWeight: 700, border: 'none', borderRadius: '8px', fontSize: '0.95rem', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}>
        {loading ? 'Salvando...' : (initialData?.id ? 'Salvar Alterações' : 'Criar Campanha')}
      </button>
    </form>
  )
}

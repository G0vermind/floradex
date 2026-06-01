'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const CATEGORIES = ['ESCOLA', 'HOTEL', 'CAFE', 'COMERCIO', 'ONG', 'OUTRO'] as const

interface CompanyData {
  id?: string
  tradeName: string
  legalName: string
  email: string
  cnpj: string
  category: string
  city: string
  state: string
  description: string
  rewardAmount: number
  isActive: boolean
}

interface CompanyFormProps {
  initialData?: CompanyData
}

export default function CompanyForm({ initialData }: CompanyFormProps) {
  const router = useRouter()
  const isEditing = !!initialData?.id

  const [form, setForm] = useState<CompanyData>(
    initialData ?? {
      tradeName: '',
      legalName: '',
      email: '',
      cnpj: '',
      category: 'COMERCIO',
      city: '',
      state: '',
      description: '',
      rewardAmount: 10,
      isActive: true,
    }
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const update = (key: keyof CompanyData, value: string | number | boolean) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch(
        isEditing ? `/api/admin/companies/${initialData!.id}` : '/api/admin/companies',
        {
          method: isEditing ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        }
      )
      const data = await res.json()
      if (res.ok) {
        router.push('/admin/companies')
        router.refresh()
      } else {
        setError(data.error ?? 'Erro ao salvar. Tente novamente.')
      }
    } catch {
      setError('Erro de conexão.')
    } finally {
      setLoading(false)
    }
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.75rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--leaf-gold)',
    marginBottom: '0.4rem',
    fontFamily: 'var(--font-mono)',
  }

  return (
    <main style={{ minHeight: '100dvh', paddingBottom: '2rem' }}>
      {/* Header */}
      <header
        style={{
          background: 'linear-gradient(180deg, rgba(27,58,45,0.98) 0%, rgba(27,58,45,0.85) 100%)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(201,168,76,0.2)',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.875rem',
          position: 'sticky',
          top: 0,
          zIndex: 40,
        }}
      >
        <Link href="/admin/companies" className="btn-ghost" style={{ fontSize: '0.85rem', padding: '0.4rem 0.75rem' }}>
          ←
        </Link>
        <h1 className="font-serif" style={{ fontSize: '1.3rem', color: 'var(--leaf-gold-light)', fontWeight: 700 }}>
          {isEditing ? 'Editar Empresa' : 'Nova Empresa'}
        </h1>
      </header>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1.5rem 1.5rem' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Trade Name */}
          <div>
            <label htmlFor="p-tradename" style={labelStyle}>Nome Fantasia</label>
            <input
              id="p-tradename"
              value={form.tradeName}
              onChange={(e) => update('tradeName', e.target.value)}
              required
              className="input-field"
              placeholder="Pousada Ecovert"
            />
          </div>

          {/* Legal Name */}
          <div>
            <label htmlFor="p-legalname" style={labelStyle}>Razão Social</label>
            <input
              id="p-legalname"
              value={form.legalName}
              onChange={(e) => update('legalName', e.target.value)}
              required
              className="input-field"
              placeholder="Pousada Ecovert LTDA"
            />
          </div>

          {/* Email / CNPJ */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label htmlFor="p-email" style={labelStyle}>Email (Login da Empresa)</label>
              <input
                id="p-email"
                type="email"
                value={form.email}
                onChange={(e) => update('email', e.target.value)}
                required
                className="input-field"
                placeholder="contato@empresa.com"
                disabled={isEditing}
              />
            </div>
            <div>
              <label htmlFor="p-cnpj" style={labelStyle}>CNPJ</label>
              <input
                id="p-cnpj"
                value={form.cnpj}
                onChange={(e) => update('cnpj', e.target.value)}
                className="input-field"
                placeholder="00.000.000/0000-00"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="p-category" style={labelStyle}>Categoria</label>
            <select
              id="p-category"
              value={form.category}
              onChange={(e) => update('category', e.target.value)}
              className="input-field"
            >
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {/* City / State */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.75rem' }}>
            <div>
              <label htmlFor="p-city" style={labelStyle}>Cidade</label>
              <input
                id="p-city"
                value={form.city}
                onChange={(e) => update('city', e.target.value)}
                required
                className="input-field"
                placeholder="Chapada Diamantina"
              />
            </div>
            <div>
              <label htmlFor="p-state" style={labelStyle}>Estado</label>
              <input
                id="p-state"
                value={form.state}
                onChange={(e) => update('state', e.target.value)}
                required
                maxLength={2}
                className="input-field"
                placeholder="BA"
                style={{ textTransform: 'uppercase' }}
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="p-desc" style={labelStyle}>Descrição (opcional)</label>
            <textarea
              id="p-desc"
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              className="input-field"
              rows={3}
              placeholder="Breve descrição do estabelecimento…"
              style={{ resize: 'vertical', lineHeight: 1.5 }}
            />
          </div>

          {/* Reward amount */}
          <div>
            <label htmlFor="p-reward" style={labelStyle}>Folhas por scan</label>
            <input
              id="p-reward"
              type="number"
              min={1}
              max={1000}
              value={form.rewardAmount}
              onChange={(e) => update('rewardAmount', Number(e.target.value))}
              className="input-field"
            />
          </div>

          {/* Active toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <input
              id="p-active"
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => update('isActive', e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: 'var(--leaf-gold)' }}
            />
            <label htmlFor="p-active" style={{ ...labelStyle, margin: 0 }}>Empresa ativa</label>
          </div>

          {error && (
            <div style={{ background: 'rgba(139,46,46,0.2)', border: '1px solid rgba(139,46,46,0.4)', borderRadius: '8px', padding: '0.75rem', color: '#FCA5A5', fontSize: '0.875rem' }}>
              {error}
            </div>
          )}

          <button
            id="btn-save-partner"
            type="submit"
            disabled={loading}
            className="btn-gold"
          >
            {loading ? '⏳ Salvando…' : isEditing ? '💾 Salvar Alterações' : '🌿 Cadastrar Empresa'}
          </button>
        </form>
      </div>
    </main>
  )
}

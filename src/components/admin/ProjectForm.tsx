'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createProject } from '@/actions/projects'

export default function ProjectForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      await createProject(formData)
      // redirect is handled by Server Action
    } catch (err: any) {
      setError(err.message || 'Erro ao salvar projeto.')
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
        <Link href="/admin/projects" className="btn-ghost" style={{ fontSize: '0.85rem', padding: '0.4rem 0.75rem' }}>
          ← Voltar
        </Link>
        <h1 className="font-serif" style={{ fontSize: '1.3rem', color: 'var(--leaf-gold-light)', fontWeight: 700 }}>
          Novo Projeto Social
        </h1>
      </header>

      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem 1.5rem' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label htmlFor="title" style={labelStyle}>Título do Projeto/Benefício</label>
            <input
              id="title"
              name="title"
              required
              className="input-field"
              placeholder="Ex: Plantar 1 Árvore Nativa"
            />
          </div>

          <div>
            <label htmlFor="description" style={labelStyle}>Descrição</label>
            <textarea
              id="description"
              name="description"
              required
              className="input-field"
              rows={3}
              placeholder="Descreva o impacto..."
              style={{ resize: 'vertical', lineHeight: 1.5 }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label htmlFor="costInLeafs" style={labelStyle}>Custo em Folhas (Leafs)</label>
              <input
                id="costInLeafs"
                name="costInLeafs"
                type="number"
                min={1}
                required
                className="input-field"
                placeholder="Ex: 500"
              />
            </div>
            <div>
              <label htmlFor="imageUrl" style={labelStyle}>URL da Imagem (Opcional)</label>
              <input
                id="imageUrl"
                name="imageUrl"
                type="url"
                className="input-field"
                placeholder="https://exemplo.com/img.jpg"
              />
            </div>
          </div>

          {error && (
            <div style={{ background: 'rgba(139,46,46,0.2)', border: '1px solid rgba(139,46,46,0.4)', borderRadius: '8px', padding: '0.75rem', color: '#FCA5A5', fontSize: '0.875rem' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-gold"
            style={{ marginTop: '1rem' }}
          >
            {loading ? '⏳ Salvando…' : '🌿 Cadastrar Projeto'}
          </button>
        </form>
      </div>
    </main>
  )
}

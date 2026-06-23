'use client'

import { useState } from 'react'
import Link from 'next/link'

const CATEGORIES = [
  { value: 'ESCOLA', label: '🏫 Escola / Educação' },
  { value: 'HOTEL', label: '🏨 Hotel / Hospedagem' },
  { value: 'CAFE', label: '☕ Café / Restaurante' },
  { value: 'COMERCIO', label: '🛍️ Comércio / Loja' },
  { value: 'ONG', label: '🌱 ONG / Projeto Social' },
  { value: 'TURISMO', label: '🗺️ Turismo / Atração' },
  { value: 'EVENTO', label: '🎪 Eventos' },
  { value: 'OUTRO', label: '📍 Outro' },
]

export default function EmpresaCadastroPage() {
  const [form, setForm] = useState({
    tradeName: '',
    legalName: '',
    cnpj: '',
    category: '',
    city: '',
    state: '',
    description: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (form.password !== form.confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }
    if (form.password.length < 8) {
      setError('A senha deve ter ao menos 8 caracteres.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/empresa/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Erro ao realizar cadastro.')
      setSuccess(true)
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
    color: '#F5F0E8',
    fontSize: '0.95rem',
    outline: 'none',
    boxSizing: 'border-box',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '0.4rem',
    fontSize: '0.72rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#C9A84C',
  }

  if (success) {
    return (
      <main style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', background: '#0D1F17' }}>
        <div style={{ maxWidth: '480px', textAlign: 'center', padding: '3rem 2rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🌿</div>
          <h1 style={{ fontSize: '1.8rem', color: '#C9A84C', fontFamily: 'serif', marginBottom: '1rem' }}>
            Cadastro Enviado!
          </h1>
          <p style={{ color: 'rgba(245,240,232,0.7)', lineHeight: 1.7, marginBottom: '2rem' }}>
            Seu cadastro foi recebido com sucesso. Um administrador irá analisar as informações e ativar sua conta em breve.
            <br /><br />
            Você receberá acesso após a aprovação.
          </p>
          <Link href="/portal/login" style={{ display: 'inline-block', padding: '0.75rem 2rem', background: 'linear-gradient(135deg, #C9A84C, #E8C96A)', color: '#0D1F17', fontWeight: 700, borderRadius: '8px', textDecoration: 'none' }}>
            Ir para o Login
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main style={{ minHeight: '100dvh', padding: '2rem 1rem', background: '#0D1F17' }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <Link href="/" style={{ color: 'rgba(245,240,232,0.5)', fontSize: '0.85rem', textDecoration: 'none' }}>
            ← Voltar ao início
          </Link>
          <h1 style={{ fontSize: '2rem', color: '#C9A84C', fontFamily: 'serif', fontWeight: 700, marginTop: '1rem' }}>
            🌿 Cadastre sua Empresa
          </h1>
          <p style={{ color: 'rgba(245,240,232,0.6)', marginTop: '0.5rem' }}>
            Faça parte do ecossistema LeafPass e recompense seus clientes com Leafs.
          </p>
        </div>

        <div style={{ background: 'rgba(27,58,45,0.4)', border: '1px solid rgba(201,168,76,0.15)', borderRadius: '16px', padding: '2.5rem 2rem' }}>
          {error && (
            <div style={{ marginBottom: '1.5rem', padding: '0.875rem', background: 'rgba(255,50,50,0.1)', border: '1px solid rgba(255,50,50,0.3)', borderRadius: '8px', color: '#ff6b6b', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Dados da Empresa */}
            <div>
              <h2 style={{ color: '#E8C96A', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem', fontFamily: 'monospace' }}>
                Dados da Empresa
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label htmlFor="tradeName" style={labelStyle}>Nome Fantasia *</label>
                    <input id="tradeName" name="tradeName" required style={inputStyle} value={form.tradeName} onChange={handleChange} placeholder="Ex: Café do Nordeste" />
                  </div>
                  <div>
                    <label htmlFor="legalName" style={labelStyle}>Razão Social</label>
                    <input id="legalName" name="legalName" style={inputStyle} value={form.legalName} onChange={handleChange} placeholder="Ex: Café do Nordeste Ltda" />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label htmlFor="cnpj" style={labelStyle}>CNPJ</label>
                    <input id="cnpj" name="cnpj" style={inputStyle} value={form.cnpj} onChange={handleChange} placeholder="00.000.000/0000-00" />
                  </div>
                  <div>
                    <label htmlFor="category" style={labelStyle}>Categoria *</label>
                    <select id="category" name="category" required style={{ ...inputStyle, cursor: 'pointer' }} value={form.category} onChange={handleChange}>
                      <option value="">Selecione...</option>
                      {CATEGORIES.map(c => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                  <div>
                    <label htmlFor="city" style={labelStyle}>Cidade *</label>
                    <input id="city" name="city" required style={inputStyle} value={form.city} onChange={handleChange} placeholder="Ex: Fortaleza" />
                  </div>
                  <div>
                    <label htmlFor="state" style={labelStyle}>Estado *</label>
                    <input id="state" name="state" required maxLength={2} style={inputStyle} value={form.state} onChange={handleChange} placeholder="CE" />
                  </div>
                </div>

                <div>
                  <label htmlFor="description" style={labelStyle}>Descrição do Negócio</label>
                  <textarea id="description" name="description" rows={3} style={{ ...inputStyle, resize: 'vertical' }} value={form.description} onChange={handleChange} placeholder="Descreva brevemente sua empresa e o que ela oferece aos clientes..." />
                </div>
              </div>
            </div>

            {/* Dados de Acesso */}
            <div>
              <h2 style={{ color: '#E8C96A', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem', fontFamily: 'monospace' }}>
                Dados de Acesso
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label htmlFor="email" style={labelStyle}>Email *</label>
                  <input id="email" name="email" type="email" required style={inputStyle} value={form.email} onChange={handleChange} placeholder="contato@minhaempresa.com" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label htmlFor="password" style={labelStyle}>Senha *</label>
                    <input id="password" name="password" type="password" required style={inputStyle} value={form.password} onChange={handleChange} placeholder="Mín. 8 caracteres" />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" style={labelStyle}>Confirmar Senha *</label>
                    <input id="confirmPassword" name="confirmPassword" type="password" required style={inputStyle} value={form.confirmPassword} onChange={handleChange} placeholder="••••••••" />
                  </div>
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading} style={{ padding: '0.9rem', background: 'linear-gradient(135deg, #C9A84C, #E8C96A)', color: '#0D1F17', fontWeight: 700, border: 'none', borderRadius: '10px', fontSize: '1rem', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, marginTop: '0.5rem' }}>
              {loading ? 'Enviando...' : 'Cadastrar Empresa →'}
            </button>

            <p style={{ textAlign: 'center', color: 'rgba(245,240,232,0.5)', fontSize: '0.85rem' }}>
              Já tem conta?{' '}
              <Link href="/portal/login" style={{ color: '#C9A84C' }}>Fazer Login</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  )
}

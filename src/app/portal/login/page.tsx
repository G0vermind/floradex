'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false, // We handle redirect manually to avoid Next.js unhandled runtime errors
      })

      if (res?.error) {
        setError('Email ou senha incorretos.')
      } else {
        // O middleware cuida do redirect baseado na role (ADMIN ou COMPANY)
        router.push('/')
        router.refresh()
      }
    } catch (err) {
      setError('Ocorreu um erro inesperado.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main
      style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        background: '#0D1F17',
      }}
    >
      <div
        className="glass-card animate-fade-in"
        style={{ width: '100%', maxWidth: '420px', padding: '2.5rem 2rem', borderTop: '4px solid var(--leaf-gold)' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="font-serif text-gold-gradient" style={{ fontSize: '1.8rem', fontWeight: 700, letterSpacing: '0.04em' }}>
            LeafPass Portal
          </h1>
          <p className="font-mono" style={{ color: 'rgba(245,240,232,0.55)', fontSize: '0.8rem', marginTop: '0.25rem', letterSpacing: '0.06em' }}>
            Acesso Corporativo
          </p>
        </div>

        {error && (
          <div style={{ padding: '0.75rem', background: 'rgba(255, 50, 50, 0.1)', border: '1px solid rgba(255, 50, 50, 0.3)', borderRadius: '8px', color: '#ff6b6b', fontSize: '0.85rem', textAlign: 'center', marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label htmlFor="email" className="font-mono" style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--leaf-gold)', marginBottom: '0.4rem' }}>
              Email
            </label>
            <input 
              id="email" 
              type="email" 
              required 
              className="input-field" 
              placeholder="admin@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="font-mono" style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--leaf-gold)', marginBottom: '0.4rem' }}>
              Senha
            </label>
            <input 
              id="password" 
              type="password" 
              required 
              className="input-field" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" disabled={loading} className="btn-gold" style={{ marginTop: '0.5rem', width: '100%' }}>
            {loading ? 'Verificando...' : 'Entrar no Painel'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(201,168,76,0.15)', textAlign: 'center' }}>
          <p className="font-mono" style={{ color: 'rgba(245,240,232,0.4)', fontSize: '0.75rem', marginBottom: '0.75rem' }}>
            É uma empresa e ainda não tem conta?
          </p>
          <a href="/empresa/cadastro" style={{ color: 'var(--leaf-gold)', fontSize: '0.85rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
            🌿 Cadastrar minha empresa →
          </a>
        </div>
      </div>
    </main>
  )
}

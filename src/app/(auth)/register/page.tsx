'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { signup, type AuthState } from '@/actions/auth'

export default function RegisterPage() {
  const [state, action, pending] = useActionState<AuthState, FormData>(signup, undefined)

  return (
    <main
      style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <div
        className="glass-card animate-fade-in"
        style={{ width: '100%', maxWidth: '420px', padding: '2.5rem 2rem' }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🌿</div>
          <h1
            className="font-serif text-gold-gradient"
            style={{ fontSize: '2rem', fontWeight: 700, letterSpacing: '0.04em' }}
          >
            Criar Passaporte
          </h1>
          <p
            className="font-mono"
            style={{ color: 'rgba(245,240,232,0.55)', fontSize: '0.78rem', marginTop: '0.25rem', letterSpacing: '0.06em' }}
          >
            LEAFPASS · FLORESTAS.SOCIAL
          </p>
        </div>

        <div style={{ borderBottom: '1px solid rgba(201,168,76,0.2)', marginBottom: '1.75rem' }} />

        {/* Global error */}
        {state?.message && (
          <div
            style={{
              background: 'rgba(139, 46, 46, 0.2)',
              border: '1px solid rgba(139, 46, 46, 0.4)',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              marginBottom: '1.25rem',
              color: '#FCA5A5',
              fontSize: '0.875rem',
            }}
          >
            {state.message}
          </div>
        )}

        <form action={action} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Name */}
          <div>
            <label
              htmlFor="reg-name"
              className="font-mono"
              style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--leaf-gold)', marginBottom: '0.4rem' }}
            >
              Nome completo
            </label>
            <input
              id="reg-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              className="input-field"
              placeholder="Seu nome"
            />
            {state?.errors?.name && (
              <p style={{ color: '#FCA5A5', fontSize: '0.8rem', marginTop: '0.3rem' }}>
                {state.errors.name[0]}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="reg-email"
              className="font-mono"
              style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--leaf-gold)', marginBottom: '0.4rem' }}
            >
              Email
            </label>
            <input
              id="reg-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="input-field"
              placeholder="seu@email.com"
            />
            {state?.errors?.email && (
              <p style={{ color: '#FCA5A5', fontSize: '0.8rem', marginTop: '0.3rem' }}>
                {state.errors.email[0]}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="reg-password"
              className="font-mono"
              style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--leaf-gold)', marginBottom: '0.4rem' }}
            >
              Senha
            </label>
            <input
              id="reg-password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="input-field"
              placeholder="Mínimo 6 caracteres"
            />
            {state?.errors?.password && (
              <p style={{ color: '#FCA5A5', fontSize: '0.8rem', marginTop: '0.3rem' }}>
                {state.errors.password[0]}
              </p>
            )}
          </div>

          <button
            id="btn-register"
            type="submit"
            disabled={pending}
            className="btn-gold"
            style={{ marginTop: '0.5rem', width: '100%' }}
          >
            {pending ? '⏳ Criando…' : '📖 Criar meu Passaporte'}
          </button>
        </form>

        <p
          style={{
            textAlign: 'center',
            marginTop: '1.75rem',
            color: 'rgba(245,240,232,0.5)',
            fontSize: '0.875rem',
          }}
        >
          Já tem conta?{' '}
          <Link href="/login" style={{ color: 'var(--leaf-gold-light)', fontWeight: 600, textDecoration: 'none' }}>
            Entrar
          </Link>
        </p>
      </div>
    </main>
  )
}

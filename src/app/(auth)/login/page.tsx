"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState<"login" | "register" | "dev">("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [devRole, setDevRole] = useState<"USER" | "ADMIN" | "COMPANY">("USER")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleCredentials(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (mode === "dev") {
      const result = await signIn("credentials", {
        email: "gutogn@gmail.com",
        isDevLogin: "true",
        role: devRole,
        redirect: false,
      })

      if (result?.error) {
        setError("Erro no Dev Login")
        setLoading(false)
        return
      }

      router.push("/")
      router.refresh()
      return
    }

    if (mode === "register") {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Erro ao criar conta")
        setLoading(false)
        return
      }
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError("E-mail ou senha incorretos")
      setLoading(false)
      return
    }

    // O middleware cuida do redirect baseado na role
    router.push("/")
    router.refresh()
  }

  return (
    <main style={{ minHeight: '100dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background decoration */}
      <div style={{ position: 'absolute', top: '-20%', left: '-20%', width: '600px', height: '600px', background: 'radial-gradient(circle, var(--leaf-green-glow) 0%, transparent 70%)', opacity: 0.15, filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-20%', right: '-20%', width: '700px', height: '700px', background: 'radial-gradient(circle, var(--leaf-gold) 0%, transparent 70%)', opacity: 0.1, filter: 'blur(100px)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: '420px', zIndex: 10 }} className="animate-fade-in">

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <img src="/logo.png" alt="Florestas.social Logo" style={{ height: '56px', margin: '0 auto 1rem', display: 'block' }} onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling!.removeAttribute('style'); }} />
          <div style={{ display: 'none', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '2.5rem' }}>🌿</span>
          </div>
          <h1 className="font-serif text-gold-gradient" style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>LeafPass</h1>
          <p className="font-sans" style={{ color: 'rgba(245, 240, 232, 0.7)', fontSize: '0.95rem', marginTop: '0.25rem' }}>Passaporte de Engajamento Regional</p>
        </div>

        {/* Card */}
        <div className="glass-card" style={{ padding: '2.5rem', borderTop: '4px solid rgba(201,168,76,0.8)' }}>

          {/* Botão Google */}
          <button
            onClick={() => signIn("google")}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              background: '#fff',
              border: '1px solid rgba(245, 240, 232, 0.2)',
              borderRadius: 'var(--radius-md)',
              padding: '0.875rem',
              color: '#333',
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'none'}
          >
            {/* SVG oficial do Google */}
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.36-8.16 2.36-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Continuar com Google
          </button>

          {/* Separador */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1.75rem 0' }}>
            <div style={{ flex: 1, height: '1px', background: 'rgba(201, 168, 76, 0.3)' }} />
            <span style={{ color: 'rgba(245, 240, 232, 0.5)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>ou e-mail</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(201, 168, 76, 0.3)' }} />
          </div>

          {/* Tabs Login / Criar Conta / Dev */}
          <div style={{ display: 'flex', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-sm)', padding: '0.25rem', marginBottom: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
            {(["login", "register", "dev"] as const).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError("") }}
                type="button"
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  fontFamily: 'var(--font-sans)',
                  transition: 'all 0.2s',
                  border: 'none',
                  cursor: 'pointer',
                  background: mode === m ? 'linear-gradient(135deg, var(--leaf-green-mid), var(--leaf-green-dark))' : 'transparent',
                  color: mode === m ? 'var(--leaf-gold-light)' : 'rgba(245, 240, 232, 0.6)',
                  boxShadow: mode === m ? '0 2px 8px rgba(0,0,0,0.2)' : 'none'
                }}
              >
                {m === "login" ? "Entrar" : m === "register" ? "Criar conta" : "DEV"}
              </button>
            ))}
          </div>

          {/* Formulário */}
          <form onSubmit={handleCredentials} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {mode === "dev" && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <p style={{ color: 'var(--leaf-gold)', fontSize: '0.85rem', textAlign: 'center' }}>
                  Login mágico para gutogn@gmail.com
                </p>
                <select 
                  value={devRole} 
                  onChange={(e) => setDevRole(e.target.value as any)}
                  className="input-field"
                  style={{ backgroundColor: 'rgba(27, 58, 45, 0.8)' }}
                >
                  <option value="USER">Entrar como Usuário (Turista)</option>
                  <option value="ADMIN">Entrar como Administrador</option>
                  <option value="COMPANY">Entrar como Empresa</option>
                </select>
              </div>
            )}

            {mode !== "dev" && (
              <>
                {mode === "register" && (
                  <input
                    type="text"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="input-field"
                  />
                )}
                <input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input-field"
                />
                <input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  className="input-field"
                />
              </>
            )}

            {error && (
              <div style={{ background: 'rgba(139, 46, 46, 0.2)', border: '1px solid var(--leaf-red)', color: '#ffb3b3', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', textAlign: 'center' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-gold"
              style={{ width: '100%', marginTop: '0.5rem' }}
            >
              {loading ? "Aguarde..." : mode === "login" ? "Entrar com e-mail" : mode === "register" ? "Criar nova conta" : "Entrar Magicamente"}
            </button>
          </form>

          {/* Rodapé do card */}
          <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'rgba(245, 240, 232, 0.5)', marginTop: '2rem' }}>
            Ao continuar, você aceita nossos <a href="/termos" style={{ color: 'var(--leaf-gold-light)', textDecoration: 'none' }}>Termos de Uso</a>
          </p>
        </div>
      </div>
    </main>
  )
}


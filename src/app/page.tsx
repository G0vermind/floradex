import Link from 'next/link'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function LandingPage() {
  const session = await auth()
  if (session) {
    redirect('/leafpass')
  }

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* Background decoration */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, var(--leaf-green-glow) 0%, transparent 70%)', opacity: 0.15, filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, var(--leaf-gold) 0%, transparent 70%)', opacity: 0.08, filter: 'blur(80px)', pointerEvents: 'none' }} />

      {/* Header */}
      <header style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <img src="/logo.png" alt="Florestas.social Logo" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
        </Link>
        <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link href="/#como-funciona" style={{ fontSize: '0.9rem', color: 'rgba(245, 240, 232, 0.8)', textDecoration: 'none' }}>Como funciona</Link>
          <Link href="/login" className="btn-ghost" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>
            Entrar
          </Link>
        </nav>
      </header>

      <main className="container-lg" style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingTop: '4rem', paddingBottom: '4rem' }}>
        {/* Hero Section */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }} className="animate-fade-in">
          <div style={{ marginBottom: '1.5rem', display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(201, 168, 76, 0.1)', border: '1px solid rgba(201, 168, 76, 0.2)', borderRadius: '999px', color: 'var(--leaf-gold-light)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            A revolução do Cashback Verde
          </div>
          
          <h1 className="font-serif text-gold-gradient" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: '1.5rem', maxWidth: '900px' }}>
            Plataforma de impacto ambiental para empresas compensarem carbono e engajarem clientes.
          </h1>
          
          <p className="font-sans" style={{ fontSize: '1.1rem', color: 'rgba(245, 240, 232, 0.8)', maxWidth: '700px', marginBottom: '3rem', lineHeight: 1.6 }}>
            Transforme o plantio de árvores em compensação ambiental e recompensas. Uma plataforma ESG com zero fricção que une marcas sustentáveis e consumidores conscientes.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/portal/login" className="btn-gold" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
              Portal Corporativo
            </Link>
            <Link href="/login" className="btn-ghost" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
              Acessar Passaporte (Usuários)
            </Link>
          </div>
        </div>

        {/* B2B / B2B2C Sections */}
        <div id="como-funciona" style={{ marginTop: '8rem', marginBottom: '4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
          <div className="glass-card" style={{ padding: '2.5rem', borderTop: '4px solid rgba(52, 211, 153, 0.8)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏢</div>
            <h3 className="font-serif" style={{ fontSize: '1.6rem', color: 'var(--leaf-gold-light)', marginBottom: '1rem' }}>Para Empresas (B2B)</h3>
            <p style={{ color: 'rgba(245, 240, 232, 0.7)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Compre pacotes de impacto real (plantio de mudas e conservação) e converta isso em <strong>Códigos Promocionais</strong>. 
              Ao atrelar códigos aos seus produtos, você comprova suas metas ESG de forma rastreável enquanto fideliza clientes com uma recompensa que o mundo precisa.
            </p>
            <ul style={{ color: 'rgba(245, 240, 232, 0.8)', fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.5rem' }}>
              <li>✓ Rastreabilidade de impacto</li>
              <li>✓ Vitrine exclusiva da sua marca no momento do resgate</li>
              <li>✓ Incentivo direto para recompra (Cashback Verde)</li>
            </ul>
          </div>
          
          <div className="glass-card" style={{ padding: '2.5rem', borderTop: '4px solid rgba(201,168,76,0.8)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌱</div>
            <h3 className="font-serif" style={{ fontSize: '1.6rem', color: 'var(--leaf-gold-light)', marginBottom: '1rem' }}>O Cashback Verde (B2B2C)</h3>
            <p style={{ color: 'rgba(245, 240, 232, 0.7)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Turistas e Consumidores escaneiam os códigos dos parceiros e abrem o <strong>Leaf Pass</strong>. 
              Uma experiência imersiva onde cada resgate vira uma carimbada no passaporte, depositando Folhas digitais.
            </p>
            <ul style={{ color: 'rgba(245, 240, 232, 0.8)', fontSize: '0.95rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '1.5rem' }}>
              <li>✓ Zero fricção: login rápido via Google ou E-mail</li>
              <li>✓ Acúmulo de Folhas para trocar por recompensas locais</li>
              <li>✓ Conexão direta e gamificada com marcas sustentáveis</li>
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(201, 168, 76, 0.2)', padding: '3rem 2rem', marginTop: 'auto', background: 'rgba(27, 58, 45, 0.5)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '2rem' }}>
          <div>
            <img src="/logo.png" alt="Florestas.social Logo" style={{ height: '32px', marginBottom: '1rem' }} />
            <p style={{ color: 'rgba(245, 240, 232, 0.6)', fontSize: '0.9rem', maxWidth: '300px' }}>
              Conectando pessoas e marcas através do impacto ambiental real e rastreável.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '3rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h4 style={{ color: 'var(--leaf-gold-light)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Plataforma</h4>
              <Link href="/#como-funciona" style={{ color: 'rgba(245, 240, 232, 0.7)', fontSize: '0.9rem', textDecoration: 'none' }}>Como Funciona</Link>
              <Link href="/login" style={{ color: 'rgba(245, 240, 232, 0.7)', fontSize: '0.9rem', textDecoration: 'none' }}>Entrar</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h4 style={{ color: 'var(--leaf-gold-light)', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Legal</h4>
              <Link href="/termos" style={{ color: 'rgba(245, 240, 232, 0.7)', fontSize: '0.9rem', textDecoration: 'none' }}>Termos de Uso</Link>
              <Link href="/privacidade" style={{ color: 'rgba(245, 240, 232, 0.7)', fontSize: '0.9rem', textDecoration: 'none' }}>Privacidade</Link>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: '1200px', margin: '3rem auto 0', paddingTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)', textAlign: 'center', color: 'rgba(245, 240, 232, 0.5)', fontSize: '0.85rem' }}>
          &copy; {new Date().getFullYear()} Florestas.social. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  )
}

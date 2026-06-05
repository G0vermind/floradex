'use client'

import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section style={{ 
      background: 'var(--forest-void)', 
      position: 'relative', 
      overflow: 'hidden',
      paddingTop: 'calc(80px + var(--section-gap))',
      paddingBottom: 'var(--section-gap)',
    }}>
      {/* Texture overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%220.03%22 mix-blend-mode=%22overlay%22/%3E%3C/svg%3E")',
        opacity: 0.6,
        pointerEvents: 'none',
      }} />

      <div style={{ 
        maxWidth: 'var(--container-max)', 
        margin: '0 auto', 
        padding: '0 var(--container-pad)',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '4rem',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
      }} className="hero-grid">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Eyebrow */}
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            background: 'rgba(201, 168, 76, 0.1)',
            border: '1px solid rgba(201, 168, 76, 0.3)',
            padding: '0.5rem 1rem',
            borderRadius: '100px',
            color: 'var(--gold-light)',
            fontSize: 'var(--text-sm)',
            fontWeight: 500,
            marginBottom: '2rem'
          }}>
            <span>🌱</span> Mais de 12.400 árvores plantadas por empresas parceiras
          </div>

          <h1 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: 'var(--text-hero)',
            lineHeight: 1.1,
            color: 'white',
            marginBottom: '1.5rem',
            fontWeight: 700
          }}>
            Cada venda que<br />
            sua empresa faz<br />
            pode plantar<br />
            <em style={{ color: 'var(--gold-warm)' }}>uma árvore.</em>
          </h1>

          <p style={{ 
            fontSize: 'var(--text-body-lg)',
            color: 'var(--forest-mist)',
            maxWidth: '540px',
            lineHeight: 1.6,
            marginBottom: '3rem'
          }}>
            O Florestas.Social transforma sua compensação ambiental em uma ferramenta real de marketing e fidelização. Sua empresa compra impacto. Seus clientes acompanham as árvores crescer. Todos ganham — inclusive o planeta.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <button style={{ 
              background: 'var(--forest-mid)', 
              color: 'white', 
              border: 'none', 
              padding: '1rem 2rem', 
              borderRadius: 'var(--radius-btn)',
              fontSize: '1.125rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'var(--transition-base)'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--forest-bright)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--forest-mid)')}
            >
              🌿 Ver Planos e Preços
            </button>
            <button style={{ 
              background: 'transparent', 
              color: 'white', 
              border: '1px solid rgba(255,255,255,0.3)', 
              padding: '1rem 2rem', 
              borderRadius: 'var(--radius-btn)',
              fontSize: '1.125rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'var(--transition-base)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
            }}
            >
              Falar com Especialista →
            </button>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--forest-mist)', fontSize: '0.875rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: 'var(--forest-bright)' }}>✓</span> Sem jargão técnico</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: 'var(--forest-bright)' }}>✓</span> Pagamento via Pix ou Cartão</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: 'var(--forest-bright)' }}>✓</span> Relatório de impacto mensal</span>
          </div>
        </motion.div>

        {/* Mockup */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
        >
          {/* Animated floating wrapper */}
          <div className="hero-mockup" style={{ 
            width: '100%', 
            maxWidth: '320px', 
            aspectRatio: '1 / 2', 
            background: 'linear-gradient(135deg, var(--forest-deep) 0%, var(--forest-void) 100%)',
            borderRadius: '2.5rem',
            border: '8px solid #1A1A1A',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255,255,255,0.05)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Fake App Content */}
            <div style={{ padding: '2rem 1.5rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ background: 'rgba(255,255,255,0.1)', height: '40px', borderRadius: '100px', marginBottom: '2rem' }} />
              <div style={{ background: 'linear-gradient(135deg, var(--gold-warm) 0%, var(--gold-light) 100%)', height: '180px', borderRadius: '1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(201, 168, 76, 0.2)' }}>
                 <span style={{ fontSize: '4rem' }}>🌳</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.05)', height: '60px', borderRadius: '1rem', marginBottom: '1rem' }} />
              <div style={{ background: 'rgba(255,255,255,0.05)', height: '60px', borderRadius: '1rem', marginBottom: 'auto' }} />
              <div style={{ background: 'var(--forest-mid)', height: '50px', borderRadius: '100px', marginTop: '1rem' }} />
            </div>
            
            {/* Glossy overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 20%)', pointerEvents: 'none' }} />
          </div>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50%       { transform: translateY(-16px) rotate(-1deg); }
        }
        .hero-mockup {
          animation: float 5s ease-in-out infinite;
        }
        @media (min-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr 1fr; }
        }
      `}} />
    </section>
  )
}

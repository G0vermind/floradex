'use client'

import { motion } from 'framer-motion'

export default function FinalCtaSection() {
  return (
    <section style={{ 
      background: 'var(--forest-mid)', 
      color: 'white',
      paddingTop: 'calc(var(--section-gap) * 1.5)',
      paddingBottom: 'calc(var(--section-gap) * 1.5)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Texture overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M50 100 Q 100 0 150 100 T 250 100%22 fill=%22none%22 stroke=%22rgba(255,255,255,0.05)%22 stroke-width=%2220%22/%3E%3C/svg%3E")',
        backgroundSize: '300px',
        opacity: 0.5,
        pointerEvents: 'none',
      }} />

      <div style={{ 
        maxWidth: 'var(--container-max)', 
        margin: '0 auto', 
        padding: '0 var(--container-pad)',
        position: 'relative',
        zIndex: 1,
        textAlign: 'center'
      }}>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-h2)',
            maxWidth: '700px',
            margin: '0 auto 1.5rem',
            lineHeight: 1.1
          }}
        >
          Sua empresa ainda não está plantando <em style={{ color: 'var(--gold-warm)' }}>nada</em>.<br/>Mude isso hoje.
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-body-lg)',
            color: 'var(--forest-mist)',
            maxWidth: '600px',
            margin: '0 auto 3rem',
            lineHeight: 1.6
          }}
        >
          Junte-se às empresas que já transformaram cada venda em uma árvore rastreável. Comece pelo plano que faz sentido para o seu tamanho — e cresça no seu ritmo.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}
        >
          <a href="#planos" style={{ 
            background: 'white', 
            color: 'var(--forest-deep)', 
            textDecoration: 'none',
            padding: '1rem 2.5rem', 
            borderRadius: 'var(--radius-btn)',
            fontSize: '1.125rem',
            fontWeight: 700,
            transition: 'var(--transition-base)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            🌿 Assinar Agora — a partir de R$ 97
          </a>
          <button style={{ 
            background: 'transparent', 
            color: 'white', 
            border: '1px solid rgba(255,255,255,0.3)', 
            padding: '1rem 2.5rem', 
            borderRadius: 'var(--radius-btn)',
            fontSize: '1.125rem',
            fontWeight: 600,
            cursor: 'pointer',
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
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{ color: 'var(--forest-mist)', fontSize: '0.875rem' }}
        >
          Sem contrato de fidelidade nos planos mensais.<br/>
          Pix ou Cartão. Nota fiscal garantida.
        </motion.div>

      </div>
    </section>
  )
}

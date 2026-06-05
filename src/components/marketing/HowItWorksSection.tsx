'use client'

import { motion } from 'framer-motion'

export default function HowItWorksSection() {
  const containerVariants = {
    visible: { transition: { staggerChildren: 0.2 } }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } }
  }

  const steps = [
    {
      num: '①',
      title: 'EMPRESA CONTRATA',
      icon: '🏢🍃',
      desc: 'Sua empresa escolhe um plano e faz o pagamento via Pix ou Cartão. Em minutos, recebe um painel com seu saldo de "Folhas" e o QR Code exclusivo do mês para distribuir aos clientes.',
      highlight: '→ A partir de R$ 97/mês'
    },
    {
      num: '②',
      title: 'CLIENTE COMPRA E GANHA',
      icon: '📱📜',
      desc: 'O cliente faz uma compra no seu estabelecimento, abre o LeafPass e escaneia o QR Code do balcão. Ganha 10 Folhas instantaneamente e um carimbo no passaporte digital.',
      highlight: '→ Zero fricção. Zero app novo para baixar.*',
      asterisk: '* Progressive Web App — funciona no navegador do celular'
    },
    {
      num: '③',
      title: 'ÁRVORE RASTREADA',
      icon: '🌳📍',
      desc: 'A cada 100 Folhas acumuladas, convertemos os tokens e plantamos uma árvore com nome rastreável em uma de nossas fazendas parceiras. O cliente recebe foto, coordenadas GPS e atualização mensal.',
      highlight: '→ Transparência total'
    }
  ]

  return (
    <section id="como-funciona" style={{ 
      background: 'var(--forest-deep)', 
      color: 'white',
      paddingTop: 'var(--section-gap)',
      paddingBottom: 'var(--section-gap)',
    }}>
      <div style={{ 
        maxWidth: 'var(--container-max)', 
        margin: '0 auto', 
        padding: '0 var(--container-pad)',
      }}>
        
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ 
              color: 'var(--gold-warm)', 
              fontFamily: 'var(--font-mono)', 
              letterSpacing: '0.15em', 
              fontSize: 'var(--text-sm)',
              textTransform: 'uppercase',
              marginBottom: '1rem'
            }}
          >
            O Efeito LeafPass
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: 'var(--text-h2)', 
              lineHeight: 1.2,
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            Três passos para transformar seu negócio num agente de impacto.
          </motion.h2>
        </div>

        <motion.div 
          className="steps-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          style={{
            display: 'grid',
            gap: '2rem',
            position: 'relative'
          }}
        >
          {steps.map((step, i) => (
            <motion.div key={i} variants={cardVariants} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: 'var(--radius-card)',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              zIndex: 2,
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '1.5rem', color: 'var(--gold-warm)' }}>{step.num}</span>
                <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', letterSpacing: '0.05em', color: 'white', margin: 0 }}>
                  {step.title}
                </h3>
              </div>

              <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{step.icon}</div>

              <p style={{ color: 'var(--forest-mist)', fontSize: '1rem', lineHeight: 1.6, flex: 1 }}>
                {step.desc}
              </p>

              <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                <p style={{ color: 'var(--gold-warm)', fontWeight: 600, fontSize: '0.875rem' }}>{step.highlight}</p>
                {step.asterisk && <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', marginTop: '0.5rem' }}>{step.asterisk}</p>}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 1024px) {
          .steps-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}} />
    </section>
  )
}

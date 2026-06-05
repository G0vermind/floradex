'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

function Counter({ from, to, duration = 2, suffix = '' }: { from: number, to: number, duration?: number, suffix?: string }) {
  const [count, setCount] = useState(from)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      let startTime: number
      let animationFrame: number

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
        // easeOutQuart
        const easeProgress = 1 - Math.pow(1 - progress, 4)
        setCount(Math.floor(easeProgress * (to - from) + from))
        
        if (progress < 1) {
          animationFrame = window.requestAnimationFrame(step)
        }
      }
      
      animationFrame = window.requestAnimationFrame(step)
      return () => window.cancelAnimationFrame(animationFrame)
    }
  }, [inView, from, to, duration])

  return (
    <span ref={ref}>
      {count.toLocaleString('pt-BR')}{suffix}
    </span>
  )
}

export default function SocialProofSection() {
  return (
    <section style={{ 
      background: 'var(--forest-void)', 
      color: 'white',
      paddingTop: 'var(--section-gap)',
      paddingBottom: 'var(--section-gap)',
    }}>
      <div style={{ 
        maxWidth: 'var(--container-max)', 
        margin: '0 auto', 
        padding: '0 var(--container-pad)',
        display: 'flex',
        flexDirection: 'column',
        gap: '6rem'
      }}>
        
        {/* Numbers Row */}
        <div className="numbers-grid" style={{
          display: 'grid',
          gap: '2rem',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--gold-warm)', fontWeight: 700, lineHeight: 1 }}>
              <Counter from={0} to={12400} suffix="+" />
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--forest-mist)', marginTop: '0.5rem' }}>
              árvores<br/>plantadas
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--gold-warm)', fontWeight: 700, lineHeight: 1 }}>
              R$ <Counter from={0} to={2.1} suffix="M+" />
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--forest-mist)', marginTop: '0.5rem' }}>
              em impacto<br/>gerado
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--gold-warm)', fontWeight: 700, lineHeight: 1 }}>
              <Counter from={0} to={98} suffix="%" />
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--forest-mist)', marginTop: '0.5rem' }}>
              satisfação<br/>de clientes
            </div>
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'var(--gold-warm)', fontWeight: 700, lineHeight: 1 }}>
              <Counter from={0} to={47} />
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--forest-mist)', marginTop: '0.5rem' }}>
              cidades<br/>atendidas
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            position: 'relative',
            maxWidth: '900px',
            margin: '0 auto',
            textAlign: 'center',
            padding: '2rem'
          }}
        >
          <div style={{
            position: 'absolute',
            top: '-40px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '8rem',
            fontFamily: 'var(--font-display)',
            color: 'var(--gold-warm)',
            opacity: 0.15,
            lineHeight: 1,
            pointerEvents: 'none',
            zIndex: 0
          }}>
            "
          </div>
          
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.25rem, 3vw, 2rem)',
            lineHeight: 1.4,
            position: 'relative',
            zIndex: 1,
            marginBottom: '2rem'
          }}>
            Colocamos o QR Code do Florestas.Social no balcão e, em 30 dias, mais de 60 clientes escanearam. Eles viram as árvores no app e voltaram para comprar de novo. Isso não é sustentabilidade. É estratégia.
          </p>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'url("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop") center/cover' }} />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontWeight: 700, color: 'white' }}>Mariana Souza</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--forest-mist)' }}>Café Raízes · Fortaleza, CE</div>
            </div>
          </div>
        </motion.div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 640px) {
          .numbers-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (min-width: 1024px) {
          .numbers-grid { grid-template-columns: repeat(4, 1fr); }
        }
      `}} />
    </section>
  )
}

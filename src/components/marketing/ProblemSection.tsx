'use client'

import { motion } from 'framer-motion'

export default function ProblemSection() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } }
  }

  return (
    <section style={{ 
      background: 'var(--cream-paper)', 
      color: 'var(--ink-dark)',
      paddingTop: 'var(--section-gap)',
      paddingBottom: 'var(--section-gap)',
    }}>
      <div style={{ 
        maxWidth: 'var(--container-max)', 
        margin: '0 auto', 
        padding: '0 var(--container-pad)',
      }}>
        
        <motion.h2 
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-h2)',
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto 4rem',
            lineHeight: 1.2
          }}
        >
          Compensação ambiental que ninguém acredita não vale nada para ninguém.
        </motion.h2>

        <div className="problem-grid" style={{
          display: 'grid',
          gap: '2rem',
        }}>
          {/* Card: O Problema */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            style={{
              background: '#F0EBE1',
              borderRadius: 'var(--radius-card)',
              padding: '2.5rem',
              borderLeft: '4px solid #D35B5B',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <h3 style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '0.875rem', 
              color: 'var(--ink-mid)',
              letterSpacing: '0.1em',
              marginBottom: '1rem'
            }}>ANTES</h3>
            <hr style={{ border: 'none', borderTop: '1px solid var(--cream-dark)', marginBottom: '2rem' }} />
            
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span style={{ color: '#D35B5B', flexShrink: 0 }}>❌</span>
                <p style={{ margin: 0, fontSize: 'var(--text-body-lg)', color: 'var(--ink-dark)' }}>
                  Sua empresa paga por um certificado PDF que nenhum cliente jamais vai ver.
                </p>
              </li>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span style={{ color: '#D35B5B', flexShrink: 0 }}>❌</span>
                <p style={{ margin: 0, fontSize: 'var(--text-body-lg)', color: 'var(--ink-dark)' }}>
                  "Plantamos X árvores" vira slogan vazio — greenwashing que corrói a confiança.
                </p>
              </li>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span style={{ color: '#D35B5B', flexShrink: 0 }}>❌</span>
                <p style={{ margin: 0, fontSize: 'var(--text-body-lg)', color: 'var(--ink-dark)' }}>
                  Nenhuma conexão entre a compra do cliente e o impacto gerado.
                </p>
              </li>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span style={{ color: '#D35B5B', flexShrink: 0 }}>❌</span>
                <p style={{ margin: 0, fontSize: 'var(--text-body-lg)', color: 'var(--ink-dark)' }}>
                  O investimento ambiental some no custo operacional sem gerar retorno.
                </p>
              </li>
            </ul>
          </motion.div>

          {/* Card: A Solução */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            style={{
              background: '#EAF0EB',
              borderRadius: 'var(--radius-card)',
              padding: '2.5rem',
              borderLeft: '4px solid var(--forest-mid)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <h3 style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '0.875rem', 
              color: 'var(--forest-mid)',
              letterSpacing: '0.1em',
              marginBottom: '1rem'
            }}>COM O FLORESTAS.SOCIAL</h3>
            <hr style={{ border: 'none', borderTop: '1px solid rgba(45, 90, 61, 0.2)', marginBottom: '2rem' }} />
            
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--forest-mid)', flexShrink: 0 }}>✅</span>
                <p style={{ margin: 0, fontSize: 'var(--text-body-lg)', color: 'var(--ink-dark)' }}>
                  Cada árvore tem um ID rastreável. Seu cliente acompanha no app.
                </p>
              </li>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--forest-mid)', flexShrink: 0 }}>✅</span>
                <p style={{ margin: 0, fontSize: 'var(--text-body-lg)', color: 'var(--ink-dark)' }}>
                  Sua marca aparece no passaporte verde do cliente toda vez que ele abre o LeafPass.
                </p>
              </li>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--forest-mid)', flexShrink: 0 }}>✅</span>
                <p style={{ margin: 0, fontSize: 'var(--text-body-lg)', color: 'var(--ink-dark)' }}>
                  A compra do cliente gera Folhas. As Folhas financiam o plantio real.
                </p>
              </li>
              <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--forest-mid)', flexShrink: 0 }}>✅</span>
                <p style={{ margin: 0, fontSize: 'var(--text-body-lg)', color: 'var(--ink-dark)' }}>
                  Relatório mensal de impacto com dados reais de CO₂, espécies e localização.
                </p>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 768px) {
          .problem-grid { grid-template-columns: 1fr 1fr; }
        }
      `}} />
    </section>
  )
}

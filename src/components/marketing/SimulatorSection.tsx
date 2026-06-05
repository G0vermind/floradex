'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function SimulatorSection() {
  const [clients, setClients] = useState(10)
  const [visits, setVisits] = useState(4)

  const generatedLeafs = clients * visits * 10
  const treesPerMonth = generatedLeafs / 100
  const treesPerYear = treesPerMonth * 12

  return (
    <section style={{ 
      background: 'var(--cream-paper)', 
      color: 'var(--ink-dark)',
      paddingTop: 'var(--section-gap)',
      paddingBottom: '2rem', // Reduced bottom padding since it leads to Pricing
    }}>
      <div style={{ 
        maxWidth: 'var(--container-max)', 
        margin: '0 auto', 
        padding: '0 var(--container-pad)',
      }}>
        
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ 
              color: 'var(--ink-mid)', 
              fontFamily: 'var(--font-mono)', 
              letterSpacing: '0.15em', 
              fontSize: 'var(--text-sm)',
              textTransform: 'uppercase',
              marginBottom: '1rem'
            }}
          >
            Simulador de Impacto
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
              maxWidth: '700px',
              margin: '0 auto'
            }}
          >
            Veja o impacto do engajamento<br/>dos seus clientes.
          </motion.h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{
            background: 'white',
            borderRadius: 'var(--radius-card)',
            padding: '3rem',
            boxShadow: 'var(--shadow-card)',
            display: 'grid',
            gap: '4rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}
          className="simulator-grid"
        >
          {/* Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <p style={{ color: 'var(--ink-mid)', fontSize: '1.125rem', marginBottom: '1rem' }}>
              Se seus clientes escanearem com frequência...
            </p>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
                <label style={{ color: 'var(--ink-dark)' }}>Clientes ativos/mês</label>
                <span style={{ color: 'var(--forest-mid)', fontFamily: 'var(--font-mono)' }}>{clients}</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="500" 
                step="10"
                value={clients} 
                onChange={(e) => setClients(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--forest-mid)' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontFamily: 'var(--font-body)', fontWeight: 600 }}>
                <label style={{ color: 'var(--ink-dark)' }}>Visitas por cliente/mês</label>
                <span style={{ color: 'var(--forest-mid)', fontFamily: 'var(--font-mono)' }}>{visits}</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="10" 
                step="1"
                value={visits} 
                onChange={(e) => setVisits(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--forest-mid)' }}
              />
            </div>

            <div style={{ background: '#EAF0EB', padding: '1.5rem', borderRadius: '1rem', marginTop: '1rem' }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--forest-deep)', margin: 0, display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <span>💡</span>
                <span><b>Como funciona:</b> Cada escaneamento no seu estabelecimento gera 10 Folhas para o cliente. Quando a rede acumula 100 Folhas, plantamos 1 árvore rastreável.</span>
              </p>
            </div>
          </div>

          {/* Results */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '1rem', background: 'rgba(201, 168, 76, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
                🍃
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2.5rem', color: 'var(--gold-warm)', fontWeight: 700, lineHeight: 1 }}>
                  {generatedLeafs.toLocaleString('pt-BR')}
                </div>
                <div style={{ color: 'var(--ink-mid)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.25rem', fontWeight: 600 }}>
                  Folhas geradas/mês
                </div>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--cream-dark)' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '1rem', background: 'var(--forest-void)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
                🌳
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '3rem', color: 'var(--forest-mid)', fontWeight: 700, lineHeight: 1 }}>
                  {treesPerMonth.toLocaleString('pt-BR')}
                </div>
                <div style={{ color: 'var(--ink-mid)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.25rem', fontWeight: 600 }}>
                  Árvores plantadas/mês
                </div>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--cream-dark)' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '1rem', background: 'transparent', border: '2px dashed var(--cream-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>
                🌲
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2.5rem', color: 'var(--forest-bright)', fontWeight: 700, lineHeight: 1 }}>
                  {treesPerYear.toLocaleString('pt-BR')}
                </div>
                <div style={{ color: 'var(--ink-mid)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.25rem', fontWeight: 600 }}>
                  Árvores em 12 meses
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 768px) {
          .simulator-grid { grid-template-columns: 1fr 1fr; align-items: center; }
        }
      `}} />
    </section>
  )
}

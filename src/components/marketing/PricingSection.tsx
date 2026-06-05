'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckoutButton } from './CheckoutButton'

export default function PricingSection() {
  const [activeTab, setActiveTab] = useState<'mensal' | 'escala'>('mensal')

  const toggleVariants = {
    initial: (direction: number) => ({ opacity: 0, x: direction > 0 ? 20 : -20 }),
    animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
    exit: (direction: number) => ({ opacity: 0, x: direction < 0 ? 20 : -20, transition: { duration: 0.3 } })
  }

  const direction = activeTab === 'mensal' ? -1 : 1

  return (
    <section id="planos" style={{ 
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
        
        {/* Header */}
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
            Planos e Preços
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
              marginBottom: '2rem'
            }}
          >
            Escolha o tamanho<br/>do seu impacto.
          </motion.h2>

          {/* Toggle */}
          <div style={{ 
            display: 'inline-flex', 
            background: 'var(--cream-dark)', 
            padding: '4px', 
            borderRadius: '100px',
            position: 'relative'
          }}>
            <button
              onClick={() => setActiveTab('mensal')}
              style={{
                background: activeTab === 'mensal' ? 'var(--forest-mid)' : 'transparent',
                color: activeTab === 'mensal' ? 'white' : 'var(--ink-mid)',
                border: 'none',
                padding: '0.75rem 2rem',
                borderRadius: '100px',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s',
                fontFamily: 'var(--font-body)'
              }}
            >
              Apoio Mensal
            </button>
            <button
              onClick={() => setActiveTab('escala')}
              style={{
                background: activeTab === 'escala' ? 'var(--forest-mid)' : 'transparent',
                color: activeTab === 'escala' ? 'white' : 'var(--ink-mid)',
                border: 'none',
                padding: '0.75rem 2rem',
                borderRadius: '100px',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s',
                fontFamily: 'var(--font-body)'
              }}
            >
              Plantio em Escala
            </button>
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeTab}
            custom={direction}
            variants={toggleVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {activeTab === 'mensal' ? <MonthlyPlans /> : <ScalePlan />}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}

function MonthlyPlans() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <p style={{ color: 'var(--ink-mid)', textAlign: 'center', marginBottom: '3rem', maxWidth: '500px' }}>
        Para escolas, comércios locais e pequenas empresas. Recorrência mensal. Cancele quando quiser.
      </p>

      <div className="pricing-grid" style={{ 
        display: 'grid', 
        gap: '2rem', 
        width: '100%',
        alignItems: 'center'
      }}>
        {/* Plano Broto */}
        <div style={{ 
          background: 'white', 
          borderRadius: 'var(--radius-card)', 
          padding: '2.5rem', 
          boxShadow: 'var(--shadow-card)' 
        }}>
          <div style={{ display: 'inline-block', background: 'var(--cream-paper)', color: 'var(--ink-dark)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1rem' }}>
            Ideal para começar
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Plano Broto</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--forest-deep)', marginBottom: '2rem' }}>
            R$ 240 <span style={{ fontSize: '1rem', color: 'var(--ink-mid)', fontWeight: 400 }}>/mês</span>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--cream-dark)', marginBottom: '1.5rem' }} />

          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--ink-dark)' }}>
            <li>🍃 100 Folhas/mês para distribuir</li>
            <li>🌱 1 árvore/mês (potencial)</li>
            <li>🌲 12 árvores geradas no ano</li>
            <li>💲 R$ 2,40 por Folha</li>
            <li>📱 1 QR Code de estabelecimento</li>
          </ul>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <CheckoutButton priceKey="BROTO_MONTHLY" method="pix" label="Assinar com Pix 💠" style={{ width: '100%', background: '#32BCAD', color: 'white', border: 'none', padding: '1rem', borderRadius: 'var(--radius-btn)', fontWeight: 600, fontSize: '1rem' }} />
            <CheckoutButton priceKey="BROTO_MONTHLY" method="card" label="Assinar com Cartão 💳" style={{ width: '100%', background: 'white', color: 'var(--ink-dark)', border: '1px solid var(--cream-dark)', padding: '1rem', borderRadius: 'var(--radius-btn)', fontWeight: 600, fontSize: '1rem' }} />
          </div>
        </div>

        {/* Plano Raiz (Destaque) */}
        <div style={{ 
          background: 'var(--forest-void)', 
          color: 'white',
          borderRadius: 'var(--radius-card)', 
          padding: '3rem 2.5rem', 
          boxShadow: 'var(--shadow-card-hover)',
          border: '1px solid var(--gold-warm)',
          position: 'relative'
        }}>
          <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--gold-warm)', color: 'var(--ink-dark)', padding: '4px 16px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', boxShadow: '0 4px 12px rgba(201,168,76,0.3)' }}>
            Mais escolhido
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', marginBottom: '0.5rem', color: 'var(--gold-light)' }}>Plano Raiz</h3>
          <div style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '2rem' }}>
            R$ 660 <span style={{ fontSize: '1rem', color: 'var(--forest-mist)', fontWeight: 400 }}>/mês</span>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', marginBottom: '1.5rem' }} />

          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--cream-paper)' }}>
            <li>🍃 300 Folhas/mês para distribuir</li>
            <li>🌳 3 árvores/mês (potenciais)</li>
            <li>🌲 36 árvores geradas no ano</li>
            <li>💲 R$ 2,20 por Folha</li>
            <li>📱 3 QR Codes de estabelecimento</li>
            <li>🎨 Selo "Parceiro Verde"</li>
          </ul>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <CheckoutButton priceKey="RAIZ_MONTHLY" method="pix" label="Assinar com Pix 💠" style={{ width: '100%', background: '#32BCAD', color: 'white', border: 'none', padding: '1rem', borderRadius: 'var(--radius-btn)', fontWeight: 600, fontSize: '1rem' }} />
            <CheckoutButton priceKey="RAIZ_MONTHLY" method="card" label="Assinar com Cartão 💳" style={{ width: '100%', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '1rem', borderRadius: 'var(--radius-btn)', fontWeight: 600, fontSize: '1rem' }} />
          </div>
        </div>

        {/* Plano Floresta */}
        <div style={{ 
          background: 'white', 
          borderRadius: 'var(--radius-card)', 
          padding: '2.5rem', 
          boxShadow: 'var(--shadow-card)' 
        }}>
          <div style={{ display: 'inline-block', background: 'var(--cream-paper)', color: 'var(--ink-dark)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1rem' }}>
            Para redes e franquias
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Plano Floresta</h3>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--forest-deep)', marginBottom: '2rem' }}>
            R$ 1.400 <span style={{ fontSize: '1rem', color: 'var(--ink-mid)', fontWeight: 400 }}>/mês</span>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--cream-dark)', marginBottom: '1.5rem' }} />

          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--ink-dark)' }}>
            <li>🍃 700 Folhas/mês para distribuir</li>
            <li>🌲 7 árvores/mês (potenciais)</li>
            <li>🌲 84 árvores geradas no ano</li>
            <li>💲 R$ 2,00 por Folha</li>
            <li>📱 10 QR Codes (multi-unidades)</li>
            <li>🎨 Co-branding personalizado</li>
          </ul>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <CheckoutButton priceKey="FLORESTA_MONTHLY" method="pix" label="Assinar com Pix 💠" style={{ width: '100%', background: '#32BCAD', color: 'white', border: 'none', padding: '1rem', borderRadius: 'var(--radius-btn)', fontWeight: 600, fontSize: '1rem' }} />
            <CheckoutButton priceKey="FLORESTA_MONTHLY" method="card" label="Assinar com Cartão 💳" style={{ width: '100%', background: 'white', color: 'var(--ink-dark)', border: '1px solid var(--cream-dark)', padding: '1rem', borderRadius: 'var(--radius-btn)', fontWeight: 600, fontSize: '1rem' }} />
          </div>
        </div>
      </div>
      
      <p style={{ marginTop: '3rem', color: 'var(--ink-mid)', fontSize: '0.875rem', textAlign: 'center', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <span>🔒 Pagamento seguro via Stripe</span>
        <span style={{ color: 'var(--cream-dark)' }}>•</span>
        <span>✅ Nota fiscal emitida</span>
        <span style={{ color: 'var(--cream-dark)' }}>•</span>
        <span>↩️ Cancele a qualquer momento</span>
      </p>

      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 768px) {
          .pricing-grid { grid-template-columns: 1fr 1fr; align-items: start !important; }
        }
        @media (min-width: 1024px) {
          .pricing-grid { grid-template-columns: 1fr 1.1fr 1fr; align-items: center !important; }
        }
      `}} />
    </div>
  )
}

function ScalePlan() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    
    try {
      await fetch('/api/contact/enterprise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      setSuccess(true)
    } catch(err) {
      alert('Erro ao enviar contato. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <p style={{ color: 'var(--ink-mid)', textAlign: 'center', marginBottom: '3rem', maxWidth: '600px' }}>
        Para médias e grandes empresas com metas ESG, campanhas sazonais ou necessidade de volume. Proposta personalizada.
      </p>

      <div style={{ 
        background: 'white',
        borderRadius: 'var(--radius-card)',
        padding: '3rem',
        boxShadow: 'var(--shadow-card)',
        maxWidth: '900px',
        width: '100%',
        display: 'grid',
        gap: '4rem',
      }} className="scale-grid">
        
        <div>
          <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: 'var(--forest-mid)', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>PLANO ESG PLENO</h3>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '2rem', color: 'var(--ink-dark)' }}>R$ 200 por árvore certificada</h4>
          
          <div style={{ background: '#EAF0EB', padding: '1.5rem', borderRadius: '1rem', border: '1px solid rgba(45, 90, 61, 0.1)' }}>
            <h5 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, marginBottom: '1rem', color: 'var(--forest-deep)' }}>O que está incluso:</h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--ink-dark)' }}>
              <li>🌳 Mínimo de 20 árvores/mês (2.000+ Folhas/mês)</li>
              <li>📋 Relatório de impacto com validação por terceiros</li>
              <li>🏅 Certificação ESG inclusa</li>
              <li>🤝 Integração via API com seu sistema</li>
              <li>📣 Assessoria de comunicação ambiental</li>
            </ul>
          </div>
        </div>

        <div>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--ink-dark)' }}>Falar com um Especialista</h4>
          
          {success ? (
            <div style={{ background: '#EAF0EB', padding: '2rem', borderRadius: '1rem', textAlign: 'center', color: 'var(--forest-deep)' }}>
              <span style={{ fontSize: '3rem' }}>✅</span>
              <p style={{ fontWeight: 600, marginTop: '1rem' }}>Recebemos sua solicitação!</p>
              <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>Um especialista entrará em contato em até 24h.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input required name="name" placeholder="Nome completo*" style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--cream-dark)', fontFamily: 'var(--font-body)' }} />
              <input required name="email" type="email" placeholder="E-mail corporativo*" style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--cream-dark)', fontFamily: 'var(--font-body)' }} />
              <input required name="company" placeholder="Empresa*" style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--cream-dark)', fontFamily: 'var(--font-body)' }} />
              <input name="role" placeholder="Cargo" style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--cream-dark)', fontFamily: 'var(--font-body)' }} />
              
              <select name="volume" style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--cream-dark)', fontFamily: 'var(--font-body)', background: 'white' }}>
                <option value="">Volume estimado de árvores</option>
                <option value="200-500">200 a 500</option>
                <option value="500-2000">500 a 2.000</option>
                <option value="2000+">Mais de 2.000</option>
                <option value="unsure">Não sei ainda</option>
              </select>

              <select name="contact_method" style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--cream-dark)', fontFamily: 'var(--font-body)', background: 'white' }}>
                <option value="">Como prefere ser contatado?</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="email">E-mail</option>
                <option value="video">Videochamada</option>
              </select>

              <button type="submit" disabled={loading} style={{ background: 'var(--forest-mid)', color: 'white', border: 'none', padding: '1.25rem', borderRadius: 'var(--radius-btn)', fontWeight: 600, fontSize: '1rem', cursor: loading ? 'wait' : 'pointer', marginTop: '0.5rem', opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Enviando...' : 'Enviar — resposta em até 24h'}
              </button>
            </form>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 768px) {
          .scale-grid { grid-template-columns: 1fr 1fr; }
        }
      `}} />
    </div>
  )
}

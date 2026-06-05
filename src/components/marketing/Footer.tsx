export default function Footer() {
  return (
    <footer style={{ 
      background: 'var(--forest-void)', 
      color: 'var(--forest-mist)',
      paddingTop: '5rem',
      paddingBottom: '2rem',
    }}>
      <div style={{ 
        maxWidth: 'var(--container-max)', 
        margin: '0 auto', 
        padding: '0 var(--container-pad)',
      }}>
        
        <div className="footer-grid" style={{
          display: 'grid',
          gap: '3rem',
          marginBottom: '4rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.25rem', fontFamily: 'var(--font-display)', marginBottom: '1rem' }}>
              <span style={{ color: 'var(--forest-bright)' }}>🍃</span>
              <span style={{ color: 'var(--cream-paper)' }}>Florestas.Social</span>
            </div>
            <p style={{ maxWidth: '250px', lineHeight: 1.6 }}>
              Engajamento ambiental com impacto real.
            </p>
          </div>

          <div>
            <h4 style={{ color: 'var(--cream-paper)', fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '0.875rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Produto</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li><a href="#como-funciona" style={{ color: 'inherit', textDecoration: 'none' }}>Como Funciona</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>LeafPass App</a></li>
              <li><a href="#planos" style={{ color: 'inherit', textDecoration: 'none' }}>Planos</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>API (Em breve)</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'var(--cream-paper)', fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '0.875rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Empresa</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Sobre Nós</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Blog</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Contato</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Imprensa</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: 'var(--cream-paper)', fontFamily: 'var(--font-mono)', fontWeight: 500, fontSize: '0.875rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Legal</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Termos de Uso</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Política de Privacidade</a></li>
              <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Política Ambiental</a></li>
            </ul>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', marginBottom: '2rem' }} />

        <div className="footer-bottom" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '2rem',
          fontSize: '0.875rem'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span>🔒 Pagamentos processados com segurança via Stripe</span>
            <span>🌱 Árvores plantadas em parceria com fazendas certificadas no Brasil</span>
          </div>
          <div style={{ textAlign: 'right' }}>
            © 2025 Florestas.Social — Todos os direitos reservados<br/>
            <span style={{ opacity: 0.6 }}>CNPJ: XX.XXX.XXX/0001-XX</span>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 640px) {
          .footer-grid { grid-template-columns: 2fr 1fr 1fr 1fr; }
        }
        @media (max-width: 768px) {
          .footer-bottom { flex-direction: column; text-align: center; }
          .footer-bottom > div { text-align: center !important; }
        }
      `}} />
    </footer>
  )
}

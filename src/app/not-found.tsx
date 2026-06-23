import Link from 'next/link'

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: '4rem' }}>🌿</div>
      <h1
        className="font-serif"
        style={{ fontSize: '2rem', color: 'var(--leaf-gold)', letterSpacing: '0.05em' }}
      >
        Página não encontrada
      </h1>
      <p style={{ color: 'rgba(245,240,232,0.6)', maxWidth: '320px' }}>
        Esta rota não existe no seu passaporte. Volte ao início e continue explorando.
      </p>
        <Link href="/floradex" className="btn-primary">
          Voltar ao Início
        </Link>
    </main>
  )
}

import Link from 'next/link'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export const metadata = { title: 'Minhas Campanhas — LeafPass' }

export default async function EmpresaCampaignsPage() {
  const session = await auth()
  if (!session || (session.user as any)?.role !== 'COMPANY') {
    redirect('/portal/login')
  }

  const company = await prisma.company.findUnique({ where: { userId: session.user.id! } })
  if (!company) redirect('/dashboard/empresa')

  const campaigns = await prisma.campaign.findMany({
    where: { companyId: company.id },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <main style={{ minHeight: '100dvh', paddingBottom: '2rem' }}>
      <header style={{
        background: 'linear-gradient(180deg, rgba(27,58,45,0.98) 0%, rgba(27,58,45,0.85) 100%)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(201,168,76,0.2)',
        padding: '1rem 1.5rem',
        position: 'sticky',
        top: 0,
        zIndex: 40,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/dashboard/empresa" className="btn-ghost" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
              ← Painel
            </Link>
            <h1 className="font-serif text-gold-gradient" style={{ fontSize: '1.3rem', fontWeight: 700 }}>
              Minhas Campanhas
            </h1>
          </div>
          <Link href="/dashboard/empresa/campaigns/new" className="btn-primary" style={{ padding: '0.5rem 1.25rem' }}>
            + Nova Campanha
          </Link>
        </div>
      </header>

      <div className="container-lg" style={{ paddingTop: '2rem' }}>
        <p style={{ color: 'rgba(245,240,232,0.6)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          Crie campanhas para que os usuários ganhem 🍃 Leafs e carimbos ao visitar ou participar de suas promoções.
        </p>

        {campaigns.length === 0 ? (
          <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎯</div>
            <p style={{ color: 'rgba(245,240,232,0.6)', marginBottom: '1.5rem' }}>
              Nenhuma campanha criada ainda.
            </p>
            <Link href="/dashboard/empresa/campaigns/new" className="btn-primary">
              Criar Primeira Campanha
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {campaigns.map((c) => (
              <div key={c.id} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontWeight: 700, color: 'var(--leaf-cream)', fontSize: '1rem' }}>{c.title}</span>
                    <span style={{ fontSize: '0.75rem', color: c.isActive ? '#4ade80' : '#ff6b6b' }}>
                      ● {c.isActive ? 'Ativa' : 'Inativa'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'rgba(245,240,232,0.6)' }}>
                    <span>🍃 +{c.leafReward} Leafs</span>
                    <span>Usos: {c.currentUses}{c.maxUses ? `/${c.maxUses}` : ''}</span>
                    {c.codeText && <span>Código: <code style={{ color: 'var(--leaf-gold-light)' }}>{c.codeText}</code></span>}
                    {c.expiresAt && <span>Expira: {new Date(c.expiresAt).toLocaleDateString('pt-BR')}</span>}
                  </div>
                </div>
                <Link href={`/dashboard/empresa/campaigns/${c.id}`} className="btn-ghost" style={{ fontSize: '0.8rem', padding: '0.4rem 0.875rem', whiteSpace: 'nowrap' }}>
                  Ver QR / Editar
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

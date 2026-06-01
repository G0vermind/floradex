import Link from 'next/link'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export const metadata = { title: 'Campanhas — Admin' }

export default async function CampaignsAdminPage() {
  const session = await auth()
  if (!session || (session.user as any)?.role !== 'ADMIN') {
    redirect('/portal/login')
  }

  const campaigns = await prisma.campaign.findMany({
    orderBy: { createdAt: 'desc' },
    include: { company: { select: { tradeName: true } } },
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
            <Link href="/admin" className="btn-ghost" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
              ← Voltar
            </Link>
            <h1 className="font-serif text-gold-gradient" style={{ fontSize: '1.4rem', fontWeight: 700 }}>
              Campanhas
            </h1>
          </div>
          <Link href="/admin/campaigns/new" className="btn-primary" style={{ padding: '0.5rem 1.25rem' }}>
            + Nova Campanha
          </Link>
        </div>
      </header>

      <div className="container-lg" style={{ paddingTop: '2rem' }}>
        <p style={{ color: 'rgba(245,240,232,0.6)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
          Campanhas permitem que usuários ganhem 🍃 Leafs + carimbos ao participar de eventos, visitas e compras.
        </p>

        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
          {campaigns.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'rgba(245,240,232,0.5)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎯</div>
              <p>Nenhuma campanha criada ainda.</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Título</th>
                  <th>🍃 Leafs</th>
                  <th>Código</th>
                  <th>Empresa</th>
                  <th>Usos</th>
                  <th>Expira</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c) => (
                  <tr key={c.id}>
                    <td>
                      {c.isActive ? (
                        <span style={{ color: '#4ade80', fontSize: '0.8rem' }}>● Ativo</span>
                      ) : (
                        <span style={{ color: '#ff6b6b', fontSize: '0.8rem' }}>● Inativo</span>
                      )}
                    </td>
                    <td style={{ fontWeight: 600, color: 'var(--leaf-cream)', maxWidth: '180px' }}>
                      {c.title}
                    </td>
                    <td>
                      <span style={{ color: 'var(--leaf-gold)', fontWeight: 700 }}>+{c.leafReward}</span>
                    </td>
                    <td>
                      {c.codeText ? (
                        <code style={{ background: 'rgba(201,168,76,0.1)', padding: '0.15rem 0.4rem', borderRadius: '4px', fontSize: '0.78rem', color: 'var(--leaf-gold-light)' }}>
                          {c.codeText}
                        </code>
                      ) : (
                        <span style={{ color: 'rgba(245,240,232,0.3)', fontSize: '0.8rem' }}>—</span>
                      )}
                    </td>
                    <td style={{ fontSize: '0.85rem', color: 'rgba(245,240,232,0.7)' }}>
                      {c.company?.tradeName || <span style={{ color: 'rgba(245,240,232,0.3)' }}>Global</span>}
                    </td>
                    <td style={{ fontSize: '0.85rem' }}>
                      {c.currentUses}{c.maxUses ? `/${c.maxUses}` : ''}
                    </td>
                    <td style={{ fontSize: '0.8rem', color: 'rgba(245,240,232,0.6)' }}>
                      {c.expiresAt ? new Date(c.expiresAt).toLocaleDateString('pt-BR') : '—'}
                    </td>
                    <td>
                      <Link href={`/admin/campaigns/${c.id}`} className="btn-ghost" style={{ fontSize: '0.75rem', padding: '0.3rem 0.75rem' }}>
                        Editar / QR
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  )
}

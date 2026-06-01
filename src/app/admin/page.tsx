import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { logout } from '@/app/actions/auth'

export const metadata = { title: 'Admin — LeafPass' }

export default async function AdminPage() {
  const session = await auth()
  if (!session || (session.user as any)?.role !== 'ADMIN') redirect('/portal/login')

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  const monthAgo = new Date()
  monthAgo.setDate(monthAgo.getDate() - 30)

  const [
    scansToday,
    scansWeek,
    scansMonth,
    totalUsers,
    totalCompanies,
    topCompanies,
    leafsIssued,
  ] = await Promise.all([
    prisma.scanLog.count({ where: { scannedAt: { gte: today } } }),
    prisma.scanLog.count({ where: { scannedAt: { gte: weekAgo } } }),
    prisma.scanLog.count({ where: { scannedAt: { gte: monthAgo } } }),
    prisma.user.count(),
    prisma.company.count({ where: { isActive: true } }),
    prisma.scanLog.groupBy({
      by: ['companyId'],
      _count: { companyId: true },
      orderBy: { _count: { companyId: 'desc' } },
      take: 5,
    }),
    prisma.user.aggregate({ _sum: { offChainLeafs: true } }),
  ])

  // Resolve partner names for top companies
  const topCompanyDetails = await Promise.all(
    topCompanies.map(async (tc: any) => {
      const c = await prisma.company.findUnique({ where: { id: tc.companyId }, select: { tradeName: true, category: true } })
      return { name: c?.tradeName ?? 'Unknown', category: c?.category ?? 'OUTRO', count: tc._count.companyId }
    })
  )

  return (
    <main style={{ minHeight: '100dvh', paddingBottom: '2rem' }}>
      {/* Header */}
      <header
        style={{
          background: 'linear-gradient(180deg, rgba(27,58,45,0.98) 0%, rgba(27,58,45,0.85) 100%)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(201,168,76,0.2)',
          padding: '1rem 1.5rem',
          position: 'sticky',
          top: 0,
          zIndex: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h1 className="font-serif text-gold-gradient" style={{ fontSize: '1.4rem', fontWeight: 700 }}>
          🌿 LeafPass Admin
        </h1>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Link href="/admin/campaigns" className="btn-primary" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
            Campanhas
          </Link>
          <Link href="/admin/companies" className="btn-primary" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
            Empresas
          </Link>
          <form action={logout}>
            <button type="submit" className="btn-ghost" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>Sair</button>
          </form>
        </div>
      </header>

      <div className="container-lg" style={{ paddingTop: '2rem' }}>
        {/* Metrics grid */}
        <h2 className="font-serif" style={{ fontSize: '1.3rem', color: 'var(--leaf-gold-light)', marginBottom: '1rem' }}>
          Métricas Gerais
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Scans Hoje', value: scansToday },
            { label: 'Scans (7 dias)', value: scansWeek },
            { label: 'Scans (30 dias)', value: scansMonth },
            { label: 'Usuários', value: totalUsers },
            { label: 'Empresas Ativas', value: totalCompanies },
            { label: 'Folhas Emitidas', value: Math.round(leafsIssued._sum.offChainLeafs ?? 0) },
          ].map((m) => (
            <div key={m.label} className="metric-card">
              <div className="metric-value">{m.value.toLocaleString('pt-BR')}</div>
              <div className="metric-label">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Top Companies */}
        <h2 className="font-serif" style={{ fontSize: '1.3rem', color: 'var(--leaf-gold-light)', marginBottom: '1rem' }}>
          Top 5 Empresas
        </h2>

        <div className="glass-card" style={{ padding: '0', overflow: 'hidden', marginBottom: '2rem' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Empresa</th>
                <th>Categoria</th>
                <th>Scans</th>
              </tr>
            </thead>
            <tbody>
              {topCompanyDetails.map((p, i) => (
                <tr key={i}>
                  <td style={{ color: 'var(--leaf-gold)', fontWeight: 700, width: '40px' }}>{i + 1}</td>
                  <td>{p.name}</td>
                  <td>
                    <span style={{
                      background: 'rgba(201,168,76,0.1)',
                      border: '1px solid rgba(201,168,76,0.2)',
                      borderRadius: '4px',
                      padding: '0.2rem 0.5rem',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--leaf-gold)',
                    }}>
                      {p.category}
                    </span>
                  </td>
                  <td style={{ fontWeight: 700, color: 'var(--leaf-gold-light)' }}>{p.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}

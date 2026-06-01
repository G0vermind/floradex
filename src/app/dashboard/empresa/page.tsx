import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import QrCodeDisplay from '@/components/admin/QrCodeDisplay'

import { logout } from '@/app/actions/auth'

export const metadata = { title: 'Dashboard Empresa — LeafPass' }

export default async function CompanyDashboardPage() {
  const session = await auth()
  
  if (!session || (session.user as any)?.role !== 'COMPANY') {
    redirect('/portal/login')
  }

  const userId = session.user.id

  const company = await prisma.company.findUnique({
    where: { userId },
  })

  if (!company) {
    return (
      <main style={{ minHeight: '100dvh', padding: '2rem', textAlign: 'center', color: 'rgba(245,240,232,0.6)' }}>
        <h1>Sua conta de empresa ainda não foi configurada pelo administrador.</h1>
      </main>
    )
  }

  // Estatísticas
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const monthAgo = new Date()
  monthAgo.setDate(monthAgo.getDate() - 30)

  const [scansToday, scansMonth, totalScans, recentScans] = await Promise.all([
    prisma.scanLog.count({ where: { companyId: company.id, scannedAt: { gte: today } } }),
    prisma.scanLog.count({ where: { companyId: company.id, scannedAt: { gte: monthAgo } } }),
    prisma.scanLog.count({ where: { companyId: company.id } }),
    prisma.scanLog.findMany({
      where: { companyId: company.id },
      orderBy: { scannedAt: 'desc' },
      take: 10,
      include: { user: { select: { name: true, email: true } } },
    }),
  ])

  return (
    <main style={{ minHeight: '100dvh', paddingBottom: '2rem' }}>
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
        <h1 className="font-serif" style={{ fontSize: '1.3rem', color: 'var(--leaf-gold-light)', fontWeight: 700 }}>
            Dashboard: {company.tradeName}
          </h1>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Link href="/dashboard/empresa/campaigns" className="btn-primary" style={{ fontSize: '0.85rem', padding: '0.4rem 1rem' }}>
              🎯 Campanhas
            </Link>
            <form action={logout}>
              <button type="submit" className="btn-ghost" style={{ fontSize: '0.85rem' }}>Sair</button>
            </form>
          </div>
      </header>

      <div className="container-lg" style={{ paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        {/* QR Code Section */}
        <section className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <h2 className="font-serif" style={{ fontSize: '1.5rem', color: 'var(--leaf-gold)' }}>Seu QR Code do Mês</h2>
          <p style={{ color: 'rgba(245,240,232,0.7)', textAlign: 'center', maxWidth: '400px', fontSize: '0.9rem' }}>
            Imprima ou exiba este QR Code para que os usuários possam escanear e ganhar {company.rewardAmount} folhas. 
            Este código muda automaticamente a cada mês para evitar fraudes.
          </p>
          <div style={{ background: 'white', padding: '1rem', borderRadius: '12px' }}>
            <QrCodeDisplay secret={company.monthlyQrSecret} partnerName={company.tradeName} />
          </div>
        </section>

        {/* Estatísticas */}
        <section>
          <h2 className="font-serif" style={{ fontSize: '1.3rem', color: 'var(--leaf-gold-light)', marginBottom: '1rem' }}>Visão Geral</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
            <div className="metric-card">
              <div className="metric-value">{scansToday}</div>
              <div className="metric-label">Scans Hoje</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">{scansMonth}</div>
              <div className="metric-label">Scans este Mês</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">{totalScans}</div>
              <div className="metric-label">Total de Scans</div>
            </div>
          </div>
        </section>

        {/* Últimos Scans */}
        <section>
          <h2 className="font-serif" style={{ fontSize: '1.3rem', color: 'var(--leaf-gold-light)', marginBottom: '1rem' }}>Últimos Scans</h2>
          {recentScans.length === 0 ? (
            <div className="glass-card" style={{ textAlign: 'center', color: 'rgba(245,240,232,0.5)' }}>
              Nenhum scan registrado ainda.
            </div>
          ) : (
            <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Data/Hora</th>
                    <th>Usuário</th>
                  </tr>
                </thead>
                <tbody>
                  {recentScans.map((scan) => (
                    <tr key={scan.id}>
                      <td>{scan.scannedAt.toLocaleString('pt-BR')}</td>
                      <td>{scan.user.name || scan.user.email || 'Usuário Anônimo'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

      </div>
    </main>
  )
}

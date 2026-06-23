import { redirect } from 'next/navigation'
import Link from 'next/link'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import QrCodeDisplay from '@/components/admin/QrCodeDisplay'
import ApproveButton from '@/components/admin/ApproveButton'

export const metadata = { title: 'Empresas — Admin LeafPass' }

const CATEGORY_EMOJI: Record<string, string> = {
  ESCOLA:   '🏫',
  HOTEL:    '🏨',
  CAFE:     '☕',
  COMERCIO: '🛍️',
  ONG:      '🌱',
  OUTRO:    '📍',
}

export default async function CompaniesPage() {
  const session = await auth()
  if (!session || (session.user as any)?.role !== 'ADMIN') redirect('/floradex')

  const companies = await prisma.company.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      tradeName: true,
      legalName: true,
      category: true,
      city: true,
      state: true,
      rewardAmount: true,
      isActive: true,
      monthlyQrSecret: true,
    },
  })

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          <Link href="/admin" className="btn-ghost" style={{ fontSize: '0.85rem', padding: '0.4rem 0.75rem' }}>
            ← Admin
          </Link>
          <h1 className="font-serif" style={{ fontSize: '1.3rem', color: 'var(--leaf-gold-light)', fontWeight: 700 }}>
            Empresas Parceiras
          </h1>
        </div>
        <Link href="/admin/companies/new" className="btn-primary" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
          + Nova Empresa
        </Link>
      </header>

      <div className="container-lg" style={{ paddingTop: '2rem' }}>
        {companies.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: '4rem', color: 'rgba(245,240,232,0.5)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌿</div>
            <p>Nenhuma empresa cadastrada ainda.</p>
            <Link href="/admin/companies/new" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-flex' }}>
              Cadastrar primeira empresa
            </Link>
          </div>
        ) : (
          <div className="glass-card" style={{ overflow: 'hidden' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Empresa</th>
                  <th>Categoria</th>
                  <th>Cidade/UF</th>
                  <th>Folhas</th>
                  <th>Status</th>
                  <th>QR Code</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {companies.map((p) => (
                  <tr key={p.id}>
                    <td style={{ fontWeight: 600 }}>{p.tradeName}</td>
                    <td>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                        {CATEGORY_EMOJI[p.category]} {p.category}
                      </span>
                    </td>
                    <td style={{ color: 'rgba(245,240,232,0.6)', fontSize: '0.85rem' }}>
                      {p.city}, {p.state}
                    </td>
                    <td style={{ color: 'var(--leaf-gold-light)', fontWeight: 700 }}>
                      🍃 {p.rewardAmount}
                    </td>
                    <td>
                      <span style={{
                        padding: '0.2rem 0.6rem',
                        borderRadius: '999px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        background: p.isActive ? 'rgba(74,124,89,0.3)' : 'rgba(100,100,100,0.3)',
                        color: p.isActive ? 'var(--leaf-green-glow)' : 'rgba(245,240,232,0.4)',
                        border: `1px solid ${p.isActive ? 'rgba(74,124,89,0.5)' : 'rgba(100,100,100,0.3)'}`,
                      }}>
                        {p.isActive ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td>
                      <QrCodeDisplay secret={p.monthlyQrSecret} partnerName={p.tradeName} />
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <Link
                          href={`/admin/companies/${p.id}`}
                          className="btn-ghost"
                          style={{ fontSize: '0.8rem', padding: '0.3rem 0.7rem' }}
                        >
                          Editar
                        </Link>
                        {!p.isActive && (
                          <ApproveButton companyId={p.id} />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  )
}

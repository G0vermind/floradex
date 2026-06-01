import Link from 'next/link'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import CampaignForm from '@/components/admin/CampaignForm'
import CampaignQrDisplay from '@/components/CampaignQrDisplay'

export const metadata = { title: 'Editar Campanha — Admin' }

export default async function EditCampaignPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth()
  if (!session || (session.user as any)?.role !== 'ADMIN') {
    redirect('/portal/login')
  }

  const campaign = await prisma.campaign.findUnique({
    where: { id },
    include: { company: { select: { tradeName: true } } },
  })

  if (!campaign) redirect('/admin/campaigns')

  const companies = await prisma.company.findMany({ select: { id: true, tradeName: true }, orderBy: { tradeName: 'asc' } })

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link href="/admin/campaigns" className="btn-ghost" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
            ← Voltar
          </Link>
          <h1 className="font-serif text-gold-gradient" style={{ fontSize: '1.4rem', fontWeight: 700 }}>
            Editar Campanha
          </h1>
        </div>
      </header>

      <div className="container-lg" style={{ paddingTop: '2rem', display: 'grid', gridTemplateColumns: '1fr auto', gap: '3rem', alignItems: 'start' }}>
        {/* Formulário de edição */}
        <div>
          {campaign.company && (
            <p style={{ color: 'rgba(245,240,232,0.5)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              Campanha da empresa: <strong style={{ color: 'var(--leaf-gold-light)' }}>{campaign.company.tradeName}</strong>
            </p>
          )}
          <CampaignForm 
            initialData={{
              ...campaign,
              expiresAt: campaign.expiresAt ? campaign.expiresAt.toISOString() : null,
            }} 
            companies={companies} 
          />
        </div>

        {/* QR Code ao lado */}
        <div className="glass-card" style={{ padding: '1.5rem', textAlign: 'center', minWidth: '280px' }}>
          <h2 className="font-serif" style={{ fontSize: '1.1rem', color: 'var(--leaf-gold)', marginBottom: '1.5rem' }}>
            QR Code desta Campanha
          </h2>
          <CampaignQrDisplay
            qrSecret={campaign.qrSecret}
            campaignTitle={campaign.title}
            codeText={campaign.codeText}
            leafReward={campaign.leafReward}
          />
          <p style={{ color: 'rgba(245,240,232,0.4)', fontSize: '0.75rem', marginTop: '1rem' }}>
            Imprima ou exiba este QR Code no local do evento/estabelecimento.
          </p>
        </div>
      </div>
    </main>
  )
}

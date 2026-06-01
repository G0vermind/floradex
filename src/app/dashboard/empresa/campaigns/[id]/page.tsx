import Link from 'next/link'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import CampaignForm from '@/components/admin/CampaignForm'
import CampaignQrDisplay from '@/components/CampaignQrDisplay'

export const metadata = { title: 'Editar Campanha — LeafPass Empresa' }

export default async function EditEmpresaCampaignPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await auth()
  if (!session || (session.user as any)?.role !== 'COMPANY') {
    redirect('/portal/login')
  }

  const company = await prisma.company.findUnique({ where: { userId: session.user.id! } })
  if (!company) redirect('/dashboard/empresa')

  const campaign = await prisma.campaign.findFirst({
    where: { id, companyId: company.id },
  })

  if (!campaign) redirect('/dashboard/empresa/campaigns')

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
          <Link href="/dashboard/empresa/campaigns" className="btn-ghost" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>
            ← Voltar
          </Link>
          <h1 className="font-serif text-gold-gradient" style={{ fontSize: '1.3rem', fontWeight: 700 }}>
            Editar Campanha
          </h1>
        </div>
      </header>

      <div className="container-lg" style={{ paddingTop: '2rem', display: 'grid', gridTemplateColumns: '1fr auto', gap: '3rem', alignItems: 'start' }}>
        <CampaignForm 
          initialData={{
            ...campaign,
            expiresAt: campaign.expiresAt ? campaign.expiresAt.toISOString() : null,
          }} 
          basePath="/dashboard/empresa/campaigns" 
        />

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
            Imprima ou exiba este QR no seu estabelecimento.
          </p>
        </div>
      </div>
    </main>
  )
}

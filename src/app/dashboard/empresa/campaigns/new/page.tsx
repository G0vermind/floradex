import Link from 'next/link'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import CampaignForm from '@/components/admin/CampaignForm'

export const metadata = { title: 'Nova Campanha — LeafPass Empresa' }

export default async function NewEmpresaCampaignPage() {
  const session = await auth()
  if (!session || (session.user as any)?.role !== 'COMPANY') {
    redirect('/portal/login')
  }

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
            ← Cancelar
          </Link>
          <h1 className="font-serif text-gold-gradient" style={{ fontSize: '1.3rem', fontWeight: 700 }}>
            Nova Campanha
          </h1>
        </div>
      </header>

      <div className="container-lg" style={{ paddingTop: '2rem' }}>
        <p style={{ color: 'rgba(245,240,232,0.6)', marginBottom: '2rem', fontSize: '0.9rem' }}>
          O QR Code será gerado automaticamente ao criar a campanha. Você poderá visualizá-lo na tela de edição.
        </p>
        <CampaignForm basePath="/dashboard/empresa/campaigns" />
      </div>
    </main>
  )
}

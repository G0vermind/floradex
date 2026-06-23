import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export default async function SettingsPage() {
  const session = await auth()
  if (!session?.user?.email) {
    redirect('/login')
  }

  // Get fresh user data
  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!user) {
    redirect('/login')
  }

  // Server action to update settings
  async function updateSettings(formData: FormData) {
    'use server'
    const name = formData.get('name') as string
    const phone = formData.get('phone') as string

    await prisma.user.update({
      where: { email: session!.user!.email! },
      data: { name, phone }
    })
    
    revalidatePath('/settings')
  }

  return (
    <main style={{ minHeight: '100dvh', padding: '2rem 1.5rem', maxWidth: '800px', margin: '0 auto' }}>
      <header className="page-header" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
        <Link href="/floradex" className="btn-ghost" style={{ padding: '0.5rem' }}>
          &larr; Voltar
        </Link>
        <h1 className="font-serif text-gold-gradient" style={{ fontSize: '2rem', fontWeight: 700 }}>
          Configurações do Passaporte
        </h1>
      </header>

      <div className="glass-card animate-fade-in" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h2 className="font-serif" style={{ fontSize: '1.4rem', color: 'var(--leaf-gold)', marginBottom: '1.5rem' }}>
          Perfil de Viajante
        </h2>

        <form action={updateSettings} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label htmlFor="name" className="font-mono" style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--leaf-gold)', marginBottom: '0.4rem' }}>
              Nome Completo
            </label>
            <input id="name" name="name" type="text" defaultValue={user.name || ''} className="input-field" placeholder="Seu nome" />
          </div>

          <div>
            <label htmlFor="email" className="font-mono" style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--leaf-gold)', marginBottom: '0.4rem' }}>
              Email (Acesso)
            </label>
            <input id="email" name="email" type="email" defaultValue={user.email || ''} className="input-field" disabled style={{ opacity: 0.6, cursor: 'not-allowed' }} />
          </div>

          <div>
            <label htmlFor="phone" className="font-mono" style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--leaf-gold)', marginBottom: '0.4rem' }}>
              WhatsApp / Telefone
            </label>
            <input id="phone" name="phone" type="tel" defaultValue={user.phone || ''} className="input-field" placeholder="(11) 99999-9999" />
          </div>

          <button type="submit" className="btn-gold" style={{ marginTop: '1rem', alignSelf: 'flex-start' }}>
            Salvar Alterações
          </button>
        </form>
      </div>

      <div className="glass-card animate-fade-in" style={{ padding: '2rem', animationDelay: '100ms' }}>
        <h2 className="font-serif" style={{ fontSize: '1.4rem', color: 'var(--leaf-gold)', marginBottom: '1.5rem' }}>
          Customização (Em Breve)
        </h2>
        <p style={{ color: 'rgba(245,240,232,0.6)', fontSize: '0.95rem' }}>
          Nas próximas atualizações você poderá escolher a capa do seu passaporte digital, modo claro/escuro e notificações push.
        </p>
      </div>
    </main>
  )
}

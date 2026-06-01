import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import CompanyForm from '@/components/admin/CompanyForm'

export const metadata = { title: 'Nova Empresa — Admin LeafPass' }

export default async function NewCompanyPage() {
  const session = await auth()
  if (!session || (session.user as any)?.role !== 'ADMIN') redirect('/leafpass')
  return <CompanyForm />
}

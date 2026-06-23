import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import CompanyForm from '@/components/admin/CompanyForm'

export const metadata = { title: 'Editar Empresa — Admin LeafPass' }

export default async function EditCompanyPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session || (session.user as any)?.role !== 'ADMIN') redirect('/floradex')

  const { id } = await params

  const company = await prisma.company.findUnique({ 
    where: { id },
    include: { user: true }
  })
  
  if (!company) redirect('/admin/companies')

  return (
    <CompanyForm
      initialData={{
        id: company.id,
        tradeName: company.tradeName,
        legalName: company.legalName,
        email: company.user?.email || '',
        cnpj: company.cnpj || '',
        category: company.category,
        city: company.city,
        state: company.state,
        description: company.description ?? '',
        rewardAmount: company.rewardAmount,
        isActive: company.isActive,
      }}
    />
  )
}

import { prisma } from '../src/lib/prisma'

async function main() {
  const result = await prisma.user.updateMany({
    data: { role: 'ADMIN' },
  })
  console.log(`Promovidos ${result.count} usuários para ADMIN.`)
}

main().finally(() => prisma.$disconnect())

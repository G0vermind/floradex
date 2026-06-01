import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import bcrypt from 'bcryptjs'
import { createHmac } from 'crypto'

const dbUrl = process.env.DATABASE_URL ?? 'file:./prisma/dev.db'
const adapter = new PrismaBetterSqlite3({ url: dbUrl })
const prisma = new PrismaClient({ adapter })

function generateSecret(partnerId: string): string {
  const d = new Date()
  const month = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
  const secret = process.env.CRON_SECRET ?? 'leafpass-dev-cron'
  return createHmac('sha256', secret).update(partnerId + month).digest('hex')
}

async function main() {
  console.log('🌿 Seeding LeafPass database...')

  // Admin user
  const adminPw = await bcrypt.hash('admin123', 12)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@leafpass.dev' },
    update: {},
    create: {
      name: 'Admin LeafPass',
      email: 'admin@leafpass.dev',
      password: adminPw,
      role: 'ADMIN',
      offChainLeafs: 0,
    },
  })
  console.log('✅ Admin user:', admin.email)

  // Demo user
  const userPw = await bcrypt.hash('demo123', 12)
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@leafpass.dev' },
    update: {},
    create: {
      name: 'Maria Floresta',
      email: 'demo@leafpass.dev',
      password: userPw,
      role: 'USER',
      offChainLeafs: 340,
    },
  })
  console.log('✅ Demo user:', demoUser.email)

  // Seed partners
  const partnerSeeds = [
    { name: 'Escola do Cerrado', category: 'ESCOLA', city: 'Brasília', state: 'DF', description: 'Escola pública com programa de educação ambiental.', rewardAmount: 10 },
    { name: 'Pousada Ecovert', category: 'HOTEL', city: 'Chapada dos Veadeiros', state: 'GO', description: 'Pousada sustentável no coração da Chapada.', rewardAmount: 20 },
    { name: 'Café Raízes', category: 'CAFE', city: 'Ouro Preto', state: 'MG', description: 'Café com grãos locais e orgânicos.', rewardAmount: 8 },
    { name: 'Armarinho Verde', category: 'COMERCIO', city: 'Bonito', state: 'MS', description: 'Comércio de produtos artesanais e ecológicos.', rewardAmount: 12 },
    { name: 'Instituto Folha Viva', category: 'ONG', city: 'Belém', state: 'PA', description: 'ONG de preservação da floresta amazônica.', rewardAmount: 25 },
    { name: 'Centro Cultural Sertão', category: 'OUTRO', city: 'Fortaleza', state: 'CE', description: 'Centro cultural com programação gratuita.', rewardAmount: 10 },
  ]

  for (const seed of partnerSeeds) {
    let partner = await prisma.partner.findFirst({ where: { name: seed.name } })
    if (!partner) {
      partner = await prisma.partner.create({
        data: { ...seed, monthlyQrSecret: 'pending', isActive: true },
      })
    }
    const secret = generateSecret(partner.id)
    await prisma.partner.update({ where: { id: partner.id }, data: { monthlyQrSecret: secret } })
    console.log(`✅ Partner: ${partner.name} | QR secret: ${secret.slice(0, 12)}…`)

    if (['Escola do Cerrado', 'Pousada Ecovert', 'Café Raízes'].includes(seed.name)) {
      const exists = await prisma.stamp.findFirst({ where: { userId: demoUser.id, partnerId: partner.id } })
      if (!exists) {
        await prisma.stamp.create({
          data: { userId: demoUser.id, partnerId: partner.id, partnerName: partner.name, partnerCategory: partner.category },
        })
        console.log(`  ↳ Stamp added for ${demoUser.name}`)
      }
    }
  }

  console.log('\n🌿 Seed complete!')
  console.log('   Admin login:   admin@leafpass.dev / admin123')
  console.log('   Demo login:    demo@leafpass.dev / demo123')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())

import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import bcrypt from 'bcryptjs'
import { createHmac } from 'crypto'
import { DEFAULT_ACHIEVEMENTS, DEFAULT_MISSIONS } from '../src/lib/achievements'

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

  // Seed companies (formerly partners)
  const companySeeds = [
    { name: 'Escola do Cerrado', category: 'ESCOLA', city: 'Brasília', state: 'DF', description: 'Escola pública com programa de educação ambiental.', rewardAmount: 10 },
    { name: 'Pousada Ecovert', category: 'HOTEL', city: 'Chapada dos Veadeiros', state: 'GO', description: 'Pousada sustentável no coração da Chapada.', rewardAmount: 20 },
    { name: 'Café Raízes', category: 'CAFE', city: 'Ouro Preto', state: 'MG', description: 'Café com grãos locais e orgânicos.', rewardAmount: 8 },
    { name: 'Armarinho Verde', category: 'COMERCIO', city: 'Bonito', state: 'MS', description: 'Comércio de produtos artesanais e ecológicos.', rewardAmount: 12 },
    { name: 'Instituto Folha Viva', category: 'ONG', city: 'Belém', state: 'PA', description: 'ONG de preservação da floresta amazônica.', rewardAmount: 25 },
    { name: 'Centro Cultural Sertão', category: 'OUTRO', city: 'Fortaleza', state: 'CE', description: 'Centro cultural com programação gratuita.', rewardAmount: 10 },
  ]

  for (let i = 0; i < companySeeds.length; i++) {
    const seed = companySeeds[i]
    let company = await prisma.company.findFirst({ where: { tradeName: seed.name } })
    if (!company) {
      // Create a dummy user for the company since userId is unique and required
      const cUser = await prisma.user.upsert({
        where: { email: `company${i}@leafpass.dev` },
        update: {},
        create: { name: seed.name, email: `company${i}@leafpass.dev`, role: 'COMPANY' }
      })
      
      company = await prisma.company.create({
        data: { 
          legalName: seed.name,
          tradeName: seed.name,
          category: seed.category,
          city: seed.city,
          state: seed.state,
          description: seed.description,
          rewardAmount: seed.rewardAmount,
          userId: cUser.id,
          monthlyQrSecret: 'pending', 
          isActive: true 
        },
      })
    }
    const secret = generateSecret(company.id)
    await prisma.company.update({ where: { id: company.id }, data: { monthlyQrSecret: secret } })
    console.log(`✅ Company: ${company.tradeName} | QR secret: ${secret.slice(0, 12)}…`)

    if (['Escola do Cerrado', 'Pousada Ecovert', 'Café Raízes'].includes(seed.name)) {
      const exists = await prisma.stamp.findFirst({ where: { userId: demoUser.id, companyId: company.id } })
      if (!exists) {
        await prisma.stamp.create({
          data: { userId: demoUser.id, companyId: company.id, partnerName: company.tradeName, partnerCategory: company.category },
        })
        console.log(`  ↳ Stamp added for ${demoUser.name}`)
      }
    }
  }

  // ── SEED ACHIEVEMENTS ──
  console.log('\n🏆 Seeding achievements...')
  for (const achSeed of DEFAULT_ACHIEVEMENTS) {
    const achievement = await prisma.achievementDefinition.upsert({
      where: { slug: achSeed.slug },
      update: {
        name: achSeed.name,
        description: achSeed.description,
        icon: achSeed.icon,
        category: achSeed.category,
        tierThresholds: JSON.stringify(achSeed.tierThresholds),
      },
      create: {
        slug: achSeed.slug,
        name: achSeed.name,
        description: achSeed.description,
        icon: achSeed.icon,
        category: achSeed.category,
        tierThresholds: JSON.stringify(achSeed.tierThresholds),
      },
    })
    console.log(`  ✅ Achievement: ${achievement.name} (${achievement.slug})`)
  }

  // Give demo user some achievements for preview
  const explorerAch = await prisma.achievementDefinition.findUnique({ where: { slug: 'explorador' } })
  const collectorAch = await prisma.achievementDefinition.findUnique({ where: { slug: 'colecionador' } })
  const firstStepAch = await prisma.achievementDefinition.findUnique({ where: { slug: 'primeiro-passo' } })

  if (explorerAch) {
    await prisma.userAchievement.upsert({
      where: { userId_achievementId: { userId: demoUser.id, achievementId: explorerAch.id } },
      update: {},
      create: { userId: demoUser.id, achievementId: explorerAch.id, currentProgress: 12, currentTier: 4 },
    })
  }
  if (collectorAch) {
    await prisma.userAchievement.upsert({
      where: { userId_achievementId: { userId: demoUser.id, achievementId: collectorAch.id } },
      update: {},
      create: { userId: demoUser.id, achievementId: collectorAch.id, currentProgress: 55, currentTier: 4 },
    })
  }
  if (firstStepAch) {
    await prisma.userAchievement.upsert({
      where: { userId_achievementId: { userId: demoUser.id, achievementId: firstStepAch.id } },
      update: {},
      create: { userId: demoUser.id, achievementId: firstStepAch.id, currentProgress: 22, currentTier: 7 },
    })
  }
  console.log('  ↳ Demo user achievements seeded')

  // ── SEED MISSIONS ──
  console.log('\n🎯 Seeding missions...')
  for (const mSeed of DEFAULT_MISSIONS) {
    const existing = await prisma.mission.findFirst({
      where: { title: mSeed.title, type: mSeed.type },
    })
    if (!existing) {
      await prisma.mission.create({ data: mSeed })
      console.log(`  ✅ Mission: ${mSeed.title}`)
    } else {
      console.log(`  ⏩ Mission already exists: ${mSeed.title}`)
    }
  }

  console.log('\n🌿 Seed complete!')
  console.log('   Admin login:   admin@leafpass.dev / admin123')
  console.log('   Demo login:    demo@leafpass.dev / demo123')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())


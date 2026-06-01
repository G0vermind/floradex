import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { nanoid } from 'nanoid'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const { email, password, tradeName, legalName, cnpj, category, city, state, description } = data

    if (!email || !password || !tradeName || !category || !city || !state) {
      return NextResponse.json({ error: 'Preencha todos os campos obrigatórios.' }, { status: 400 })
    }

    // Verifica se email já existe
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ error: 'Este email já está cadastrado.' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const monthlyQrSecret = nanoid(32)

    // Cria usuário e empresa em transação
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          name: tradeName,
          role: 'COMPANY',
        },
      })

      const company = await tx.company.create({
        data: {
          userId: user.id,
          tradeName,
          legalName: legalName || tradeName,
          cnpj: cnpj || null,
          category,
          city,
          state,
          description: description || null,
          monthlyQrSecret,
          isActive: false, // Aguarda aprovação do Admin
        },
      })

      return { user, company }
    })

    return NextResponse.json({
      success: true,
      message: 'Cadastro realizado! Aguarde a aprovação do administrador.',
    })
  } catch (error: any) {
    console.error('[empresa/cadastro] Error:', error)
    return NextResponse.json({ error: 'Erro interno ao processar o cadastro.' }, { status: 500 })
  }
}

'use server'

import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { createSession, deleteSession } from '@/lib/session'
import { signIn } from '@/auth'

export type AuthState = {
  errors?: {
    name?: string[]
    email?: string[]
    password?: string[]
  }
  message?: string
} | undefined

export async function signup(state: AuthState, formData: FormData): Promise<AuthState> {
  const name = (formData.get('name') as string)?.trim()
  const email = (formData.get('email') as string)?.trim().toLowerCase()
  const password = formData.get('password') as string

  const errors: NonNullable<AuthState>['errors'] = {}

  if (!name || name.length < 2) errors.name = ['Nome deve ter pelo menos 2 caracteres.']
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = ['Email inválido.']
  if (!password || password.length < 6) errors.password = ['Senha deve ter pelo menos 6 caracteres.']

  if (Object.keys(errors).length > 0) return { errors }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) return { errors: { email: ['Este email já está em uso.'] } }

  const hashedPassword = await bcrypt.hash(password, 12)
  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  })

  // Sign in using NextAuth to create the correct session
  try {
    await signIn('credentials', Object.fromEntries(formData))
  } catch (error: any) {
    if (error.name === 'AuthError' || error.type === 'CredentialsSignin') {
      return { message: 'Erro ao fazer login após o cadastro.' }
    }
    throw error
  }
  
  return undefined // the redirect is handled by signIn
}

export async function login(state: AuthState, formData: FormData): Promise<AuthState> {
  const email = (formData.get('email') as string)?.trim().toLowerCase()
  const password = formData.get('password') as string

  if (!email || !password) {
    return { message: 'Email e senha são obrigatórios.' }
  }

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !user.password) return { message: 'Email ou senha incorretos.' }

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return { message: 'Email ou senha incorretos.' }

  await createSession({ id: user.id, email: user.email || '', role: user.role })
  redirect('/floradex')
}

import { signOut } from '@/auth'

export async function logout(): Promise<void> {
  await signOut({ redirectTo: '/' })
}

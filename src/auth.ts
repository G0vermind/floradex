// Decisão de Arquitetura:
// Opção B — Fechada: contas COMPANY são criadas apenas pelo Admin no painel /admin.
// O formulário público registra apenas USER.

import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import type { UserRole } from "../types/next-auth"
import { authConfig } from "./auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      // Usuários Google sempre entram como USER por padrão
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: "USER" as UserRole,
        }
      },
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Senha", type: "password" },
        isDevLogin: { label: "Dev Login", type: "text" },
        role: { label: "Role", type: "text" }
      },
      async authorize(credentials) {
        // --- DEV LOGIN BYPASS ---
        if (credentials?.email === "gutogn@gmail.com" && credentials?.isDevLogin === "true") {
          const role = (credentials.role as UserRole) || "USER"
          const user = await prisma.user.upsert({
            where: { email: "gutogn@gmail.com" },
            update: { role },
            create: { email: "gutogn@gmail.com", name: "Guto (Dev)", role }
          })

          if (role === "COMPANY") {
            await prisma.company.upsert({
              where: { userId: user.id },
              update: {},
              create: {
                userId: user.id,
                legalName: "Empresa Dev de Testes Ltda",
                tradeName: "Empresa Teste",
                category: "OUTRO",
                city: "São Paulo",
                state: "SP",
                monthlyQrSecret: "DEV_SECRET_123",
                isActive: true
              }
            })
          }

          return user
        }
        // ------------------------

        if (!credentials?.email || !credentials?.password) return null

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        })

        if (!user || !user.password) return null

        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!passwordMatch) return null

        return user
      },
    }),
  ],
})

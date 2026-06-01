import type { NextAuthConfig } from 'next-auth'
import type { UserRole } from '../types/next-auth'

export const authConfig = {
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [], // We add providers in auth.ts
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = (token.id as string) || (token.sub as string)
        session.user.role = (token.role as UserRole) || 'USER'
      }
      return session
    },
  },
} satisfies NextAuthConfig

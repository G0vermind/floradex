import "next-auth"
import "next-auth/jwt"

export type UserRole = "ADMIN" | "COMPANY" | "USER"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: UserRole
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }

  interface User {
    role: UserRole | string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role: UserRole | string
  }
}

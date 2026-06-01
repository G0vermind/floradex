import NextAuth from "next-auth"
import { authConfig } from "./auth.config"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const { auth } = NextAuth(authConfig)

// Rotas protegidas por role
const ROUTE_MAP = {
  ADMIN:   "/admin",
  COMPANY: "/dashboard/empresa",
  USER:    "/leafpass",
} as const

// Rotas que exigem autenticação (qualquer role)
const PROTECTED_PREFIXES = ["/admin", "/dashboard", "/leafpass", "/api/leafpass"]

export default auth((req) => {
  const { nextUrl, auth: session } = req as NextRequest & { auth: any }
  const pathname = nextUrl.pathname
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p))

  // Redireciona para login se não autenticado em rota protegida
  if (isProtected && !session) {
    const isB2B = pathname.startsWith("/admin") || pathname.startsWith("/dashboard")
    const loginUrl = new URL(isB2B ? "/portal/login" : "/login", nextUrl.origin)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redireciona da raiz ou de telas de login para a rota correta se já logado
  if (session && (pathname === "/" || pathname === "/login" || pathname === "/portal/login")) {
    const role = session.user?.role
    const destination = ROUTE_MAP[role as keyof typeof ROUTE_MAP] ?? "/leafpass"
    return NextResponse.redirect(new URL(destination, nextUrl.origin))
  }

  // Bloqueia acesso de USER a rotas de ADMIN/COMPANY
  if (session?.user?.role === "USER" && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/leafpass", nextUrl.origin))
  }

  if (session?.user?.role === "USER" && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/leafpass", nextUrl.origin))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
}

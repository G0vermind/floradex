import { Fraunces, DM_Sans, DM_Mono } from 'next/font/google'
import './styles/tokens.css'
import type { Metadata } from 'next'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Florestas.Social',
  description: 'Engajamento ambiental com impacto real.',
  openGraph: {
    title: 'Florestas.Social',
    description: 'Engajamento ambiental com impacto real.',
    type: 'website',
  },
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${fraunces.variable} ${dmSans.variable} ${dmMono.variable}`} style={{ fontFamily: 'var(--font-body)', backgroundColor: 'var(--forest-void)', color: 'var(--cream-paper)', minHeight: '100vh' }}>
      {children}
    </div>
  )
}

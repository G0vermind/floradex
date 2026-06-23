import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FloraDex - Interface de Bioengenharia e Simbiose RWA',
  description: 'FloraDex - Interface de Bioengenharia e Simbiose RWA',
  keywords: ['floradex', 'folhas', 'passaporte', 'fidelidade', 'ecoturismo', 'stellar', 'florestas.social'],
  openGraph: {
    title: 'FloraDex',
    description: 'Interface de Bioengenharia e Simbiose RWA',
    type: 'website',
  },
}

import { Outfit, Playfair_Display, Rajdhani } from 'next/font/google'

const outfit = Outfit({ 
  subsets: ['latin'], 
  variable: '--font-outfit' 
})

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-playfair' 
})

const rajdhani = Rajdhani({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'], 
  variable: '--font-rajdhani' 
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${outfit.variable} ${playfair.variable} ${rajdhani.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#031F14" />
      </head>
      <body className="font-sans antialiased text-slate-200 bg-slate-900">
        <div style={{ position: 'relative', zIndex: 1, height: '100dvh' }}>
          {children}
        </div>
      </body>
    </html>
  )
}

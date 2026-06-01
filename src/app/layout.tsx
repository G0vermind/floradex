import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LeafPass — Passaporte de Fidelidade Local',
  description:
    'Visite estabelecimentos parceiros, colecione carimbos e ganhe Folhas para converter em tokens Stellar. Turismo consciente e engajamento comunitário.',
  keywords: ['leafpass', 'folhas', 'passaporte', 'fidelidade', 'ecoturismo', 'stellar', 'florestas.social'],
  openGraph: {
    title: 'LeafPass',
    description: 'Seu passaporte de fidelidade regional',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#1B3A2D" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <div style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  )
}

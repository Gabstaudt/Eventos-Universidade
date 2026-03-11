import type { Metadata, Viewport } from 'next'
import { Nunito } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
})

export const metadata: Metadata = {
  title: 'UEPA Eventos - Sistema de Gestão de Eventos Acadêmicos',
  description: 'Plataforma oficial de eventos acadêmicos da Universidade do Estado do Pará. Encontre, inscreva-se e participe de congressos, seminários, workshops e mais.',
  generator: 'v0.app',
  keywords: ['eventos acadêmicos', 'UEPA', 'universidade', 'congressos', 'seminários', 'workshops'],
  authors: [{ name: 'UEPA' }],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#1e3a5f',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${nunito.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

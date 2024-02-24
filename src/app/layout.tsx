import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ProperyPulse | Find the perfect rental',
  description: 'Find your dream rental property',
  keywords: 'rental, property, real estate, find properties',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-zinc-100 antialiased`}>
        {children}
      </body>
    </html>
  )
}

import './globals.css'

import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
})

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
      <body className={`${poppins.className} bg-zinc-50 antialiased`}>
        {children}
      </body>
    </html>
  )
}

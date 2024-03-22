import 'photoswipe/dist/photoswipe.css'

import { Toaster } from 'sonner'

import { NextAuthProvider } from '@/components/auth-provider'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar/navbar'

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NextAuthProvider>
      <div className="min-h-screen w-full">
        <Navbar />
        <main className="min-h-screen bg-blue-50">{children}</main>

        <Footer />

        <Toaster richColors />
      </div>
    </NextAuthProvider>
  )
}

import AuthProvider from '@/components/auth-provider'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <div className="min-h-screen w-full">
        <Navbar />
        <main>{children}</main>

        <Footer />
      </div>
    </AuthProvider>
  )
}

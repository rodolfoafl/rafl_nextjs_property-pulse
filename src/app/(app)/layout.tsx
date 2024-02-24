import Footer from '@/components/footer'
import Navbar from '@/components/navbar'

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <main>{children}</main>

      <Footer />
    </div>
  )
}

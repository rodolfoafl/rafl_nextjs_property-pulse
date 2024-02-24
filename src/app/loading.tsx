import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <Loader2 size={96} className="animate-spin text-blue-700" />
    </div>
  )
}

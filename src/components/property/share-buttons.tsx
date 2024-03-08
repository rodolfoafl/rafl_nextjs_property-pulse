import { Share2 } from 'lucide-react'

import { Property } from '@/data/types/property'

interface ShareButtonsProps {
  property: Property
}

export default function ShareButtons({ property }: ShareButtonsProps) {
  return (
    <button className="flex w-full items-center justify-center rounded-full bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-600">
      <Share2 className="mr-2" size={20} /> Share Property
    </button>
  )
}

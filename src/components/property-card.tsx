import { Banknote, Bath, Bed, MapPin, Ruler } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { Property } from '@/data/types/property'

export default function PropertyCard({ property }: { property: Property }) {
  function getRateDisplay(): string | undefined {
    const { rates } = property

    if (rates.monthly) {
      return `${rates.monthly.toLocaleString()}/mo`
    } else if (rates.weekly) {
      return `${rates.weekly.toLocaleString()}/wk`
    } else if (rates.nightly) {
      return `${rates.nightly.toLocaleString()}/night`
    }
  }

  function getAvailableRates(): (React.JSX.Element | null)[] {
    const { rates } = property

    return Object.keys(rates).map((rate) => {
      if (rate) {
        return (
          <p key={rate} className="flex items-center gap-1">
            <Banknote size={20} />{' '}
            {rate.charAt(0).toUpperCase() + rate.slice(1)}
          </p>
        )
      }
      return null
    })
  }

  return (
    <div className="relative rounded-xl bg-white shadow-md">
      <Image
        priority={true}
        quality={60}
        width={640}
        height={360}
        src={
          property.images[0].includes('https')
            ? property.images[0]
            : '/images/' + property.images[0]
        }
        alt=""
        className="h-auto w-full rounded-t-xl"
      />
      <div className="flex flex-col justify-between p-4">
        <div className="mb-6 h-[80px] text-left md:text-center lg:text-left">
          <div className="text-gray-600">{property.type}</div>
          <h3 className="text-xl font-bold">{property.name}</h3>
        </div>
        <h3 className="absolute right-[10px] top-[10px] rounded-lg bg-white px-4 py-2 text-right font-bold text-blue-500 md:text-center lg:text-right">
          ${getRateDisplay()}
        </h3>

        <div className="mb-4 flex justify-center gap-4 text-gray-500">
          <p className="flex flex-col items-center">
            <Bed size={20} />
            <span className="md:hidden lg:inline">{property.beds} Bed(s)</span>
          </p>
          <p className="flex flex-col items-center">
            <Bath size={20} />
            <span className="md:hidden lg:inline">
              {property.baths} Bath(s)
            </span>
          </p>
          <p className="flex flex-col items-center">
            <Ruler size={20} />
            <span className="md:hidden lg:inline">
              {property.square_feet} sqft
            </span>
          </p>
        </div>

        <div className="mb-4 flex h-[56px] flex-wrap justify-center gap-4 text-sm text-green-900">
          {getAvailableRates()}
        </div>

        {/* <div className="mb-5 border border-gray-100"></div> */}

        <div className="mb-4 flex flex-col justify-between border-t border-zinc-300 pt-5 lg:flex-row">
          <div className="mb-4 flex items-center gap-2 lg:mb-0">
            <MapPin size={20} className="text-orange-700" />
            <span className="text-orange-700">
              {property.location.city}, {property.location.state}{' '}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className="h-9 rounded-lg bg-blue-500 px-4 py-2 text-center text-sm text-white hover:bg-blue-600"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  )
}

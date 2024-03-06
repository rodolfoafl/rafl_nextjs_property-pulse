/* eslint-disable camelcase */
import { Bath, Bed, Check, MapPin, Ruler, X } from 'lucide-react'

import { Property } from '@/data/types/property'

interface PropertyDetailsProps {
  property: Property
}

export default function PropertyDetails({ property }: PropertyDetailsProps) {
  const {
    type,
    name,
    description,
    beds,
    baths,
    square_feet,
    location: { street, city, state },
    rates: { nightly, weekly, monthly },
  } = property

  return (
    <main>
      <div className="rounded-lg bg-white p-6 text-center shadow-md md:text-left">
        <div className="mb-4 text-gray-500">{type}</div>
        <h1 className="mb-4 text-3xl font-bold">{name}</h1>
        <div className="mb-4 flex justify-center align-middle text-gray-500 md:justify-start">
          <MapPin className="mr-2 text-lg text-orange-700" size={20} />
          <p className="text-orange-700">
            {street}, {city}, {state}
          </p>
        </div>

        <h3 className="my-6 bg-gray-800 p-2 text-lg font-bold text-white">
          Rates & Options
        </h3>
        <div className="flex flex-col justify-around md:flex-row">
          <div className="mb-4 flex items-center justify-center border-b border-gray-200 pb-4 md:border-b-0 md:pb-0">
            <div className="mr-2 font-bold text-gray-500">Nightly</div>
            {nightly ? (
              <div className="text-2xl font-bold text-blue-500">
                ${nightly.toLocaleString()}
              </div>
            ) : (
              <div className="text-2xl font-bold">
                <X className="text-red-700" size={20} />
              </div>
            )}
          </div>
          <div className="mb-4 flex items-center justify-center border-b border-gray-200 pb-4 md:border-b-0 md:pb-0">
            <div className="mr-2 font-bold text-gray-500">Weekly</div>
            {weekly ? (
              <div className="text-2xl font-bold text-blue-500">
                ${weekly.toLocaleString()}
              </div>
            ) : (
              <div className="text-2xl font-bold">
                <X className="text-red-700" size={20} />
              </div>
            )}
          </div>
          <div className="mb-4 flex items-center justify-center pb-4 md:pb-0">
            <div className="mr-2 font-bold text-gray-500">Monthly</div>
            {monthly ? (
              <div className="text-2xl font-bold text-blue-500">
                ${monthly.toLocaleString()}
              </div>
            ) : (
              <div className="text-2xl font-bold">
                <X className="text-red-700" size={20} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-white p-6 shadow-md">
        <h3 className="mb-6 text-lg font-bold">Description & Details</h3>
        <div className="mb-4 flex justify-center gap-4 space-x-9 text-xl text-blue-500">
          <p className="flex items-center gap-1">
            <Bed className="mr-2 inline-block" size={20} /> {beds}
            <span className="hidden sm:inline">Beds</span>
          </p>
          <p className="flex items-center gap-1">
            <Bath className="mr-2 inline-block" size={20} /> {baths}
            <span className="hidden sm:inline">Baths</span>
          </p>
          <p className="flex items-center gap-1">
            <Ruler className="mr-2 inline-block" size={20} />
            {square_feet} <span className="hidden sm:inline">sqft</span>
          </p>
        </div>
        <p className="mb-4 text-center text-gray-500">{description}</p>
      </div>

      <div className="mt-6 rounded-lg bg-white p-6 shadow-md">
        <h3 className="mb-6 text-lg font-bold">Amenities</h3>

        <ul className="grid list-none grid-cols-1 space-y-1 md:grid-cols-2 lg:grid-cols-3">
          {property.amenities.map((amenity) => {
            return (
              <li key={amenity} className="flex items-center">
                <Check className="mr-2 inline-block text-green-600" size={20} />{' '}
                {amenity}
              </li>
            )
          })}
        </ul>
      </div>
      <div className="mt-6 rounded-lg bg-white p-6 shadow-md">
        <div id="map"></div>
      </div>
    </main>
  )
}

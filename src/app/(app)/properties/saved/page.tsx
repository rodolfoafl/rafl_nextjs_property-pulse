import { headers } from 'next/headers'

import PropertyCard from '@/components/property/property-card'
import { api } from '@/data/api'
import { Property } from '@/data/types/property'

async function getBookmarkedProperties(): Promise<Property[]> {
  const response = await api('/bookmarks', {
    cache: 'no-store',
    headers: headers(),
  })

  const properties = await response.json()
  return properties
}

export default async function SavedPropertiesPage() {
  const properties = await getBookmarkedProperties()

  return (
    <section className="bg-blue-50 px-4 py-6">
      <h1 className="mb-4 text-2xl">Saved Properties</h1>
      <div className="container-xl m-auto px-4 py-6 lg:container">
        {!properties || properties.length === 0 ? (
          <p>No saved properties found</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {properties.map((property) => {
              return <PropertyCard key={property._id} property={property} />
            })}
          </div>
        )}
      </div>
    </section>
  )
}

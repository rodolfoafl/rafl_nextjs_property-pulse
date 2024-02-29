import PropertyCard from '@/components/property-card'
import { api } from '@/data/api'
import { Property } from '@/data/types/property'

async function getProperties(): Promise<Property[]> {
  const response = await api('/properties', {
    // next: { revalidate: 60 * 60 },
    cache: 'no-store',
  })

  const properties = await response.json()
  return properties
}

export default async function PropertiesPage() {
  const properties = await getProperties()

  return (
    <section className="bg-blue-50 px-4 py-6">
      <div className="container-xl m-auto px-4 py-6 lg:container">
        {!properties || properties.length === 0 ? (
          <p>No properties found</p>
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

import properties from '@/assets/properties.json'
import PropertyCard from '@/components/property-card'

export default function PropertiesPage() {
  return (
    <section className="px-4 py-6">
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

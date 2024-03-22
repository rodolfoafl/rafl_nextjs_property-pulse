import SearchForm from '@/components/home/search-form'
import Pagination from '@/components/property/pagination'
import PropertyCard from '@/components/property/property-card'
import { api } from '@/data/api'
import { Property } from '@/data/types/property'

interface GetPropertiesResult {
  properties: Property[]
  total: number
}

async function getProperties(query: string): Promise<GetPropertiesResult> {
  const response = await api(`/properties${query}`, {
    // next: { revalidate: 60 * 60 },
    cache: 'no-store',
  })

  const properties = await response.json()
  return properties
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams?: {
    page?: string
    pageSize?: string
  }
}) {
  const paginationParams = new URLSearchParams(searchParams)
  const pagination = paginationParams.toString().toLowerCase()
  const query = pagination ? `?${pagination}` : ''

  const data = await getProperties(query)
  const properties = data.properties
  const totalItems = data.total

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="mx-auto flex max-w-7xl flex-col items-start px-4 sm:px-6 lg:px-8">
          <SearchForm />
        </div>
      </section>

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

      <section>
        <Pagination
          page={searchParams?.page ? Number(searchParams?.page) : 1}
          pageSize={searchParams?.pageSize ? Number(searchParams?.pageSize) : 3}
          totalItems={totalItems}
        />
      </section>
    </>
  )
}

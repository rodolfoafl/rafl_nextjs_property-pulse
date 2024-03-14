import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import SearchForm from '@/components/home/search-form'
import PropertyCard from '@/components/property/property-card'
import { api } from '@/data/api'
import { Property } from '@/data/types/property'

async function getSearchProperties(query: string): Promise<Property[]> {
  const response = await api(`/properties/search${query}`, {
    // next: { revalidate: 60 * 60 },
    cache: 'no-store',
  })

  const properties = await response.json()
  return properties
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: {
    location?: string
    type?: string
  }
}) {
  // TODO: handle search with no params
  // const router = useRouter()

  // if (searchParams && searchParams.size === 0) {
  //   router.push('/404')
  // }

  let properties = [] as Property[]

  const current = new URLSearchParams(searchParams)
  if (current.size) {
    const search = current.toString().toLowerCase()
    const query = search ? `?${search}` : ''

    properties = await getSearchProperties(query)
  }

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="mx-auto flex max-w-7xl flex-col items-start px-4 sm:px-6 lg:px-8">
          <SearchForm />
        </div>
      </section>

      <section className="bg-blue-50 px-4 py-6">
        <div className="container-xl m-auto px-4 py-6 lg:container">
          <Link
            href="/properties"
            className="mb-4 flex items-center text-blue-500 hover:text-blue-600"
          >
            <ArrowLeft className="mr-2" size={20} /> Back to Properties
          </Link>
          <h1 className="mb-4 text-2xl">Search Results</h1>
          {!properties || properties.length === 0 ? (
            <p>No search results found</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {properties.map((property) => {
                return <PropertyCard key={property._id} property={property} />
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

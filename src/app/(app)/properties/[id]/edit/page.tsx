import EditPropertyForm from '@/components/property/edit-property-form'

// import { api } from '@/data/api'
// import { Property } from '@/data/types/property'
import { getProperty } from '../page'

interface EditPropertyProps {
  params: {
    id: string
  }
}

export default async function PropertyEditPage({ params }: EditPropertyProps) {
  const { id } = params
  const property = await getProperty(id)

  if (!property) {
    return (
      <h1 className="mt-10 text-center text-2xl font-bold">
        Property Not Found
      </h1>
    )
  }

  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="m-4 mb-4 rounded-md border bg-white px-6 py-8 shadow-md md:m-0">
          <EditPropertyForm property={property} />
        </div>
      </div>
    </section>
  )
}

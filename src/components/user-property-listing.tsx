import Image from 'next/image'
import Link from 'next/link'
import { getServerSession } from 'next-auth'

import { api } from '@/data/api'
import { Property } from '@/data/types/property'

import DeletePropertyButton from './delete-property-button'

// interface UserPropertyListingProps {
//   userId: string
// }

async function getProperties(userId: string): Promise<Property[]> {
  const response = await api(`/properties/user/${userId}`, {
    next: { revalidate: 60 * 60 },
    // cache: 'no-store',
  })

  const properties = await response.json()
  return properties
}

export default async function UserPropertyListing() {
  const session = await getServerSession()
  console.log('serverSession:', session)
  if (!session) {
    return null
  }

  const user = session.user

  const properties = await getProperties(user?.id)

  if (!properties || properties.length === 0) {
    return <p>No properties found</p>
  }

  return (
    <>
      {properties.map((property) => {
        return (
          <div className="mb-10" key={property._id}>
            <Link href={`/properties/${property._id}`}>
              <Image
                quality={50}
                className="h-32 w-full rounded-md object-cover"
                width={750}
                height={422}
                priority={true}
                src={
                  property.images[0].includes('https')
                    ? property.images[0]
                    : '/images/' + property.images[0]
                }
                alt=""
              />
            </Link>
            <div className="mt-2">
              <p className="text-lg font-semibold">{property.name}</p>
              <p className="text-gray-600">
                Address: {property.location.street} - {property.location.city},{' '}
                {property.location.state}
              </p>
            </div>
            <div className="mt-2">
              <Link
                href={`/properties/${property._id}/edit`}
                className="mr-2 rounded-md bg-blue-500 px-3 py-3 text-white hover:bg-blue-600"
              >
                Edit
              </Link>
              <DeletePropertyButton propertyId={property._id} />
            </div>
          </div>
        )
      })}
    </>
  )
}

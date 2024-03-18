import { ArrowLeft } from 'lucide-react'
import { Metadata } from 'next'
import { headers } from 'next/headers'
import Link from 'next/link'
import { getServerSession } from 'next-auth'

import BookmarkButton from '@/components/property/bookmark-button'
import ContactForm from '@/components/property/contact-form'
import PropertyDetails from '@/components/property/property-details'
import PropertyHeaderImage from '@/components/property/property-header-image'
import PropertyImageGallery from '@/components/property/property-image-gallery'
import ShareButtons from '@/components/property/share-buttons'
import { api } from '@/data/api'
import { Property } from '@/data/types/property'
import { authOptions } from '@/lib/auth'

interface PropertyProps {
  params: {
    id: string
  }
}

interface GetBookmarkResponse {
  isBookmarked: boolean
}

export async function getProperty(id: string): Promise<Property> {
  const response = await api(`/properties/${id}`, {
    next: { tags: ['get-property'] },
  })

  const property = await response.json()
  return property
}

export async function getBookmarks(id: string): Promise<GetBookmarkResponse> {
  const response = await api(`/bookmarks/${id}`, {
    method: 'GET',
    headers: headers(),
    next: { tags: ['get-bookmark'] },
  })

  const bookmarks = await response.json()
  return bookmarks
}

export async function generateMetadata({
  params,
}: PropertyProps): Promise<Metadata> {
  const property = await getProperty(params.id)
  const { name } = property

  return {
    title: name,
  }
}

export default async function PropertyPage({ params }: PropertyProps) {
  const { id } = params
  const property = await getProperty(id)
  const session = await getServerSession(authOptions)

  if (!property) {
    return (
      <h1 className="mt-10 text-center text-2xl font-bold">
        Property Not Found
      </h1>
    )
  }

  let isBookmarked = false
  if (session) {
    await getBookmarks(property._id).then((data) => {
      if (data) {
        isBookmarked = data.isBookmarked
      }
    })
  }

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />

      <div className="w-full bg-white">
        <div className="container m-auto px-6 py-6">
          <Link
            href="/properties"
            className="flex items-center text-blue-500 hover:text-blue-600"
          >
            <ArrowLeft className="mr-2" size={20} /> Back to Properties
          </Link>
        </div>
      </div>

      <section className="bg-blue-50">
        <div className="container m-auto px-6 py-10">
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-70/30">
            <PropertyDetails property={property} />

            <aside className="space-y-4">
              <BookmarkButton property={property} isBookmarked={isBookmarked} />
              <ShareButtons property={property} />

              <ContactForm property={property} />
            </aside>
          </div>
        </div>

        <div className="container m-auto px-6 py-10">
          <PropertyImageGallery images={property.images} />
        </div>
      </section>
    </>
  )
}

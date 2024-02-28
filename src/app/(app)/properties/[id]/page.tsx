import { ArrowLeft, Bookmark, Send, Share2 } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

import PropertyDetails from '@/components/property-details'
import PropertyHeaderImage from '@/components/property-header-image'
import { api } from '@/data/api'
import { Property } from '@/data/types/property'

interface PropertyProps {
  params: {
    id: string
  }
}

async function getProperty(id: string): Promise<Property> {
  const response = await api(`/properties/${id}`, {
    next: { revalidate: 60 * 60 },
  })

  const property = await response.json()
  return property
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

  if (!property) {
    return (
      <h1 className="mt-10 text-center text-2xl font-bold">
        Property Not Found
      </h1>
    )
  }

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />

      <div className="container m-auto px-6 py-6">
        <Link
          href="/properties"
          className="flex items-center text-blue-500 hover:text-blue-600"
        >
          <ArrowLeft className="mr-2" size={20} /> Back to Properties
        </Link>
      </div>

      <section className="bg-blue-50">
        <div className="container m-auto px-6 py-10">
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-70/30">
            <PropertyDetails property={property} />

            <aside className="space-y-4">
              <button className="flex w-full items-center justify-center rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600">
                <Bookmark className="mr-2" size={20} />
                Bookmark Property
              </button>
              <button className="flex w-full items-center justify-center rounded-full bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-600">
                <Share2 className="mr-2" size={20} /> Share Property
              </button>

              <div className="rounded-lg bg-white p-6 shadow-md">
                <h3 className="mb-6 text-xl font-bold">
                  Contact Property Manager
                </h3>
                <form>
                  <div className="mb-4">
                    <label
                      className="mb-2 block text-sm font-bold text-gray-700"
                      htmlFor="name"
                    >
                      Name:
                    </label>
                    <input
                      className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="mb-2 block text-sm font-bold text-gray-700"
                      htmlFor="email"
                    >
                      Email:
                    </label>
                    <input
                      className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="mb-2 block text-sm font-bold text-gray-700"
                      htmlFor="phone"
                    >
                      Phone:
                    </label>
                    <input
                      className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                      id="phone"
                      type="text"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="mb-2 block text-sm font-bold text-gray-700"
                      htmlFor="message"
                    >
                      Message:
                    </label>
                    <textarea
                      className="focus:shadow-outline h-44 w-full appearance-none rounded border px-3 py-2 text-gray-700 shadow focus:outline-none"
                      id="message"
                      placeholder="Enter your message"
                    ></textarea>
                  </div>
                  <div>
                    <button
                      className="focus:shadow-outline flex w-full items-center justify-center rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 focus:outline-none"
                      type="submit"
                    >
                      <Send className="mr-2" size={20} /> Send Message
                    </button>
                  </div>
                </form>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}

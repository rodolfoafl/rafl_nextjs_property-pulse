import { Metadata } from 'next'

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

  console.log(property)

  return <div>PropertyPage</div>
}

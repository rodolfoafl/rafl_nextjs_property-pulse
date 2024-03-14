'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const searchFormSchema = z.object({
  location: z.string().optional(),
  type: z.string().optional(),
})

type SearchFormSchema = z.infer<typeof searchFormSchema>

export default function SearchForm() {
  const router = useRouter()

  const { register, handleSubmit, control } = useForm<SearchFormSchema>({
    resolver: zodResolver(searchFormSchema),
  })

  function handleSearchForm({ location, type }: SearchFormSchema) {
    const current = new URLSearchParams()

    if (!location) {
      current.delete('location')
    } else {
      current.set('location', location)
    }

    if (!type || type === 'all') {
      current.delete('type')
    } else {
      current.set('type', type)
    }

    const search = current.toString().toLowerCase()
    const query = search ? `?${search}` : ''

    if (query === '') {
      router.push(`/properties/`)
    } else {
      router.push(`/properties/search${query}`)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleSearchForm)}
      className="mx-auto mt-3 flex w-full max-w-2xl flex-col items-center md:flex-row"
    >
      <div className="mb-4 w-full md:mb-0 md:w-3/5 md:pr-2">
        <label htmlFor="location" className="sr-only">
          Location
        </label>
        <input
          type="text"
          id="location"
          placeholder="Enter Keywords or Location"
          className="w-full rounded-lg bg-white px-4 py-3 text-gray-800 focus:outline-none 
          focus:ring focus:ring-blue-500"
          {...register('location')}
        />
      </div>
      <div className="w-full md:w-2/5 md:pl-2">
        <label htmlFor="property-type" className="sr-only">
          Property Type
        </label>
        <Controller
          name="type"
          control={control}
          render={({ field: { name, onChange } }) => {
            return (
              <select
                id="property-type"
                className="w-full rounded-lg bg-white px-4 py-3 text-gray-800 focus:outline-none 
                focus:ring focus:ring-blue-500"
                name={name}
                onChange={onChange}
              >
                <option value="all">All</option>
                <option value="Apartment">Apartment</option>
                <option value="Studio">Studio</option>
                <option value="Condo">Condo</option>
                <option value="House">House</option>
                <option value="Cabin Or Cottage">Cabin or Cottage</option>
                <option value="Loft">Loft</option>
                <option value="Room">Room</option>
                <option value="Other">Other</option>
              </select>
            )
          }}
        />
      </div>
      <button
        type="submit"
        className="mt-4 w-full rounded-lg bg-blue-500 px-6 py-3 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500 md:ml-4 md:mt-0 md:w-auto"
      >
        Search
      </button>
    </form>
  )
}

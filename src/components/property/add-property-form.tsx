'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { api } from '@/data/api'

const newPropertySchema = z.object({
  type: z
    .enum([
      'Apartment',
      'Condo',
      'House',
      'Cabin Or Cottage',
      'Room',
      'Studio',
      'Other',
    ])
    .default('Apartment'),
  name: z.string().min(1, { message: 'Name is required' }),
  description: z
    .string()
    .min(10, { message: 'Description must have at least 10 characters' }),
  location: z.object({
    street: z.string().min(1, { message: 'Street is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    state: z.string().min(1, { message: 'State is required' }),
    zipcode: z.string().min(1, { message: 'Zipcode is required' }),
  }),
  beds: z.coerce.number().min(1, { message: 'Enter a valid value' }),
  baths: z.coerce.number().min(1, { message: 'Enter a valid value' }),
  square_feet: z.coerce.number().min(1, { message: 'Enter a valid value' }),
  amenities: z.array(z.string()).optional(),
  rates: z.object({
    weekly: z.coerce.number().optional(),
    monthly: z.coerce.number().optional(),
    nightly: z.coerce.number().optional(),
  }),
  seller_info: z.object({
    name: z.string().min(1, { message: 'Seller Name is required' }),
    email: z.string().email().min(1, { message: 'Selle Email is required' }),
    phone: z.string().min(1, { message: 'Seller Phone is required' }),
  }),
  images: z.custom<File[]>().refine((images) => images.length > 0, {
    message: 'At least one image is required',
  }),
})

type NewPropertySchema = z.infer<typeof newPropertySchema>

export default function AddPropertyForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<NewPropertySchema>({
    resolver: zodResolver(newPropertySchema),
  })

  const router = useRouter()

  const handleCreateNewProperty = async (data: NewPropertySchema) => {
    const formData = new FormData()
    formData.append('type', data.type)
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('location.street', data.location.street)
    formData.append('location.city', data.location.city)
    formData.append('location.state', data.location.state)
    formData.append('location.zipcode', data.location.zipcode)
    formData.append('beds', data.beds.toString())
    formData.append('baths', data.baths.toString())
    formData.append('square_feet', data.square_feet.toString())
    formData.append('amenities', data.amenities?.join(',') || '')
    formData.append('rates.weekly', data.rates.weekly?.toString() || '')
    formData.append('rates.monthly', data.rates.monthly?.toString() || '')
    formData.append('rates.nightly', data.rates.nightly?.toString() || '')
    formData.append('seller_info.name', data.seller_info.name)
    formData.append('seller_info.email', data.seller_info.email)
    formData.append('seller_info.phone', data.seller_info.phone)
    for (let i = 0; i < data.images.length; i++) {
      formData.append('images', data.images[i] as Blob)
    }

    await api('/properties', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        router.push(`/properties/${data.propertyId}`)
      })
  }

  return (
    <form onSubmit={handleSubmit(handleCreateNewProperty)}>
      <h2 className="mb-6 text-center text-3xl font-semibold">Add Property</h2>

      <div className="mb-4">
        <label htmlFor="type" className="mb-2 block font-bold text-gray-700">
          Property Type
        </label>
        <Controller
          name="type"
          control={control}
          render={({ field: { name, onChange } }) => {
            return (
              <select
                name={name}
                onChange={onChange}
                className="w-full rounded border px-3 py-2"
                required
              >
                <option value="Apartment">Apartment</option>
                <option value="Condo">Condo</option>
                <option value="House">House</option>
                <option value="Cabin Or Cottage">Cabin or Cottage</option>
                <option value="Room">Room</option>
                <option value="Studio">Studio</option>
                <option value="Other">Other</option>
              </select>
            )
          }}
        />
        {errors.type && (
          <p className="mt-1 text-sm text-red-400">{errors.type.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="mb-2 block font-bold text-gray-700">
          Listing Name
        </label>
        <input
          type="text"
          id="name"
          className="mb-2 w-full rounded border px-3 py-2"
          placeholder="eg. Beautiful Apartment In Miami"
          {...register('name')}
          required
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="description"
          className="mb-2 block font-bold text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          className="w-full rounded border px-3 py-2"
          rows={4}
          placeholder="Add an optional description of your property"
          {...register('description')}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-400">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="mb-4 bg-blue-50 p-4">
        <label className="mb-2 block font-bold text-gray-700">Location</label>
        <input
          type="text"
          id="street"
          className="mb-2 w-full rounded border px-3 py-2"
          placeholder="Street"
          {...register('location.street')}
          required
        />
        {errors.location?.street && (
          <p className="mt-1 text-sm text-red-400">
            {errors.location.street.message}
          </p>
        )}
        <input
          type="text"
          id="city"
          className="mb-2 w-full rounded border px-3 py-2"
          placeholder="City"
          {...register('location.city')}
          required
        />
        {errors.location?.city && (
          <p className="mt-1 text-sm text-red-400">
            {errors.location.city.message}
          </p>
        )}
        <input
          type="text"
          id="state"
          className="mb-2 w-full rounded border px-3 py-2"
          placeholder="State"
          {...register('location.state')}
          required
        />
        {errors.location?.state && (
          <p className="mt-1 text-sm text-red-400">
            {errors.location.state.message}
          </p>
        )}
        <input
          type="text"
          id="zipcode"
          className="mb-2 w-full rounded border px-3 py-2"
          placeholder="Zipcode"
          {...register('location.zipcode')}
        />
        {errors.location?.zipcode && (
          <p className="mt-1 text-sm text-red-400">
            {errors.location.zipcode.message}
          </p>
        )}
      </div>

      <div className="mb-4 flex flex-wrap">
        <div className="w-full pr-2 sm:w-1/3">
          <label htmlFor="beds" className="mb-2 block font-bold text-gray-700">
            Beds
          </label>
          <input
            type="number"
            id="beds"
            className="w-full rounded border px-3 py-2"
            min={1}
            {...register('beds')}
          />
          {errors.beds && (
            <p className="mt-1 text-sm text-red-400">{errors.beds.message}</p>
          )}
        </div>
        <div className="w-full px-2 sm:w-1/3">
          <label htmlFor="baths" className="mb-2 block font-bold text-gray-700">
            Baths
          </label>
          <input
            type="number"
            id="baths"
            className="w-full rounded border px-3 py-2"
            min={1}
            {...register('baths')}
          />
          {errors.baths && (
            <p className="mt-1 text-sm text-red-400">{errors.baths.message}</p>
          )}
        </div>
        <div className="w-full pl-2 sm:w-1/3">
          <label
            htmlFor="square_feet"
            className="mb-2 block font-bold text-gray-700"
          >
            Square Feet
          </label>
          <input
            type="number"
            id="square_feet"
            className="w-full rounded border px-3 py-2"
            {...register('square_feet')}
          />
          {errors.square_feet && (
            <p className="mt-1 text-sm text-red-400">
              {errors.square_feet.message}
            </p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label className="mb-2 block font-bold text-gray-700">Amenities</label>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          <div>
            <input
              type="checkbox"
              id="amenity_wifi"
              value="Wifi"
              className="mr-2"
              {...register('amenities')}
            />
            <label htmlFor="amenity_wifi">Wifi</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_kitchen"
              value="Full Kitchen"
              className="mr-2"
              {...register('amenities')}
            />
            <label htmlFor="amenity_kitchen">Full kitchen</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_washer_dryer"
              value="Washer & Dryer"
              className="mr-2"
              {...register('amenities')}
            />
            <label htmlFor="amenity_washer_dryer">Washer & Dryer</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_free_parking"
              value="Free Parking"
              className="mr-2"
              {...register('amenities')}
            />
            <label htmlFor="amenity_free_parking">Free Parking</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_pool"
              value="Swimming Pool"
              className="mr-2"
              {...register('amenities')}
            />
            <label htmlFor="amenity_pool">Swimming Pool</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_hot_tub"
              value="Hot Tub"
              className="mr-2"
              {...register('amenities')}
            />
            <label htmlFor="amenity_hot_tub">Hot Tub</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_24_7_security"
              value="24/7 Security"
              className="mr-2"
              {...register('amenities')}
            />
            <label htmlFor="amenity_24_7_security">24/7 Security</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_wheelchair_accessible"
              value="Wheelchair Accessible"
              className="mr-2"
              {...register('amenities')}
            />
            <label htmlFor="amenity_wheelchair_accessible">
              Wheelchair Accessible
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_elevator_access"
              value="Elevator Access"
              className="mr-2"
              {...register('amenities')}
            />
            <label htmlFor="amenity_elevator_access">Elevator Access</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_dishwasher"
              value="Dishwasher"
              className="mr-2"
              {...register('amenities')}
            />
            <label htmlFor="amenity_dishwasher">Dishwasher</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_gym_fitness_center"
              value="Gym/Fitness Center"
              className="mr-2"
              {...register('amenities')}
            />
            <label htmlFor="amenity_gym_fitness_center">
              Gym/Fitness Center
            </label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_air_conditioning"
              value="Air Conditioning"
              className="mr-2"
              {...register('amenities')}
            />
            <label htmlFor="amenity_air_conditioning">Air Conditioning</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_balcony_patio"
              value="Balcony/Patio"
              className="mr-2"
              {...register('amenities')}
            />
            <label htmlFor="amenity_balcony_patio">Balcony/Patio</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_smart_tv"
              value="Smart TV"
              className="mr-2"
              {...register('amenities')}
            />
            <label htmlFor="amenity_smart_tv">Smart TV</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="amenity_coffee_maker"
              value="Coffee Maker"
              className="mr-2"
              {...register('amenities')}
            />
            <label htmlFor="amenity_coffee_maker">Coffee Maker</label>
          </div>
        </div>
      </div>

      <div className="mb-4 bg-blue-50 p-4">
        <label className="mb-2 block font-bold text-gray-700">
          Rates (Leave blank if not applicable)
        </label>
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <div className="flex items-center">
            <label htmlFor="weekly_rate" className="mr-2">
              Weekly
            </label>
            <input
              type="number"
              id="weekly_rate"
              className="w-full rounded border px-3 py-2"
              {...register('rates.weekly')}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="monthly_rate" className="mr-2">
              Monthly
            </label>
            <input
              type="number"
              id="monthly_rate"
              className="w-full rounded border px-3 py-2"
              {...register('rates.monthly')}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="nightly_rate" className="mr-2">
              Nightly
            </label>
            <input
              type="number"
              id="nightly_rate"
              className="w-full rounded border px-3 py-2"
              {...register('rates.nightly')}
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="seller_name"
          className="mb-2 block font-bold text-gray-700"
        >
          Seller Name
        </label>
        <input
          type="text"
          id="seller_name"
          className="w-full rounded border px-3 py-2"
          placeholder="Name"
          {...register('seller_info.name')}
        />
        {errors.seller_info?.name && (
          <p className="mt-1 text-sm text-red-400">
            {errors.seller_info.name.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="seller_email"
          className="mb-2 block font-bold text-gray-700"
        >
          Seller Email
        </label>
        <input
          type="email"
          id="seller_email"
          className="w-full rounded border px-3 py-2"
          placeholder="Email address"
          {...register('seller_info.email')}
          required
        />
        {errors.seller_info?.email && (
          <p className="mt-1 text-sm text-red-400">
            {errors.seller_info.email.message}
          </p>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="seller_phone"
          className="mb-2 block font-bold text-gray-700"
        >
          Seller Phone
        </label>
        <input
          type="tel"
          id="seller_phone"
          className="w-full rounded border px-3 py-2"
          placeholder="Phone"
          {...register('seller_info.phone')}
        />
        {errors.seller_info?.phone && (
          <p className="mt-1 text-sm text-red-400">
            {errors.seller_info.phone.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="images" className="mb-2 block font-bold text-gray-700">
          Images (Select up to 4 images)
        </label>
        <input
          type="file"
          id="images"
          className="w-full rounded border px-3 py-2"
          accept="image/*"
          multiple
          {...register('images')}
        />
        {errors.images && (
          <p className="mt-1 text-sm text-red-400">{errors.images.message}</p>
        )}
      </div>

      <div>
        <button
          disabled={isSubmitting}
          className="focus:shadow-outline w-full rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 focus:outline-none disabled:bg-zinc-300"
          type="submit"
        >
          Add Property
        </button>
      </div>
    </form>
  )
}

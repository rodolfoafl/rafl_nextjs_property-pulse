'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
// import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { api } from '@/data/api'
import { Property } from '@/data/types/property'

const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email(),
  phone: z.string(),
  message: z.string(),
})

type ContactFormSchema = z.infer<typeof contactFormSchema>

interface ContactFormProps {
  property: Property
}

export default function ContactForm({ property }: ContactFormProps) {
  const { data: session } = useSession()
  const [isSuccessful, setIsSuccessful] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
  })

  async function handleSubmitForm(data: ContactFormSchema) {
    const contactData = {
      ...data,
      recipient: property.owner,
      property: property._id,
    }

    try {
      const res = await api('/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      })

      if (res.status === 200) {
        setIsSuccessful(true)
        reset()
        return toast.success('Message sent successfully')
      } else if (res.status === 400 || res.status === 401) {
        setIsSuccessful(false)
        const resData = await res.json()
        return toast.error(resData.message)
      }
    } catch (error) {
      console.error(error)
      setIsSuccessful(false)
      return toast.error('Something went wrong')
    }
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h3 className="mb-6 text-xl font-bold">Contact Property Manager</h3>
      {!session ? (
        <p>You must be logged in to send a message</p>
      ) : isSuccessful ? (
        <p className="mb-4 text-green-500">
          Your message has been sent successfuly
        </p>
      ) : (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
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
              {...register('name')}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
            )}
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
              {...register('email')}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}
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
              {...register('phone')}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-400">
                {errors.phone.message}
              </p>
            )}
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
              required
              {...register('message')}
            ></textarea>
            {errors.message && (
              <p className="mt-1 text-sm text-red-400">
                {errors.message.message}
              </p>
            )}
          </div>
          <div>
            <button
              disabled={isSubmitting}
              className="focus:shadow-outline flex w-full items-center justify-center rounded-full 
              bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 focus:outline-none 
              disabled:bg-zinc-300"
              type="submit"
            >
              <Send className="mr-2" size={20} /> Send Message
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

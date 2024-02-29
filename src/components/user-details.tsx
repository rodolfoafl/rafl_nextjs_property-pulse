'use client'

import Image from 'next/image'
import { DefaultUser } from 'next-auth'
import { useSession } from 'next-auth/react'

import defaultProfileImage from '@/assets/images/profile.png'

export default function UserDetails() {
  const { data: session } = useSession()

  if (!session) return null
  console.log('clientsession:', session)

  const user = session?.user as DefaultUser
  const profileImage = user?.image
  const profileName = user?.name
  const profileEmail = user?.email

  return (
    <div className="mb-6 mt-2 px-4 md:mb-0 md:w-1/4">
      <div className="mb-4">
        <Image
          className="mx-auto h-24 w-24 rounded-full md:mx-0 md:h-32 md:w-32"
          src={profileImage || defaultProfileImage}
          alt="User profile image"
          width={96}
          height={96}
          priority={true}
        />
      </div>
      <h2 className="mb-4 text-xl">
        <span className="block font-bold">Name: </span> {profileName}
      </h2>
      <h2 className="text-xl">
        <span className="block font-bold">Email: </span> {profileEmail}
      </h2>
    </div>
  )
}

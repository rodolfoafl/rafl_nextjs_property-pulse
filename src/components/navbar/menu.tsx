'use client'

import { Bell } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import React from 'react'

import UserProfileMenu from './user-profile-menu'

interface ActionsMenuProps {
  children: React.ReactNode
}

export default function ActionsMenu({ children }: ActionsMenuProps) {
  const { status } = useSession()
  const isAuthenticated = status === 'authenticated'

  return (
    <>
      {isAuthenticated && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
          <Link href="/messages" className="group relative">
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">View notifications</span>
              <Bell />
            </button>
            <span className="absolute right-0 top-0 inline-flex -translate-y-1/2 translate-x-1/2 transform items-center justify-center rounded-full bg-red-600 px-2 py-1 text-xs font-bold leading-none text-white">
              2
            </span>
          </Link>

          <div className="relative ml-3">
            <UserProfileMenu />
          </div>
        </div>
      )}

      {!isAuthenticated && children}
    </>
  )
}

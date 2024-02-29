'use client'

import { useSession } from 'next-auth/react'

import NavLink from '../nav-link'

export default function NavLinks() {
  const { status } = useSession()
  const isAuthenticated = status === 'authenticated'

  return (
    <div className="hidden md:ml-6 md:block">
      <div className="flex space-x-2">
        <NavLink href={'/'}>Home</NavLink>
        <NavLink href={'/properties'}>Properties</NavLink>
        {isAuthenticated && (
          <NavLink href={'/properties/add'}>Add Property</NavLink>
        )}
      </div>
    </div>
  )
}

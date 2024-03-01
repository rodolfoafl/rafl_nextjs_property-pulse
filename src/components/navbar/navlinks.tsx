import { useSession } from 'next-auth/react'

import NavLink from '../nav-link'

interface NavLinksProps {
  isMobileMenuOpen: boolean
}

export default function NavLinks({ isMobileMenuOpen }: NavLinksProps) {
  const { status } = useSession()
  const isAuthenticated = status === 'authenticated'

  return (
    <>
      <div className="hidden md:ml-6 md:block">
        <div className="flex space-x-2">
          <NavLink href={'/'}>Home</NavLink>
          <NavLink href={'/properties'}>Properties</NavLink>
          {isAuthenticated && (
            <NavLink href={'/properties/add'}>Add Property</NavLink>
          )}
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="absolute top-[82px] flex w-screen translate-x-6 border-b-2 border-black 
          bg-blue-600 md:hidden"
          id="mobile-menu"
        >
          <div className="w-full space-y-1 px-2 pb-3 pt-2 sm:px-6">
            <NavLink href={'/'}>Home</NavLink>
            <NavLink href={'/properties'}>Properties</NavLink>
            {isAuthenticated && (
              <NavLink href={'/properties/add'}>Add Property</NavLink>
            )}
          </div>
        </div>
      )}
    </>
  )
}

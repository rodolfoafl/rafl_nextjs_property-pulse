import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import logo from '@/assets/images/logo-white.png'

import ActionsMenu from './navbar/menu'
import NavLinks from './navbar/navlinks'
import ProvidersLogin from './navbar/providers-login'

export default function Navbar() {
  return (
    <nav className="border-b border-blue-500 bg-blue-700">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <button
              // onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              type="button"
              id="mobile-dropdown-button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <Menu />
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <Link className="flex flex-shrink-0 items-center" href="/">
              <Image
                className="h-10 w-auto"
                src={logo}
                alt="PropertyPulse logo"
              />

              <span className="ml-2 hidden text-2xl font-bold text-white md:block">
                PropertyPulse
              </span>
            </Link>

            <NavLinks />
          </div>

          <ActionsMenu>
            <ProvidersLogin />
          </ActionsMenu>
        </div>
      </div>

      {/* {isMobileMenuOpen && (
        <div className="flex border-t border-black md:hidden" id="mobile-menu">
          <div className="w-full space-y-1 px-2 pb-3 pt-2">
            <NavLink href={'/'}>Home</NavLink>
            <NavLink href={'/properties'}>Properties</NavLink>
            {isSignedIn && (
              <NavLink href={'/properties/add'}>Add Property</NavLink>
            )}
          </div>
        </div>
      )} */}
    </nav>
  )
}

'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Bell, LogIn, Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import logo from '@/assets/images/logo-white.png'
import profileDefault from '@/assets/images/profile.png'

import NavLink from './nav-link'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserAuthenticated, _] = useState(false)

  return (
    <nav className="border-b border-blue-500 bg-blue-700">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
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

            <div className="hidden md:ml-6 md:block">
              <div className="flex space-x-2">
                <NavLink href={'/'}>Home</NavLink>
                <NavLink href={'/properties'}>Properties</NavLink>
                {isUserAuthenticated && (
                  <NavLink href={'/properties/add'}>Add Property</NavLink>
                )}
              </div>
            </div>
          </div>

          {!isUserAuthenticated && (
            <div className="block md:ml-6">
              <div className="flex items-center">
                <button className="flex items-center rounded-md bg-gray-700 px-3 py-2 text-white hover:bg-gray-900 hover:text-white">
                  <LogIn className="text-white md:mr-2" />
                  <span className="hidden md:flex">Login or Register</span>
                </button>
              </div>
            </div>
          )}

          {isUserAuthenticated && (
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
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button
                      type="button"
                      className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      id="user-menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="absolute -inset-1.5"></span>
                      <span className="sr-only">Open user menu</span>
                      <Image
                        className="h-8 w-8 rounded-full"
                        src={profileDefault}
                        alt=""
                      />
                    </button>
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      sideOffset={12}
                      id="user-menu"
                      className="relative right-4 z-10 w-48 origin-top-right rounded-md bg-white 
                      shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      tabIndex={-1}
                    >
                      <DropdownMenu.Item>
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-700"
                          role="menuitem"
                          tabIndex={-1}
                          id="user-menu-item-0"
                        >
                          Your Profile
                        </Link>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item>
                        <Link
                          href="/properties/saved"
                          className="block px-4 py-2 text-sm text-gray-700"
                          role="menuitem"
                          tabIndex={-1}
                          id="user-menu-item-2"
                        >
                          Saved Properties
                        </Link>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item>
                        <button
                          className="block px-4 py-2 text-sm text-gray-700"
                          role="menuitem"
                          tabIndex={-1}
                          id="user-menu-item-2"
                        >
                          Sign Out
                        </button>
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </div>
            </div>
          )}
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="flex border-t border-black md:hidden" id="mobile-menu">
          <div className="w-full space-y-1 px-2 pb-3 pt-2">
            <NavLink href={'/'}>Home</NavLink>
            <NavLink href={'/properties'}>Properties</NavLink>
            {isUserAuthenticated && (
              <NavLink href={'/properties/add'}>Add Property</NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import Image from 'next/image'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

import profileDefault from '@/assets/images/profile.png'

export default function UserProfileMenu() {
  async function handleSignOut() {
    await signOut()
  }

  return (
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
            width={40}
            height={40}
            alt=""
          />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={12}
          id="user-menu"
          className="relative z-10 mr-12 w-48 origin-top-right rounded-md bg-white 
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
              onClick={handleSignOut}
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
  )
}

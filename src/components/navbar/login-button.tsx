'use client'

import { LogIn } from 'lucide-react'
import { signIn } from 'next-auth/react'

interface LoginButtonProps {
  provider: {
    id: string
  }
}

export default function LoginButton({ provider }: LoginButtonProps) {
  const { id } = provider

  const handleSignIn = async () => {
    await signIn(id)
  }

  return (
    <button
      onClick={handleSignIn}
      key={provider.id}
      className="flex items-center rounded-md bg-gray-700 px-3 py-2 text-white hover:bg-gray-900 hover:text-white"
    >
      <LogIn className="text-white md:mr-2" />
      <span className="hidden md:flex">Login or Register</span>
    </button>
  )
}

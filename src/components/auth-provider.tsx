'use client'

import { SessionProvider } from 'next-auth/react'

interface NextAuthProvider {
  children?: React.ReactNode
}

export const NextAuthProvider = ({ children }: NextAuthProvider) => {
  return <SessionProvider>{children}</SessionProvider>
}

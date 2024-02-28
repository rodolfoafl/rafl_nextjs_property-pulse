import connectDB from 'config/database'
import { NextAuthOptions } from 'next-auth'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'

import User from '@/data/models/Users'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }: GoogleProfile) {
      await connectDB()

      const existingUser = await User.findOne({ email: profile.email })
      if (!existingUser) {
        const username = profile.name.slice(0, 20)

        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        })
      }
      return true
    },
    async session({ session }) {
      const user = await User.findOne({ email: session.user?.email })

      if (!session || !session.user) {
        throw new Error('No session or user found')
      }

      session.user = {
        ...session.user,
        id: user?._id,
      }

      return session
    },
  },
}

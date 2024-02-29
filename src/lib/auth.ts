import connectDB from 'config/database'
import type { NextAuthOptions } from 'next-auth'
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
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          username: '',
          email: profile.email,
          avatar_url: profile.picture,
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      console.log('profile', profile)
      if (!profile) {
        throw new Error('No session or user found')
      }

      await connectDB()

      const existingUser = await User.findOne({ email: profile.email })
      if (!existingUser) {
        const username = profile.name?.slice(0, 20)

        await User.create({
          email: profile.email,
          username,
          image: profile.image || '',
        })
      }

      console.log('existingUser::', existingUser)
      return true
    },
    async session({ session }) {
      const user = await User.findOne({ email: session.user?.email })

      if (!session || !session.user) {
        throw new Error('No session or user found')
      }

      return {
        ...session,
        user,
      }
    },
  },
}

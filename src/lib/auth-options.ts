import connectDB from 'config/database'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'

import User from '@/data/models/Users'

export const authOptions = {
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
      const user = await User.findOne({ email: session.user.email })

      session.user.id = user._id.toString()

      return session
    },
  },
}

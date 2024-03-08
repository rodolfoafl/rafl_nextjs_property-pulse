import connectDB from 'config/database'
import { NextRequest, NextResponse } from 'next/server'
import { DefaultUser, getServerSession } from 'next-auth'

import User from '@/data/models/Users'
import { authOptions } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  if (request.method !== 'GET') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 })
  }

  const session = await getServerSession(authOptions)
  if (!session) {
    return new NextResponse('Unauthorized: session is required', {
      status: 401,
    })
  }

  try {
    await connectDB()
    const { id } = params

    const sessionUser = session.user as DefaultUser
    const { id: userId } = sessionUser

    const user = await User.findById(userId)

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    const isBookmarked = user.bookmarks.includes(id)

    return NextResponse.json(
      { isBookmarked },
      {
        status: 200,
      },
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 },
    )
  }
}

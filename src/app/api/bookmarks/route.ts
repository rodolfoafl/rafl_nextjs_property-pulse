import connectDB from 'config/database'
import { NextRequest, NextResponse } from 'next/server'
import { DefaultUser, getServerSession } from 'next-auth'

import User from '@/data/models/Users'
import { authOptions } from '@/lib/auth'

// export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    return new NextResponse('Unauthorized: session is required', {
      status: 401,
    })
  }

  try {
    await connectDB()

    const { propertyId } = await request.json()
    const sessionUser = session.user as DefaultUser
    const { id: userId } = sessionUser

    const user = await User.findById(userId)

    if (!user) {
      return new NextResponse('User not found', { status: 404 })
    }

    let isBookmarked = user.bookmarks.includes(propertyId)
    let message = ''

    if (isBookmarked) {
      user.bookmarks.pull(propertyId)
      message = 'Bookmark removed successfully'
      isBookmarked = false
    } else {
      user.bookmarks.push(propertyId)
      message = 'Bookmark added successfully'
      isBookmarked = true
    }

    await user.save()

    return new NextResponse(JSON.stringify({ message, isBookmarked }), {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new NextResponse('Something went wrong', { status: 500 })
  }
}

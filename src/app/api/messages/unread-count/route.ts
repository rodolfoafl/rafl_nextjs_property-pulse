import connectDB from 'config/database'
import { NextRequest, NextResponse } from 'next/server'
import { DefaultUser, getServerSession } from 'next-auth'

import Message from '@/data/models/Message'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  if (request.method !== 'GET') {
    return new NextResponse('Method not allowed', { status: 405 })
  }

  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    return new NextResponse('Unauthorized: session is required', {
      status: 401,
    })
  }

  try {
    await connectDB()

    const sessionUser = session.user as DefaultUser
    const { id: userId } = sessionUser

    const unreadMessagesCount = await Message.countDocuments({
      recipient: userId,
      read: false,
    })

    return new NextResponse(JSON.stringify({ count: unreadMessagesCount }), {
      status: 200,
    })
  } catch (error) {
    console.error(error)

    return new NextResponse('Something went wrong', { status: 500 })
  }
}

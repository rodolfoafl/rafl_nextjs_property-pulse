import connectDB from 'config/database'
import { NextRequest, NextResponse } from 'next/server'
import { DefaultUser, getServerSession } from 'next-auth'

import Message from '@/data/models/Message'
import { authOptions } from '@/lib/auth'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new NextResponse('Unauthorized: session is required', {
      status: 401,
    })
  }

  try {
    await connectDB()

    const { id } = params
    const existingMessage = await Message.findById(id)

    if (!existingMessage) {
      return new NextResponse('Message does not exist', { status: 404 })
    }

    const user = session.user as DefaultUser
    const { id: userId } = user

    if (existingMessage.recipient.toString() !== userId) {
      return new NextResponse(
        'Unauthorized: user is not the message recipient',
        {
          status: 401,
        },
      )
    }

    existingMessage.read = !existingMessage.read
    await existingMessage.save()

    return new NextResponse(JSON.stringify(existingMessage), {
      status: 200,
    })
  } catch (error) {
    return new NextResponse('Failed to update message', { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return new NextResponse('Unauthorized: session is required', {
      status: 401,
    })
  }

  try {
    await connectDB()

    const { id } = params
    const existingMessage = await Message.findById(id)

    if (!existingMessage) {
      return new NextResponse('Message does not exist', { status: 404 })
    }

    const user = session.user as DefaultUser
    const { id: userId } = user

    if (existingMessage.recipient.toString() !== userId) {
      return new NextResponse(
        'Unauthorized: user is not the message recipient',
        {
          status: 401,
        },
      )
    }

    await existingMessage.deleteOne()

    return new NextResponse('Message deleted', {
      status: 200,
    })
  } catch (error) {
    return new NextResponse('Failed to delete message', { status: 500 })
  }
}

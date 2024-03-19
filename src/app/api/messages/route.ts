import connectDB from 'config/database'
import { NextRequest, NextResponse } from 'next/server'
import { DefaultUser, getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'

import Message from '../../../data/models/Message'

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

    const readMessages = await Message.find({ recipient: userId, read: true })
      .sort({ createdAt: -1 })
      .populate('sender', 'username')
      .populate('property', 'name')

    const unreadMessages = await Message.find({
      recipient: userId,
      read: false,
    })
      .sort({ createdAt: -1 })
      .populate('sender', 'username')
      .populate('property', 'name')

    const messages = [...unreadMessages, ...readMessages]

    return new NextResponse(JSON.stringify(messages), { status: 200 })
  } catch (error) {
    console.error(error)

    return new NextResponse('Something went wrong', { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    return new NextResponse(
      JSON.stringify({ message: 'You must be logged in to send a message' }),
      { status: 401 },
    )
  }

  try {
    const { name, email, phone, message, property, recipient } =
      await request.json()

    const sessionUser = session.user as DefaultUser
    const { id: userId } = sessionUser

    if (userId === recipient) {
      return new NextResponse(
        JSON.stringify({ message: 'Can not send a message to yourself' }),
        { status: 400 },
      )
    }

    await connectDB()

    const newMessage = new Message({
      sender: userId,
      recipient,
      property,
      name,
      email,
      phone,
      body: message,
    })

    await newMessage.save()

    return new NextResponse(
      JSON.stringify({ message: 'Message sent successfuly' }),
      {
        status: 200,
      },
    )
  } catch (error) {
    return new NextResponse('Failed to send message', { status: 500 })
  }
}

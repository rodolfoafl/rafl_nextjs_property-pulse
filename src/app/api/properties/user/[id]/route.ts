import connectDB from 'config/database'
import { NextRequest, NextResponse } from 'next/server'

import Property from '@/data/models/Property'
import User from '@/data/models/Users'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  if (request.method !== 'GET') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 })
  }

  try {
    await connectDB()

    const userId = params.id
    if (!userId) {
      return new NextResponse('User ID is required', { status: 400 })
    }

    const existingUser = await User.findById(userId)
    if (!existingUser) {
      throw new Error('User not found')
      // return new NextResponse('User not found', { status: 404 })
    }

    const properties = await Property.find({ owner: userId }).sort({
      createdAt: 'desc',
    })

    return new NextResponse(JSON.stringify(properties), {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new NextResponse(JSON.stringify(null), { status: 500 })
  }
}

import connectDB from 'config/database'
import { NextRequest, NextResponse } from 'next/server'
import { DefaultUser, getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import cloudinary from '@/lib/cloudinary'

import Property from '../../../../data/models/Property'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  if (request.method !== 'DELETE') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 })
  }

  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    return new NextResponse('Unauthorized: session is required', {
      status: 401,
    })
  }

  try {
    await connectDB()

    const user = session.user as DefaultUser
    const { id: userId } = user

    const { id } = params
    const property = await Property.findById(id)

    if (!property) {
      return new NextResponse('Property not found', { status: 404 })
    }

    if (property.owner.toString() !== userId) {
      return new NextResponse('Unauthorized: user is not the property owner', {
        status: 401,
      })
    }

    const publicIds = property.images.map((imageUrl: string) => {
      const parts = imageUrl.split('/')
      return parts.at(-1)?.split('.').at(0)
    })

    // Delete images from Cloudinary
    if (publicIds.length > 0) {
      for (const publicId of publicIds) {
        await cloudinary.uploader.destroy('propertypulse/' + publicId)
      }
    }

    await property.deleteOne()

    return new NextResponse('Property Deleted', {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  if (request.method !== 'GET') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 })
  }

  try {
    await connectDB()

    const { id } = params
    const property = await Property.findById(id)

    if (!property) {
      return new NextResponse('Property not found', { status: 404 })
    }

    return new NextResponse(JSON.stringify(property), {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

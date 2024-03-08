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

    const user:
      | {
          id?: string
          name?: string | null | undefined
          email?: string | null | undefined
          image?: string | null | undefined
        }
      | undefined = session.user
    if (!user) {
      return new NextResponse('Unauthorized: user ID is required', {
        status: 401,
      })
    }

    const userId = user.id

    const { id } = params
    const existingProperty = await Property.findById(id)

    if (!existingProperty) {
      return new NextResponse('Property does not exist', { status: 404 })
    }

    if (existingProperty.owner.toString() !== userId) {
      return new NextResponse('Unauthorized: user is not the property owner', {
        status: 401,
      })
    }

    const formData = await request.formData()

    const amenities = formData.getAll('amenities').toString().split(',')

    const propertyData = {
      owner: userId,
      type: formData.get('type'),
      name: formData.get('name'),
      description: formData.get('description'),
      location: {
        street: formData.get('location.street'),
        city: formData.get('location.city'),
        state: formData.get('location.state'),
        zipcode: formData.get('location.zipcode'),
      },
      beds: formData.get('beds'),
      baths: formData.get('baths'),
      square_feet: formData.get('square_feet'),
      amenities,
      rates: {
        monthly: formData.get('rates.monthly'),
        weekly: formData.get('rates.weekly'),
        nightly: formData.get('rates.nightly'),
      },
      seller_info: {
        name: formData.get('seller_info.name'),
        email: formData.get('seller_info.email'),
        phone: formData.get('seller_info.phone'),
      },
    }

    const updatedProperty = await Property.findByIdAndUpdate(id, propertyData)

    return new NextResponse(JSON.stringify(updatedProperty), {
      status: 200,
    })
  } catch (error) {
    return new NextResponse('Failed to add property', { status: 500 })
  }
}

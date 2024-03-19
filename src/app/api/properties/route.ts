import connectDB from 'config/database'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import cloudinary from '@/lib/cloudinary'

import Property from '../../../data/models/Property'

export async function GET(request: NextRequest) {
  if (request.method !== 'GET') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 })
  }

  try {
    await connectDB()

    const properties = await Property.find({}).sort({ createdAt: 'desc' })

    return new NextResponse(JSON.stringify(properties), {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function POST(request: NextRequest) {
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
      images: Array<string>(),
    }

    const images = formData.getAll('images') as File[]
    // console.log('images', images)
    if (images.length < 1) {
      return new NextResponse('At least one image is required', { status: 400 })
    }

    const imageUploadPromises = []
    for (const image of images) {
      const imageBuffer = await image.arrayBuffer()
      const imageArray = Array.from(new Uint8Array(imageBuffer))
      const imageData = Buffer.from(imageArray)

      const imageBase64 = imageData.toString('base64')

      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        { folder: 'propertypulse' },
      )

      imageUploadPromises.push(result.secure_url)

      const uploadedImages = await Promise.all(imageUploadPromises)

      propertyData.images = uploadedImages
    }

    const newProperty = new Property(propertyData)
    await newProperty.save()

    return new NextResponse(JSON.stringify({ propertyId: newProperty._id }), {
      status: 200,
    })
  } catch (error) {
    return new NextResponse('Failed to add property', { status: 500 })
  }
}

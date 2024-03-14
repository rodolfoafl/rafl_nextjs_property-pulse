import connectDB from 'config/database'
import { NextRequest, NextResponse } from 'next/server'

import Property from '@/data/models/Property'

export async function GET(request: NextRequest) {
  if (request.method !== 'GET') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 })
  }

  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const location = searchParams.get('location') ?? ''
    const type = searchParams.get('type') ?? ''

    let query = {}
    if (location && location !== '') {
      const locationPattern = new RegExp(location, 'i')
      query = {
        $or: [
          { name: locationPattern },
          { description: locationPattern },
          { 'location.street': locationPattern },
          { 'location.city': locationPattern },
          { 'location.state': locationPattern },
          { 'location.zipcode': locationPattern },
        ],
      }
    }

    if (type && type !== 'all') {
      const typePattern = new RegExp(type, 'i')
      query = {
        ...query,
        type: typePattern,
      }
    }

    const properties = await Property.find(query).sort({ createdAt: 'desc' })

    return new NextResponse(JSON.stringify(properties), {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

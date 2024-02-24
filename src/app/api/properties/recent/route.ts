import connectDB from 'config/database'
import { NextRequest, NextResponse } from 'next/server'

import Property from '../../../../data/models/Property'

export async function GET(request: NextRequest) {
  if (request.method !== 'GET') {
    return NextResponse.json({ message: 'Method not allowed' }, { status: 405 })
  }

  try {
    await connectDB()

    const properties = await Property.find({})
      .limit(3)
      .sort({ createdAt: 'desc' })

    return new NextResponse(JSON.stringify(properties), {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

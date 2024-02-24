import connectDB from 'config/database'
import { NextResponse } from 'next/server'

import Property from '../../(models)/Property'

export async function GET() {
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

import connectDB from 'config/database'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectDB()

    return new NextResponse(JSON.stringify({ message: 'hello' }), {
      status: 200,
    })
  } catch (error) {
    console.error(error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

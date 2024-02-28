import mongoose from 'mongoose'

let connected = false

export default async function connectDB() {
  mongoose.set('strictQuery', true)

  if (connected) {
    return console.log('MongoDB already connected')
  }

  if (!process.env.MONGODB_ACCESS_URI) {
    throw new Error('MONGODB_ACCESS_URI is not defined')
  }

  try {
    await mongoose.connect(process.env.MONGODB_ACCESS_URI)
    connected = true
    console.log('MongoDB connected')
  } catch (error) {
    console.error('MongoDB connection failed', error)
  }
}

import mongoose from 'mongoose'

let connected = false

export default async function connectDB() {
  mongoose.set('strictQuery', true)

  if (connected) {
    return console.log('MongoDB already connected')
  }

  try {
    await mongoose.connect(process.env.MONGODB_ACCESS_URI)
    connected = true
    console.log('MongoDB connected')
  } catch (error) {
    console.error('MongoDB connection failed', error)
  }
}

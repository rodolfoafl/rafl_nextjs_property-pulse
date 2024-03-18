import { Property } from './property'
import { User } from './user'

export interface Message {
  _id: string
  sender: User
  recipient: string
  property: Property
  name: string
  email: string
  phone: string
  body: string
  read: boolean
  createdAt: string
  updatedAt: string
}

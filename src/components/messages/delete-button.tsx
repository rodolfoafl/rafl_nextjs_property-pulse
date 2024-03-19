'use client'

import { toast } from 'sonner'

import { api } from '@/data/api'
import { Message } from '@/data/types/message'
import revalidateMessagesAction from '@/utils/revalidate-messages-tag'

interface DeleteButtonProps {
  message: Message
}

export default function DeleteButton({ message }: DeleteButtonProps) {
  const { _id } = message

  async function handleDeleteMessage() {
    try {
      const res = await api(`/messages/${_id}`, {
        method: 'DELETE',
      })

      if (res.status === 200) {
        revalidateMessagesAction()
        return toast.success('Message Deleted!')
      }
      return toast.error('Failed to delete message')
    } catch (error) {
      console.error('Error deleting message', error)
      return toast.error('Failed to delete message')
    }
  }

  return (
    <button
      onClick={handleDeleteMessage}
      className="mt-4 rounded-md bg-red-500 px-3 py-1 text-white"
    >
      Delete
    </button>
  )
}

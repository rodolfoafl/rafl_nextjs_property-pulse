'use client'

import { toast } from 'sonner'
import { twJoin } from 'tailwind-merge'

import { api } from '@/data/api'
import { Message } from '@/data/types/message'
import revalidateMessagesAction from '@/utils/revalidate-messages-tag'

interface UpdateButtonProps {
  message: Message
}

export default function UpdateButton({ message }: UpdateButtonProps) {
  const { read, _id } = message

  const displayText = read ? 'Mark as New' : 'Mark as Read'
  const buttonBgColor = read ? 'bg-gray-400' : 'bg-blue-500'

  async function handleUpdateMessage() {
    try {
      const res = await api(`/messages/${_id}`, {
        method: 'PUT',
      })

      if (res.status === 200) {
        revalidateMessagesAction()
        return toast.success('Message Updated!')
      }
      return toast.error('Failed to update message')
    } catch (error) {
      console.error('Error updating message', error)
      return toast.error('Failed to update message')
    }
  }

  return (
    <button
      // disabled={read}
      onClick={handleUpdateMessage}
      className={twJoin(
        'mr-3 mt-4 rounded-md  px-3 py-1 text-white disabled:bg-zinc-300',
        buttonBgColor,
      )}
    >
      {displayText}
    </button>
  )
}

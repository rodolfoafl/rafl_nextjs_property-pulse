import { headers } from 'next/headers'

import { api } from '@/data/api'

async function getUnreadMessagesCount() {
  const response = await api('/messages/unread-count', {
    cache: 'no-store',
    headers: headers(),
  })

  const messages = await response.json()
  return messages
}

export default async function MessageNotificationCount() {
  const messages = await getUnreadMessagesCount()
  const count = messages.count

  if (count === 0) {
    return null
  }

  return (
    <span className="absolute right-0 top-0 inline-flex -translate-y-1/2 translate-x-1/2 transform items-center justify-center rounded-full bg-red-600 px-2 py-1 text-xs font-bold leading-none text-white">
      {count}
    </span>
  )
}

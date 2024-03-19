import { headers } from 'next/headers'

import MessageCard from '@/components/messages/message-card'
import { api } from '@/data/api'
import { Message } from '@/data/types/message'

async function getMessages(): Promise<Message[]> {
  const response = await api('/messages', {
    // next: { revalidate: 60 * 60 },
    next: {
      tags: ['get-messages'],
    },
    cache: 'no-store',
    headers: headers(),
  })

  const messages = await response.json()
  return messages
}

export default async function MessagesPage() {
  const messages = await getMessages()

  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-6xl py-24">
        <div className="m-4 mb-4 rounded-md border bg-white px-6 py-8 shadow-md md:m-0">
          <h1 className="mb-4 text-3xl font-bold">Your Messages</h1>

          <div className="space-y-4">
            {!messages || messages.length === 0 ? (
              <p>You have no messages</p>
            ) : (
              messages.map((message) => {
                return <MessageCard key={message._id} message={message} />
              })
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

import React from 'react'

import { Message } from '@/data/types/message'

interface MessageCardProps {
  message: Message
}

export default function MessageCard({ message }: MessageCardProps) {
  const { property, body, sender, email, phone, createdAt, read } = message

  return (
    <div className="relative rounded-md border border-gray-200 bg-white p-4 shadow-md">
      <h2 className="mb-4 text-xl">
        <span className="font-bold">Property Inquiry: </span>
        {property.name}
      </h2>
      <p className="text-gray-700">{body}</p>

      <ul className="mt-4">
        <li>
          <strong>Name: </strong> {sender.username}
        </li>

        <li>
          <strong>Reply Email: </strong>
          <a href={`mailto:${email}`} className="text-blue-500">
            {email}
          </a>
        </li>
        <li>
          <strong>Reply Phone: </strong>
          <a href={`tel:${phone}`} className="text-blue-500">
            {phone}
          </a>
        </li>
        <li>
          <strong>Received: </strong>
          {new Date(createdAt).toLocaleDateString('pt-BR')}
        </li>
      </ul>
      <button
        disabled={read}
        className="mr-3 mt-4 rounded-md bg-blue-500 px-3 py-1 text-white disabled:bg-zinc-300"
      >
        Mark As Read
      </button>
      <button className="mt-4 rounded-md bg-red-500 px-3 py-1 text-white">
        Delete
      </button>
    </div>
  )
}

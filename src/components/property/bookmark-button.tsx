'use client'

import { Bookmark, BookmarkX } from 'lucide-react'
import { DefaultUser } from 'next-auth'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

import { api } from '@/data/api'
import { Property } from '@/data/types/property'
import revalidateBookmarkAction from '@/utils/revalidate-bookmark-tag'

interface BookmarkButtonProps {
  property: Property
  isBookmarked: boolean
}

export default function BookmarkButton({
  property,
  isBookmarked,
}: BookmarkButtonProps) {
  const { data: session } = useSession()

  const user = session?.user as DefaultUser
  const userId = user?.id

  async function handleClick() {
    if (!userId) {
      return toast.error('You must be logged in to bookmark a property')
    }

    try {
      const res = await api('/bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ propertyId: property._id }),
      })

      if (res.status === 200) {
        const data = await res.json()

        revalidateBookmarkAction()

        return toast.success(data.message)
      }
    } catch (error) {
      console.error(error)
      return toast.error('Something went wrong')
    }
  }

  return isBookmarked ? (
    <button
      onClick={handleClick}
      className="flex w-full items-center justify-center rounded-full
    bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-600"
    >
      <BookmarkX className="mr-2" size={20} />
      Remove Bookmark
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="flex w-full items-center justify-center rounded-full
      bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
    >
      <Bookmark className="mr-2" size={20} />
      Bookmark Property
    </button>
  )
}

'use server'

import { revalidateTag } from 'next/cache'

export default async function revalidateBookmarkAction() {
  revalidateTag('get-bookmark')
}

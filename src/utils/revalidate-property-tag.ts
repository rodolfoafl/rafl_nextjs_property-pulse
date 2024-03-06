'use server'

import { revalidateTag } from 'next/cache'

export default async function revalidateGetPropertyAction() {
  revalidateTag('get-property')
}

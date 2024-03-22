'use client'

import { usePathname, useRouter } from 'next/navigation'

interface PaginationProps {
  page: number
  pageSize?: number
  totalItems: number
}

export default function Pagination({
  page,
  pageSize,
  totalItems,
}: PaginationProps) {
  const pathname = usePathname()
  const { replace } = useRouter()

  const currentPage = page
  const currentPageSize = pageSize || 3
  const totalPages = Math.ceil(totalItems / currentPageSize)

  function handlePageChange(value: number) {
    if (value >= 1 && value <= totalPages) {
      replace(`${pathname}?page=${value.toString()}`)
    }
  }

  return (
    <section className="container mx-auto flex items-center justify-center py-8">
      <button
        disabled={currentPage === 1}
        className="mr-2 rounded border border-gray-300 bg-white px-2 py-1 hover:bg-gray-100 disabled:hidden"
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Previous
      </button>
      <span className="mx-2">
        Page {currentPage} of {totalPages}
      </span>
      <button
        disabled={currentPage === totalPages}
        className="ml-2 rounded border border-gray-300 bg-white px-2 py-1 hover:bg-gray-100 disabled:hidden"
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
    </section>
  )
}

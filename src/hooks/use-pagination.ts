'use client'

import { useState, useMemo, useCallback } from 'react'

interface UsePaginationProps {
  totalItems: number
  pageSize?: number
  initialPage?: number
}

export function usePagination({ totalItems, pageSize = 10, initialPage = 1 }: UsePaginationProps) {
  const [page, setPage] = useState(initialPage)

  const totalPages = Math.ceil(totalItems / pageSize)
  const startIndex = (page - 1) * pageSize
  const endIndex = Math.min(startIndex + pageSize, totalItems)

  const goToPage = useCallback((p: number) => {
    setPage(Math.max(1, Math.min(p, totalPages)))
  }, [totalPages])

  const nextPage = useCallback(() => goToPage(page + 1), [page, goToPage])
  const prevPage = useCallback(() => goToPage(page - 1), [page, goToPage])

  return {
    page,
    pageSize,
    totalPages,
    startIndex,
    endIndex,
    setPage: goToPage,
    nextPage,
    prevPage,
    hasPrevious: page > 1,
    hasNext: page < totalPages,
  }
}

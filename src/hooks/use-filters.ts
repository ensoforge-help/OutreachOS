'use client'

import { useState, useCallback } from 'react'

type FilterValues = Record<string, string>

export function useFilters(initialValues: FilterValues = {}) {
  const [filters, setFilters] = useState<FilterValues>(initialValues)

  const setFilter = useCallback((key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters(initialValues)
  }, [initialValues])

  const hasActiveFilters = Object.entries(filters).some(
    ([key, value]) => value !== initialValues[key]
  )

  return {
    filters,
    setFilter,
    resetFilters,
    hasActiveFilters,
  }
}

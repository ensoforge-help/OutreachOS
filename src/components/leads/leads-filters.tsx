'use client'

import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search } from 'lucide-react'
import { BUSINESS_CATEGORIES } from '@/lib/constants'

interface LeadsFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  categoryFilter: string
  onCategoryChange: (value: string) => void
  statusFilter: string
  onStatusChange: (value: string) => void
  websiteFilter: string
  onWebsiteChange: (value: string) => void
}

export function LeadsFilters({
  search, onSearchChange,
  categoryFilter, onCategoryChange,
  statusFilter, onStatusChange,
  websiteFilter, onWebsiteChange,
}: LeadsFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px] max-w-[300px]">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
        <Input
          placeholder="Search businesses…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-8 pl-8 text-body-small bg-card border-border"
        />
      </div>

      {/* Category */}
      <Select value={categoryFilter} onValueChange={(v) => onCategoryChange(v || '')}>
        <SelectTrigger className="h-8 w-[160px] text-body-small bg-card border-border">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {BUSINESS_CATEGORIES.map((cat) => (
            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Status */}
      <Select value={statusFilter} onValueChange={(v) => onStatusChange(v || '')}>
        <SelectTrigger className="h-8 w-[140px] text-body-small bg-card border-border">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="new">New</SelectItem>
          <SelectItem value="enriched">Enriched</SelectItem>
          <SelectItem value="ready">Ready</SelectItem>
          <SelectItem value="contacted">Contacted</SelectItem>
          <SelectItem value="replied">Replied</SelectItem>
          <SelectItem value="suppressed">Suppressed</SelectItem>
        </SelectContent>
      </Select>

      {/* Website */}
      <Select value={websiteFilter} onValueChange={(v) => onWebsiteChange(v || '')}>
        <SelectTrigger className="h-8 w-[140px] text-body-small bg-card border-border">
          <SelectValue placeholder="Website" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Any Website</SelectItem>
          <SelectItem value="yes">Has Website</SelectItem>
          <SelectItem value="no">No Website</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

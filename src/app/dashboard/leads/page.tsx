'use client'

import { useState, useMemo } from 'react'
import { businesses, contacts } from '@/data/dummy-businesses'
import { LeadsFilters } from '@/components/leads/leads-filters'
import { LeadsTable } from '@/components/leads/leads-table'
import { LeadDetailDrawer } from '@/components/leads/lead-detail-drawer'
import { Button } from '@/components/ui/button'
import type { Business } from '@/types/business'

export default function LeadsPage() {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [websiteFilter, setWebsiteFilter] = useState('all')
  const [selectedLead, setSelectedLead] = useState<Business | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [page, setPage] = useState(1)
  const pageSize = 10

  const filteredLeads = useMemo(() => {
    return businesses.filter((b) => {
      if (search && !b.name.toLowerCase().includes(search.toLowerCase())) return false
      if (categoryFilter !== 'all' && b.category !== categoryFilter) return false
      if (statusFilter !== 'all' && b.status !== statusFilter) return false
      if (websiteFilter === 'yes' && !b.hasWebsite) return false
      if (websiteFilter === 'no' && b.hasWebsite) return false
      return true
    })
  }, [search, categoryFilter, statusFilter, websiteFilter])

  const totalPages = Math.ceil(filteredLeads.length / pageSize)
  const paginatedLeads = filteredLeads.slice((page - 1) * pageSize, page * pageSize)

  const getContact = (businessId: string) => contacts.find((c) => c.businessId === businessId)

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleSelectAll() {
    if (selectedIds.size === paginatedLeads.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(paginatedLeads.map((b) => b.id)))
    }
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <LeadsFilters
        search={search}
        onSearchChange={setSearch}
        categoryFilter={categoryFilter}
        onCategoryChange={setCategoryFilter}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        websiteFilter={websiteFilter}
        onWebsiteChange={setWebsiteFilter}
      />

      {/* Bulk actions */}
      {selectedIds.size > 0 && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{selectedIds.size} selected</span>
          <Button variant="ghost" size="xs" onClick={() => setSelectedIds(new Set())}>
            Clear
          </Button>
          <Button variant="secondary" size="xs">Export</Button>
          <Button variant="secondary" size="xs">Add to Campaign</Button>
        </div>
      )}

      {/* Table */}
      <LeadsTable
        leads={paginatedLeads}
        getContact={getContact}
        selectedIds={selectedIds}
        onToggleSelect={toggleSelect}
        onToggleSelectAll={toggleSelectAll}
        allSelected={selectedIds.size === paginatedLeads.length && paginatedLeads.length > 0}
        onViewLead={setSelectedLead}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filteredLeads.length)} of {filteredLeads.length}
          </span>
          <div className="flex gap-1">
            <Button variant="ghost" size="xs" disabled={page === 1} onClick={() => setPage(page - 1)}>
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i}
                variant={page === i + 1 ? 'secondary' : 'ghost'}
                size="xs"
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            <Button variant="ghost" size="xs" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Detail Drawer */}
      <LeadDetailDrawer
        business={selectedLead}
        contact={selectedLead ? getContact(selectedLead.id) : undefined}
        open={!!selectedLead}
        onClose={() => setSelectedLead(null)}
      />
    </div>
  )
}

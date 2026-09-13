'use client'

import { useState, useMemo } from 'react'
import { LeadsFilters } from '@/components/leads/leads-filters'
import { LeadsTable } from '@/components/leads/leads-table'
import { LeadDetailDrawer } from '@/components/leads/lead-detail-drawer'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useRouter } from 'next/navigation'
import type { Business } from '@/types/business'
import type { Contact } from '@/types/contact'

interface LeadsClientViewProps {
  initialLeads: Business[]
  initialContacts: Contact[]
  activeCampaigns?: { id: string; name: string }[]
}

export function LeadsClientView({ initialLeads, initialContacts, activeCampaigns = [] }: LeadsClientViewProps) {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [websiteFilter, setWebsiteFilter] = useState('all')
  const [selectedLead, setSelectedLead] = useState<Business | null>(null)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [page, setPage] = useState(1)
  const pageSize = 10
  
  // Bulk action state
  const [showCampaignModal, setShowCampaignModal] = useState(false)
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleBulkAddToCampaign() {
    if (!selectedCampaignId || selectedIds.size === 0) return
    setIsSubmitting(true)
    try {
      const res = await fetch('/api/businesses/bulk', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add_to_campaign',
          businessIds: Array.from(selectedIds),
          campaignId: selectedCampaignId
        })
      })
      if (!res.ok) throw new Error('Failed to update leads')
      
      setSelectedIds(new Set())
      setShowCampaignModal(false)
      router.refresh()
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const filteredLeads = useMemo(() => {
    return initialLeads.filter((b) => {
      if (search && !b.name.toLowerCase().includes(search.toLowerCase())) return false
      // Fallback property mapping for category
      const category = b.category
      if (categoryFilter !== 'all' && category !== categoryFilter) return false
      if (statusFilter !== 'all' && b.status !== statusFilter) return false
      if (websiteFilter === 'yes' && !b.hasWebsite) return false
      if (websiteFilter === 'no' && b.hasWebsite) return false
      return true
    })
  }, [search, categoryFilter, statusFilter, websiteFilter, initialLeads])

  const totalPages = Math.ceil(filteredLeads.length / pageSize)
  const paginatedLeads = filteredLeads.slice((page - 1) * pageSize, page * pageSize)

  const getContact = (businessId: string) => initialContacts.find((c) => c.businessId === businessId)

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
      setSelectedIds(new Set(paginatedLeads.map((b) => b.id).filter((id): id is string => id !== undefined)))
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
          <Button variant="secondary" size="xs" onClick={() => setShowCampaignModal(true)}>
            Add to Campaign
          </Button>
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
        contact={selectedLead?.id ? getContact(selectedLead.id) : undefined}
        open={!!selectedLead}
        onClose={() => setSelectedLead(null)}
      />

      {/* Add to Campaign Modal */}
      <Dialog open={showCampaignModal} onOpenChange={setShowCampaignModal}>
        <DialogContent className="sm:max-w-[425px] bg-[#0D0D0F] border-border">
          <DialogHeader>
            <DialogTitle>Add {selectedIds.size} Leads to Campaign</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Select value={selectedCampaignId} onValueChange={(val) => val && setSelectedCampaignId(val)}>
              <SelectTrigger className="w-full bg-card border-border text-sm">
                <SelectValue placeholder="Select a campaign" />
              </SelectTrigger>
              <SelectContent>
                {activeCampaigns.map((camp) => (
                  <SelectItem key={camp.id} value={camp.id}>
                    {camp.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowCampaignModal(false)} disabled={isSubmitting}>Cancel</Button>
            <Button onClick={handleBulkAddToCampaign} disabled={isSubmitting || !selectedCampaignId}>
              {isSubmitting ? 'Adding...' : 'Add Leads'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

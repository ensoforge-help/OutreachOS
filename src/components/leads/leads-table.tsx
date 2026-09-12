'use client'

import type { Business } from '@/types/business'
import type { Contact } from '@/types/contact'
import { StatusBadge } from '@/components/ui/status-badge'
import { ScoreBadge } from '@/components/ui/score-badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/ui/empty-state'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Globe, Eye, Search } from 'lucide-react'

interface LeadsTableProps {
  leads: Business[]
  getContact: (businessId: string) => Contact | undefined
  selectedIds: Set<string>
  onToggleSelect: (id: string) => void
  onToggleSelectAll: () => void
  allSelected: boolean
  onViewLead: (lead: Business) => void
}

export function LeadsTable({
  leads, getContact, selectedIds, onToggleSelect, onToggleSelectAll, allSelected, onViewLead,
}: LeadsTableProps) {
  if (leads.length === 0) {
    return (
      <EmptyState
        icon={<Search className="w-6 h-6 text-muted-foreground" />}
        title="No leads found"
        description="Try adjusting your filters or search query."
      />
    )
  }

  return (
    <div className="rounded-lg border border-border bg-card overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent text-table-header">
            <TableHead className="w-[40px]">
              <Checkbox
                checked={allSelected}
                onCheckedChange={onToggleSelectAll}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead>Business</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Website</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead className="text-right">Score</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[60px]" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map((biz) => {
            const contact = getContact(biz.id)
            return (
              <TableRow
                key={biz.id}
                className="text-table-cell cursor-pointer"
                onClick={() => onViewLead(biz)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedIds.has(biz.id)}
                    onCheckedChange={() => onToggleSelect(biz.id)}
                    aria-label={`Select ${biz.name}`}
                  />
                </TableCell>
                <TableCell className="font-medium text-foreground">{biz.name}</TableCell>
                <TableCell className="text-muted-foreground">{biz.category}</TableCell>
                <TableCell className="text-muted-foreground">{biz.city}</TableCell>
                <TableCell>
                  {biz.hasWebsite ? (
                    <span className="inline-flex items-center gap-1 text-emerald-400">
                      <Globe className="w-3 h-3" />
                      <StatusBadge status={biz.websiteStatus || 'good'} />
                    </span>
                  ) : (
                    <StatusBadge status="missing" />
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground font-mono text-[11px] md:text-xs">
                  {contact?.email || '—'}
                </TableCell>
                <TableCell className="text-right">
                  <ScoreBadge score={biz.leadScore} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={biz.status} />
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon-xs" onClick={() => onViewLead(biz)}>
                    <Eye className="w-3.5 h-3.5" />
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { businesses } from '@/data/dummy-businesses'
import { contacts } from '@/data/dummy-businesses'
import { StatusBadge } from '@/components/ui/status-badge'
import { ScoreBadge } from '@/components/ui/score-badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Globe, ExternalLink } from 'lucide-react'

export function RecentLeadsTable() {
  // Show top 8 leads sorted by score
  const recentLeads = [...businesses]
    .sort((a, b) => b.leadScore - a.leadScore)
    .slice(0, 8)

  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h3 className="text-card-title">Recent Leads</h3>
        <Link
          href="/dashboard/leads"
          className="text-body-small text-primary hover:text-primary/80 transition-colors"
        >
          View all
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent text-table-header">
            <TableHead>Business</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Website</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Score</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentLeads.map((biz) => {
            const contact = contacts.find((c) => c.businessId === biz.id)
            return (
              <TableRow key={biz.id} className="text-table-cell">
                <TableCell className="font-medium text-foreground">{biz.name}</TableCell>
                <TableCell className="text-muted-foreground">{biz.category}</TableCell>
                <TableCell className="text-muted-foreground">{biz.city}</TableCell>
                <TableCell>
                  {biz.hasWebsite ? (
                    <span className="inline-flex items-center gap-1 text-emerald-400">
                      <Globe className="w-3 h-3" />
                      <span>Website</span>
                    </span>
                  ) : (
                    <span className="text-muted-foreground">—</span>
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
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

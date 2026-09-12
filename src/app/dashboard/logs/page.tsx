'use client'

import { useState } from 'react'
import { automationRuns } from '@/data/dummy-logs'
import { StatusBadge } from '@/components/ui/status-badge'
import { formatDateTime } from '@/lib/utils'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Loader2 } from 'lucide-react'

const typeLabels: Record<string, string> = {
  discovery: 'Business Discovery',
  enrichment: 'Email Discovery',
  analysis: 'Website Analysis',
  'email-generation': 'AI Draft Generation',
  sending: 'Email Sending',
}

export default function LogsPage() {
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = automationRuns.filter((r) => {
    if (typeFilter !== 'all' && r.type !== typeFilter) return false
    if (statusFilter !== 'all' && r.status !== statusFilter) return false
    return true
  }).sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime())

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center gap-3">
        <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v || '')}>
          <SelectTrigger className="h-8 w-[180px] text-body-small bg-card border-border">
            <SelectValue placeholder="Workflow" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Workflows</SelectItem>
            <SelectItem value="discovery">Discovery</SelectItem>
            <SelectItem value="enrichment">Enrichment</SelectItem>
            <SelectItem value="analysis">Analysis</SelectItem>
            <SelectItem value="email-generation">AI Generation</SelectItem>
            <SelectItem value="sending">Sending</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v || '')}>
          <SelectTrigger className="h-8 w-[140px] text-body-small bg-card border-border">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="running">Running</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>

        <span className="text-body-small text-muted-foreground">{filtered.length} entries</span>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent text-table-header">
              <TableHead>Timestamp</TableHead>
              <TableHead>Workflow</TableHead>
              <TableHead>Campaign</TableHead>
              <TableHead className="text-right">Processed</TableHead>
              <TableHead className="text-right">Errors</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((run) => (
              <TableRow key={run.id} className="text-table-cell">
                <TableCell className="font-mono text-muted-foreground whitespace-nowrap text-body-small">
                  {formatDateTime(run.startedAt)}
                </TableCell>
                <TableCell className="font-medium text-foreground whitespace-nowrap">
                  {run.status === 'running' && (
                    <Loader2 className="w-3 h-3 inline mr-1 animate-spin text-primary" />
                  )}
                  {typeLabels[run.type] || run.type}
                </TableCell>
                <TableCell className="text-muted-foreground">{run.campaignName}</TableCell>
                <TableCell className="text-right text-foreground tabular-nums">{run.processed}</TableCell>
                <TableCell className="text-right tabular-nums">
                  {run.errors > 0 ? (
                    <span className="text-red-400">{run.errors}</span>
                  ) : (
                    <span className="text-muted-foreground">0</span>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground">{run.duration || '—'}</TableCell>
                <TableCell><StatusBadge status={run.status} /></TableCell>
                <TableCell className="text-muted-foreground max-w-[250px] truncate">
                  {run.details || '—'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

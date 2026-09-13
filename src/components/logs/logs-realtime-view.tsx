"use client"

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import type { AutomationRun } from '@/types/common'
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
import { mapDbLogToApp } from '@/lib/mappers'

const typeLabels: Record<string, string> = {
  discovery: 'Business Discovery',
  enrichment: 'Email Discovery',
  analysis: 'Website Analysis',
  'email-generation': 'AI Draft Generation',
  sending: 'Email Sending',
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabase = createClient(supabaseUrl, supabaseAnonKey)

interface LogsRealtimeViewProps {
  initialRuns: AutomationRun[]
}

export function LogsRealtimeView({ initialRuns }: LogsRealtimeViewProps) {
  const [runs, setRuns] = useState<AutomationRun[]>(initialRuns)
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    const handleLogUpdate = (payload: any, logType: string) => {
      // In a real app, you might want to fetch the joined campaign name if it's missing in payload.new
      // For now, payload.new from realtime doesn't include joined tables, 
      // so campaignName will temporarily be empty for new logs until page refresh, 
      // or we can fetch it. Let's just map it.
      const newLog = mapDbLogToApp(payload.new)
      
      setRuns(currentRuns => {
        if (payload.eventType === 'INSERT') {
          return [newLog, ...currentRuns].sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime())
        }
        if (payload.eventType === 'UPDATE') {
          return currentRuns.map(run => run.id === newLog.id ? { ...run, ...newLog, campaignName: run.campaignName || newLog.campaignName } : run)
        }
        if (payload.eventType === 'DELETE') {
           return currentRuns.filter(run => run.id !== payload.old.id)
        }
        return currentRuns
      })
    }

    const discoveryRunsChannel = supabase
      .channel('global-discovery-runs')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'discovery_runs' },
        (payload) => handleLogUpdate(payload, 'discovery')
      )
      .subscribe()

    const systemLogsChannel = supabase
      .channel('global-system-logs')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'system_logs' },
        (payload) => handleLogUpdate(payload, 'system')
      )
      .subscribe()

    return () => {
      supabase.removeChannel(discoveryRunsChannel)
      supabase.removeChannel(systemLogsChannel)
    }
  }, [])

  const filtered = runs.filter((r) => {
    if (typeFilter !== 'all' && r.type !== typeFilter) return false
    if (statusFilter !== 'all' && r.status !== statusFilter) return false
    return true
  })

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
            {filtered.length === 0 ? (
               <TableRow>
                 <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                   No logs found.
                 </TableCell>
               </TableRow>
            ) : filtered.map((run) => (
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
                <TableCell className="text-muted-foreground">
                    {run.campaignName || <span className="italic opacity-50">Global</span>}
                </TableCell>
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
                <TableCell className="text-muted-foreground max-w-[250px] truncate" title={run.details}>
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

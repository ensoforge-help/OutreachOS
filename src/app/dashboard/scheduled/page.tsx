'use client'

import { useState } from 'react'
import { scheduledEmails } from '@/data/dummy-emails'
import { StatusBadge } from '@/components/ui/status-badge'
import { EmptyState } from '@/components/ui/empty-state'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Calendar, Clock, Eye, X as XIcon } from 'lucide-react'

export default function ScheduledPage() {
  const [emails, setEmails] = useState(scheduledEmails)
  const [campaignFilter, setCampaignFilter] = useState('all')
  const [viewEmail, setViewEmail] = useState<typeof scheduledEmails[0] | null>(null)

  const filtered = campaignFilter === 'all'
    ? emails
    : emails.filter((e) => e.campaignName === campaignFilter)

  // Group by date
  const grouped = filtered.reduce((acc, email) => {
    const date = email.scheduledDate
    if (!acc[date]) acc[date] = []
    acc[date].push(email)
    return acc
  }, {} as Record<string, typeof scheduledEmails>)

  const campaigns = [...new Set(scheduledEmails.map((e) => e.campaignName))]

  function handleCancel(id: string) {
    setEmails((prev) => prev.filter((e) => e.id !== id))
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center gap-3">
        <Select value={campaignFilter} onValueChange={(v) => setCampaignFilter(v || '')}>
          <SelectTrigger className="h-8 w-[200px] text-xs bg-card border-border">
            <SelectValue placeholder="Campaign" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Campaigns</SelectItem>
            {campaigns.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-xs text-muted-foreground">
          {filtered.length} scheduled emails
        </span>
      </div>

      {/* Grouped list */}
      {Object.keys(grouped).length === 0 ? (
        <EmptyState
          icon={<Calendar className="w-6 h-6 text-muted-foreground" />}
          title="No scheduled emails"
          description="Approved emails will appear here when scheduled."
        />
      ) : (
        <div className="space-y-4">
          {Object.entries(grouped)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([date, items]) => (
              <div key={date}>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-medium text-foreground">
                    {new Date(date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
                  </span>
                </div>
                <div className="rounded-lg border border-border bg-card overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="text-xs w-[90px]">Time</TableHead>
                        <TableHead className="text-xs">Business</TableHead>
                        <TableHead className="text-xs">Campaign</TableHead>
                        <TableHead className="text-xs">Subject</TableHead>
                        <TableHead className="text-xs">Status</TableHead>
                        <TableHead className="text-xs w-[80px]" />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.map((email) => (
                        <TableRow key={email.id} className="text-xs">
                          <TableCell className="font-mono text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {email.scheduledTime}
                            </span>
                          </TableCell>
                          <TableCell className="font-medium text-foreground">{email.businessName}</TableCell>
                          <TableCell className="text-muted-foreground">{email.campaignName}</TableCell>
                          <TableCell className="text-muted-foreground max-w-[200px] truncate">{email.subject}</TableCell>
                          <TableCell><StatusBadge status={email.status} /></TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon-xs" onClick={() => setViewEmail(email)}>
                                <Eye className="w-3.5 h-3.5" />
                              </Button>
                              <Button variant="ghost" size="icon-xs" onClick={() => handleCancel(email.id)}>
                                <XIcon className="w-3.5 h-3.5 text-red-400" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* View email dialog */}
      <Dialog open={!!viewEmail} onOpenChange={() => setViewEmail(null)}>
        <DialogContent className="sm:max-w-[500px] bg-[#0D0D0F] border-border">
          <DialogHeader>
            <DialogTitle className="text-sm">{viewEmail?.subject}</DialogTitle>
          </DialogHeader>
          <div className="text-xs space-y-2">
            <div className="flex gap-2 text-muted-foreground">
              <span>To:</span>
              <span className="text-foreground">{viewEmail?.contactEmail}</span>
            </div>
            <div className="flex gap-2 text-muted-foreground">
              <span>Scheduled:</span>
              <span className="text-foreground">{viewEmail?.scheduledDate} {viewEmail?.scheduledTime}</span>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setViewEmail(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

import type { AutomationRun } from '@/types/common'
import { StatusBadge } from '@/components/ui/status-badge'
import { formatTime } from '@/lib/utils'
import { EmptyState } from '@/components/ui/empty-state'
import { Activity } from 'lucide-react'

const typeLabels: Record<string, string> = {
  discovery: 'Business Discovery',
  enrichment: 'Email Discovery',
  analysis: 'Website Analysis',
  'email-generation': 'AI Draft Generation',
  sending: 'Email Sending',
}

interface CampaignActivityProps {
  runs: AutomationRun[]
}

export function CampaignActivity({ runs }: CampaignActivityProps) {
  if (runs.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-sm font-medium text-foreground mb-4">Automation Activity</h3>
        <EmptyState
          icon={<Activity className="w-6 h-6 text-muted-foreground" />}
          title="No activity yet"
          description="Automation runs will appear here."
        />
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="text-sm font-medium text-foreground mb-4">Automation Activity</h3>
      <div className="space-y-0">
        {runs.sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()).map((run) => (
          <div key={run.id} className="flex items-start gap-3 py-2.5 border-b border-border last:border-0">
            <span className="text-[11px] text-muted-foreground font-mono w-16 shrink-0 mt-0.5">
              {formatTime(run.startedAt)}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-foreground">
                  {typeLabels[run.type] || run.type}
                </span>
                <StatusBadge status={run.status} />
              </div>
              {run.details && (
                <p className="text-[11px] text-muted-foreground mt-0.5">{run.details}</p>
              )}
            </div>
            <span className="text-[11px] text-muted-foreground shrink-0">
              {run.processed} processed
              {run.errors > 0 && <span className="text-red-400 ml-1">· {run.errors} errors</span>}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

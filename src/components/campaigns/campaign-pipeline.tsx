import type { Campaign } from '@/types/campaign'
import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'

interface CampaignPipelineProps {
  campaign: Campaign
}

const stages = [
  { key: 'discovered', label: 'Discovered', getVal: (c: Campaign) => c.leads },
  { key: 'enriched', label: 'Enriched', getVal: (c: Campaign) => c.emailsFound ?? 0 },
  { key: 'qualified', label: 'Qualified', getVal: (c: Campaign) => c.verified ?? 0 },
  { key: 'approved', label: 'Approved', getVal: (c: Campaign) => c.sent + c.pendingApprovals },
  { key: 'sent', label: 'Sent', getVal: (c: Campaign) => c.sent },
  { key: 'replied', label: 'Replied', getVal: (c: Campaign) => c.replies ?? 0 },
]

export function CampaignPipeline({ campaign }: CampaignPipelineProps) {
  const maxVal = Math.max(...stages.map((s) => s.getVal(campaign)), 1)

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="text-sm font-medium text-foreground mb-4">Pipeline</h3>
      <div className="flex items-center gap-2">
        {stages.map((stage, i) => {
          const val = stage.getVal(campaign)
          const pct = Math.max((val / maxVal) * 100, 8)
          return (
            <div key={stage.key} className="flex items-center gap-2 flex-1">
              <div className="flex-1 space-y-1.5">
                <div className="text-[11px] text-muted-foreground">{stage.label}</div>
                <div
                  className="h-8 rounded-md bg-primary/15 flex items-center justify-center text-xs font-medium text-primary transition-all"
                  style={{ width: `${pct}%`, minWidth: 40 }}
                >
                  {val}
                </div>
              </div>
              {i < stages.length - 1 && (
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40 shrink-0" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

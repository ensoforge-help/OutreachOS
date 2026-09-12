import type { Campaign } from '@/types/campaign'
import { StatusBadge } from '@/components/ui/status-badge'
import { formatDate } from '@/lib/utils'
import { Users, Mail, MessageSquare, Clock } from 'lucide-react'

interface CampaignCardProps {
  campaign: Campaign
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 hover:border-primary/30 transition-colors space-y-3 cursor-pointer">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-sm font-medium text-foreground">{campaign.name}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {campaign.category} · {campaign.location}
          </p>
        </div>
        <StatusBadge status={campaign.status} />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Users className="w-3.5 h-3.5" />
          <span><span className="text-foreground font-medium">{campaign.leads}</span> leads</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          <span><span className="text-foreground font-medium">{campaign.pendingApprovals}</span> pending</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Mail className="w-3.5 h-3.5" />
          <span><span className="text-foreground font-medium">{campaign.sent}</span> sent</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <MessageSquare className="w-3.5 h-3.5" />
          <span><span className="text-foreground font-medium">{campaign.replyRate}%</span> reply</span>
        </div>
      </div>

      <div className="text-[11px] text-muted-foreground">
        Created {formatDate(campaign.createdAt)}
      </div>
    </div>
  )
}

import type { Campaign } from '@/types/campaign'
import { StatusBadge } from '@/components/ui/status-badge'
import { Button } from '@/components/ui/button'
import { Pause, Play } from 'lucide-react'

interface CampaignHeaderProps {
  campaign: Campaign
}

export function CampaignHeader({ campaign }: CampaignHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-section-title">{campaign.name}</h2>
        <p className="text-body-small text-muted-foreground mt-0.5">
          {campaign.category} · {campaign.location}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <StatusBadge status={campaign.status} />
        <Button variant="outline" size="sm">
          {campaign.status === 'running' ? (
            <><Pause className="w-3.5 h-3.5 mr-1.5" /> Pause Campaign</>
          ) : (
            <><Play className="w-3.5 h-3.5 mr-1.5" /> Resume Campaign</>
          )}
        </Button>
      </div>
    </div>
  )
}

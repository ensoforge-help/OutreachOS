'use client'

import { useState } from 'react'
import Link from 'next/link'
import { campaigns } from '@/data/dummy-campaigns'
import { CampaignCard } from '@/components/campaigns/campaign-card'
import { CreateCampaignModal } from '@/components/campaigns/create-campaign-modal'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default function CampaignsPage() {
  const [showCreate, setShowCreate] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-body-small text-muted-foreground">{campaigns.length} campaigns</p>
        <Button size="sm" onClick={() => setShowCreate(true)}>
          <Plus className="w-3.5 h-3.5 mr-1.5" />
          Create Campaign
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {campaigns.map((campaign) => (
          <Link key={campaign.id} href={`/dashboard/campaigns/${campaign.id}`}>
            <CampaignCard campaign={campaign} />
          </Link>
        ))}
      </div>

      <CreateCampaignModal open={showCreate} onClose={() => setShowCreate(false)} />
    </div>
  )
}

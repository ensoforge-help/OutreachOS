'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { CreateCampaignModal } from '@/components/campaigns/create-campaign-modal'

export function CampaignsHeaderActions() {
  const [showCreate, setShowCreate] = useState(false)

  return (
    <>
      <Button size="sm" onClick={() => setShowCreate(true)}>
        <Plus className="w-3.5 h-3.5 mr-1.5" />
        Create Campaign
      </Button>
      <CreateCampaignModal open={showCreate} onClose={() => setShowCreate(false)} />
    </>
  )
}

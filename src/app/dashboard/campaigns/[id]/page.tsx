'use client'

import { use } from 'react'
import { getCampaignById } from '@/data/dummy-campaigns'
import { automationRuns } from '@/data/dummy-logs'
import { CampaignHeader } from '@/components/campaigns/campaign-header'
import { CampaignMetrics } from '@/components/campaigns/campaign-metrics'
import { CampaignPipeline } from '@/components/campaigns/campaign-pipeline'
import { CampaignActivity } from '@/components/campaigns/campaign-activity'
import { EmptyState } from '@/components/ui/empty-state'

export default function CampaignDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const campaign = getCampaignById(id)

  if (!campaign) {
    return (
      <EmptyState
        title="Campaign not found"
        description="The campaign you're looking for doesn't exist."
      />
    )
  }

  const campaignRuns = automationRuns.filter((r) => r.campaignId === campaign.id)

  return (
    <div className="space-y-6">
      <CampaignHeader campaign={campaign} />
      <CampaignMetrics campaign={campaign} />
      <CampaignPipeline campaign={campaign} />
      <CampaignActivity runs={campaignRuns} />
    </div>
  )
}

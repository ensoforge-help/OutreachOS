import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { CampaignCard } from '@/components/campaigns/campaign-card'
import { CampaignsHeaderActions } from '@/components/campaigns/campaigns-header-actions'
import { mapDbCampaignToApp } from '@/lib/mappers'

export const dynamic = 'force-dynamic'

async function CampaignsList() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return <div className="p-4 bg-destructive/10 text-destructive rounded-md">Error loading campaigns</div>
  }

  const mappedCampaigns = data?.map(mapDbCampaignToApp) || []

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <p className="text-body-small text-muted-foreground">{mappedCampaigns.length} campaigns</p>
        <CampaignsHeaderActions />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mappedCampaigns.map((campaign) => (
          <Link key={campaign.id} href={`/dashboard/campaigns/${campaign.id}`}>
            <CampaignCard campaign={campaign} />
          </Link>
        ))}
      </div>
    </>
  )
}

function CampaignsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="h-4 w-24 bg-muted animate-pulse rounded"></div>
        <div className="h-9 w-32 bg-muted animate-pulse rounded"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-40 bg-muted/50 border border-border animate-pulse rounded-lg"></div>
        ))}
      </div>
    </div>
  )
}

export default function CampaignsPage() {
  return (
    <div className="space-y-4">
      <Suspense fallback={<CampaignsSkeleton />}>
        <CampaignsList />
      </Suspense>
    </div>
  )
}

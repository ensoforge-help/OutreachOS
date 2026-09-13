import { createClient } from '@/lib/supabase/server'
import { mapDbCampaignToApp, mapDbLogToApp } from '@/lib/mappers'
import { CampaignRealtimeView } from '@/components/campaigns/campaign-realtime-view'
import { EmptyState } from '@/components/ui/empty-state'
import type { AutomationRun } from '@/types/common'

export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  
  const supabase = await createClient()
  
  // 1. Fetch initial Campaign
  const { data: dbCampaign, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !dbCampaign) {
    return (
      <EmptyState
        title="Campaign not found"
        description="The campaign you're looking for doesn't exist."
      />
    )
  }

  const campaign = mapDbCampaignToApp(dbCampaign)

  // 2. Fetch initial Logs
  const { data: discoveryRuns } = await supabase
    .from('discovery_runs')
    .select('*')
    .eq('campaign_id', id)
    .order('started_at', { ascending: false })

  const { data: systemLogs } = await supabase
    .from('system_logs')
    .select('*')
    .eq('campaign_id', id)
    .order('created_at', { ascending: false })

  const mappedDiscoveryRuns = (discoveryRuns || []).map(mapDbLogToApp)
  const mappedSystemLogs = (systemLogs || []).map(mapDbLogToApp)

  const initialRuns: AutomationRun[] = [...mappedDiscoveryRuns, ...mappedSystemLogs]
    .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime())

  return (
    <CampaignRealtimeView initialCampaign={campaign} initialRuns={initialRuns} />
  )
}

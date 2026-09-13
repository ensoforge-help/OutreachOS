import { createClient } from '@/lib/supabase/server'
import { mapDbLogToApp } from '@/lib/mappers'
import { LogsRealtimeView } from '@/components/logs/logs-realtime-view'
import type { AutomationRun } from '@/types/common'

export const dynamic = 'force-dynamic'

export default async function LogsPage() {
  const supabase = await createClient()

  // Fetch all discovery runs and system logs
  const { data: discoveryRuns } = await supabase
    .from('discovery_runs')
    .select('*, campaigns(name)')
    .order('started_at', { ascending: false })
    .limit(100)

  const { data: systemLogs } = await supabase
    .from('system_logs')
    .select('*, campaigns(name)')
    .order('created_at', { ascending: false })
    .limit(100)

  const mappedDiscoveryRuns = (discoveryRuns || []).map(mapDbLogToApp)
  const mappedSystemLogs = (systemLogs || []).map(mapDbLogToApp)

  const initialRuns: AutomationRun[] = [...mappedDiscoveryRuns, ...mappedSystemLogs]
    .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime())
    .slice(0, 200)

  return (
    <LogsRealtimeView initialRuns={initialRuns} />
  )
}

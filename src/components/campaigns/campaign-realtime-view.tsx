"use client"

import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { CampaignHeader } from "./campaign-header"
import { CampaignMetrics } from "./campaign-metrics"
import { CampaignPipeline } from "./campaign-pipeline"
import { CampaignActivity } from "./campaign-activity"
import type { Campaign } from "@/types/campaign"
import type { AutomationRun } from "@/types/common"
import { mapDbCampaignToApp, mapDbLogToApp } from "@/lib/mappers"

// We use the public supabase client here for client-side subscriptions
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
const supabase = createClient(supabaseUrl, supabaseAnonKey)

interface CampaignRealtimeViewProps {
  initialCampaign: Campaign
  initialRuns: AutomationRun[]
}

export function CampaignRealtimeView({ initialCampaign, initialRuns }: CampaignRealtimeViewProps) {
  const [campaign, setCampaign] = useState<Campaign>(initialCampaign)
  const [runs, setRuns] = useState<AutomationRun[]>(initialRuns)

  useEffect(() => {
    // 1. Subscribe to Campaign changes
    const campaignChannel = supabase
      .channel('campaign-updates')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'campaigns', filter: `id=eq.${campaign.id}` },
        (payload) => {
          setCampaign(mapDbCampaignToApp(payload.new))
        }
      )
      .subscribe()

    // 2. Subscribe to Discovery Runs changes
    const discoveryRunsChannel = supabase
      .channel('discovery-runs-updates')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'discovery_runs', filter: `campaign_id=eq.${campaign.id}` },
        (payload) => {
          handleLogUpdate(payload)
        }
      )
      .subscribe()

    // 3. Subscribe to System Logs changes
    const systemLogsChannel = supabase
      .channel('system-logs-updates')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'system_logs', filter: `campaign_id=eq.${campaign.id}` },
        (payload) => {
           handleLogUpdate(payload)
        }
      )
      .subscribe()

    const handleLogUpdate = (payload: any) => {
      const newLog = mapDbLogToApp(payload.new)
      
      setRuns(currentRuns => {
        if (payload.eventType === 'INSERT') {
          return [newLog, ...currentRuns].sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime())
        }
        if (payload.eventType === 'UPDATE') {
          return currentRuns.map(run => run.id === newLog.id ? newLog : run)
        }
        if (payload.eventType === 'DELETE') {
           return currentRuns.filter(run => run.id !== payload.old.id)
        }
        return currentRuns
      })
    }

    return () => {
      supabase.removeChannel(campaignChannel)
      supabase.removeChannel(discoveryRunsChannel)
      supabase.removeChannel(systemLogsChannel)
    }
  }, [campaign.id])

  return (
    <div className="space-y-6">
      <CampaignHeader campaign={campaign} />
      <CampaignMetrics campaign={campaign} />
      <CampaignPipeline campaign={campaign} />
      <CampaignActivity runs={runs} />
    </div>
  )
}

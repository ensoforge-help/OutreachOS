import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"
import { mapDbLogToApp } from "@/lib/mappers"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false }
})

export async function GET(
  request: Request,
  context: { params: Promise<{ campaignId: string }> }
) {
  try {
    const { campaignId } = await context.params

    // Fetch discovery runs
    const { data: discoveryRuns, error: discoveryError } = await supabase
      .from('discovery_runs')
      .select('*')
      .eq('campaign_id', campaignId)
      .order('started_at', { ascending: false })

    if (discoveryError) {
      console.error("Error fetching discovery runs:", discoveryError)
    }

    // Fetch system logs
    const { data: systemLogs, error: systemError } = await supabase
      .from('system_logs')
      .select('*')
      .eq('campaign_id', campaignId)
      .order('created_at', { ascending: false })

    if (systemError) {
       console.error("Error fetching system logs:", systemError)
    }

    // Map and merge
    const mappedDiscoveryRuns = (discoveryRuns || []).map(mapDbLogToApp)
    const mappedSystemLogs = (systemLogs || []).map(mapDbLogToApp)

    const allLogs = [...mappedDiscoveryRuns, ...mappedSystemLogs]
      .sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime())

    return NextResponse.json(allLogs)
  } catch (error) {
    console.error("Logs route error:", error)
    return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
    )
  }
}

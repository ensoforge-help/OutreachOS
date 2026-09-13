import { getDiscoveryService } from "@/lib/discovery"
import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"
import type { Campaign } from "@/types/campaign"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false }
})

export async function POST(
  request: Request,
  context: { params: Promise<{ campaignId: string }> }
) {
  try {
    // Await params per Next.js 15+ guidance
    const { campaignId } = await context.params

    // Load campaign from database
    const { data: campaignData, error } = await supabase
      .from('campaigns')
      .select('*')
      .eq('id', campaignId)
      .single()

    if (error || !campaignData) {
      return NextResponse.json(
        { error: "Campaign not found" },
        { status: 404 }
      )
    }

    // Map DB record to Campaign type
    const campaign: Campaign = {
        id: campaignData.id,
        name: campaignData.name,
        category: campaignData.category,
        location: campaignData.location,
        radius: campaignData.radius,
        status: campaignData.status,
        leads: campaignData.leads_count,
        pendingApprovals: campaignData.pending_approvals,
        sent: campaignData.sent_emails,
        replyRate: campaignData.reply_rate,
        createdAt: campaignData.created_at,
        // ... map other fields as necessary
    }

    const discovery = getDiscoveryService()
    const result = await discovery.discover(campaign)

    return NextResponse.json(result)
  } catch (error) {
    console.error("Discover route error:", error)
    return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
    )
  }
}

import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { ApprovalsClientView } from '@/components/approvals/approvals-client-view'
import type { EmailDraft } from '@/types/email'

export const dynamic = 'force-dynamic'

async function ApprovalsData() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('emails')
    .select(`
      *,
      campaign:campaigns(name),
      contact:contacts(name, email),
      business:businesses(name)
    `)
    .eq('status', 'pending')
    .order('created_at', { ascending: false })

  if (error) {
    return <div className="p-4 bg-destructive/10 text-destructive rounded-md">Error loading approvals</div>
  }

  // Map to frontend interface
  const mappedDrafts: EmailDraft[] = (data || []).map((e: any) => ({
    id: e.id,
    businessId: e.business_id,
    businessName: e.business?.name || 'Unknown Business',
    contactId: e.contact_id,
    campaignId: e.campaign_id,
    campaignName: e.campaign?.name || 'Unknown Campaign',
    contactName: e.contact?.name || undefined,
    contactEmail: e.contact?.email || '',
    subject: e.subject,
    body: e.body,
    score: e.ai_score || 0,
    opportunity: e.opportunity_summary || '',
    status: e.status,
    scheduledAt: e.scheduled_at,
    sentAt: e.sent_at,
    openedAt: e.opened_at,
    repliedAt: e.replied_at,
    createdAt: e.created_at,
  }))

  return <ApprovalsClientView initialDrafts={mappedDrafts} />
}

function ApprovalsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-4 w-32 bg-muted animate-pulse rounded"></div>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-48 border border-border bg-muted/20 animate-pulse rounded-lg"></div>
        ))}
      </div>
    </div>
  )
}

export default function ApprovalsPage() {
  return (
    <div className="space-y-4">
      <Suspense fallback={<ApprovalsSkeleton />}>
        <ApprovalsData />
      </Suspense>
    </div>
  )
}

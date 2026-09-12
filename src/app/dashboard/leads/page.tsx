import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { LeadsClientView } from '@/components/leads/leads-client-view'
import { mapDbBusinessToApp } from '@/lib/mappers'
import type { Contact } from '@/types/contact'

export const dynamic = 'force-dynamic'

async function LeadsData() {
  const supabase = await createClient()
  
  // Fetch businesses
  const { data: dbBusinesses, error: businessesError } = await supabase
    .from('businesses')
    .select('*')
    .order('created_at', { ascending: false })

  if (businessesError) {
    return <div className="p-4 bg-destructive/10 text-destructive rounded-md">Error loading leads</div>
  }

  // Fetch contacts for these businesses
  // In a real app, you might want to paginate this or fetch contacts as a join if supported
  const { data: dbContacts, error: contactsError } = await supabase
    .from('contacts')
    .select('*')
  
  // Fetch active campaigns for the "Add to Campaign" bulk action
  const { data: dbCampaigns, error: campaignsError } = await supabase
    .from('campaigns')
    .select('id, name')
    .eq('status', 'running')
    .order('created_at', { ascending: false })

  const mappedLeads = dbBusinesses?.map(mapDbBusinessToApp) || []
  
  // Map DB contacts to app interface
  const mappedContacts: Contact[] = (dbContacts || []).map((c: any) => ({
    id: c.id,
    businessId: c.business_id,
    name: c.name,
    email: c.email,
    jobTitle: c.job_title,
    source: c.source || 'manual',
    confidence: c.confidence || 0,
    verificationStatus: c.verification_status || 'unverified'
  }))

  const campaigns = (dbCampaigns || []).map(c => ({ id: c.id, name: c.name }))

  return <LeadsClientView initialLeads={mappedLeads} initialContacts={mappedContacts} activeCampaigns={campaigns} />
}

function LeadsSkeleton() {
  return (
    <div className="space-y-4">
      {/* Filters Skeleton */}
      <div className="flex flex-wrap gap-2 mb-6">
        <div className="h-9 w-64 bg-muted animate-pulse rounded"></div>
        <div className="h-9 w-32 bg-muted animate-pulse rounded"></div>
        <div className="h-9 w-32 bg-muted animate-pulse rounded"></div>
      </div>
      
      {/* Table Skeleton */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="h-10 border-b border-border bg-muted/30"></div>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-16 border-b border-border bg-muted/10 animate-pulse"></div>
        ))}
      </div>
    </div>
  )
}

export default function LeadsPage() {
  return (
    <div className="space-y-4">
      <Suspense fallback={<LeadsSkeleton />}>
        <LeadsData />
      </Suspense>
    </div>
  )
}

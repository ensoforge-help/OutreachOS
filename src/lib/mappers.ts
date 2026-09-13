import { Campaign } from '@/types/campaign'
import { Business } from '@/types/business'

export function mapDbCampaignToApp(dbCampaign: any): Campaign {
  return {
    id: dbCampaign.id,
    name: dbCampaign.name,
    category: dbCampaign.category,
    location: dbCampaign.location,
    status: dbCampaign.status,
    leads: dbCampaign.leads_count ?? 0,
    emailsFound: dbCampaign.emails_found ?? 0,
    verified: dbCampaign.verified_emails ?? 0,
    pendingApprovals: dbCampaign.pending_approvals ?? 0,
    sent: dbCampaign.sent_emails ?? 0,
    replies: dbCampaign.replies ?? 0,
    replyRate: dbCampaign.reply_rate ?? 0,
    createdAt: dbCampaign.created_at,
    updatedAt: dbCampaign.updated_at,
  }
}

export function mapDbBusinessToApp(dbBusiness: any): Business {
  return {
    id: dbBusiness.id,
    provider: dbBusiness.provider || 'unknown',
    providerId: dbBusiness.provider_id || '',
    name: dbBusiness.name,
    category: dbBusiness.category || dbBusiness.industry || '',
    address: dbBusiness.address || '',
    city: dbBusiness.city || '',
    phone: dbBusiness.phone,
    website: dbBusiness.website,
    hasWebsite: dbBusiness.has_website || !!dbBusiness.website,
    rating: dbBusiness.rating,
    reviewCount: dbBusiness.review_count,
    websiteStatus: dbBusiness.website_status,
    mobileExperience: dbBusiness.mobile_experience,
    hasContactPage: dbBusiness.has_contact_page,
    hasOnlineBooking: dbBusiness.has_online_booking,
    hasOnlineOrdering: dbBusiness.has_online_ordering,
    detectedTechnology: dbBusiness.detected_technology,
    leadScore: dbBusiness.lead_score || 0,
    status: dbBusiness.status || 'new',
    createdAt: dbBusiness.created_at,
    updatedAt: dbBusiness.updated_at,
  }
}

export function mapDbLogToApp(dbLog: any): any {
  // Check if it's a discovery_run (has found_count) or a system_log
  if ('found_count' in dbLog) {
    let details = ""
    if (dbLog.found_count > 0) details += `Found ${dbLog.found_count}. `
    if (dbLog.new_count > 0) details += `New ${dbLog.new_count}. `
    if (dbLog.duplicate_count > 0) details += `Duplicates ${dbLog.duplicate_count}. `
    if (dbLog.error_message) details += `Error: ${dbLog.error_message}`

    return {
      id: dbLog.id,
      campaignId: dbLog.campaign_id,
      campaignName: dbLog.campaigns?.name || '',
      type: 'discovery',
      status: dbLog.status,
      processed: dbLog.found_count || 0,
      errors: dbLog.error_count || 0,
      startedAt: dbLog.started_at,
      completedAt: dbLog.completed_at,
      details: details.trim() || undefined,
    }
  }

  // Otherwise it's a system_log
  return {
    id: dbLog.id,
    campaignId: dbLog.campaign_id,
    campaignName: dbLog.campaigns?.name || '',
    type: dbLog.type, // e.g. 'enrichment', 'analysis', etc.
    status: dbLog.status,
    processed: dbLog.metadata?.processed || 0,
    errors: dbLog.metadata?.errors || 0,
    startedAt: dbLog.created_at, // system_logs only has created_at
    completedAt: dbLog.status !== 'running' ? dbLog.created_at : undefined, // Approximation if not tracked
    details: dbLog.message,
    duration: dbLog.duration,
  }
}

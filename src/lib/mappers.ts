import { Campaign } from '@/types/campaign'
import { Business } from '@/types/business'

export function mapDbCampaignToApp(dbCampaign: any): Campaign {
  return {
    id: dbCampaign.id,
    name: dbCampaign.name,
    category: dbCampaign.category,
    location: dbCampaign.location,
    status: dbCampaign.status,
    leads: dbCampaign.leads,
    pendingApprovals: dbCampaign.pending_approvals,
    sent: dbCampaign.sent,
    replyRate: dbCampaign.reply_rate,
    createdAt: dbCampaign.created_at,
    updatedAt: dbCampaign.updated_at,
  }
}

export function mapDbBusinessToApp(dbBusiness: any): Business {
  return {
    id: dbBusiness.id,
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

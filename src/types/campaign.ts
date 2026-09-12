export type CampaignStatus = 'running' | 'paused' | 'scheduled' | 'completed'

export interface Campaign {
  id: string
  name: string
  category: string
  location: string
  radius?: number
  minRating?: number
  websiteRequirement?: 'any' | 'required' | 'missing-only'
  emailRequirement?: 'any' | 'verified-only'
  leadLimit?: number
  status: CampaignStatus
  leads: number
  emailsFound?: number
  verified?: number
  pendingApprovals: number
  sent: number
  replies?: number
  replyRate: number
  createdAt: string
  updatedAt?: string
}

export interface CreateCampaignInput {
  name: string
  category: string
  location: string
  radius: number
  minRating: number
  websiteRequirement: 'any' | 'required' | 'missing-only'
  emailRequirement: 'any' | 'verified-only'
  leadLimit: number
  schedule?: string
}

export type WebsiteStatus = 'good' | 'needs-improvement' | 'missing'

export type LeadStatus =
  | 'new'
  | 'enriched'
  | 'ready'
  | 'contacted'
  | 'replied'
  | 'suppressed'

export interface Business {
  id: string
  name: string
  category: string
  address: string
  city: string
  phone?: string
  website?: string
  hasWebsite: boolean
  rating?: number
  reviewCount?: number
  websiteStatus?: WebsiteStatus
  mobileExperience?: 'good' | 'poor' | 'unknown'
  hasContactPage?: boolean
  hasOnlineBooking?: boolean
  hasOnlineOrdering?: boolean
  detectedTechnology?: string[]
  leadScore: number
  status: LeadStatus
  createdAt: string
  updatedAt?: string
}

export interface WebsiteAnalysis {
  exists: boolean
  status: WebsiteStatus
  mobileExperience: 'good' | 'poor' | 'unknown'
  hasContactPage: boolean
  hasOnlineBooking: boolean
  hasOnlineOrdering: boolean
  detectedTechnology: string[]
  loadTime?: number
}

export interface Opportunity {
  score: number
  summary: string
  reason: string
}

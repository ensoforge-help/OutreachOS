export type EmailStatus =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'scheduled'
  | 'sent'
  | 'delivered'
  | 'opened'
  | 'replied'
  | 'bounced'

export interface EmailDraft {
  id: string
  businessId: string
  businessName: string
  contactId: string
  contactName?: string
  contactEmail: string
  campaignId: string
  campaignName: string
  subject: string
  body: string
  score: number
  opportunity: string
  status: EmailStatus
  scheduledAt?: string
  sentAt?: string
  openedAt?: string
  repliedAt?: string
  createdAt: string
}

export interface ScheduledEmail {
  id: string
  emailDraftId: string
  businessName: string
  campaignName: string
  contactEmail: string
  subject: string
  scheduledDate: string
  scheduledTime: string
  status: 'scheduled' | 'sending' | 'sent' | 'cancelled'
}

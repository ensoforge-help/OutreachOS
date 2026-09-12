export type ContactSource = 'website' | 'provider' | 'manual'
export type VerificationStatus = 'verified' | 'unverified' | 'invalid'

export interface Contact {
  id: string
  businessId: string
  name?: string
  email: string
  jobTitle?: string
  source: ContactSource
  confidence: number
  verificationStatus: VerificationStatus
}

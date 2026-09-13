import { Business } from "./business"

export interface DiscoveryResult {
  count: number
  businesses: Business[]
  newCount: number
  duplicateCount: number
  errorCount: number
  errorMessage?: string
}

export interface DiscoveryRun {
  id: string
  campaignId: string
  provider: string
  status: 'running' | 'completed' | 'failed'
  startedAt: string
  completedAt?: string
  foundCount: number
  newCount: number
  duplicateCount: number
  errorCount: number
  errorMessage?: string
}

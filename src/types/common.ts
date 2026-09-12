export type AutomationRunType =
  | 'discovery'
  | 'enrichment'
  | 'analysis'
  | 'email-generation'
  | 'sending'

export type AutomationRunStatus = 'running' | 'completed' | 'failed'

export interface AutomationRun {
  id: string
  campaignId: string
  campaignName: string
  type: AutomationRunType
  status: AutomationRunStatus
  processed: number
  errors: number
  startedAt: string
  completedAt?: string
  duration?: string
  details?: string
}

export interface NavigationItem {
  label: string
  href: string
  icon: string
  badge?: number
}

export interface KpiCardData {
  label: string
  value: string | number
  change?: number
  changeLabel?: string
  trend?: 'up' | 'down' | 'neutral'
}

export interface FilterOption {
  label: string
  value: string
}

export interface PaginationState {
  page: number
  pageSize: number
  total: number
}

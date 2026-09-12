export interface AnalyticsMetrics {
  totalBusinesses: number
  qualifiedLeads: number
  emailsSent: number
  delivered: number
  opened: number
  replies: number
  positiveReplies: number
  bounces: number
  unsubscribed: number
}

export interface ChartDataPoint {
  label: string
  value: number
  secondaryValue?: number
}

export interface TimeSeriesPoint {
  date: string
  emailsSent: number
  replies: number
  opens?: number
}

export interface CampaignComparison {
  name: string
  leads: number
  sent: number
  replies: number
  replyRate: number
}

export interface ScoreDistribution {
  range: string
  count: number
}

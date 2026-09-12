import type {
  AnalyticsMetrics,
  ChartDataPoint,
  TimeSeriesPoint,
  CampaignComparison,
  ScoreDistribution,
} from '@/types/analytics'

export const analyticsMetrics: AnalyticsMetrics = {
  totalBusinesses: 12482,
  qualifiedLeads: 3847,
  emailsSent: 2481,
  delivered: 2389,
  opened: 1156,
  replies: 228,
  positiveReplies: 142,
  bounces: 59,
  unsubscribed: 12,
}

export const leadPipelineData: ChartDataPoint[] = [
  { label: 'Discovered', value: 12482 },
  { label: 'Enriched', value: 8934 },
  { label: 'Qualified', value: 3847 },
  { label: 'Approved', value: 2814 },
  { label: 'Contacted', value: 2481 },
  { label: 'Replied', value: 228 },
]

export const outreachActivityData: TimeSeriesPoint[] = [
  { date: '2024-09-04', emailsSent: 45, replies: 3, opens: 22 },
  { date: '2024-09-05', emailsSent: 62, replies: 5, opens: 31 },
  { date: '2024-09-06', emailsSent: 38, replies: 2, opens: 18 },
  { date: '2024-09-07', emailsSent: 51, replies: 4, opens: 26 },
  { date: '2024-09-08', emailsSent: 73, replies: 7, opens: 38 },
  { date: '2024-09-09', emailsSent: 44, replies: 3, opens: 21 },
  { date: '2024-09-10', emailsSent: 58, replies: 6, opens: 29 },
  { date: '2024-09-11', emailsSent: 67, replies: 5, opens: 34 },
  { date: '2024-09-12', emailsSent: 42, replies: 2, opens: 20 },
  { date: '2024-09-13', emailsSent: 55, replies: 4, opens: 28 },
  { date: '2024-09-14', emailsSent: 71, replies: 8, opens: 37 },
  { date: '2024-09-15', emailsSent: 39, replies: 3, opens: 19 },
  { date: '2024-09-16', emailsSent: 60, replies: 5, opens: 30 },
  { date: '2024-09-17', emailsSent: 48, replies: 4, opens: 24 },
  { date: '2024-09-18', emailsSent: 65, replies: 6, opens: 33 },
  { date: '2024-09-19', emailsSent: 53, replies: 4, opens: 27 },
  { date: '2024-09-20', emailsSent: 70, replies: 7, opens: 36 },
  { date: '2024-09-21', emailsSent: 46, replies: 3, opens: 23 },
  { date: '2024-09-22', emailsSent: 58, replies: 5, opens: 29 },
  { date: '2024-09-23', emailsSent: 64, replies: 6, opens: 32 },
  { date: '2024-09-24', emailsSent: 41, replies: 2, opens: 20 },
  { date: '2024-09-25', emailsSent: 57, replies: 5, opens: 28 },
  { date: '2024-09-26', emailsSent: 72, replies: 8, opens: 37 },
  { date: '2024-09-27', emailsSent: 50, replies: 4, opens: 25 },
  { date: '2024-09-28', emailsSent: 63, replies: 6, opens: 31 },
  { date: '2024-09-29', emailsSent: 47, replies: 3, opens: 23 },
  { date: '2024-09-30', emailsSent: 55, replies: 5, opens: 27 },
  { date: '2024-10-01', emailsSent: 68, replies: 7, opens: 35 },
  { date: '2024-10-02', emailsSent: 43, replies: 3, opens: 21 },
  { date: '2024-10-03', emailsSent: 59, replies: 5, opens: 30 },
]

export const campaignComparisonData: CampaignComparison[] = [
  { name: 'Mumbai Restaurants', leads: 124, sent: 44, replies: 6, replyRate: 13.6 },
  { name: 'Mumbai Clinics', leads: 89, sent: 28, replies: 3, replyRate: 10.7 },
  { name: 'Mumbai Fitness', leads: 67, sent: 18, replies: 1, replyRate: 5.6 },
  { name: 'Pune Restaurants', leads: 95, sent: 61, replies: 8, replyRate: 13.1 },
]

export const leadScoreDistribution: ScoreDistribution[] = [
  { range: '90-100', count: 186 },
  { range: '80-89', count: 342 },
  { range: '70-79', count: 498 },
  { range: '60-69', count: 623 },
  { range: '50-59', count: 891 },
  { range: 'Below 50', count: 1307 },
]

export const websiteOpportunityData: ChartDataPoint[] = [
  { label: 'No Website', value: 4123 },
  { label: 'Needs Improvement', value: 5234 },
  { label: 'Good Website', value: 3125 },
]

// Monthly trend for lead acquisition
export const leadAcquisitionData: ChartDataPoint[] = [
  { label: 'Mar', value: 820 },
  { label: 'Apr', value: 1240 },
  { label: 'May', value: 1680 },
  { label: 'Jun', value: 2100 },
  { label: 'Jul', value: 2890 },
  { label: 'Aug', value: 3400 },
  { label: 'Sep', value: 3847 },
]

// Email activity breakdown
export const emailActivityData: ChartDataPoint[] = [
  { label: 'Sent', value: 2481 },
  { label: 'Delivered', value: 2389 },
  { label: 'Opened', value: 1156 },
  { label: 'Replied', value: 228 },
  { label: 'Bounced', value: 59 },
]

// Reply rate trend
export const replyRateTrend: { month: string; rate: number }[] = [
  { month: 'Mar', rate: 5.2 },
  { month: 'Apr', rate: 6.8 },
  { month: 'May', rate: 7.4 },
  { month: 'Jun', rate: 8.1 },
  { month: 'Jul', rate: 8.9 },
  { month: 'Aug', rate: 9.0 },
  { month: 'Sep', rate: 9.2 },
]

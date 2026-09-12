'use client'

import { KpiCard } from '@/components/ui/kpi-card'
import { analyticsMetrics } from '@/data/dummy-analytics'
import { AnalyticsCharts } from '@/components/analytics/analytics-charts'
import {
  Building2,
  Users,
  Mail,
  Send,
  Eye,
  MessageSquare,
  ThumbsUp,
  AlertTriangle,
  UserMinus,
} from 'lucide-react'

export default function AnalyticsPage() {
  const m = analyticsMetrics

  return (
    <div className="space-y-6">
      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <KpiCard label="Total Businesses" value={m.totalBusinesses.toLocaleString()} icon={<Building2 className="w-4 h-4" />} />
        <KpiCard label="Qualified Leads" value={m.qualifiedLeads.toLocaleString()} icon={<Users className="w-4 h-4" />} />
        <KpiCard label="Emails Sent" value={m.emailsSent.toLocaleString()} icon={<Mail className="w-4 h-4" />} />
        <KpiCard label="Delivered" value={m.delivered.toLocaleString()} icon={<Send className="w-4 h-4" />} />
        <KpiCard label="Opened" value={m.opened.toLocaleString()} icon={<Eye className="w-4 h-4" />} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard label="Replies" value={m.replies.toLocaleString()} icon={<MessageSquare className="w-4 h-4" />} />
        <KpiCard label="Positive Replies" value={m.positiveReplies.toLocaleString()} icon={<ThumbsUp className="w-4 h-4" />} />
        <KpiCard label="Bounces" value={m.bounces.toLocaleString()} icon={<AlertTriangle className="w-4 h-4" />} />
        <KpiCard label="Unsubscribed" value={m.unsubscribed.toLocaleString()} icon={<UserMinus className="w-4 h-4" />} />
      </div>

      {/* Charts */}
      <AnalyticsCharts />
    </div>
  )
}

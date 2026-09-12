'use client'

import { OverviewKpis } from '@/components/dashboard/overview-kpis'
import { LeadPipelineChart } from '@/components/dashboard/lead-pipeline-chart'
import { CampaignPerformanceChart } from '@/components/dashboard/campaign-performance-chart'
import { OutreachActivityChart } from '@/components/dashboard/outreach-activity-chart'
import { RecentLeadsTable } from '@/components/dashboard/recent-leads-table'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <OverviewKpis />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <LeadPipelineChart />
        <CampaignPerformanceChart />
      </div>

      {/* Activity Chart */}
      <OutreachActivityChart />

      {/* Recent Leads */}
      <RecentLeadsTable />
    </div>
  )
}

'use client'

import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import {
  leadAcquisitionData,
  emailActivityData,
  replyRateTrend,
  campaignComparisonData,
  leadScoreDistribution,
  websiteOpportunityData,
} from '@/data/dummy-analytics'

const TOOLTIP_STYLE = {
  background: '#151518',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 8,
  fontSize: 12,
  color: '#F5F5F5',
}

const PIE_COLORS = ['#8B5CF6', '#F59E0B', '#22C55E']
const SCORE_COLORS = ['#22C55E', '#4ADE80', '#A3E635', '#FACC15', '#FB923C', '#EF4444']

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="text-card-title mb-4">{title}</h3>
      <div className="h-[220px]">{children}</div>
    </div>
  )
}

export function AnalyticsCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Lead Acquisition */}
      <ChartCard title="Lead Acquisition">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={leadAcquisitionData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#71717A' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#71717A' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
            <Bar dataKey="value" fill="#8B5CF6" radius={[4, 4, 0, 0]} name="Leads" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Reply Rate Trend */}
      <ChartCard title="Reply Rate Trend">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={replyRateTrend} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#71717A' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#71717A' }} axisLine={false} tickLine={false} unit="%" />
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Line type="monotone" dataKey="rate" stroke="#22C55E" strokeWidth={2} dot={{ r: 3, fill: '#22C55E' }} name="Reply Rate %" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Email Activity */}
      <ChartCard title="Email Activity">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={emailActivityData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#71717A' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#71717A' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
            <Bar dataKey="value" fill="#6366F1" radius={[4, 4, 0, 0]} name="Count" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Campaign Comparison */}
      <ChartCard title="Campaign Comparison">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={campaignComparisonData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#71717A' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#71717A' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
            <Legend wrapperStyle={{ fontSize: 11 }} iconSize={8} iconType="circle" />
            <Bar dataKey="leads" fill="#8B5CF6" radius={[3, 3, 0, 0]} name="Leads" />
            <Bar dataKey="sent" fill="#6366F1" radius={[3, 3, 0, 0]} name="Sent" />
            <Bar dataKey="replies" fill="#22C55E" radius={[3, 3, 0, 0]} name="Replies" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Lead Score Distribution */}
      <ChartCard title="Lead Score Distribution">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={leadScoreDistribution} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <XAxis dataKey="range" tick={{ fontSize: 11, fill: '#71717A' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#71717A' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={TOOLTIP_STYLE} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} name="Leads">
              {leadScoreDistribution.map((_, i) => (
                <Cell key={i} fill={SCORE_COLORS[i]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Website Opportunity */}
      <ChartCard title="Website Opportunity Distribution">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={websiteOpportunityData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
              nameKey="label"
            >
              {websiteOpportunityData.map((_, i) => (
                <Cell key={i} fill={PIE_COLORS[i]} />
              ))}
            </Pie>
            <Tooltip contentStyle={TOOLTIP_STYLE} />
            <Legend wrapperStyle={{ fontSize: 11 }} iconSize={8} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  )
}

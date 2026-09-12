'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { campaignComparisonData } from '@/data/dummy-analytics'

export function CampaignPerformanceChart() {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="text-card-title text-foreground mb-4">Campaign Performance</h3>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={campaignComparisonData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10, fill: '#71717A' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#71717A' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                background: '#151518',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8,
                fontSize: 12,
                color: '#F5F5F5',
              }}
              cursor={{ fill: 'rgba(255,255,255,0.03)' }}
            />
            <Legend
              wrapperStyle={{ fontSize: 11 }}
              iconSize={8}
              iconType="circle"
            />
            <Bar dataKey="leads" fill="#8B5CF6" radius={[3, 3, 0, 0]} name="Leads" />
            <Bar dataKey="sent" fill="#6366F1" radius={[3, 3, 0, 0]} name="Sent" />
            <Bar dataKey="replies" fill="#22C55E" radius={[3, 3, 0, 0]} name="Replies" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

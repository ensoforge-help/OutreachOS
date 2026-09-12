'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { leadPipelineData } from '@/data/dummy-analytics'

const COLORS = ['#8B5CF6', '#7C3AED', '#6D28D9', '#5B21B6', '#4C1D95', '#3B0764']

export function LeadPipelineChart() {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="text-card-title text-foreground mb-4">Lead Pipeline</h3>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={leadPipelineData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: '#71717A' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#71717A' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v}
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
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {leadPipelineData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

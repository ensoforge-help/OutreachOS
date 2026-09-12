'use client'

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { outreachActivityData } from '@/data/dummy-analytics'

export function OutreachActivityChart() {
  // Show last 14 days
  const data = outreachActivityData.slice(-14).map((d) => ({
    ...d,
    date: new Date(d.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
  }))

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="text-card-title text-foreground mb-4">Outreach Activity</h3>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="date"
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
            />
            <Legend
              wrapperStyle={{ fontSize: 11 }}
              iconSize={8}
              iconType="circle"
            />
            <Line
              type="monotone"
              dataKey="emailsSent"
              stroke="#8B5CF6"
              strokeWidth={2}
              dot={false}
              name="Emails Sent"
            />
            <Line
              type="monotone"
              dataKey="replies"
              stroke="#22C55E"
              strokeWidth={2}
              dot={false}
              name="Replies"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

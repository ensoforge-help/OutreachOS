import { KpiCard } from '@/components/ui/kpi-card'
import { Users, Flame, Clock, Mail, Reply, AlertTriangle } from 'lucide-react'

export function OverviewKpis() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <KpiCard
        label="Total Leads"
        value="12,482"
        change={12.4}
        trend="up"
        icon={<Users className="w-4 h-4" />}
      />
      <KpiCard
        label="Hot Leads"
        value="1,284"
        change={8.7}
        trend="up"
        icon={<Flame className="w-4 h-4" />}
      />
      <KpiCard
        label="Pending Approval"
        value="82"
        icon={<Clock className="w-4 h-4" />}
      />
      <KpiCard
        label="Emails Sent"
        value="2,481"
        change={14.2}
        trend="up"
        icon={<Mail className="w-4 h-4" />}
      />
      <KpiCard
        label="Reply Rate"
        value="9.2%"
        change={2.1}
        trend="up"
        icon={<Reply className="w-4 h-4" />}
      />
      <KpiCard
        label="Bounce Rate"
        value="2.4%"
        change={-0.8}
        trend="down"
        icon={<AlertTriangle className="w-4 h-4" />}
      />
    </div>
  )
}

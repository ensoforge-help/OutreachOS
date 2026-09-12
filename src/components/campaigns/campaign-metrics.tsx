import type { Campaign } from '@/types/campaign'
import { KpiCard } from '@/components/ui/kpi-card'
import { Users, Mail, Shield, Clock, Send, MessageSquare } from 'lucide-react'

interface CampaignMetricsProps {
  campaign: Campaign
}

export function CampaignMetrics({ campaign }: CampaignMetricsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <KpiCard label="Leads" value={campaign.leads} icon={<Users className="w-4 h-4" />} />
      <KpiCard label="Emails Found" value={campaign.emailsFound ?? 0} icon={<Mail className="w-4 h-4" />} />
      <KpiCard label="Verified" value={campaign.verified ?? 0} icon={<Shield className="w-4 h-4" />} />
      <KpiCard label="Pending Approval" value={campaign.pendingApprovals} icon={<Clock className="w-4 h-4" />} />
      <KpiCard label="Sent" value={campaign.sent} icon={<Send className="w-4 h-4" />} />
      <KpiCard label="Replies" value={campaign.replies ?? 0} icon={<MessageSquare className="w-4 h-4" />} />
    </div>
  )
}

import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface KpiCardProps {
  label: string
  value: string | number
  change?: number
  changeLabel?: string
  trend?: 'up' | 'down' | 'neutral'
  icon?: React.ReactNode
}

export function KpiCard({ label, value, change, changeLabel, trend, icon }: KpiCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-kpi-label truncate">{label}</span>
        {icon && <span className="text-muted-foreground shrink-0">{icon}</span>}
      </div>
      <div className="flex items-baseline justify-between gap-2 mt-1">
        <span className="text-kpi-value truncate">
          {value}
        </span>
        {change !== undefined && (
          <span className={cn(
            'flex items-center gap-0.5 text-badge font-medium shrink-0',
            trend === 'up' ? 'text-emerald-400' :
            trend === 'down' ? 'text-red-400' :
            'text-muted-foreground'
          )}>
            {trend === 'up' && <TrendingUp className="w-3 h-3" />}
            {trend === 'down' && <TrendingDown className="w-3 h-3" />}
            {trend === 'neutral' && <Minus className="w-3 h-3" />}
            {change > 0 ? '+' : ''}{change}%
            {changeLabel && <span className="text-muted-foreground ml-1">{changeLabel}</span>}
          </span>
        )}
      </div>
    </div>
  )
}

import { cn, getStatusColor, capitalize } from '@/lib/utils'

interface StatusBadgeProps {
  status: string
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const displayText = status === 'needs-improvement' ? 'Needs Improvement' : capitalize(status)
  return (
    <span className={cn(
      'inline-flex items-center rounded-full px-2 py-0.5 text-badge font-medium',
      getStatusColor(status),
      className
    )}>
      {displayText}
    </span>
  )
}

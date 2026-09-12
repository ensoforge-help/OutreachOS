import { cn, getScoreColor } from '@/lib/utils'

interface ScoreBadgeProps {
  score: number
  className?: string
}

export function ScoreBadge({ score, className }: ScoreBadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center justify-center text-xs font-semibold tabular-nums',
      getScoreColor(score),
      className
    )}>
      {score}
    </span>
  )
}

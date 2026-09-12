import { cn } from '@/lib/utils'

interface LoadingStateProps {
  rows?: number
  className?: string
}

export function LoadingState({ rows = 5, className }: LoadingStateProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-3 animate-pulse">
          <div className="h-4 rounded bg-muted flex-1" style={{ maxWidth: `${60 + Math.random() * 40}%` }} />
        </div>
      ))}
    </div>
  )
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('rounded-lg border border-border bg-card p-4 animate-pulse', className)}>
      <div className="h-3 w-24 rounded bg-muted mb-3" />
      <div className="h-7 w-16 rounded bg-muted mb-2" />
      <div className="h-3 w-20 rounded bg-muted" />
    </div>
  )
}

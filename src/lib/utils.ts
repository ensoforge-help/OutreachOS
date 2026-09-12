export { cn } from 'cn'

export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
  if (num >= 1000) return `${(num / 1000).toFixed(num >= 10000 ? 0 : 1)}K`
  return num.toLocaleString()
}

export function formatCompactNumber(num: number): string {
  return num.toLocaleString()
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function formatTime(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

export function formatDateTime(dateStr: string): string {
  return `${formatDate(dateStr)} ${formatTime(dateStr)}`
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    new: 'bg-blue-500/15 text-blue-400',
    enriched: 'bg-cyan-500/15 text-cyan-400',
    ready: 'bg-amber-500/15 text-amber-400',
    contacted: 'bg-violet-500/15 text-violet-400',
    replied: 'bg-emerald-500/15 text-emerald-400',
    suppressed: 'bg-zinc-500/15 text-zinc-400',
    running: 'bg-emerald-500/15 text-emerald-400',
    paused: 'bg-amber-500/15 text-amber-400',
    scheduled: 'bg-blue-500/15 text-blue-400',
    completed: 'bg-zinc-500/15 text-zinc-300',
    pending: 'bg-amber-500/15 text-amber-400',
    approved: 'bg-emerald-500/15 text-emerald-400',
    rejected: 'bg-red-500/15 text-red-400',
    sent: 'bg-violet-500/15 text-violet-400',
    delivered: 'bg-blue-500/15 text-blue-400',
    opened: 'bg-cyan-500/15 text-cyan-400',
    bounced: 'bg-red-500/15 text-red-400',
    failed: 'bg-red-500/15 text-red-400',
    verified: 'bg-emerald-500/15 text-emerald-400',
    unverified: 'bg-amber-500/15 text-amber-400',
    invalid: 'bg-red-500/15 text-red-400',
    good: 'bg-emerald-500/15 text-emerald-400',
    'needs-improvement': 'bg-amber-500/15 text-amber-400',
    missing: 'bg-red-500/15 text-red-400',
    cancelled: 'bg-zinc-500/15 text-zinc-400',
    sending: 'bg-violet-500/15 text-violet-400',
  }
  return colors[status] || 'bg-zinc-500/15 text-zinc-400'
}

export function getScoreColor(score: number): string {
  if (score >= 80) return 'text-emerald-400'
  if (score >= 60) return 'text-amber-400'
  if (score >= 40) return 'text-orange-400'
  return 'text-red-400'
}

export function getScoreBg(score: number): string {
  if (score >= 80) return 'bg-emerald-500/15 text-emerald-400'
  if (score >= 60) return 'bg-amber-500/15 text-amber-400'
  if (score >= 40) return 'bg-orange-500/15 text-orange-400'
  return 'bg-red-500/15 text-red-400'
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

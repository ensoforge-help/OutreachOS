'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { NAV_ITEMS } from '@/lib/constants'
import {
  LayoutDashboard,
  Users,
  Megaphone,
  CheckCircle,
  Calendar,
  BarChart3,
  ScrollText,
  Settings,
  Zap,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  Users,
  Megaphone,
  CheckCircle,
  Calendar,
  BarChart3,
  ScrollText,
  Settings,
}

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()

  function isActive(href: string) {
    if (href === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(href)
  }

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-sidebar-border bg-sidebar transition-all duration-200',
        collapsed ? 'w-[60px]' : 'w-[220px]'
      )}
    >
      {/* Header */}
      <div className={cn(
        'flex h-14 items-center border-b border-sidebar-border px-3',
        collapsed ? 'justify-center' : 'gap-2.5'
      )}>
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 shrink-0">
          <Zap className="w-4 h-4 text-primary" />
        </div>
        {!collapsed && (
          <span className="text-section-title">
            OutreachOS
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const Icon = iconMap[item.icon]
          const active = isActive(item.href)

          const linkContent = (
            <Link
              href={item.href}
              className={cn(
                'group flex items-center gap-2.5 rounded-md px-2.5 py-2 text-nav transition-colors',
                active
                  ? 'bg-sidebar-accent text-primary'
                  : 'text-sidebar-foreground hover:text-foreground hover:bg-white/[0.04]',
                collapsed && 'justify-center px-0'
              )}
            >
              {Icon && (
                <Icon className={cn('w-4 h-4 shrink-0', active ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground')} />
              )}
              {!collapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <Badge
                      variant="secondary"
                      className="h-5 min-w-5 px-1.5 text-badge bg-primary/15 text-primary border-0"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Link>
          )

          if (collapsed) {
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger render={linkContent} />
                <TooltipContent side="right" className="text-xs">
                  {item.label}
                  {item.badge !== undefined && item.badge > 0 && ` (${item.badge})`}
                </TooltipContent>
              </Tooltip>
            )
          }

          return <div key={item.href}>{linkContent}</div>
        })}
      </nav>

      <Separator className="bg-sidebar-border" />

      {/* Footer */}
      <div className="p-2 space-y-0.5">
        {!collapsed && (
          <div className="px-2.5 py-1.5 text-table-header">
            Workspace
          </div>
        )}
        <div className={cn(
          'flex items-center gap-2.5 rounded-md px-2.5 py-2 text-nav text-sidebar-foreground',
          collapsed && 'justify-center px-0'
        )}>
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-badge text-primary shrink-0">
            A
          </div>
          {!collapsed && <span className="text-body-small text-muted-foreground">Admin</span>}
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-7 z-50 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3" />
        ) : (
          <ChevronLeft className="w-3 h-3" />
        )}
      </button>
    </aside>
  )
}

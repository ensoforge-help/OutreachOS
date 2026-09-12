'use client'

import { useState } from 'react'
import { Sidebar } from './sidebar'
import { Topbar } from './topbar'
import { GridBackground } from '@/components/ui/grid-background'
import { cn } from '@/lib/utils'

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="relative flex min-h-screen">
      <GridBackground />
      <div className="relative z-10 flex w-full">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} className="hidden md:flex" />
        <div
          className={cn(
            'flex flex-1 flex-col transition-all duration-200 w-full',
            collapsed ? 'md:ml-[60px]' : 'md:ml-[220px]'
          )}
        >
          <Topbar />
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}


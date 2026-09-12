'use client'

import { usePathname } from 'next/navigation'
import { PAGE_TITLES } from '@/lib/constants'
import { Search, Bell, Menu } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from '@/components/ui/sheet'
import { Sidebar } from './sidebar'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Topbar() {
  const pathname = usePathname()

  // Determine page title from path
  const getTitle = () => {
    // Check for campaign detail
    if (pathname.match(/\/dashboard\/campaigns\/.+/)) return 'Campaign Detail'
    return PAGE_TITLES[pathname] || 'Dashboard'
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-[#080808]/80 backdrop-blur-sm px-6">
      {/* Left: Page title & Mobile Menu */}
      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger render={
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          } />
          <SheetContent side="left" className="w-[220px] p-0 bg-sidebar border-sidebar-border" showCloseButton={false}>
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>
            <Sidebar collapsed={false} onToggle={() => {}} className="relative flex w-full border-r-0" />
          </SheetContent>
        </Sheet>
        <h1 className="text-page-title">{getTitle()}</h1>
      </div>

      {/* Right: Search, notifications, profile */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            placeholder="Search…"
            className="h-8 w-[200px] pl-8 text-xs bg-card border-border"
          />
        </div>

        {/* Notifications */}
        <Button variant="ghost" size="icon-sm" className="relative text-muted-foreground hover:text-foreground">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-primary" />
        </Button>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger render={
            <Button variant="ghost" size="icon-sm" className="rounded-full">
              <Avatar className="w-7 h-7">
                <AvatarFallback className="bg-primary/15 text-primary text-xs font-medium">
                  AD
                </AvatarFallback>
              </Avatar>
            </Button>
          } />
          <DropdownMenuContent align="end" className="w-48">
            <div className="px-2 py-1.5">
              <p className="text-body-small font-medium">Admin</p>
              <p className="text-body-small text-muted-foreground">admin@outreachos.com</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-400">Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ModeToggle } from "@/components/mode-toggle"
import { Bell, Search } from 'lucide-react'
import { MobileNav } from "@/components/mobile-nav"
import { SiteLogo } from "@/components/site-logo"

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/75 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center gap-2 px-3 md:px-6">
        <div className="md:hidden">
          <MobileNav />
        </div>

        <div className="hidden md:block">
          <SiteLogo />
        </div>

        <div className="ml-auto flex items-center gap-1">
          <Button variant="ghost" size="icon" className="relative">
            <Search className="h-4 w-4" />
            <span className="sr-only">搜尋</span>
          </Button>

          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-[10px] leading-[18px]">
              3
            </Badge>
            <span className="sr-only">通知</span>
          </Button>

          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

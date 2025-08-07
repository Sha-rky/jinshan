'use client'

import { SidebarTrigger } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/mode-toggle'
import { Bell, Search } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center px-4">
        <SidebarTrigger className="md:hidden" />
        
        <div className="flex-1" />
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="relative">
            <Search className="h-4 w-4" />
          </Button>
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
              3
            </Badge>
          </Button>
          
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

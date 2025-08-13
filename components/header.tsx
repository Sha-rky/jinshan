"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MobileNav } from "./mobile-nav"
import { ModeToggle } from "./mode-toggle"
import { SiteLogo } from "./site-logo"

export function Header() {
  const notifications = [
    { id: 1, title: "公車 R66 即將到站", time: "2分鐘前" },
    { id: 2, title: "您的低碳點數已更新", time: "1小時前" },
    { id: 3, title: "農村體驗預約確認", time: "3小時前" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex md:hidden">
          <MobileNav />
        </div>

        <div className="mr-4 hidden md:flex">
          <SiteLogo />
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="md:hidden">
              <SiteLogo />
            </div>
          </div>

          <nav className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs font-medium bg-green-500 hover:bg-green-600 min-w-[20px]"
                  >
                    {notifications.length}
                  </Badge>
                  <span className="sr-only">通知</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>通知</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3">
                    <div className="font-medium">{notification.title}</div>
                    <div className="text-sm text-muted-foreground">{notification.time}</div>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-center">查看所有通知</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}

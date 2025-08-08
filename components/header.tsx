"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ModeToggle } from "@/components/mode-toggle"
import { Bell } from 'lucide-react'
import { MobileNav } from "@/components/mobile-nav"
import { SiteLogo } from "@/components/site-logo"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const demoNotifications = [
  { id: 1, title: "行程提醒", desc: "您的接駁車將於 10 分鐘後抵達。" },
  { id: 2, title: "優惠通知", desc: "在地優惠新折扣，立即查看！" },
  { id: 3, title: "系統訊息", desc: "YouBike 站點車位已滿，建議改至鄰近站點。" },
]

export function Header() {
  const unreadCount = demoNotifications.length

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
          {/* Notification button (clickable) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-label="通知"
              >
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full text-[10px] bg-green-600 text-white border-0 shadow-sm ring-2 ring-background flex items-center justify-center"
                    aria-label={`未讀通知 ${unreadCount} 則`}
                  >
                    {unreadCount}
                  </Badge>
                )}
                <span className="sr-only">通知</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80"
              aria-label="通知列表"
            >
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>通知</span>
                {unreadCount > 0 && (
                  <span className="text-xs text-muted-foreground">
                    共 {unreadCount} 則
                  </span>
                )}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {demoNotifications.map((n) => (
                <DropdownMenuItem
                  key={n.id}
                  className="flex flex-col items-start gap-0.5 py-2"
                >
                  <span className="text-sm font-medium">{n.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {n.desc}
                  </span>
                </DropdownMenuItem>
              ))}
              {demoNotifications.length === 0 && (
                <DropdownMenuItem disabled className="text-muted-foreground">
                  目前沒有新的通知
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme toggle remains */}
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

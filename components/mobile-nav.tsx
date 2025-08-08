"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home, Bus, Car, Bike, Users, Wheat, MapPin, Package, Leaf, CreditCard, Settings, HelpCircle } from 'lucide-react'

const items = [
  { title: "首頁", href: "/", icon: Home },
  { title: "公車班次", href: "/bus", icon: Bus },
  { title: "計程車", href: "/taxi", icon: Car },
  { title: "YouBike", href: "/youbike", icon: Bike },
  { title: "接駁車", href: "/shuttle", icon: Users },
  { title: "農村體驗", href: "/rural", icon: Wheat },
  { title: "行程規劃", href: "/travel", icon: MapPin },
  { title: "物流追蹤", href: "/logistics", icon: Package },
  { title: "低碳點數", href: "/carbon", icon: Leaf },
  { title: "在地優惠", href: "/discount", icon: CreditCard },
  { title: "設定", href: "/settings", icon: Settings },
  { title: "幫助", href: "/help", icon: HelpCircle },
] as const

export function MobileNav() {
  const [open, setOpen] = useState(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" aria-label="開啟選單">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] p-0">
        <SheetHeader className="px-4 py-4 text-left">
          <SheetTitle>金山智慧平台</SheetTitle>
          <div className="text-xs text-muted-foreground">MaaS 整合服務</div>
        </SheetHeader>
        <nav className="px-2 pb-4">
          <ul className="space-y-1">
            {items.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 rounded-md px-2 py-2 hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm">{item.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

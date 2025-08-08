"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home, Bus, Car, Bike, Users, Wheat, MapIcon, Package, Leaf, CreditCard, Settings, HelpCircle } from 'lucide-react'
import { cn } from "@/lib/utils"

type Item = {
  title: string
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

const topItems: readonly Item[] = [{ title: "首頁", href: "/", icon: Home }] as const

const transportItems: readonly Item[] = [
  { title: "公車班次", href: "/bus", icon: Bus },
  { title: "計程車", href: "/taxi", icon: Car },
  { title: "YouBike", href: "/youbike", icon: Bike },
  { title: "接駁車", href: "/shuttle", icon: Users },
] as const

const lifeItems: readonly Item[] = [
  { title: "農村體驗", href: "/rural", icon: Wheat },
  { title: "行程規劃", href: "/travel", icon: MapIcon },
] as const

const serviceItems: readonly Item[] = [
  { title: "物流追蹤", href: "/logistics", icon: Package },
  { title: "低碳點數", href: "/carbon", icon: Leaf },
  { title: "在地優惠", href: "/discount", icon: CreditCard },
] as const

const footerItems: readonly Item[] = [
  { title: "設定", href: "/settings", icon: Settings },
  { title: "幫助", href: "/help", icon: HelpCircle },
] as const

function GroupHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-3 pt-4 pb-2 text-xs font-medium text-[hsl(var(--sidebar-foreground))]/60">
      {children}
    </div>
  )
}

function NavList({
  items,
  onNavigate,
  isActive,
}: {
  items: readonly Item[]
  onNavigate: () => void
  isActive: (href: string) => boolean
}) {
  return (
    <ul className="space-y-1 px-2">
      {items.map(({ href, title, icon: Icon }) => {
        const active = isActive(href)
        return (
          <li key={href}>
            <Link
              href={href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0",
                "focus-visible:ring-[hsl(var(--sidebar-ring))]",
                active
                  ? "bg-[hsl(var(--sidebar-accent))] text-[hsl(var(--sidebar-foreground))]"
                  : "hover:bg-[hsl(var(--sidebar-accent))] hover:text-[hsl(var(--sidebar-foreground))]"
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon className="h-4 w-4" />
              <span>{title}</span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Treat a section as active if the current path starts with it (except for "/")
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href))

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" aria-label="開啟選單">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className={cn(
          "w-[300px] p-0",
          "bg-[hsl(var(--sidebar-background))] text-[hsl(var(--sidebar-foreground))]",
          "border-r border-[hsl(var(--sidebar-border))]"
        )}
      >
        {/* Header */}
        <div className="flex items-start gap-3 px-4 py-4 border-b border-[hsl(var(--sidebar-border))]">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]">
            <MapIcon className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="font-semibold text-base">金山智慧平台</div>
            <div className="text-xs text-[hsl(var(--sidebar-foreground))]/70">MaaS 整合服務</div>
          </div>
        </div>

        {/* Scrollable Nav */}
        <nav
          className="h-[calc(100vh-4.5rem)] overflow-y-auto pb-4"
          aria-label="行動側邊導覽"
        >
          {/* 首頁 */}
          <div className="pt-2">
            <NavList items={topItems} onNavigate={() => setOpen(false)} isActive={isActive} />
          </div>

          {/* 交通服務 */}
          <GroupHeader>交通服務</GroupHeader>
          <NavList items={transportItems} onNavigate={() => setOpen(false)} isActive={isActive} />

          {/* 生活體驗 */}
          <GroupHeader>生活體驗</GroupHeader>
          <NavList items={lifeItems} onNavigate={() => setOpen(false)} isActive={isActive} />

          {/* 其他服務 */}
          <GroupHeader>其他服務</GroupHeader>
          <NavList items={serviceItems} onNavigate={() => setOpen(false)} isActive={isActive} />

          {/* Footer items */}
          <div className="mt-2 border-t border-[hsl(var(--sidebar-border))] pt-2">
            <NavList items={footerItems} onNavigate={() => setOpen(false)} isActive={isActive} />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

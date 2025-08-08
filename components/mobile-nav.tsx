"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Home, Bus, Car, Bike, Users, Mountain, MapPin, Gift, Leaf, Package, Menu } from 'lucide-react'

const navItems = [
  {
    title: "首頁",
    href: "/",
    icon: Home,
  },
  {
    title: "公車",
    href: "/bus",
    icon: Bus,
  },
  {
    title: "計程車",
    href: "/taxi",
    icon: Car,
  },
  {
    title: "YouBike",
    href: "/youbike",
    icon: Bike,
  },
  {
    title: "接駁車",
    href: "/shuttle",
    icon: Users,
  },
  {
    title: "農村體驗",
    href: "/rural",
    icon: Mountain,
  },
  {
    title: "旅遊規劃",
    href: "/travel",
    icon: MapPin,
  },
  {
    title: "在地優惠",
    href: "/discount",
    icon: Gift,
  },
  {
    title: "低碳點數",
    href: "/carbon",
    icon: Leaf,
  },
  {
    title: "物流追蹤",
    href: "/logistics",
    icon: Package,
  },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4">
          <div className="flex items-center gap-2 px-4 py-2">
            <Package className="h-6 w-6" />
            <span className="font-bold">金山 MaaS</span>
          </div>
          <div className="grid gap-1 px-4">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
                    pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </Link>
              )
            })}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Home, Bus, Car, Bike, Users, Mountain, MapPin, Gift, Leaf, Package } from 'lucide-react'

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

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>金山 MaaS 服務</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                      <Link href={item.href}>
                        <Icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

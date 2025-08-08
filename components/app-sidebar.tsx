"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Home, Bus, Car, Bike, Users, Wheat, MapPin, Package, Leaf, CreditCard, Settings, HelpCircle, BadgeCheck } from 'lucide-react'

export function AppSidebar() {
  const pathname = usePathname()

  const topItems = [
    { title: "首頁", url: "/", icon: Home },
  ] as const

  const transportItems = [
    { title: "公車班次", url: "/bus", icon: Bus },
    { title: "計程車", url: "/taxi", icon: Car },
    { title: "YouBike", url: "/youbike", icon: Bike },
    { title: "接駁車", url: "/shuttle", icon: Users },
  ] as const

  const lifeItems = [
    { title: "農村體驗", url: "/rural", icon: Wheat },
    { title: "行程規劃", url: "/travel", icon: MapPin },
  ] as const

  const serviceItems = [
    { title: "物流追蹤", url: "/logistics", icon: Package },
    { title: "低碳點數", url: "/carbon", icon: Leaf },
    { title: "在地優惠", url: "/discount", icon: CreditCard },
  ] as const

  const footerItems = [
    { title: "設定", url: "/settings", icon: Settings },
    { title: "幫助", url: "/help", icon: HelpCircle },
  ] as const

  return (
    <Sidebar side="left" collapsible="icon">
      <SidebarHeader className="px-3 py-3">
        <div className="flex items-start gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <BadgeCheck className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="font-semibold text-base">金山智慧平台</div>
            <div className="text-xs text-sidebar-foreground/70">MaaS 整合服務</div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* 首頁 */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {topItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* 交通服務 */}
        <SidebarGroup>
          <SidebarGroupLabel>交通服務</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {transportItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* 生活體驗 */}
        <SidebarGroup>
          <SidebarGroupLabel>生活體驗</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {lifeItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* 其他服務 */}
        <SidebarGroup>
          <SidebarGroupLabel>其他服務</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {serviceItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          {footerItems.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton asChild isActive={pathname === item.url} tooltip={item.title}>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

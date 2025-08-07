'use client'

import { Bus, Car, Bike, Users, Wheat, MapPin, Package, Leaf, CreditCard, Home, Settings, HelpCircle } from 'lucide-react'
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
} from '@/components/ui/sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigationItems = [
  {
    title: '首頁',
    url: '/',
    icon: Home,
  },
]

const transportItems = [
  {
    title: '公車班次',
    url: '/bus',
    icon: Bus,
  },
  {
    title: '計程車',
    url: '/taxi',
    icon: Car,
  },
  {
    title: 'YouBike',
    url: '/youbike',
    icon: Bike,
  },
  {
    title: '接駁車',
    url: '/shuttle',
    icon: Users,
  },
]

const experienceItems = [
  {
    title: '農村體驗',
    url: '/rural',
    icon: Wheat,
  },
  {
    title: '行程規劃',
    url: '/travel',
    icon: MapPin,
  },
]

const serviceItems = [
  {
    title: '物流追蹤',
    url: '/logistics',
    icon: Package,
  },
  {
    title: '低碳點數',
    url: '/eco',
    icon: Leaf,
  },
  {
    title: '在地優惠',
    url: '/discount',
    icon: CreditCard,
  },
]

const otherItems = [
  {
    title: '設定',
    url: '/settings',
    icon: Settings,
  },
  {
    title: '幫助',
    url: '/help',
    icon: HelpCircle,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="hidden md:flex">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <div className="bg-primary p-2 rounded-lg">
            <MapPin className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">金山智慧平台</h2>
            <p className="text-xs text-muted-foreground">MaaS 整合服務</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
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

        <SidebarGroup>
          <SidebarGroupLabel>交通服務</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {transportItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
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

        <SidebarGroup>
          <SidebarGroupLabel>生活體驗</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {experienceItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
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

        <SidebarGroup>
          <SidebarGroupLabel>其他服務</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {serviceItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
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
          {otherItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

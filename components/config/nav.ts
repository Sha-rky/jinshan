import { TypeIcon as type, LucideIcon } from 'lucide-react'
import { Home, Bus, Car, Bike, Users, Mountain, MapPin, Gift, Leaf, Package } from 'lucide-react'

export type NavItem = {
  title: string
  href: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { title: "首頁", href: "/", icon: Home },
  { title: "公車", href: "/bus", icon: Bus },
  { title: "計程車", href: "/taxi", icon: Car },
  { title: "YouBike", href: "/youbike", icon: Bike },
  { title: "接駁車", href: "/shuttle", icon: Users },
  { title: "農村體驗", href: "/rural", icon: Mountain },
  { title: "旅遊規劃", href: "/travel", icon: MapPin },
  { title: "在地優惠", href: "/discount", icon: Gift },
  { title: "低碳點數", href: "/carbon", icon: Leaf },
  { title: "物流追蹤", href: "/logistics", icon: Package },
]

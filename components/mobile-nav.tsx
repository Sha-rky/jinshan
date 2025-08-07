'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Home, Bus, Car, Bike, Leaf } from 'lucide-react'

const mobileNavItems = [
  {
    title: '首頁',
    href: '/',
    icon: Home,
  },
  {
    title: '公車',
    href: '/bus',
    icon: Bus,
  },
  {
    title: '計程車',
    href: '/taxi',
    icon: Car,
  },
  {
    title: 'YouBike',
    href: '/youbike',
    icon: Bike,
  },
  {
    title: '點數',
    href: '/eco',
    icon: Leaf,
  },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
      <div className="grid grid-cols-5 h-16">
        {mobileNavItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center space-y-1 text-xs transition-colors',
                isActive 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <item.icon className={cn('h-5 w-5', isActive && 'text-primary')} />
              <span className={cn(isActive && 'text-primary font-medium')}>
                {item.title}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

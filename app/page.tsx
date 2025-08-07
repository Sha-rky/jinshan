'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { Bus, Car, Bike, Users, Wheat, MapPin, Package, Leaf, CreditCard, ArrowRight, Clock, Star } from 'lucide-react'

const modules = [
  {
    id: 'bus',
    title: '公車班次',
    description: '即時班次查詢與路線規劃',
    icon: Bus,
    color: 'bg-blue-500',
    href: '/bus',
    status: '即時'
  },
  {
    id: 'taxi',
    title: '計程車叫車',
    description: '即時叫車與預約服務',
    icon: Car,
    color: 'bg-yellow-500',
    href: '/taxi',
    status: '可用'
  },
  {
    id: 'youbike',
    title: 'YouBike 站點',
    description: '即時站點資訊與車位查詢',
    icon: Bike,
    color: 'bg-green-500',
    href: '/youbike',
    status: '即時'
  },
  {
    id: 'shuttle',
    title: '預約接駁車',
    description: '長照與共享司機服務',
    icon: Users,
    color: 'bg-purple-500',
    href: '/shuttle',
    status: '預約'
  },
  {
    id: 'rural',
    title: '農村體驗',
    description: '農事體驗與工藝坊預訂',
    icon: Wheat,
    color: 'bg-orange-500',
    href: '/rural',
    status: '熱門'
  },
  {
    id: 'travel',
    title: '行程規劃',
    description: '旅遊行程與住宿安排',
    icon: MapPin,
    color: 'bg-pink-500',
    href: '/travel',
    status: '推薦'
  },
  {
    id: 'logistics',
    title: '物流追蹤',
    description: '包裹與載具即時追蹤',
    icon: Package,
    color: 'bg-indigo-500',
    href: '/logistics',
    status: '追蹤'
  },
  {
    id: 'eco',
    title: '低碳點數',
    description: '環保點數累積與兌換',
    icon: Leaf,
    color: 'bg-emerald-500',
    href: '/eco',
    status: '獎勵'
  },
  {
    id: 'discount',
    title: '在地優惠',
    description: '居民專屬乘車優惠',
    icon: CreditCard,
    color: 'bg-red-500',
    href: '/discount',
    status: '限時'
  }
]

const quickStats = [
  { label: '今日班次', value: '156', icon: Clock },
  { label: '可用車輛', value: '23', icon: Car },
  { label: '熱門體驗', value: '8', icon: Star },
  { label: '累積點數', value: '1,250', icon: Leaf }
]

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold text-primary">金山智慧交通生活平台</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          整合交通行動服務與在地生活體驗，打造便民智慧生活圈
        </p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {quickStats.map((stat, index) => (
          <Card key={stat.label}>
            <CardContent className="p-4 text-center">
              <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Modules Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {modules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${module.color}`}>
                    <module.icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant="secondary">{module.status}</Badge>
                </div>
                <CardTitle className="text-lg">{module.title}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button asChild className="w-full">
                  <Link href={module.href}>
                    開始使用
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>最近活動</CardTitle>
            <CardDescription>您的最新使用記錄</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <Bus className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">搭乘 790 路公車</p>
                  <p className="text-xs text-muted-foreground">金山 → 淡水，今天 14:30</p>
                </div>
                <Badge variant="outline">已完成</Badge>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-emerald-500 p-2 rounded-lg">
                  <Leaf className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">獲得低碳點數</p>
                  <p className="text-xs text-muted-foreground">+50 點，昨天 16:45</p>
                </div>
                <Badge variant="outline">+50</Badge>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-orange-500 p-2 rounded-lg">
                  <Wheat className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">預訂農村體驗</p>
                  <p className="text-xs text-muted-foreground">有機農場導覽，12/25 10:00</p>
                </div>
                <Badge variant="outline">已預約</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

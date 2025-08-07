'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { RouteSearch } from './components/route-search'
import { TimetableCard } from './components/timetable-card'
import { Bus, Clock, MapPin, Star, Navigation } from 'lucide-react'

interface BusRoute {
  id: string
  routeNumber: string
  origin: string
  destination: string
  timetable: string[]
  status: 'normal' | 'delay' | 'cancelled'
  nextBus: string
  fare: number
}

export default function BusPage() {
  const [routes, setRoutes] = useState<BusRoute[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    // 模擬 API 呼叫
    const fetchRoutes = async () => {
      setLoading(true)
      // 模擬延遲
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockRoutes: BusRoute[] = [
        {
          id: '1',
          routeNumber: '790',
          origin: '金山',
          destination: '淡水',
          timetable: ['06:00', '06:30', '07:00', '07:30', '08:00', '08:30'],
          status: 'normal',
          nextBus: '07:45',
          fare: 45
        },
        {
          id: '2',
          routeNumber: '862',
          origin: '金山',
          destination: '基隆',
          timetable: ['06:15', '07:00', '07:45', '08:30', '09:15'],
          status: 'delay',
          nextBus: '08:00',
          fare: 38
        },
        {
          id: '3',
          routeNumber: '953',
          origin: '金山',
          destination: '台北',
          timetable: ['05:30', '06:30', '07:30', '08:30', '09:30'],
          status: 'normal',
          nextBus: '08:15',
          fare: 65
        }
      ]
      
      setRoutes(mockRoutes)
      setLoading(false)
    }

    fetchRoutes()
  }, [])

  const filteredRoutes = routes.filter(route =>
    route.routeNumber.includes(searchQuery) ||
    route.origin.includes(searchQuery) ||
    route.destination.includes(searchQuery)
  )

  const toggleFavorite = (routeId: string) => {
    setFavorites(prev =>
      prev.includes(routeId)
        ? prev.filter(id => id !== routeId)
        : [...prev, routeId]
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <div className="flex items-center justify-center space-x-2">
          <Bus className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">公車班次查詢</h1>
        </div>
        <p className="text-muted-foreground">即時班次資訊與路線規劃</p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <RouteSearch onSearch={setSearchQuery} />
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <Card>
          <CardContent className="p-4 text-center">
            <Bus className="h-6 w-6 mx-auto mb-2 text-blue-500" />
            <div className="text-xl font-bold">3</div>
            <div className="text-sm text-muted-foreground">可用路線</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 mx-auto mb-2 text-green-500" />
            <div className="text-xl font-bold">5</div>
            <div className="text-sm text-muted-foreground">分鐘後</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <MapPin className="h-6 w-6 mx-auto mb-2 text-orange-500" />
            <div className="text-xl font-bold">12</div>
            <div className="text-sm text-muted-foreground">站點數</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
            <div className="text-xl font-bold">{favorites.length}</div>
            <div className="text-sm text-muted-foreground">收藏路線</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Routes List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold">班次資訊</h2>
        
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRoutes.map((route, index) => (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <TimetableCard
                  route={route}
                  isFavorite={favorites.includes(route.id)}
                  onToggleFavorite={() => toggleFavorite(route.id)}
                />
              </motion.div>
            ))}
          </div>
        )}

        {!loading && filteredRoutes.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Bus className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">找不到相關路線</h3>
              <p className="text-muted-foreground">請嘗試其他搜尋條件</p>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  )
}

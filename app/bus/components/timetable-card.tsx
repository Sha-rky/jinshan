'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, Clock, MapPin, AlertCircle, CheckCircle, XCircle } from 'lucide-react'
import { motion } from 'framer-motion'

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

interface TimetableCardProps {
  route: BusRoute
  isFavorite: boolean
  onToggleFavorite: () => void
}

export function TimetableCard({ route, isFavorite, onToggleFavorite }: TimetableCardProps) {
  const getStatusIcon = () => {
    switch (route.status) {
      case 'normal':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'delay':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusText = () => {
    switch (route.status) {
      case 'normal':
        return '正常'
      case 'delay':
        return '延誤'
      case 'cancelled':
        return '停駛'
    }
  }

  const getStatusColor = () => {
    switch (route.status) {
      case 'normal':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'delay':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-primary text-primary-foreground px-3 py-1 rounded-lg font-bold text-lg">
                {route.routeNumber}
              </div>
              <div>
                <CardTitle className="text-lg">{route.origin} → {route.destination}</CardTitle>
                <div className="flex items-center space-x-2 mt-1">
                  {getStatusIcon()}
                  <Badge className={getStatusColor()}>
                    {getStatusText()}
                  </Badge>
                  <span className="text-sm text-muted-foreground">票價 ${route.fare}</span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleFavorite}
              className={isFavorite ? 'text-yellow-500' : 'text-muted-foreground'}
            >
              <Star className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* 下班車資訊 */}
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-medium">下班車</span>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-primary">{route.nextBus}</div>
              <div className="text-sm text-muted-foreground">約 5 分鐘後</div>
            </div>
          </div>

          {/* 班次時刻表 */}
          <div className="space-y-2">
            <h4 className="font-medium flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>今日班次</span>
            </h4>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {route.timetable.map((time, index) => (
                <Badge
                  key={index}
                  variant={time === route.nextBus ? 'default' : 'outline'}
                  className="justify-center py-1"
                >
                  {time}
                </Badge>
              ))}
            </div>
          </div>

          {/* 操作按鈕 */}
          <div className="flex space-x-2 pt-2">
            <Button variant="outline" className="flex-1">
              查看路線圖
            </Button>
            <Button className="flex-1">
              設定提醒
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

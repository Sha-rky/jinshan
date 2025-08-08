'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Star, MapPin, Clock, Bike, Battery, Navigation, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface YouBikeStation {
  id: string
  name: string
  address: string
  totalSpaces: number
  availableBikes: number
  availableSpaces: number
  status: 'active' | 'maintenance' | 'full' | 'empty'
  distance: number
  lastUpdate: string
  coordinates: {
    lat: number
    lng: number
  }
}

interface StationCardProps {
  station: YouBikeStation
  isFavorite: boolean
  isSelected: boolean
  onToggleFavorite: () => void
  onSelect: () => void
}

export function StationCard({ 
  station, 
  isFavorite, 
  isSelected, 
  onToggleFavorite, 
  onSelect 
}: StationCardProps) {
  const getStatusIcon = () => {
    switch (station.status) {
      case 'active':
        return <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      case 'maintenance':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case 'full':
        return <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
      case 'empty':
        return <div className="w-3 h-3 bg-red-500 rounded-full"></div>
    }
  }

  const getStatusText = () => {
    switch (station.status) {
      case 'active':
        return '正常營運'
      case 'maintenance':
        return '維護中'
      case 'full':
        return '車位已滿'
      case 'empty':
        return '無可借車輛'
    }
  }

  const getStatusColor = () => {
    switch (station.status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'full':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'empty':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    }
  }

  const bikeProgress = (station.availableBikes / station.totalSpaces) * 100
  const spaceProgress = (station.availableSpaces / station.totalSpaces) * 100

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card 
        className={`hover:shadow-lg transition-all cursor-pointer ${
          isSelected ? 'ring-2 ring-primary' : ''
        }`}
        onClick={onSelect}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {getStatusIcon()}
              <div>
                <CardTitle className="text-lg">{station.name}</CardTitle>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className={getStatusColor()}>
                    {getStatusText()}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {station.distance}km
                  </span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                onToggleFavorite()
              }}
              className={isFavorite ? 'text-yellow-500' : 'text-muted-foreground'}
            >
              <Star className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* 地址 */}
          <div className="flex items-start space-x-2">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
            <span className="text-sm text-muted-foreground">{station.address}</span>
          </div>

          {/* 車輛與車位資訊 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Bike className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">可借車輛</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{station.availableBikes} 輛</span>
                  <span className="text-muted-foreground">
                    {Math.round(bikeProgress)}%
                  </span>
                </div>
                <Progress value={bikeProgress} className="h-2" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Battery className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">可停車位</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{station.availableSpaces} 位</span>
                  <span className="text-muted-foreground">
                    {Math.round(spaceProgress)}%
                  </span>
                </div>
                <Progress value={spaceProgress} className="h-2" />
              </div>
            </div>
          </div>

          {/* 更新時間 */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>更新於 {station.lastUpdate}</span>
            </div>
            <span>總車位 {station.totalSpaces} 個</span>
          </div>

          {/* 操作按鈕 */}
          <div className="flex space-x-2 pt-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={(e) => e.stopPropagation()}
            >
              <Navigation className="h-4 w-4 mr-2" />
              導航
            </Button>
            <Button 
              className="flex-1"
              disabled={station.status !== 'active'}
              onClick={(e) => e.stopPropagation()}
            >
              {station.availableBikes > 0 ? '借車' : '還車'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

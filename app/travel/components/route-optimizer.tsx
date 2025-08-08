'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Route, MapPin, Clock, Navigation, Zap } from 'lucide-react'

interface Attraction {
  id: string
  name: string
  category: 'nature' | 'culture' | 'food' | 'activity'
  description: string
  location: string
  rating: number
  reviewCount: number
  estimatedTime: number
  ticketPrice: number
  images: string[]
  highlights: string[]
  openingHours: string
  coordinates: {
    lat: number
    lng: number
  }
  tags: string[]
}

interface RouteOptimizerProps {
  attractions: Attraction[]
}

export function RouteOptimizer({ attractions }: RouteOptimizerProps) {
  const [selectedAttractions, setSelectedAttractions] = useState<string[]>([])
  const [startLocation, setStartLocation] = useState('')
  const [optimizedRoute, setOptimizedRoute] = useState<Attraction[]>([])
  const [totalTime, setTotalTime] = useState(0)
  const [totalDistance, setTotalDistance] = useState(0)

  const startLocations = [
    '金山區公所',
    '金山老街',
    '台北車站',
    '淡水捷運站',
    '基隆車站'
  ]

  const handleAttractionToggle = (attractionId: string) => {
    setSelectedAttractions(prev =>
      prev.includes(attractionId)
        ? prev.filter(id => id !== attractionId)
        : [...prev, attractionId]
    )
  }

  const optimizeRoute = () => {
    if (selectedAttractions.length === 0) return

    // 簡單的路線優化算法（實際應用中會使用更複雜的算法）
    const selected = attractions.filter(a => selectedAttractions.includes(a.id))
    
    // 按照地理位置排序（這裡簡化為按經緯度排序）
    const optimized = [...selected].sort((a, b) => {
      const distanceA = Math.sqrt(
        Math.pow(a.coordinates.lat - 25.2285, 2) + 
        Math.pow(a.coordinates.lng - 121.6369, 2)
      )
      const distanceB = Math.sqrt(
        Math.pow(b.coordinates.lat - 25.2285, 2) + 
        Math.pow(b.coordinates.lng - 121.6369, 2)
      )
      return distanceA - distanceB
    })

    setOptimizedRoute(optimized)
    
    // 計算總時間和距離
    const time = optimized.reduce((sum, attraction) => sum + attraction.estimatedTime, 0)
    const distance = optimized.length * 5 // 簡化計算，每個景點間假設5公里
    
    setTotalTime(time)
    setTotalDistance(distance)
  }

  const resetRoute = () => {
    setSelectedAttractions([])
    setOptimizedRoute([])
    setTotalTime(0)
    setTotalDistance(0)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Route className="h-5 w-5" />
            <span>路線優化器</span>
          </CardTitle>
          <CardDescription>
            選擇想去的景點，我們為您規劃最佳路線
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Start Location */}
          <div className="space-y-2">
            <label className="font-medium">出發地點</label>
            <Select value={startLocation} onValueChange={setStartLocation}>
              <SelectTrigger>
                <MapPin className="h-4 w-4 mr-2" />
                <SelectValue placeholder="選擇出發地點" />
              </SelectTrigger>
              <SelectContent>
                {startLocations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Attraction Selection */}
          <div className="space-y-4">
            <label className="font-medium">選擇景點</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
              {attractions.map((attraction) => (
                <div key={attraction.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <Checkbox
                    checked={selectedAttractions.includes(attraction.id)}
                    onCheckedChange={() => handleAttractionToggle(attraction.id)}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{attraction.name}</div>
                    <div className="text-xs text-muted-foreground">{attraction.location}</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Clock className="h-3 w-3" />
                      <span className="text-xs">{Math.floor(attraction.estimatedTime / 60)}小時</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <Button 
              onClick={optimizeRoute}
              disabled={selectedAttractions.length === 0}
              className="flex-1"
            >
              <Zap className="h-4 w-4 mr-2" />
              優化路線
            </Button>
            <Button variant="outline" onClick={resetRoute}>
              重置
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Optimized Route */}
      {optimizedRoute.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>優化後路線</CardTitle>
            <CardDescription>
              為您規劃的最佳遊覽順序
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Route Summary */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{optimizedRoute.length}</div>
                <div className="text-sm text-muted-foreground">景點</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{Math.floor(totalTime / 60)}</div>
                <div className="text-sm text-muted-foreground">小時</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{totalDistance}</div>
                <div className="text-sm text-muted-foreground">公里</div>
              </div>
            </div>

            {/* Route Steps */}
            <div className="space-y-3">
              {startLocation && (
                <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    起
                  </div>
                  <div>
                    <div className="font-medium">{startLocation}</div>
                    <div className="text-sm text-muted-foreground">出發地點</div>
                  </div>
                </div>
              )}
              
              {optimizedRoute.map((attraction, index) => (
                <div key={attraction.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{attraction.name}</div>
                    <div className="text-sm text-muted-foreground">{attraction.location}</div>
                    <div className="flex items-center space-x-4 mt-1">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span className="text-xs">{Math.floor(attraction.estimatedTime / 60)}小時</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {attraction.category === 'nature' && '自然景觀'}
                        {attraction.category === 'culture' && '文化古蹟'}
                        {attraction.category === 'food' && '美食體驗'}
                        {attraction.category === 'activity' && '休閒活動'}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Navigation className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Export Route */}
            <div className="flex space-x-2 pt-4 border-t">
              <Button variant="outline" className="flex-1">
                匯出路線
              </Button>
              <Button className="flex-1">
                開始導航
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

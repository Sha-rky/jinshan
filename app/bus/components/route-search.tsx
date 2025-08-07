'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, MapPin, ArrowRight, Clock } from 'lucide-react'

interface RouteSearchProps {
  onSearch: (query: string) => void
}

export function RouteSearch({ onSearch }: RouteSearchProps) {
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const popularRoutes = [
    { number: '790', name: '金山-淡水' },
    { number: '862', name: '金山-基隆' },
    { number: '953', name: '金山-台北' }
  ]

  const handleSearch = () => {
    const query = searchQuery || `${origin} ${destination}`.trim()
    onSearch(query)
  }

  const handlePopularRoute = (routeNumber: string) => {
    setSearchQuery(routeNumber)
    onSearch(routeNumber)
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        {/* 路線搜尋 */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold">路線搜尋</h3>
          </div>
          
          <div className="flex space-x-2">
            <Input
              placeholder="輸入路線號碼或地點"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* 起迄點搜尋 */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold">起迄點查詢</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Input
              placeholder="出發地"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
            <div className="flex items-center justify-center">
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              placeholder="目的地"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          
          <Button onClick={handleSearch} className="w-full">
            <Clock className="h-4 w-4 mr-2" />
            查詢班次
          </Button>
        </div>

        {/* 熱門路線 */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground">熱門路線</h4>
          <div className="flex flex-wrap gap-2">
            {popularRoutes.map((route) => (
              <Badge
                key={route.number}
                variant="secondary"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => handlePopularRoute(route.number)}
              >
                {route.number} {route.name}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

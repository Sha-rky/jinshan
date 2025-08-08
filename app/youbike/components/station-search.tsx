'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, MapPin, Navigation, SortAsc } from 'lucide-react'

interface StationSearchProps {
  onSearch: (query: string) => void
  onSortChange: (sort: 'distance' | 'bikes' | 'spaces') => void
  sortBy: 'distance' | 'bikes' | 'spaces'
}

export function StationSearch({ onSearch, onSortChange, sortBy }: StationSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const popularStations = [
    '金山區公所站',
    '金山老街站',
    '朱銘美術館站',
    '野柳地質公園站'
  ]

  const handleSearch = () => {
    onSearch(searchQuery)
  }

  const handlePopularStation = (stationName: string) => {
    setSearchQuery(stationName)
    onSearch(stationName)
  }

  const handleCurrentLocation = () => {
    // 模擬獲取當前位置附近站點
    onSearch('金山區公所')
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        {/* 站點搜尋 */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold">站點搜尋</h3>
          </div>
          
          <div className="flex space-x-2">
            <Input
              placeholder="輸入站點名稱或地址"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* 定位與排序 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">附近站點</span>
            </div>
            <Button 
              variant="outline" 
              onClick={handleCurrentLocation}
              className="w-full"
            >
              <Navigation className="h-4 w-4 mr-2" />
              定位附近站點
            </Button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <SortAsc className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">排序方式</span>
            </div>
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distance">距離最近</SelectItem>
                <SelectItem value="bikes">可借車輛</SelectItem>
                <SelectItem value="spaces">可停車位</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 熱門站點 */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground">熱門站點</h4>
          <div className="flex flex-wrap gap-2">
            {popularStations.map((station) => (
              <Badge
                key={station}
                variant="secondary"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => handlePopularStation(station)}
              >
                {station}
              </Badge>
            ))}
          </div>
        </div>

        {/* 使用說明 */}
        <div className="bg-muted/50 p-3 rounded-lg">
          <h5 className="font-medium text-sm mb-2">使用提醒</h5>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>• 請確認站點有可借車輛再前往</p>
            <p>• 還車前請確認有可停車位</p>
            <p>• 資料每分鐘更新一次</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { StationSearch } from './components/station-search'
import { StationCard } from './components/station-card'
import { StationMap } from './components/station-map'
import { Bike, MapPin, Clock, Battery, Star, Navigation } from 'lucide-react'

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

export default function YouBikePage() {
  const [stations, setStations] = useState<YouBikeStation[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [favorites, setFavorites] = useState<string[]>([])
  const [selectedStation, setSelectedStation] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<'distance' | 'bikes' | 'spaces'>('distance')

  useEffect(() => {
    const fetchStations = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockStations: YouBikeStation[] = [
        {
          id: '1',
          name: '金山區公所站',
          address: '新北市金山區中正路17號前',
          totalSpaces: 20,
          availableBikes: 12,
          availableSpaces: 8,
          status: 'active',
          distance: 0.1,
          lastUpdate: '2分鐘前',
          coordinates: { lat: 25.2285, lng: 121.6369 }
        },
        {
          id: '2',
          name: '金山老街站',
          address: '新北市金山區金包里街108號前',
          totalSpaces: 15,
          availableBikes: 3,
          availableSpaces: 12,
          status: 'active',
          distance: 0.3,
          lastUpdate: '1分鐘前',
          coordinates: { lat: 25.2298, lng: 121.6385 }
        },
        {
          id: '3',
          name: '朱銘美術館站',
          address: '新北市金山區西勢湖2號前',
          totalSpaces: 25,
          availableBikes: 18,
          availableSpaces: 7,
          status: 'active',
          distance: 2.1,
          lastUpdate: '3分鐘前',
          coordinates: { lat: 25.2156, lng: 121.6289 }
        },
        {
          id: '4',
          name: '金山青年活動中心站',
          address: '新北市金山區青年路1號前',
          totalSpaces: 30,
          availableBikes: 0,
          availableSpaces: 30,
          status: 'empty',
          distance: 0.8,
          lastUpdate: '5分鐘前',
          coordinates: { lat: 25.2245, lng: 121.6412 }
        },
        {
          id: '5',
          name: '野柳地質公園站',
          address: '新北市萬里區野柳里港東路167-1號前',
          totalSpaces: 20,
          availableBikes: 20,
          availableSpaces: 0,
          status: 'full',
          distance: 5.2,
          lastUpdate: '1分鐘前',
          coordinates: { lat: 25.2017, lng: 121.6893 }
        },
        {
          id: '6',
          name: '金山海水浴場站',
          address: '新北市金山區民生路166號前',
          totalSpaces: 18,
          availableBikes: 8,
          availableSpaces: 10,
          status: 'maintenance',
          distance: 1.5,
          lastUpdate: '10分鐘前',
          coordinates: { lat: 25.2198, lng: 121.6445 }
        }
      ]
      
      setStations(mockStations)
      setLoading(false)
    }

    fetchStations()
  }, [])

  const filteredStations = stations.filter(station =>
    station.name.includes(searchQuery) ||
    station.address.includes(searchQuery)
  )

  const sortedStations = [...filteredStations].sort((a, b) => {
    switch (sortBy) {
      case 'distance':
        return a.distance - b.distance
      case 'bikes':
        return b.availableBikes - a.availableBikes
      case 'spaces':
        return b.availableSpaces - a.availableSpaces
      default:
        return 0
    }
  })

  const toggleFavorite = (stationId: string) => {
    setFavorites(prev =>
      prev.includes(stationId)
        ? prev.filter(id => id !== stationId)
        : [...prev, stationId]
    )
  }

  const totalBikes = stations.reduce((sum, station) => sum + station.availableBikes, 0)
  const totalSpaces = stations.reduce((sum, station) => sum + station.availableSpaces, 0)
  const activeStations = stations.filter(station => station.status === 'active').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <div className="flex items-center justify-center space-x-2">
          <Bike className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">YouBike 站點查詢</h1>
        </div>
        <p className="text-muted-foreground">即時站點資訊與車位查詢</p>
      </motion.div>

      {/* Search and Map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <StationSearch 
          onSearch={setSearchQuery}
          onSortChange={setSortBy}
          sortBy={sortBy}
        />
        <StationMap 
          stations={stations}
          selectedStation={selectedStation}
          onStationSelect={setSelectedStation}
        />
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
            <MapPin className="h-6 w-6 mx-auto mb-2 text-blue-500" />
            <div className="text-xl font-bold">{activeStations}</div>
            <div className="text-sm text-muted-foreground">可用站點</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Bike className="h-6 w-6 mx-auto mb-2 text-green-500" />
            <div className="text-xl font-bold">{totalBikes}</div>
            <div className="text-sm text-muted-foreground">可借車輛</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Battery className="h-6 w-6 mx-auto mb-2 text-orange-500" />
            <div className="text-xl font-bold">{totalSpaces}</div>
            <div className="text-sm text-muted-foreground">可停車位</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
            <div className="text-xl font-bold">{favorites.length}</div>
            <div className="text-sm text-muted-foreground">收藏站點</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stations List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">站點資訊</h2>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">即時更新</span>
          </div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sortedStations.map((station, index) => (
              <motion.div
                key={station.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <StationCard
                  station={station}
                  isFavorite={favorites.includes(station.id)}
                  isSelected={selectedStation === station.id}
                  onToggleFavorite={() => toggleFavorite(station.id)}
                  onSelect={() => setSelectedStation(station.id)}
                />
              </motion.div>
            ))}
          </div>
        )}

        {!loading && sortedStations.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Bike className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">找不到相關站點</h3>
              <p className="text-muted-foreground">請嘗試其他搜尋條件</p>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  )
}

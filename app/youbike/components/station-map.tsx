'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Bike, Battery } from 'lucide-react'
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

interface StationMapProps {
  stations: YouBikeStation[]
  selectedStation: string | null
  onStationSelect: (stationId: string) => void
}

export function StationMap({ stations, selectedStation, onStationSelect }: StationMapProps) {
  const getStationColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500'
      case 'maintenance':
        return 'bg-yellow-500'
      case 'full':
        return 'bg-blue-500'
      case 'empty':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="h-5 w-5" />
          <span>站點地圖</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 地圖區域 */}
        <div className="relative bg-muted rounded-lg h-64 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950"></div>
          
          {/* 模擬地圖標記 */}
          {stations.map((station, index) => (
            <motion.div
              key={station.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.1 * index }}
              className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                selectedStation === station.id ? 'z-10 scale-125' : 'z-0'
              }`}
              style={{
                left: `${20 + (index % 3) * 25}%`,
                top: `${20 + Math.floor(index / 3) * 30}%`
              }}
              onClick={() => onStationSelect(station.id)}
            >
              <div className={`w-6 h-6 rounded-full ${getStationColor(station.status)} 
                border-2 border-white shadow-lg flex items-center justify-center`}>
                <Bike className="h-3 w-3 text-white" />
              </div>
              {selectedStation === station.id && (
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 
                  bg-white dark:bg-gray-800 p-2 rounded shadow-lg min-w-32 text-center">
                  <div className="text-xs font-medium">{station.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {station.availableBikes}車/{station.availableSpaces}位
                  </div>
                </div>
              )}
            </motion.div>
          ))}
          
          <div className="absolute bottom-4 left-4 text-center text-muted-foreground">
            <MapPin className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm">互動式站點地圖</p>
          </div>
        </div>

        {/* 圖例 */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">站點狀態</h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">正常營運</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm">維護中</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm">車位已滿</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm">無可借車輛</span>
            </div>
          </div>
        </div>

        {/* 選中站點資訊 */}
        {selectedStation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-muted/50 p-3 rounded-lg"
          >
            {(() => {
              const station = stations.find(s => s.id === selectedStation)
              if (!station) return null
              
              return (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium">{station.name}</h5>
                    <Badge variant="outline">{station.distance}km</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Bike className="h-4 w-4 text-green-500" />
                      <span>可借: {station.availableBikes} 輛</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Battery className="h-4 w-4 text-blue-500" />
                      <span>可停: {station.availableSpaces} 位</span>
                    </div>
                  </div>
                </div>
              )
            })()}
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}

'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { MapPin, Navigation, RotateCcw, Target } from 'lucide-react'
import { motion } from 'framer-motion'

interface MapCanvasProps {
  pickupLocation: string
  destination: string
  onLocationChange: (pickup: string, destination: string) => void
}

export function MapCanvas({ pickupLocation, destination, onLocationChange }: MapCanvasProps) {
  const [isEditingPickup, setIsEditingPickup] = useState(false)
  const [isEditingDestination, setIsEditingDestination] = useState(false)
  const [tempPickup, setTempPickup] = useState(pickupLocation)
  const [tempDestination, setTempDestination] = useState(destination)

  const popularLocations = [
    '金山區公所',
    '金山老街',
    '朱銘美術館',
    '金山青年活動中心',
    '金山海水浴場',
    '野柳地質公園',
    '淡水老街',
    '基隆廟口'
  ]

  const handlePickupSave = () => {
    onLocationChange(tempPickup, destination)
    setIsEditingPickup(false)
  }

  const handleDestinationSave = () => {
    onLocationChange(pickupLocation, tempDestination)
    setIsEditingDestination(false)
  }

  const handleSwapLocations = () => {
    onLocationChange(destination, pickupLocation)
  }

  const handleCurrentLocation = () => {
    // 模擬獲取當前位置
    onLocationChange('金山區公所', destination)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="h-5 w-5" />
          <span>地點設定</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 地圖區域 */}
        <div className="relative bg-muted rounded-lg h-64 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900"></div>
          
          {/* 模擬地圖標記 */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="absolute top-4 left-4 bg-green-500 text-white p-2 rounded-full shadow-lg"
          >
            <MapPin className="h-4 w-4" />
          </motion.div>
          
          {destination && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.4 }}
              className="absolute bottom-4 right-4 bg-red-500 text-white p-2 rounded-full shadow-lg"
            >
              <Target className="h-4 w-4" />
            </motion.div>
          )}
          
          {/* 路線線條 */}
          {destination && (
            <motion.div
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="absolute inset-0 pointer-events-none"
            >
              <svg className="w-full h-full">
                <path
                  d="M 60 40 Q 120 80 200 180"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="5,5"
                  fill="none"
                  className="text-primary"
                />
              </svg>
            </motion.div>
          )}
          
          <div className="text-center text-muted-foreground">
            <MapPin className="h-8 w-8 mx-auto mb-2" />
            <p>互動式地圖</p>
            <p className="text-sm">點擊設定上下車地點</p>
          </div>
        </div>

        {/* 地點輸入 */}
        <div className="space-y-4">
          {/* 上車地點 */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>上車地點</span>
            </label>
            {isEditingPickup ? (
              <div className="flex space-x-2">
                <Input
                  value={tempPickup}
                  onChange={(e) => setTempPickup(e.target.value)}
                  placeholder="輸入上車地點"
                />
                <Button onClick={handlePickupSave} size="sm">
                  確定
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditingPickup(false)} 
                  size="sm"
                >
                  取消
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span>{pickupLocation}</span>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCurrentLocation}
                  >
                    <Navigation className="h-4 w-4 mr-1" />
                    定位
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditingPickup(true)}
                  >
                    修改
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* 交換按鈕 */}
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSwapLocations}
              disabled={!destination}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          {/* 目的地 */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>目的地</span>
            </label>
            {isEditingDestination ? (
              <div className="flex space-x-2">
                <Input
                  value={tempDestination}
                  onChange={(e) => setTempDestination(e.target.value)}
                  placeholder="輸入目的地"
                />
                <Button onClick={handleDestinationSave} size="sm">
                  確定
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditingDestination(false)} 
                  size="sm"
                >
                  取消
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span>{destination || '請選擇目的地'}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditingDestination(true)}
                >
                  {destination ? '修改' : '設定'}
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* 熱門地點 */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">熱門地點</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {popularLocations.map((location) => (
              <Badge
                key={location}
                variant="secondary"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors justify-center py-2"
                onClick={() => {
                  if (!destination) {
                    onLocationChange(pickupLocation, location)
                  } else {
                    onLocationChange(location, destination)
                  }
                }}
              >
                {location}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

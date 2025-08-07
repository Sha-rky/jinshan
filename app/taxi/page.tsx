'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapCanvas } from './components/map-canvas'
import { FareEstimator } from './components/fare-estimator'
import { Car, Clock, MapPin, Phone, Star, Navigation } from 'lucide-react'

interface TaxiOption {
  id: string
  type: string
  basePrice: number
  pricePerKm: number
  estimatedArrival: number
  rating: number
  driverName: string
  licensePlate: string
  available: boolean
}

export default function TaxiPage() {
  const [taxiOptions, setTaxiOptions] = useState<TaxiOption[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTaxi, setSelectedTaxi] = useState<string | null>(null)
  const [pickupLocation, setPickupLocation] = useState('金山區公所')
  const [destination, setDestination] = useState('')
  const [estimatedFare, setEstimatedFare] = useState(0)

  useEffect(() => {
    const fetchTaxiOptions = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockTaxiOptions: TaxiOption[] = [
        {
          id: '1',
          type: '一般計程車',
          basePrice: 85,
          pricePerKm: 20,
          estimatedArrival: 3,
          rating: 4.8,
          driverName: '王師傅',
          licensePlate: 'ABC-1234',
          available: true
        },
        {
          id: '2',
          type: '豪華計程車',
          basePrice: 120,
          pricePerKm: 25,
          estimatedArrival: 5,
          rating: 4.9,
          driverName: '李師傅',
          licensePlate: 'DEF-5678',
          available: true
        },
        {
          id: '3',
          type: '無障礙計程車',
          basePrice: 85,
          pricePerKm: 20,
          estimatedArrival: 8,
          rating: 4.7,
          driverName: '陳師傅',
          licensePlate: 'GHI-9012',
          available: true
        }
      ]
      
      setTaxiOptions(mockTaxiOptions)
      setLoading(false)
    }

    fetchTaxiOptions()
  }, [])

  const handleBookTaxi = (taxiId: string) => {
    setSelectedTaxi(taxiId)
    // 這裡會處理預約邏輯
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
          <Car className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">計程車叫車服務</h1>
        </div>
        <p className="text-muted-foreground">即時叫車與預約服務</p>
      </motion.div>

      {/* Map and Location */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <MapCanvas
          pickupLocation={pickupLocation}
          destination={destination}
          onLocationChange={(pickup, dest) => {
            setPickupLocation(pickup)
            setDestination(dest)
          }}
        />
      </motion.div>

      {/* Fare Estimator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <FareEstimator
          pickup={pickupLocation}
          destination={destination}
          onFareCalculated={setEstimatedFare}
        />
      </motion.div>

      {/* Available Taxis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold">可用車輛</h2>
        
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="animate-pulse space-y-3">
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid gap-4">
            {taxiOptions.map((taxi, index) => (
              <motion.div
                key={taxi.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className={`hover:shadow-lg transition-all ${selectedTaxi === taxi.id ? 'ring-2 ring-primary' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          <Car className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{taxi.type}</h3>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <span>{taxi.driverName}</span>
                            <span>•</span>
                            <span>{taxi.licensePlate}</span>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{taxi.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right space-y-2">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{taxi.estimatedArrival} 分鐘</span>
                        </div>
                        <div className="text-lg font-bold text-primary">
                          預估 ${Math.round(taxi.basePrice + (estimatedFare * taxi.pricePerKm / 20))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <div className="flex space-x-2">
                        <Badge variant={taxi.available ? 'default' : 'secondary'}>
                          {taxi.available ? '可用' : '忙碌'}
                        </Badge>
                        <Badge variant="outline">
                          起跳價 ${taxi.basePrice}
                        </Badge>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4 mr-2" />
                          聯絡
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleBookTaxi(taxi.id)}
                          disabled={!taxi.available}
                        >
                          <Navigation className="h-4 w-4 mr-2" />
                          {selectedTaxi === taxi.id ? '已選擇' : '選擇'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Booking Confirmation */}
      {selectedTaxi && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-primary">
            <CardHeader>
              <CardTitle className="text-primary">確認預約</CardTitle>
              <CardDescription>請確認您的行程資訊</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">上車地點</label>
                  <p className="text-muted-foreground">{pickupLocation}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">目的地</label>
                  <p className="text-muted-foreground">{destination || '未設定'}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">預估費用</p>
                  <p className="text-2xl font-bold text-primary">${estimatedFare}</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setSelectedTaxi(null)}>
                    取消
                  </Button>
                  <Button>
                    確認預約
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

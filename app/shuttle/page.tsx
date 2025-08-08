'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { ServiceSelector } from './components/service-selector'
import { BookingForm } from './components/booking-form'
import { DriverCard } from './components/driver-card'
import { BookingHistory } from './components/booking-history'
import { Users, Clock, MapPin, Star, Calendar, Phone } from 'lucide-react'

interface ShuttleService {
  id: string
  type: 'elderly_care' | 'shared_ride' | 'medical' | 'shopping'
  name: string
  description: string
  priceRange: string
  availability: 'available' | 'limited' | 'unavailable'
  features: string[]
}

interface Driver {
  id: string
  name: string
  rating: number
  experience: number
  specialties: string[]
  vehicle: string
  licensePlate: string
  phone: string
  available: boolean
  nextAvailable: string
  photo: string
}

interface Booking {
  id: string
  serviceType: string
  driverName: string
  date: string
  time: string
  pickup: string
  destination: string
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled'
  price: number
}

export default function ShuttlePage() {
  const [services, setServices] = useState<ShuttleService[]>([])
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedService, setSelectedService] = useState<string>('')
  const [selectedDriver, setSelectedDriver] = useState<string>('')
  const [showBookingForm, setShowBookingForm] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockServices: ShuttleService[] = [
        {
          id: '1',
          type: 'elderly_care',
          name: '長照接駁服務',
          description: '專業長照接駁，提供輪椅友善車輛',
          priceRange: '$150-300',
          availability: 'available',
          features: ['輪椅升降', '專業照護', '醫療設備', '24小時服務']
        },
        {
          id: '2',
          type: 'medical',
          name: '就醫接送',
          description: '醫院診所接送，協助掛號就診',
          priceRange: '$200-400',
          availability: 'available',
          features: ['醫院熟悉', '掛號協助', '陪同就診', '藥品代領']
        },
        {
          id: '3',
          type: 'shared_ride',
          name: '共享接駁',
          description: '多人共乘，經濟實惠的接駁選擇',
          priceRange: '$80-150',
          availability: 'limited',
          features: ['多人共乘', '固定路線', '經濟實惠', '環保出行']
        },
        {
          id: '4',
          type: 'shopping',
          name: '購物接送',
          description: '市場超市接送，協助搬運購物',
          priceRange: '$120-250',
          availability: 'available',
          features: ['購物協助', '搬運服務', '等候時間', '多點接送']
        }
      ]

      const mockDrivers: Driver[] = [
        {
          id: '1',
          name: '陳大哥',
          rating: 4.9,
          experience: 8,
          specialties: ['長照接駁', '就醫接送'],
          vehicle: 'Toyota Hiace (無障礙)',
          licensePlate: 'ABC-1234',
          phone: '0912-345-678',
          available: true,
          nextAvailable: '立即可用',
          photo: '/placeholder-user.jpg'
        },
        {
          id: '2',
          name: '王師傅',
          rating: 4.8,
          experience: 12,
          specialties: ['共享接駁', '購物接送'],
          vehicle: 'Mercedes-Benz Sprinter',
          licensePlate: 'DEF-5678',
          phone: '0923-456-789',
          available: true,
          nextAvailable: '立即可用',
          photo: '/placeholder-user.jpg'
        },
        {
          id: '3',
          name: '李阿姨',
          rating: 4.7,
          experience: 6,
          specialties: ['長照接駁', '購物接送'],
          vehicle: 'Honda Freed (無障礙)',
          licensePlate: 'GHI-9012',
          phone: '0934-567-890',
          available: false,
          nextAvailable: '14:30 可用',
          photo: '/placeholder-user.jpg'
        },
        {
          id: '4',
          name: '張大哥',
          rating: 4.6,
          experience: 10,
          specialties: ['就醫接送', '共享接駁'],
          vehicle: 'Nissan NV200',
          licensePlate: 'JKL-3456',
          phone: '0945-678-901',
          available: true,
          nextAvailable: '立即可用',
          photo: '/placeholder-user.jpg'
        }
      ]

      const mockBookings: Booking[] = [
        {
          id: '1',
          serviceType: '長照接駁',
          driverName: '陳大哥',
          date: '2024-01-15',
          time: '09:00',
          pickup: '金山區公所',
          destination: '台北榮總',
          status: 'confirmed',
          price: 280
        },
        {
          id: '2',
          serviceType: '購物接送',
          driverName: '王師傅',
          date: '2024-01-12',
          time: '14:30',
          pickup: '金山老街',
          destination: '家樂福金山店',
          status: 'completed',
          price: 150
        }
      ]
      
      setServices(mockServices)
      setDrivers(mockDrivers)
      setBookings(mockBookings)
      setLoading(false)
    }

    fetchData()
  }, [])

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId)
    setSelectedDriver('')
  }

  const handleDriverSelect = (driverId: string) => {
    setSelectedDriver(driverId)
    setShowBookingForm(true)
  }

  const handleBookingSubmit = (bookingData: any) => {
    const newBooking: Booking = {
      id: Date.now().toString(),
      serviceType: services.find(s => s.id === selectedService)?.name || '',
      driverName: drivers.find(d => d.id === selectedDriver)?.name || '',
      date: bookingData.date,
      time: bookingData.time,
      pickup: bookingData.pickup,
      destination: bookingData.destination,
      status: 'pending',
      price: bookingData.estimatedPrice
    }
    
    setBookings(prev => [newBooking, ...prev])
    setShowBookingForm(false)
    setSelectedService('')
    setSelectedDriver('')
  }

  const filteredDrivers = selectedService 
    ? drivers.filter(driver => {
        const service = services.find(s => s.id === selectedService)
        return service && driver.specialties.includes(service.name)
      })
    : drivers

  const availableDrivers = filteredDrivers.filter(driver => driver.available).length
  const totalBookings = bookings.length
  const completedBookings = bookings.filter(b => b.status === 'completed').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <div className="flex items-center justify-center space-x-2">
          <Users className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">預約接駁車服務</h1>
        </div>
        <p className="text-muted-foreground">長照接駁與共享司機專業服務</p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 mx-auto mb-2 text-blue-500" />
            <div className="text-xl font-bold">{availableDrivers}</div>
            <div className="text-sm text-muted-foreground">可用司機</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 mx-auto mb-2 text-green-500" />
            <div className="text-xl font-bold">24</div>
            <div className="text-sm text-muted-foreground">小時服務</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-6 w-6 mx-auto mb-2 text-orange-500" />
            <div className="text-xl font-bold">{totalBookings}</div>
            <div className="text-sm text-muted-foreground">總預約數</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
            <div className="text-xl font-bold">{completedBookings}</div>
            <div className="text-sm text-muted-foreground">完成服務</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Service Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ServiceSelector
          services={services}
          selectedService={selectedService}
          onServiceSelect={handleServiceSelect}
          loading={loading}
        />
      </motion.div>

      {/* Driver Selection */}
      {selectedService && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-semibold">選擇司機</h2>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
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
              {filteredDrivers.map((driver, index) => (
                <motion.div
                  key={driver.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <DriverCard
                    driver={driver}
                    isSelected={selectedDriver === driver.id}
                    onSelect={() => handleDriverSelect(driver.id)}
                  />
                </motion.div>
              ))}
            </div>
          )}

          {!loading && filteredDrivers.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">暫無可用司機</h3>
                <p className="text-muted-foreground">請稍後再試或選擇其他服務</p>
              </CardContent>
            </Card>
          )}
        </motion.div>
      )}

      {/* Booking Form */}
      {showBookingForm && selectedDriver && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <BookingForm
            service={services.find(s => s.id === selectedService)!}
            driver={drivers.find(d => d.id === selectedDriver)!}
            onSubmit={handleBookingSubmit}
            onCancel={() => setShowBookingForm(false)}
          />
        </motion.div>
      )}

      {/* Booking History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <BookingHistory bookings={bookings} />
      </motion.div>
    </div>
  )
}

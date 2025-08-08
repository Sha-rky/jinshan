'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, MapPin, User, Phone, Star } from 'lucide-react'
import { motion } from 'framer-motion'

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

interface BookingHistoryProps {
  bookings: Booking[]
}

export function BookingHistory({ bookings }: BookingHistoryProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '已確認'
      case 'pending':
        return '待確認'
      case 'completed':
        return '已完成'
      case 'cancelled':
        return '已取消'
      default:
        return status
    }
  }

  if (bookings.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>預約記錄</CardTitle>
          <CardDescription>您的接駁服務預約記錄</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">暫無預約記錄</h3>
          <p className="text-muted-foreground">完成第一次預約後，記錄將顯示在這裡</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>預約記錄</CardTitle>
        <CardDescription>您的接駁服務預約記錄</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {bookings.map((booking, index) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{booking.serviceType}</Badge>
                    <Badge className={getStatusColor(booking.status)}>
                      {getStatusText(booking.status)}
                    </Badge>
                  </div>
                  <div className="text-lg font-bold text-primary">
                    ${booking.price}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{booking.date}</span>
                      <Clock className="h-4 w-4 text-muted-foreground ml-2" />
                      <span className="text-sm">{booking.time}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">司機：{booking.driverName}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-green-500 mt-0.5" />
                      <div className="text-sm">
                        <div className="font-medium">上車：{booking.pickup}</div>
                        <div className="text-muted-foreground">目的地：{booking.destination}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {booking.status === 'confirmed' && (
                  <div className="flex space-x-2 mt-4 pt-4 border-t">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="h-4 w-4 mr-2" />
                      聯絡司機
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      修改預約
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      取消預約
                    </Button>
                  </div>
                )}

                {booking.status === 'completed' && (
                  <div className="flex space-x-2 mt-4 pt-4 border-t">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Star className="h-4 w-4 mr-2" />
                      評價服務
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      再次預約
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  )
}

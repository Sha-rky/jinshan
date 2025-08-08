'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, Users, MapPin, Phone, Star, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface Booking {
  id: string
  experienceId: string
  experienceTitle: string
  date: string
  time: string
  participants: number
  totalPrice: number
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled'
  hostName: string
}

interface MyBookingsProps {
  bookings: Booking[]
}

export function MyBookings({ bookings }: MyBookingsProps) {
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
          <CardTitle>我的預約</CardTitle>
          <CardDescription>您的體驗活動預約記錄</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">暫無預約記錄</h3>
          <p className="text-muted-foreground">預約您的第一個農村體驗活動吧！</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>我的預約</CardTitle>
        <CardDescription>您的體驗活動預約記錄</CardDescription>
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
                    <Badge className={getStatusColor(booking.status)}>
                      {getStatusText(booking.status)}
                    </Badge>
                  </div>
                  <div className="text-lg font-bold text-primary">
                    ${booking.totalPrice}
                  </div>
                </div>

                <h3 className="font-semibold text-lg mb-3">{booking.experienceTitle}</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{booking.date}</span>
                      <Clock className="h-4 w-4 text-muted-foreground ml-2" />
                      <span className="text-sm">{booking.time}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{booking.participants} 人參加</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">主辦人：{booking.hostName}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {booking.status === 'confirmed' && (
                  <div className="flex space-x-2 pt-4 border-t">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Phone className="h-4 w-4 mr-2" />
                      聯絡主辦人
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      查看詳情
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      取消預約
                    </Button>
                  </div>
                )}

                {booking.status === 'completed' && (
                  <div className="flex space-x-2 pt-4 border-t">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Star className="h-4 w-4 mr-2" />
                      評價體驗
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      再次預約
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      分享體驗
                    </Button>
                  </div>
                )}

                {booking.status === 'pending' && (
                  <div className="flex space-x-2 pt-4 border-t">
                    <Button variant="outline" size="sm" className="flex-1">
                      修改預約
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      取消預約
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

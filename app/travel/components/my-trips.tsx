'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Users, MapPin, DollarSign, Edit, Trash2, Share, Eye } from 'lucide-react'
import { motion } from 'framer-motion'

interface Trip {
  id: string
  title: string
  startDate: string
  endDate: string
  days: number
  participants: number
  budget: number
  status: 'planning' | 'confirmed' | 'completed'
  attractions: string[]
  accommodation: string[]
  transportation: string[]
  totalCost: number
}

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

interface Accommodation {
  id: string
  name: string
  type: 'hotel' | 'bnb' | 'resort' | 'hostel'
  description: string
  location: string
  rating: number
  reviewCount: number
  pricePerNight: number
  images: string[]
  amenities: string[]
  roomTypes: string[]
  coordinates: {
    lat: number
    lng: number
  }
}

interface MyTripsProps {
  trips: Trip[]
  attractions: Attraction[]
  accommodations: Accommodation[]
}

export function MyTrips({ trips, attractions, accommodations }: MyTripsProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'confirmed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'planning':
        return '規劃中'
      case 'confirmed':
        return '已確認'
      case 'completed':
        return '已完成'
      default:
        return status
    }
  }

  const getAttractionNames = (attractionIds: string[]) => {
    return attractionIds.map(id => {
      const attraction = attractions.find(a => a.id === id)
      return attraction?.name || '未知景點'
    })
  }

  const getAccommodationNames = (accommodationIds: string[]) => {
    return accommodationIds.map(id => {
      const accommodation = accommodations.find(a => a.id === id)
      return accommodation?.name || '未知住宿'
    })
  }

  if (trips.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>我的行程</CardTitle>
          <CardDescription>您的旅遊行程規劃記錄</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">暫無行程規劃</h3>
          <p className="text-muted-foreground">開始規劃您的第一個旅程吧！</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>我的行程</CardTitle>
        <CardDescription>您的旅遊行程規劃記錄</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {trips.map((trip, index) => (
          <motion.div
            key={trip.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-lg">{trip.title}</h3>
                    <Badge className={getStatusColor(trip.status)}>
                      {getStatusText(trip.status)}
                    </Badge>
                  </div>
                  <div className="text-lg font-bold text-primary">
                    ${trip.totalCost}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {trip.startDate} ~ {trip.endDate} ({trip.days}天)
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{trip.participants} 人</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">預算 ${trip.budget}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div className="text-sm">
                        <div className="font-medium">景點 ({trip.attractions.length})</div>
                        <div className="text-muted-foreground">
                          {getAttractionNames(trip.attractions).slice(0, 2).join(', ')}
                          {trip.attractions.length > 2 && ` 等${trip.attractions.length}個`}
                        </div>
                      </div>
                    </div>

                    {trip.accommodation.length > 0 && (
                      <div className="text-sm">
                        <div className="font-medium">住宿</div>
                        <div className="text-muted-foreground">
                          {getAccommodationNames(trip.accommodation).join(', ')}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Transportation */}
                {trip.transportation.length > 0 && (
                  <div className="mb-4">
                    <div className="text-sm font-medium mb-2">交通方式</div>
                    <div className="flex flex-wrap gap-1">
                      {trip.transportation.map((transport, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {transport}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-4 border-t">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    查看詳情
                  </Button>
                  
                  {trip.status === 'planning' && (
                    <>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-2" />
                        編輯行程
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        確認行程
                      </Button>
                    </>
                  )}

                  {trip.status === 'confirmed' && (
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share className="h-4 w-4 mr-2" />
                      分享行程
                    </Button>
                  )}

                  {trip.status === 'completed' && (
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share className="h-4 w-4 mr-2" />
                      分享遊記
                    </Button>
                  )}

                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  )
}

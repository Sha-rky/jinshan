'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, MapPin, Wifi, Car, Utensils, Waves, Dumbbell, Hotel, Home, Building, Users } from 'lucide-react'
import { motion } from 'framer-motion'

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

interface AccommodationCardProps {
  accommodation: Accommodation
}

export function AccommodationCard({ accommodation }: AccommodationCardProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'hotel':
        return Hotel
      case 'bnb':
        return Home
      case 'resort':
        return Building
      case 'hostel':
        return Users
      default:
        return Hotel
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'hotel':
        return 'bg-blue-500'
      case 'bnb':
        return 'bg-green-500'
      case 'resort':
        return 'bg-purple-500'
      case 'hostel':
        return 'bg-orange-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getTypeName = (type: string) => {
    switch (type) {
      case 'hotel':
        return '飯店'
      case 'bnb':
        return '民宿'
      case 'resort':
        return '度假村'
      case 'hostel':
        return '青年旅館'
      default:
        return type
    }
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case 'wifi':
        return Wifi
      case '停車場':
        return Car
      case '餐廳':
        return Utensils
      case '溫泉':
        return Waves
      case '健身房':
        return Dumbbell
      default:
        return null
    }
  }

  const TypeIcon = getTypeIcon(accommodation.type)

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
        {/* Image */}
        <div className="relative h-48 bg-muted">
          <img
            src={accommodation.images[0] || "/placeholder.svg"}
            alt={accommodation.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3">
            <div className={`p-2 rounded-lg ${getTypeColor(accommodation.type)}`}>
              <TypeIcon className="h-4 w-4 text-white" />
            </div>
          </div>
          <div className="absolute bottom-3 right-3">
            <div className="bg-black/70 text-white px-2 py-1 rounded text-sm">
              ${accommodation.pricePerNight}/晚
            </div>
          </div>
        </div>

        <CardHeader className="pb-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant="outline">{getTypeName(accommodation.type)}</Badge>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{accommodation.rating}</span>
                <span className="text-sm text-muted-foreground">({accommodation.reviewCount})</span>
              </div>
            </div>
            
            <h3 className="font-semibold text-lg leading-tight">{accommodation.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {accommodation.description}
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Location */}
          <div className="flex items-center space-x-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{accommodation.location}</span>
          </div>

          {/* Room Types */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm">房型選擇</h4>
            <div className="flex flex-wrap gap-1">
              {accommodation.roomTypes.slice(0, 3).map((roomType, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {roomType}
                </Badge>
              ))}
              {accommodation.roomTypes.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{accommodation.roomTypes.length - 3}
                </Badge>
              )}
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm">設施服務</h4>
            <div className="grid grid-cols-3 gap-2">
              {accommodation.amenities.slice(0, 6).map((amenity, idx) => {
                const AmenityIcon = getAmenityIcon(amenity)
                return (
                  <div key={idx} className="flex items-center space-x-1 text-xs">
                    {AmenityIcon && <AmenityIcon className="h-3 w-3 text-muted-foreground" />}
                    <span className="truncate">{amenity}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Price and Actions */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div>
              <div className="text-2xl font-bold text-primary">
                ${accommodation.pricePerNight}
              </div>
              <div className="text-sm text-muted-foreground">每晚</div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                查看詳情
              </Button>
              <Button size="sm">
                立即預訂
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

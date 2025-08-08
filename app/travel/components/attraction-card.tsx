'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, Clock, MapPin, DollarSign, Camera, Users, Leaf, Utensils } from 'lucide-react'
import { motion } from 'framer-motion'

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

interface AttractionCardProps {
  attraction: Attraction
}

export function AttractionCard({ attraction }: AttractionCardProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'nature':
        return Leaf
      case 'culture':
        return Camera
      case 'food':
        return Utensils
      case 'activity':
        return Users
      default:
        return MapPin
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'nature':
        return 'bg-green-500'
      case 'culture':
        return 'bg-purple-500'
      case 'food':
        return 'bg-orange-500'
      case 'activity':
        return 'bg-blue-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'nature':
        return '自然景觀'
      case 'culture':
        return '文化古蹟'
      case 'food':
        return '美食體驗'
      case 'activity':
        return '休閒活動'
      default:
        return category
    }
  }

  const CategoryIcon = getCategoryIcon(attraction.category)

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
        {/* Image */}
        <div className="relative h-48 bg-muted">
          <img
            src={attraction.images[0] || "/placeholder.svg"}
            alt={attraction.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3">
            <div className={`p-2 rounded-lg ${getCategoryColor(attraction.category)}`}>
              <CategoryIcon className="h-4 w-4 text-white" />
            </div>
          </div>
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-black/50 text-white">
              {attraction.ticketPrice === 0 ? '免費' : `$${attraction.ticketPrice}`}
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant="outline">{getCategoryName(attraction.category)}</Badge>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{attraction.rating}</span>
                <span className="text-sm text-muted-foreground">({attraction.reviewCount})</span>
              </div>
            </div>
            
            <h3 className="font-semibold text-lg leading-tight">{attraction.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {attraction.description}
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{Math.floor(attraction.estimatedTime / 60)}小時</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="truncate">{attraction.location}</span>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="text-sm">
            <span className="font-medium">開放時間：</span>
            <span className="text-muted-foreground">{attraction.openingHours}</span>
          </div>

          {/* Highlights */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm">景點亮點</h4>
            <div className="flex flex-wrap gap-1">
              {attraction.highlights.slice(0, 3).map((highlight, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {highlight}
                </Badge>
              ))}
              {attraction.highlights.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{attraction.highlights.length - 3}
                </Badge>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {attraction.tags.slice(0, 4).map((tag, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Actions */}
          <div className="flex space-x-2 pt-2 border-t">
            <Button variant="outline" className="flex-1">
              查看詳情
            </Button>
            <Button className="flex-1">
              加入行程
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

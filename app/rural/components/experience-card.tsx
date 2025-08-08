'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star, Clock, Users, MapPin, Calendar, Wheat, Palette, UsersIcon, UtensilsCrossed } from 'lucide-react'
import { motion } from 'framer-motion'

interface RuralExperience {
  id: string
  title: string
  category: 'farming' | 'craft' | 'culture' | 'food'
  description: string
  location: string
  duration: number
  price: number
  rating: number
  reviewCount: number
  maxParticipants: number
  difficulty: 'easy' | 'medium' | 'hard'
  images: string[]
  highlights: string[]
  includes: string[]
  schedule: string[]
  host: {
    name: string
    avatar: string
    experience: number
    specialty: string
  }
  availableDates: string[]
  tags: string[]
}

interface ExperienceCardProps {
  experience: RuralExperience
  onBook: () => void
}

export function ExperienceCard({ experience, onBook }: ExperienceCardProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'farming':
        return Wheat
      case 'craft':
        return Palette
      case 'culture':
        return UsersIcon
      case 'food':
        return UtensilsCrossed
      default:
        return Wheat
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'farming':
        return 'bg-green-500'
      case 'craft':
        return 'bg-purple-500'
      case 'culture':
        return 'bg-blue-500'
      case 'food':
        return 'bg-orange-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'farming':
        return '農事體驗'
      case 'craft':
        return '工藝製作'
      case 'culture':
        return '文化導覽'
      case 'food':
        return '料理體驗'
      default:
        return category
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return '簡單'
      case 'medium':
        return '中等'
      case 'hard':
        return '困難'
      default:
        return difficulty
    }
  }

  const CategoryIcon = getCategoryIcon(experience.category)

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
        {/* Image */}
        <div className="relative h-48 bg-muted">
          <img
            src={experience.images[0] || "/placeholder.svg"}
            alt={experience.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3">
            <div className={`p-2 rounded-lg ${getCategoryColor(experience.category)}`}>
              <CategoryIcon className="h-4 w-4 text-white" />
            </div>
          </div>
          <div className="absolute top-3 right-3">
            <Badge className={getDifficultyColor(experience.difficulty)}>
              {getDifficultyText(experience.difficulty)}
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Badge variant="outline">{getCategoryName(experience.category)}</Badge>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{experience.rating}</span>
                <span className="text-sm text-muted-foreground">({experience.reviewCount})</span>
              </div>
            </div>
            
            <h3 className="font-semibold text-lg leading-tight">{experience.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {experience.description}
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{Math.floor(experience.duration / 60)}小時{experience.duration % 60 > 0 ? `${experience.duration % 60}分` : ''}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>最多{experience.maxParticipants}人</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="truncate">{experience.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>{experience.availableDates.length}個日期</span>
            </div>
          </div>

          {/* Highlights */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm">體驗亮點</h4>
            <div className="flex flex-wrap gap-1">
              {experience.highlights.slice(0, 3).map((highlight, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {highlight}
                </Badge>
              ))}
              {experience.highlights.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{experience.highlights.length - 3}
                </Badge>
              )}
            </div>
          </div>

          {/* Host */}
          <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
            <Avatar className="h-10 w-10">
              <AvatarImage src={experience.host.avatar || "/placeholder.svg"} alt={experience.host.name} />
              <AvatarFallback>{experience.host.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm">{experience.host.name}</div>
              <div className="text-xs text-muted-foreground truncate">
                {experience.host.specialty} • {experience.host.experience}年經驗
              </div>
            </div>
          </div>

          {/* Price and Book */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div>
              <div className="text-2xl font-bold text-primary">${experience.price}</div>
              <div className="text-sm text-muted-foreground">每人</div>
            </div>
            <Button onClick={onBook}>
              立即預約
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

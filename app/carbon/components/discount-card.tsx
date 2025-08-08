'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, MapPin, Clock, Users, Percent, DollarSign } from 'lucide-react'
import { motion } from 'framer-motion'

interface Discount {
  id: string
  title: string
  category: 'transport' | 'food' | 'shopping' | 'entertainment' | 'accommodation'
  description: string
  discountType: 'percentage' | 'fixed' | 'buy_one_get_one'
  discountValue: number
  originalPrice?: number
  finalPrice?: number
  merchant: {
    name: string
    location: string
    rating: number
    image: string
  }
  validUntil: string
  usageLimit: number
  usedCount: number
  requirements: string[]
  tags: string[]
  isExclusive: boolean
  isPopular: boolean
}

interface DiscountCardProps {
  discount: Discount
  onUse: (discountId: string) => void
}

export function DiscountCard({ discount, onUse }: DiscountCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'transport':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'food':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
      case 'shopping':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'entertainment':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      case 'accommodation':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getDiscountDisplay = () => {
    switch (discount.discountType) {
      case 'percentage':
        return `${discount.discountValue}% OFF`
      case 'fixed':
        return `$${discount.discountValue} OFF`
      case 'buy_one_get_one':
        return 'Buy 1 Get 1'
      default:
        return `${discount.discountValue}% OFF`
    }
  }

  const isExpiringSoon = () => {
    const daysUntilExpiry = Math.ceil((new Date(discount.validUntil).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    return daysUntilExpiry <= 7 && daysUntilExpiry > 0
  }

  const isLowStock = () => {
    const remaining = discount.usageLimit - discount.usedCount
    return remaining <= 5 && remaining > 0
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="hover:shadow-lg transition-shadow overflow-hidden">
        <CardContent className="p-0">
          {/* Header Image */}
          <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-600">
            <img 
              src={discount.merchant.image || "/placeholder.svg"} 
              alt={discount.merchant.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
            
            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-wrap gap-1">
              {discount.isPopular && (
                <Badge className="bg-orange-500 text-white">
                  <Star className="h-3 w-3 mr-1" />
                  熱門
                </Badge>
              )}
              {discount.isExclusive && (
                <Badge className="bg-purple-500 text-white">
                  居民專屬
                </Badge>
              )}
              {isExpiringSoon() && (
                <Badge variant="destructive">
                  <Clock className="h-3 w-3 mr-1" />
                  即將到期
                </Badge>
              )}
              {isLowStock() && (
                <Badge className="bg-red-500 text-white">
                  名額有限
                </Badge>
              )}
            </div>

            {/* Discount Value */}
            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
              <div className="text-lg font-bold text-primary">
                {getDiscountDisplay()}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            {/* Title and Category */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg line-clamp-1">{discount.title}</h3>
                <Badge className={getCategoryColor(discount.category)}>
                  {discount.category === 'transport' && '交通'}
                  {discount.category === 'food' && '美食'}
                  {discount.category === 'shopping' && '購物'}
                  {discount.category === 'entertainment' && '娛樂'}
                  {discount.category === 'accommodation' && '住宿'}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{discount.description}</p>
            </div>

            {/* Merchant Info */}
            <div className="flex items-center space-x-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{discount.merchant.name}</span>
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 text-yellow-500" />
                <span className="text-xs">{discount.merchant.rating}</span>
              </div>
            </div>

            {/* Price Info */}
            {discount.originalPrice && discount.finalPrice && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground line-through">
                  原價 ${discount.originalPrice}
                </span>
                <span className="text-lg font-bold text-green-600">
                  ${discount.finalPrice}
                </span>
              </div>
            )}

            {/* Usage Info */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Users className="h-3 w-3" />
                <span>已使用 {discount.usedCount}/{discount.usageLimit}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>至 {new Date(discount.validUntil).toLocaleDateString('zh-TW')}</span>
              </div>
            </div>

            {/* Requirements */}
            {discount.requirements.length > 0 && (
              <div className="space-y-1">
                <div className="text-xs font-medium text-muted-foreground">使用條件：</div>
                <div className="flex flex-wrap gap-1">
                  {discount.requirements.map((req, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {req}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {discount.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {discount.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Action Button */}
            <Button 
              onClick={() => onUse(discount.id)}
              className="w-full"
              disabled={discount.usedCount >= discount.usageLimit}
            >
              {discount.usedCount >= discount.usageLimit ? '已售完' : '立即使用'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

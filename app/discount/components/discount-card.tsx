'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Star, MapPin, Clock, Users, Percent, DollarSign, Crown, Flame } from 'lucide-react'
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
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'transport':
        return '🚌'
      case 'food':
        return '🍜'
      case 'shopping':
        return '🛍️'
      case 'entertainment':
        return '🎭'
      case 'accommodation':
        return '🏨'
      default:
        return '💰'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'transport':
        return 'bg-blue-500'
      case 'food':
        return 'bg-orange-500'
      case 'shopping':
        return 'bg-green-500'
      case 'entertainment':
        return 'bg-purple-500'
      case 'accommodation':
        return 'bg-pink-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'transport':
        return '交通運輸'
      case 'food':
        return '美食餐飲'
      case 'shopping':
        return '購物消費'
      case 'entertainment':
        return '休閒娛樂'
      case 'accommodation':
        return '住宿旅遊'
      default:
        return category
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

  const usagePercentage = (discount.usedCount / discount.usageLimit) * 100
  const isNearlyFull = usagePercentage > 80
  const isExpiringSoon = new Date(discount.validUntil).getTime() - new Date().getTime() < 7 * 24 * 60 * 60 * 1000

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden relative">
        {/* Special Badges */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
          {discount.isExclusive && (
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
              <Crown className="h-3 w-3 mr-1" />
              專屬
            </Badge>
          )}
          {discount.isPopular && (
            <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
              <Flame className="h-3 w-3 mr-1" />
              熱門
            </Badge>
          )}
        </div>

        {/* Header */}
        <CardHeader className="pb-3">
          <div className="flex items-start space-x-3">
            <div className="relative">
              <img
                src={discount.merchant.image || "/placeholder.svg"}
                alt={discount.merchant.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="absolute -top-2 -right-2 text-2xl">
                {getCategoryIcon(discount.category)}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <Badge variant="outline">{getCategoryName(discount.category)}</Badge>
                {isExpiringSoon && (
                  <Badge variant="destructive" className="text-xs">
                    即將到期
                  </Badge>
                )}
              </div>
              
              <h3 className="font-semibold text-lg leading-tight mb-1">{discount.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {discount.description}
              </p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Discount Value */}
          <div className="text-center p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
            <div className="text-3xl font-bold text-primary mb-1">
              {getDiscountDisplay()}
            </div>
            {discount.originalPrice && discount.finalPrice && (
              <div className="flex items-center justify-center space-x-2 text-sm">
                <span className="line-through text-muted-foreground">
                  ${discount.originalPrice}
                </span>
                <span className="font-bold text-primary">
                  ${discount.finalPrice}
                </span>
              </div>
            )}
          </div>

          {/* Merchant Info */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="font-medium">{discount.merchant.name}</div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">{discount.merchant.rating}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{discount.merchant.location}</span>
            </div>
          </div>

          {/* Usage Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>使用進度</span>
              <span className={isNearlyFull ? 'text-red-500' : 'text-muted-foreground'}>
                {discount.usedCount}/{discount.usageLimit}
              </span>
            </div>
            <Progress 
              value={usagePercentage} 
              className={`h-2 ${isNearlyFull ? 'bg-red-100' : ''}`}
            />
            {isNearlyFull && (
              <p className="text-xs text-red-500">名額即將額滿！</p>
            )}
          </div>

          {/* Valid Until */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>有效期限：{new Date(discount.validUntil).toLocaleDateString('zh-TW')}</span>
          </div>

          {/* Requirements */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm">使用條件</h4>
            <div className="space-y-1">
              {discount.requirements.map((req, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-xs">
                  <div className="w-1 h-1 bg-primary rounded-full"></div>
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {discount.tags.map((tag, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Action Button */}
          <Button 
            onClick={() => onUse(discount.id)}
            className="w-full"
            disabled={discount.usedCount >= discount.usageLimit}
          >
            {discount.usedCount >= discount.usageLimit ? '已額滿' : '立即使用'}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

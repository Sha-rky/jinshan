'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { MapPin, Search, Navigation, Star, Phone } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

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

interface MerchantMapProps {
  discounts: Discount[]
}

export function MerchantMap({ discounts }: MerchantMapProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMerchant, setSelectedMerchant] = useState<string | null>(null)

  // 提取唯一商家
  const merchants = Array.from(
    new Map(
      discounts.map(discount => [
        discount.merchant.name,
        {
          name: discount.merchant.name,
          location: discount.merchant.location,
          rating: discount.merchant.rating,
          image: discount.merchant.image,
          discounts: discounts.filter(d => d.merchant.name === discount.merchant.name),
          categories: [...new Set(discounts.filter(d => d.merchant.name === discount.merchant.name).map(d => d.category))]
        }
      ])
    ).values()
  )

  const filteredMerchants = merchants.filter(merchant =>
    merchant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    merchant.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
        return '交通'
      case 'food':
        return '美食'
      case 'shopping':
        return '購物'
      case 'entertainment':
        return '娛樂'
      case 'accommodation':
        return '住宿'
      default:
        return category
    }
  }

  return (
    <div className="space-y-6">
      {/* Map Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>優惠商家地圖</span>
            </CardTitle>
            <CardDescription>
              找到附近提供優惠的商家位置
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜尋商家名稱或地點..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Navigation className="h-4 w-4 mr-2" />
                定位
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interactive Map */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>互動地圖</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative bg-muted rounded-lg h-96 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950"></div>
                
                {/* 模擬地圖標記 */}
                {filteredMerchants.slice(0, 8).map((merchant, index) => (
                  <motion.div
                    key={merchant.name}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.1 * index }}
                    className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                      selectedMerchant === merchant.name ? 'z-10 scale-125' : 'z-0'
                    }`}
                    style={{
                      left: `${20 + (index % 4) * 20}%`,
                      top: `${20 + Math.floor(index / 4) * 30}%`
                    }}
                    onClick={() => setSelectedMerchant(
                      selectedMerchant === merchant.name ? null : merchant.name
                    )}
                  >
                    <div className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold ${
                      merchant.categories.length > 1 
                        ? 'bg-gradient-to-r from-blue-500 to-green-500'
                        : getCategoryColor(merchant.categories[0])
                    }`}>
                      {merchant.discounts.length}
                    </div>
                    
                    {selectedMerchant === merchant.name && (
                      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 
                        bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg min-w-48 text-center border">
                        <div className="font-medium text-sm">{merchant.name}</div>
                        <div className="text-xs text-muted-foreground mb-2">{merchant.location}</div>
                        <div className="flex items-center justify-center space-x-1 mb-2">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs">{merchant.rating}</span>
                        </div>
                        <div className="text-xs text-primary font-medium">
                          {merchant.discounts.length} 個優惠
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
                
                <div className="absolute bottom-4 left-4 text-center text-muted-foreground">
                  <MapPin className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">互動式商家地圖</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Merchant List */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>商家列表</CardTitle>
              <CardDescription>
                共 {filteredMerchants.length} 家商家提供優惠
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredMerchants.map((merchant, index) => (
                  <motion.div
                    key={merchant.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedMerchant === merchant.name ? 'ring-2 ring-primary bg-primary/5' : ''
                    }`}
                    onClick={() => setSelectedMerchant(
                      selectedMerchant === merchant.name ? null : merchant.name
                    )}
                  >
                    <div className="flex items-start space-x-3">
                      <img
                        src={merchant.image || "/placeholder.svg"}
                        alt={merchant.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium truncate">{merchant.name}</h3>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{merchant.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate">{merchant.location}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {merchant.categories.map((category) => (
                              <Badge
                                key={category}
                                variant="secondary"
                                className="text-xs"
                              >
                                {getCategoryName(category)}
                              </Badge>
                            ))}
                          </div>
                          <span className="text-sm font-medium text-primary">
                            {merchant.discounts.length} 個優惠
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Selected Merchant Details */}
      {selectedMerchant && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>
                {filteredMerchants.find(m => m.name === selectedMerchant)?.name} 的優惠詳情
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMerchants
                  .find(m => m.name === selectedMerchant)
                  ?.discounts.map((discount, index) => (
                    <motion.div
                      key={discount.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * index }}
                      className="p-4 border rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">
                          {getCategoryName(discount.category)}
                        </Badge>
                        <div className="text-lg font-bold text-primary">
                          {discount.discountType === 'percentage' 
                            ? `${discount.discountValue}% OFF`
                            : `$${discount.discountValue} OFF`
                          }
                        </div>
                      </div>
                      <h4 className="font-medium mb-2">{discount.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        {discount.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          剩餘 {discount.usageLimit - discount.usedCount} 個名額
                        </span>
                        <span>
                          至 {new Date(discount.validUntil).toLocaleDateString('zh-TW')}
                        </span>
                      </div>
                    </motion.div>
                  ))}
              </div>
              
              <div className="flex space-x-2 mt-6">
                <Button className="flex-1">
                  <Navigation className="h-4 w-4 mr-2" />
                  導航前往
                </Button>
                <Button variant="outline" className="flex-1">
                  <Phone className="h-4 w-4 mr-2" />
                  聯絡商家
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

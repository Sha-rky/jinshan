'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Navigation, Phone, Clock, Star } from 'lucide-react'
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

interface MerchantMapProps {
  discounts: Discount[]
}

export function MerchantMap({ discounts }: MerchantMapProps) {
  // Group discounts by merchant
  const merchantGroups = discounts.reduce((acc, discount) => {
    const merchantName = discount.merchant.name
    if (!acc[merchantName]) {
      acc[merchantName] = {
        merchant: discount.merchant,
        discounts: []
      }
    }
    acc[merchantName].discounts.push(discount)
    return acc
  }, {} as Record<string, { merchant: any, discounts: Discount[] }>)

  const merchants = Object.values(merchantGroups)

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
              <span>商家地圖</span>
            </CardTitle>
            <CardDescription>
              查看提供優惠的商家位置和詳細資訊
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Interactive Map Placeholder */}
            <div className="relative h-64 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <MapPin className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="text-muted-foreground">互動式地圖</p>
                  <p className="text-sm text-muted-foreground">顯示 {merchants.length} 個合作商家位置</p>
                </div>
              </div>
              
              {/* Mock Map Pins */}
              <div className="absolute top-4 left-8">
                <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
              </div>
              <div className="absolute top-12 right-12">
                <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
              </div>
              <div className="absolute bottom-8 left-16">
                <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
              </div>
              <div className="absolute bottom-16 right-8">
                <div className="w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Merchant List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>合作商家列表</CardTitle>
            <CardDescription>所有提供優惠的商家詳細資訊</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {merchants.map((merchantGroup, index) => (
                <motion.div
                  key={merchantGroup.merchant.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        {/* Merchant Header */}
                        <div className="flex items-start space-x-4">
                          <img 
                            src={merchantGroup.merchant.image || "/placeholder.svg"} 
                            alt={merchantGroup.merchant.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{merchantGroup.merchant.name}</h3>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              <span>{merchantGroup.merchant.location}</span>
                            </div>
                            <div className="flex items-center space-x-1 mt-1">
                              <Star className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm font-medium">{merchantGroup.merchant.rating}</span>
                              <span className="text-xs text-muted-foreground">評分</span>
                            </div>
                          </div>
                        </div>

                        {/* Available Discounts */}
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">可用優惠 ({merchantGroup.discounts.length})</h4>
                          <div className="space-y-2">
                            {merchantGroup.discounts.map((discount) => (
                              <div 
                                key={discount.id}
                                className="flex items-center justify-between p-2 bg-muted/30 rounded-lg"
                              >
                                <div className="flex-1">
                                  <div className="font-medium text-sm">{discount.title}</div>
                                  <div className="flex items-center space-x-2 mt-1">
                                    <Badge className={getCategoryColor(discount.category)} variant="outline">
                                      {discount.category === 'transport' && '交通'}
                                      {discount.category === 'food' && '美食'}
                                      {discount.category === 'shopping' && '購物'}
                                      {discount.category === 'entertainment' && '娛樂'}
                                      {discount.category === 'accommodation' && '住宿'}
                                    </Badge>
                                    {discount.isPopular && (
                                      <Badge variant="secondary" className="text-xs">
                                        熱門
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="font-bold text-primary">
                                    {discount.discountType === 'percentage' ? 
                                      `${discount.discountValue}% OFF` : 
                                      `$${discount.discountValue} OFF`}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    至 {new Date(discount.validUntil).toLocaleDateString('zh-TW')}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Contact Info */}
                        <div className="border-t pt-3 space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span>聯絡電話</span>
                            </div>
                            <span className="font-medium">02-2498-8888</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>營業時間</span>
                            </div>
                            <span className="font-medium">09:00-21:00</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Navigation className="h-4 w-4 mr-2" />
                            導航
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Phone className="h-4 w-4 mr-2" />
                            撥打
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

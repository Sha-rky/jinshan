'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { DiscountCard } from './components/discount-card'
import { MembershipCard } from './components/membership-card'
import { CouponWallet } from './components/coupon-wallet'
import { MerchantMap } from './components/merchant-map'
import { UsageHistory } from './components/usage-history'
import { CreditCard, Percent, MapPin, Gift, Star, Clock } from 'lucide-react'

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

interface Membership {
  id: string
  level: 'bronze' | 'silver' | 'gold' | 'platinum'
  points: number
  nextLevelPoints: number
  benefits: string[]
  monthlyRides: number
  totalSavings: number
  joinDate: string
}

interface Coupon {
  id: string
  code: string
  title: string
  discountType: 'percentage' | 'fixed'
  discountValue: number
  category: string
  validUntil: string
  isUsed: boolean
  merchant: string
  minSpend?: number
}

interface UsageRecord {
  id: string
  type: 'discount' | 'coupon' | 'membership'
  title: string
  merchant: string
  savedAmount: number
  usedDate: string
  category: string
}

export default function DiscountPage() {
  const [discounts, setDiscounts] = useState<Discount[]>([])
  const [membership, setMembership] = useState<Membership | null>(null)
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [usageHistory, setUsageHistory] = useState<UsageRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'discounts' | 'membership' | 'coupons' | 'map' | 'history'>('discounts')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockDiscounts: Discount[] = [
        {
          id: '1',
          title: '居民專屬公車優惠',
          category: 'transport',
          description: '金山萬里居民搭乘公車享有5折優惠',
          discountType: 'percentage',
          discountValue: 50,
          originalPrice: 45,
          finalPrice: 23,
          merchant: {
            name: '新北市公車',
            location: '金山區各站點',
            rating: 4.2,
            image: '/placeholder.svg?height=100&width=100&text=公車'
          },
          validUntil: '2024-12-31',
          usageLimit: 100,
          usedCount: 23,
          requirements: ['需出示居民證明', '限平日使用'],
          tags: ['居民專屬', '交通', '熱門'],
          isExclusive: true,
          isPopular: true
        },
        {
          id: '2',
          title: '金山老街美食券',
          category: 'food',
          description: '老街指定店家消費滿200元折50元',
          discountType: 'fixed',
          discountValue: 50,
          merchant: {
            name: '金山老街商圈',
            location: '金山老街',
            rating: 4.5,
            image: '/placeholder.svg?height=100&width=100&text=老街'
          },
          validUntil: '2024-06-30',
          usageLimit: 50,
          usedCount: 12,
          requirements: ['消費滿200元', '限指定店家'],
          tags: ['美食', '老街', '限時'],
          isExclusive: false,
          isPopular: true
        },
        {
          id: '3',
          title: 'YouBike前30分鐘免費',
          category: 'transport',
          description: '金山居民使用YouBike前30分鐘完全免費',
          discountType: 'fixed',
          discountValue: 10,
          originalPrice: 10,
          finalPrice: 0,
          merchant: {
            name: 'YouBike',
            location: '金山區各站點',
            rating: 4.3,
            image: '/placeholder.svg?height=100&width=100&text=YouBike'
          },
          validUntil: '2024-12-31',
          usageLimit: 200,
          usedCount: 45,
          requirements: ['需綁定居民身分', '每日限用3次'],
          tags: ['居民專屬', '單車', '環保'],
          isExclusive: true,
          isPopular: false
        },
        {
          id: '4',
          title: '朱銘美術館門票優惠',
          category: 'entertainment',
          description: '居民享有門票7折優惠',
          discountType: 'percentage',
          discountValue: 30,
          originalPrice: 350,
          finalPrice: 245,
          merchant: {
            name: '朱銘美術館',
            location: '金山區西勢湖2號',
            rating: 4.7,
            image: '/placeholder.svg?height=100&width=100&text=美術館'
          },
          validUntil: '2024-12-31',
          usageLimit: 10,
          usedCount: 3,
          requirements: ['需出示居民證明', '不可與其他優惠併用'],
          tags: ['居民專屬', '藝術', '文化'],
          isExclusive: true,
          isPopular: false
        },
        {
          id: '5',
          title: '溫泉會館住宿優惠',
          category: 'accommodation',
          description: '平日住宿享有8折優惠',
          discountType: 'percentage',
          discountValue: 20,
          originalPrice: 3800,
          finalPrice: 3040,
          merchant: {
            name: '金山海景溫泉會館',
            location: '金山區',
            rating: 4.6,
            image: '/placeholder.svg?height=100&width=100&text=溫泉'
          },
          validUntil: '2024-09-30',
          usageLimit: 5,
          usedCount: 1,
          requirements: ['限平日入住', '需提前預約'],
          tags: ['住宿', '溫泉', '限時'],
          isExclusive: false,
          isPopular: true
        },
        {
          id: '6',
          title: '在地商家購物金',
          category: 'shopping',
          description: '消費滿1000元送100元購物金',
          discountType: 'fixed',
          discountValue: 100,
          merchant: {
            name: '金山在地商家聯盟',
            location: '金山區各商家',
            rating: 4.1,
            image: '/placeholder.svg?height=100&width=100&text=商家'
          },
          validUntil: '2024-08-31',
          usageLimit: 20,
          usedCount: 8,
          requirements: ['消費滿1000元', '限聯盟商家'],
          tags: ['購物', '回饋', '聯盟'],
          isExclusive: false,
          isPopular: false
        }
      ]

      const mockMembership: Membership = {
        id: '1',
        level: 'gold',
        points: 2850,
        nextLevelPoints: 5000,
        benefits: [
          '公車乘車5折優惠',
          'YouBike前30分鐘免費',
          '指定商家9折優惠',
          '每月專屬優惠券',
          '生日月雙倍點數'
        ],
        monthlyRides: 28,
        totalSavings: 1240,
        joinDate: '2023-06-15'
      }

      const mockCoupons: Coupon[] = [
        {
          id: '1',
          code: 'TRANSPORT50',
          title: '交通優惠券',
          discountType: 'percentage',
          discountValue: 50,
          category: 'transport',
          validUntil: '2024-03-31',
          isUsed: false,
          merchant: '新北市公車',
          minSpend: 20
        },
        {
          id: '2',
          code: 'FOOD100',
          title: '美食折價券',
          discountType: 'fixed',
          discountValue: 100,
          category: 'food',
          validUntil: '2024-02-29',
          isUsed: false,
          merchant: '金山老街商圈',
          minSpend: 300
        },
        {
          id: '3',
          code: 'MUSEUM30',
          title: '文化體驗券',
          discountType: 'percentage',
          discountValue: 30,
          category: 'entertainment',
          validUntil: '2024-04-15',
          isUsed: true,
          merchant: '朱銘美術館'
        }
      ]

      const mockUsageHistory: UsageRecord[] = [
        {
          id: '1',
          type: 'discount',
          title: '居民專屬公車優惠',
          merchant: '新北市公車',
          savedAmount: 22,
          usedDate: '2024-01-15',
          category: 'transport'
        },
        {
          id: '2',
          type: 'coupon',
          title: '美食折價券',
          merchant: '金山老街商圈',
          savedAmount: 100,
          usedDate: '2024-01-12',
          category: 'food'
        },
        {
          id: '3',
          type: 'membership',
          title: 'YouBike免費騎乘',
          merchant: 'YouBike',
          savedAmount: 10,
          usedDate: '2024-01-10',
          category: 'transport'
        }
      ]
      
      setDiscounts(mockDiscounts)
      setMembership(mockMembership)
      setCoupons(mockCoupons)
      setUsageHistory(mockUsageHistory)
      setLoading(false)
    }

    fetchData()
  }, [])

  const filteredDiscounts = discounts.filter(discount =>
    selectedCategory === 'all' || discount.category === selectedCategory
  )

  const totalDiscounts = discounts.length
  const totalSavings = usageHistory.reduce((sum, record) => sum + record.savedAmount, 0)
  const availableCoupons = coupons.filter(c => !c.isUsed).length
  const membershipLevel = membership?.level || 'bronze'

  const tabs = [
    { id: 'discounts', name: '優惠專區', icon: Percent },
    { id: 'membership', name: '會員專區', icon: CreditCard },
    { id: 'coupons', name: '優惠券包', icon: Gift },
    { id: 'map', name: '商家地圖', icon: MapPin },
    { id: 'history', name: '使用記錄', icon: Clock }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <div className="flex items-center justify-center space-x-2">
          <CreditCard className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">在地優惠專區</h1>
        </div>
        <p className="text-muted-foreground">居民專屬優惠，享受在地生活福利</p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <Card>
          <CardContent className="p-4 text-center">
            <Percent className="h-6 w-6 mx-auto mb-2 text-blue-500" />
            <div className="text-xl font-bold">{totalDiscounts}</div>
            <div className="text-sm text-muted-foreground">可用優惠</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Gift className="h-6 w-6 mx-auto mb-2 text-green-500" />
            <div className="text-xl font-bold">{availableCoupons}</div>
            <div className="text-sm text-muted-foreground">優惠券</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
            <div className="text-xl font-bold capitalize">{membershipLevel}</div>
            <div className="text-sm text-muted-foreground">會員等級</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CreditCard className="h-6 w-6 mx-auto mb-2 text-orange-500" />
            <div className="text-xl font-bold">${totalSavings}</div>
            <div className="text-sm text-muted-foreground">累計節省</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => {
                const TabIcon = tab.icon
                return (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "outline"}
                    onClick={() => setActiveTab(tab.id as any)}
                    className="flex items-center space-x-2"
                  >
                    <TabIcon className="h-4 w-4" />
                    <span>{tab.name}</span>
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {activeTab === 'discounts' && (
          <div className="space-y-6">
            {/* Category Filter */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'all', name: '全部優惠' },
                    { id: 'transport', name: '交通運輸' },
                    { id: 'food', name: '美食餐飲' },
                    { id: 'shopping', name: '購物消費' },
                    { id: 'entertainment', name: '休閒娛樂' },
                    { id: 'accommodation', name: '住宿旅遊' }
                  ].map((category) => (
                    <Badge
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Discounts Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <Skeleton className="h-32 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDiscounts.map((discount, index) => (
                  <motion.div
                    key={discount.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <DiscountCard 
                      discount={discount}
                      onUse={(discountId) => {
                        // Handle discount usage
                        console.log('Using discount:', discountId)
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'membership' && membership && (
          <MembershipCard 
            membership={membership}
            onUpgrade={() => console.log('Upgrade membership')}
          />
        )}

        {activeTab === 'coupons' && (
          <CouponWallet 
            coupons={coupons}
            onUseCoupon={(couponId) => {
              setCoupons(prev => 
                prev.map(c => c.id === couponId ? { ...c, isUsed: true } : c)
              )
            }}
          />
        )}

        {activeTab === 'map' && (
          <MerchantMap discounts={discounts} />
        )}

        {activeTab === 'history' && (
          <UsageHistory records={usageHistory} />
        )}
      </motion.div>
    </div>
  )
}

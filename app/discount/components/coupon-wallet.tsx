'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Gift, Clock, Check, Percent, DollarSign, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

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

interface CouponWalletProps {
  coupons: Coupon[]
  onUseCoupon: (couponId: string) => void
}

export function CouponWallet({ coupons, onUseCoupon }: CouponWalletProps) {
  const availableCoupons = coupons.filter(c => !c.isUsed)
  const usedCoupons = coupons.filter(c => c.isUsed)
  const expiringSoon = availableCoupons.filter(c => {
    const daysUntilExpiry = Math.ceil((new Date(c.validUntil).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    return daysUntilExpiry <= 7 && daysUntilExpiry > 0
  })

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'transport':
        return 'bg-blue-500'
      case 'food':
        return 'bg-orange-500'
      case 'shopping':
        return 'bg-green-500'
      case 'entertainment':
        return 'bg-purple-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getDiscountDisplay = (coupon: Coupon) => {
    return coupon.discountType === 'percentage' 
      ? `${coupon.discountValue}% OFF`
      : `$${coupon.discountValue} OFF`
  }

  const isExpiringSoon = (validUntil: string) => {
    const daysUntilExpiry = Math.ceil((new Date(validUntil).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    return daysUntilExpiry <= 7 && daysUntilExpiry > 0
  }

  const CouponCard = ({ coupon, showUseButton = true }: { coupon: Coupon, showUseButton?: boolean }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className={`hover:shadow-md transition-shadow ${coupon.isUsed ? 'opacity-60' : ''}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${getCategoryColor(coupon.category)}`}></div>
              <Badge variant="outline">{coupon.category}</Badge>
              {isExpiringSoon(coupon.validUntil) && !coupon.isUsed && (
                <Badge variant="destructive" className="text-xs">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  即將到期
                </Badge>
              )}
              {coupon.isUsed && (
                <Badge variant="secondary" className="text-xs">
                  <Check className="h-3 w-3 mr-1" />
                  已使用
                </Badge>
              )}
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-primary">
                {getDiscountDisplay(coupon)}
              </div>
            </div>
          </div>

          <h3 className="font-semibold mb-2">{coupon.title}</h3>
          
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>適用商家</span>
              <span className="font-medium">{coupon.merchant}</span>
            </div>
            
            {coupon.minSpend && (
              <div className="flex items-center justify-between">
                <span>最低消費</span>
                <span className="font-medium">${coupon.minSpend}</span>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <span>優惠代碼</span>
              <code className="bg-muted px-2 py-1 rounded text-xs font-mono">
                {coupon.code}
              </code>
            </div>
            
            <div className="flex items-center justify-between">
              <span>有效期限</span>
              <span className="font-medium">
                {new Date(coupon.validUntil).toLocaleDateString('zh-TW')}
              </span>
            </div>
          </div>

          {showUseButton && !coupon.isUsed && (
            <Button 
              onClick={() => onUseCoupon(coupon.id)}
              className="w-full mt-4"
              variant={isExpiringSoon(coupon.validUntil) ? "destructive" : "default"}
            >
              {isExpiringSoon(coupon.validUntil) ? '即將到期 - 立即使用' : '立即使用'}
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <div className="space-y-6">
      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Gift className="h-5 w-5" />
              <span>優惠券錢包</span>
            </CardTitle>
            <CardDescription>管理您的所有優惠券</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Gift className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold">{availableCoupons.length}</div>
                <div className="text-sm text-muted-foreground">可用優惠券</div>
              </div>
              <div className="text-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                <Clock className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                <div className="text-2xl font-bold">{expiringSoon.length}</div>
                <div className="text-sm text-muted-foreground">即將到期</div>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Check className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold">{usedCoupons.length}</div>
                <div className="text-sm text-muted-foreground">已使用</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Expiring Soon Alert */}
      {expiringSoon.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-orange-200 bg-orange-50 dark:bg-orange-900/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-orange-700 dark:text-orange-300">
                <AlertCircle className="h-5 w-5" />
                <span>即將到期提醒</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {expiringSoon.map((coupon) => (
                  <CouponCard key={coupon.id} coupon={coupon} />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Coupon Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs defaultValue="available" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="available">
              可用優惠券 ({availableCoupons.length})
            </TabsTrigger>
            <TabsTrigger value="used">
              已使用 ({usedCoupons.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="available" className="space-y-4">
            {availableCoupons.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Gift className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">暫無可用優惠券</h3>
                  <p className="text-muted-foreground">完成更多活動來獲得優惠券吧！</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableCoupons.map((coupon, index) => (
                  <motion.div
                    key={coupon.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <CouponCard coupon={coupon} />
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="used" className="space-y-4">
            {usedCoupons.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Check className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">暫無使用記錄</h3>
                  <p className="text-muted-foreground">開始使用優惠券來享受折扣吧！</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {usedCoupons.map((coupon, index) => (
                  <motion.div
                    key={coupon.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <CouponCard coupon={coupon} showUseButton={false} />
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

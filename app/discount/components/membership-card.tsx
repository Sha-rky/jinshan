'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Crown, Star, Gift, TrendingUp, Calendar, Award } from 'lucide-react'
import { motion } from 'framer-motion'

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

interface MembershipCardProps {
  membership: Membership
  onUpgrade: () => void
}

export function MembershipCard({ membership, onUpgrade }: MembershipCardProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'bronze':
        return 'from-amber-600 to-amber-800'
      case 'silver':
        return 'from-gray-400 to-gray-600'
      case 'gold':
        return 'from-yellow-400 to-yellow-600'
      case 'platinum':
        return 'from-purple-400 to-purple-600'
      default:
        return 'from-gray-400 to-gray-600'
    }
  }

  const getLevelName = (level: string) => {
    switch (level) {
      case 'bronze':
        return '銅牌會員'
      case 'silver':
        return '銀牌會員'
      case 'gold':
        return '金牌會員'
      case 'platinum':
        return '白金會員'
      default:
        return '會員'
    }
  }

  const getNextLevelName = (level: string) => {
    switch (level) {
      case 'bronze':
        return '銀牌會員'
      case 'silver':
        return '金牌會員'
      case 'gold':
        return '白金會員'
      case 'platinum':
        return '鑽石會員'
      default:
        return '下一等級'
    }
  }

  const progressToNext = (membership.points / membership.nextLevelPoints) * 100
  const pointsNeeded = membership.nextLevelPoints - membership.points

  return (
    <div className="space-y-6">
      {/* Membership Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="overflow-hidden">
          <div className={`bg-gradient-to-r ${getLevelColor(membership.level)} p-6 text-white`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Crown className="h-8 w-8" />
                <div>
                  <h2 className="text-2xl font-bold">{getLevelName(membership.level)}</h2>
                  <p className="opacity-90">金山智慧交通會員</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{membership.points}</div>
                <div className="text-sm opacity-90">累積點數</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>升級至{getNextLevelName(membership.level)}</span>
                <span>{pointsNeeded} 點</span>
              </div>
              <div className="bg-white/20 rounded-full h-2">
                <div 
                  className="bg-white rounded-full h-2 transition-all duration-500"
                  style={{ width: `${Math.min(progressToNext, 100)}%` }}
                />
              </div>
            </div>
          </div>
          
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <div className="text-2xl font-bold">{membership.monthlyRides}</div>
                <div className="text-sm text-muted-foreground">本月搭乘</div>
              </div>
              <div className="text-center">
                <Gift className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <div className="text-2xl font-bold">${membership.totalSavings}</div>
                <div className="text-sm text-muted-foreground">累計節省</div>
              </div>
              <div className="text-center">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                <div className="text-2xl font-bold">
                  {Math.floor((new Date().getTime() - new Date(membership.joinDate).getTime()) / (1000 * 60 * 60 * 24 * 30))}
                </div>
                <div className="text-sm text-muted-foreground">加入月數</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span>會員專屬權益</span>
            </CardTitle>
            <CardDescription>
              享受{getLevelName(membership.level)}的所有專屬優惠
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {membership.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg"
                >
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span>{benefit}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Level Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>會員等級比較</CardTitle>
            <CardDescription>了解各等級會員的專屬權益</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">權益項目</th>
                    <th className="text-center p-2">銅牌</th>
                    <th className="text-center p-2">銀牌</th>
                    <th className="text-center p-2 bg-yellow-50 dark:bg-yellow-900/20">金牌</th>
                    <th className="text-center p-2">白金</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2">公車優惠</td>
                    <td className="text-center p-2">9折</td>
                    <td className="text-center p-2">8折</td>
                    <td className="text-center p-2 bg-yellow-50 dark:bg-yellow-900/20 font-bold">5折</td>
                    <td className="text-center p-2">3折</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">YouBike免費時間</td>
                    <td className="text-center p-2">15分鐘</td>
                    <td className="text-center p-2">20分鐘</td>
                    <td className="text-center p-2 bg-yellow-50 dark:bg-yellow-900/20 font-bold">30分鐘</td>
                    <td className="text-center p-2">60分鐘</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">商家優惠</td>
                    <td className="text-center p-2">95折</td>
                    <td className="text-center p-2">9折</td>
                    <td className="text-center p-2 bg-yellow-50 dark:bg-yellow-900/20 font-bold">9折</td>
                    <td className="text-center p-2">85折</td>
                  </tr>
                  <tr>
                    <td className="p-2">專屬優惠券</td>
                    <td className="text-center p-2">-</td>
                    <td className="text-center p-2">季度</td>
                    <td className="text-center p-2 bg-yellow-50 dark:bg-yellow-900/20 font-bold">每月</td>
                    <td className="text-center p-2">每週</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 text-center">
              <Button onClick={onUpgrade} size="lg">
                <Crown className="h-4 w-4 mr-2" />
                升級會員等級
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

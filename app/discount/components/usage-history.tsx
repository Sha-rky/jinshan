'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, DollarSign, TrendingUp, Award } from 'lucide-react'
import { motion } from 'framer-motion'

interface UsageRecord {
  id: string
  type: 'discount' | 'coupon' | 'membership'
  title: string
  merchant: string
  savedAmount: number
  usedDate: string
  category: string
}

interface UsageHistoryProps {
  records: UsageRecord[]
}

export function UsageHistory({ records }: UsageHistoryProps) {
  const totalSavings = records.reduce((sum, record) => sum + record.savedAmount, 0)
  const thisMonthSavings = records
    .filter(record => {
      const recordDate = new Date(record.usedDate)
      const now = new Date()
      return recordDate.getMonth() === now.getMonth() && recordDate.getFullYear() === now.getFullYear()
    })
    .reduce((sum, record) => sum + record.savedAmount, 0)

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'discount':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'coupon':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'membership':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getTypeName = (type: string) => {
    switch (type) {
      case 'discount':
        return '優惠折扣'
      case 'coupon':
        return '優惠券'
      case 'membership':
        return '會員權益'
      default:
        return type
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'transport':
        return 'text-blue-600'
      case 'food':
        return 'text-orange-600'
      case 'shopping':
        return 'text-green-600'
      case 'entertainment':
        return 'text-purple-600'
      case 'accommodation':
        return 'text-pink-600'
      default:
        return 'text-gray-600'
    }
  }

  // 按月份分組記錄
  const recordsByMonth = records.reduce((acc, record) => {
    const date = new Date(record.usedDate)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    if (!acc[monthKey]) {
      acc[monthKey] = []
    }
    acc[monthKey].push(record)
    return acc
  }, {} as Record<string, UsageRecord[]>)

  const sortedMonths = Object.keys(recordsByMonth).sort().reverse()

  if (records.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>使用記錄</CardTitle>
          <CardDescription>您的優惠使用歷史記錄</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8">
          <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">暫無使用記錄</h3>
          <p className="text-muted-foreground">開始使用優惠來享受折扣吧！</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span>節省統計</span>
            </CardTitle>
            <CardDescription>您的優惠使用成果</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-500" />
                <div className="text-3xl font-bold text-green-600">${totalSavings}</div>
                <div className="text-sm text-muted-foreground">累計節省</div>
              </div>
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                <div className="text-3xl font-bold text-blue-600">${thisMonthSavings}</div>
                <div className="text-sm text-muted-foreground">本月節省</div>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <Calendar className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                <div className="text-3xl font-bold text-purple-600">{records.length}</div>
                <div className="text-sm text-muted-foreground">使用次數</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Usage History by Month */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>使用記錄</CardTitle>
            <CardDescription>按時間順序查看您的優惠使用歷史</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {sortedMonths.map((monthKey, monthIndex) => {
                const monthRecords = recordsByMonth[monthKey]
                const monthSavings = monthRecords.reduce((sum, record) => sum + record.savedAmount, 0)
                const [year, month] = monthKey.split('-')
                const monthName = new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('zh-TW', { 
                  year: 'numeric', 
                  month: 'long' 
                })

                return (
                  <motion.div
                    key={monthKey}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * monthIndex }}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between pb-2 border-b">
                      <h3 className="font-semibold text-lg">{monthName}</h3>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">${monthSavings}</div>
                        <div className="text-sm text-muted-foreground">{monthRecords.length} 次使用</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {monthRecords
                        .sort((a, b) => new Date(b.usedDate).getTime() - new Date(a.usedDate).getTime())
                        .map((record, recordIndex) => (
                          <motion.div
                            key={record.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 * recordIndex }}
                            className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center space-x-4">
                              <div className="flex flex-col items-center">
                                <Badge className={getTypeColor(record.type)}>
                                  {getTypeName(record.type)}
                                </Badge>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {new Date(record.usedDate).toLocaleDateString('zh-TW', {
                                    month: 'short',
                                    day: 'numeric'
                                  })}
                                </div>
                              </div>
                              
                              <div className="flex-1">
                                <h4 className="font-medium">{record.title}</h4>
                                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                  <span>{record.merchant}</span>
                                  <span>•</span>
                                  <span className={getCategoryColor(record.category)}>
                                    {record.category === 'transport' && '交通'}
                                    {record.category === 'food' && '美食'}
                                    {record.category === 'shopping' && '購物'}
                                    {record.category === 'entertainment' && '娛樂'}
                                    {record.category === 'accommodation' && '住宿'}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="text-lg font-bold text-green-600">
                                -${record.savedAmount}
                              </div>
                              <div className="text-xs text-muted-foreground">節省金額</div>
                            </div>
                          </motion.div>
                        ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

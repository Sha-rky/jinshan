'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calculator, Clock, MapPin, DollarSign } from 'lucide-react'

interface FareEstimatorProps {
  pickup: string
  destination: string
  onFareCalculated: (fare: number) => void
}

export function FareEstimator({ pickup, destination, onFareCalculated }: FareEstimatorProps) {
  const [estimatedDistance, setEstimatedDistance] = useState(0)
  const [estimatedTime, setEstimatedTime] = useState(0)
  const [baseFare, setBaseFare] = useState(85)
  const [totalFare, setTotalFare] = useState(0)
  const [calculating, setCalculating] = useState(false)

  useEffect(() => {
    if (pickup && destination) {
      calculateFare()
    }
  }, [pickup, destination])

  const calculateFare = async () => {
    setCalculating(true)
    
    // 模擬計算延遲
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 模擬距離計算（基於地點名稱簡單估算）
    const mockDistances: { [key: string]: number } = {
      '金山區公所-淡水老街': 25,
      '金山區公所-基隆廟口': 18,
      '金山區公所-野柳地質公園': 8,
      '金山老街-朱銘美術館': 5,
      '金山老街-金山海水浴場': 3,
    }
    
    const routeKey = `${pickup}-${destination}`
    const reverseRouteKey = `${destination}-${pickup}`
    
    let distance = mockDistances[routeKey] || mockDistances[reverseRouteKey] || 
                  Math.floor(Math.random() * 20) + 5
    
    let time = Math.ceil(distance * 2.5) // 假設平均時速 24km/h
    let fare = baseFare + (distance * 20) // 起跳價 + 每公里 20 元
    
    setEstimatedDistance(distance)
    setEstimatedTime(time)
    setTotalFare(fare)
    onFareCalculated(fare)
    setCalculating(false)
  }

  const fareBreakdown = [
    { label: '起跳價', amount: baseFare },
    { label: `里程費 (${estimatedDistance}km × $20)`, amount: estimatedDistance * 20 },
    { label: '總計', amount: totalFare, isTotal: true }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calculator className="h-5 w-5" />
          <span>費用估算</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!destination ? (
          <div className="text-center py-8 text-muted-foreground">
            <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>請先設定目的地以估算費用</p>
          </div>
        ) : calculating ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">計算中...</p>
          </div>
        ) : (
          <>
            {/* 路線資訊 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <MapPin className="h-6 w-6 mx-auto mb-2 text-blue-500" />
                <div className="text-sm text-muted-foreground">距離</div>
                <div className="text-xl font-bold">{estimatedDistance} km</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <Clock className="h-6 w-6 mx-auto mb-2 text-green-500" />
                <div className="text-sm text-muted-foreground">預估時間</div>
                <div className="text-xl font-bold">{estimatedTime} 分鐘</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <DollarSign className="h-6 w-6 mx-auto mb-2 text-orange-500" />
                <div className="text-sm text-muted-foreground">預估費用</div>
                <div className="text-xl font-bold text-primary">${totalFare}</div>
              </div>
            </div>

            {/* 費用明細 */}
            <div className="space-y-3">
              <h4 className="font-medium">費用明細</h4>
              <div className="space-y-2">
                {fareBreakdown.map((item, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center py-2 ${
                      item.isTotal ? 'border-t pt-3 font-semibold text-lg' : ''
                    }`}
                  >
                    <span className={item.isTotal ? 'text-primary' : 'text-muted-foreground'}>
                      {item.label}
                    </span>
                    <span className={item.isTotal ? 'text-primary' : ''}>
                      ${item.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 費用說明 */}
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <h5 className="font-medium text-sm">費用說明</h5>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• 起跳價：前 1.5 公里 $85</p>
                <p>• 里程費：每公里 $20</p>
                <p>• 夜間加成：23:00-06:00 加收 20%</p>
                <p>• 實際費用以跳錶為準</p>
              </div>
            </div>

            {/* 重新計算按鈕 */}
            <Button 
              variant="outline" 
              onClick={calculateFare}
              className="w-full"
              disabled={calculating}
            >
              <Calculator className="h-4 w-4 mr-2" />
              重新計算
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}

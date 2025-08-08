'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star, Phone, Car, Clock, CheckCircle, XCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface Driver {
  id: string
  name: string
  rating: number
  experience: number
  specialties: string[]
  vehicle: string
  licensePlate: string
  phone: string
  available: boolean
  nextAvailable: string
  photo: string
}

interface DriverCardProps {
  driver: Driver
  isSelected: boolean
  onSelect: () => void
}

export function DriverCard({ driver, isSelected, onSelect }: DriverCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card 
        className={`cursor-pointer hover:shadow-lg transition-all ${
          isSelected ? 'ring-2 ring-primary' : ''
        } ${!driver.available ? 'opacity-75' : ''}`}
        onClick={driver.available ? onSelect : undefined}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={driver.photo || "/placeholder.svg"} alt={driver.name} />
              <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{driver.name}</CardTitle>
                <div className="flex items-center space-x-1">
                  {driver.available ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                  <Badge variant={driver.available ? "default" : "secondary"}>
                    {driver.available ? '可用' : '忙碌'}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{driver.rating}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {driver.experience} 年經驗
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* 專長服務 */}
          <div className="space-y-2">
            <h4 className="font-medium text-sm">專長服務</h4>
            <div className="flex flex-wrap gap-1">
              {driver.specialties.map((specialty, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>

          {/* 車輛資訊 */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Car className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">車輛資訊</span>
            </div>
            <div className="text-sm text-muted-foreground">
              <p>{driver.vehicle}</p>
              <p>車牌：{driver.licensePlate}</p>
            </div>
          </div>

          {/* 可用時間 */}
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">可用時間</span>
            </div>
            <div className="text-sm font-medium text-primary">
              {driver.nextAvailable}
            </div>
          </div>

          {/* 聯絡資訊 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{driver.phone}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                window.open(`tel:${driver.phone}`)
              }}
            >
              <Phone className="h-4 w-4 mr-1" />
              撥打
            </Button>
          </div>

          {/* 選擇按鈕 */}
          <Button 
            className="w-full"
            variant={isSelected ? "default" : "outline"}
            disabled={!driver.available}
          >
            {isSelected ? '已選擇' : driver.available ? '選擇此司機' : '目前不可用'}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}

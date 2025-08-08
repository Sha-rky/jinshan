'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Users, Heart, Stethoscope, ShoppingBag, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface ShuttleService {
  id: string
  type: 'elderly_care' | 'shared_ride' | 'medical' | 'shopping'
  name: string
  description: string
  priceRange: string
  availability: 'available' | 'limited' | 'unavailable'
  features: string[]
}

interface ServiceSelectorProps {
  services: ShuttleService[]
  selectedService: string
  onServiceSelect: (serviceId: string) => void
  loading: boolean
}

export function ServiceSelector({ 
  services, 
  selectedService, 
  onServiceSelect, 
  loading 
}: ServiceSelectorProps) {
  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'elderly_care':
        return Heart
      case 'medical':
        return Stethoscope
      case 'shared_ride':
        return Users
      case 'shopping':
        return ShoppingBag
      default:
        return Users
    }
  }

  const getServiceColor = (type: string) => {
    switch (type) {
      case 'elderly_care':
        return 'bg-pink-500'
      case 'medical':
        return 'bg-red-500'
      case 'shared_ride':
        return 'bg-blue-500'
      case 'shopping':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getAvailabilityIcon = (availability: string) => {
    switch (availability) {
      case 'available':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'limited':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'unavailable':
        return <AlertCircle className="h-4 w-4 text-red-500" />
    }
  }

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'available':
        return '立即可用'
      case 'limited':
        return '名額有限'
      case 'unavailable':
        return '暫不可用'
    }
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'limited':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'unavailable':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">選擇服務類型</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">選擇服務類型</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service, index) => {
          const ServiceIcon = getServiceIcon(service.type)
          const isSelected = selectedService === service.id
          
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className={`cursor-pointer hover:shadow-lg transition-all ${
                  isSelected ? 'ring-2 ring-primary' : ''
                } ${service.availability === 'unavailable' ? 'opacity-60' : ''}`}
                onClick={() => service.availability !== 'unavailable' && onServiceSelect(service.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${getServiceColor(service.type)}`}>
                        <ServiceIcon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          {getAvailabilityIcon(service.availability)}
                          <Badge className={getAvailabilityColor(service.availability)}>
                            {getAvailabilityText(service.availability)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">
                        {service.priceRange}
                      </div>
                      <div className="text-sm text-muted-foreground">預估費用</div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <CardDescription>{service.description}</CardDescription>
                  
                  {/* 服務特色 */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">服務特色</h4>
                    <div className="flex flex-wrap gap-1">
                      {service.features.map((feature, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* 選擇按鈕 */}
                  <Button 
                    className="w-full"
                    variant={isSelected ? "default" : "outline"}
                    disabled={service.availability === 'unavailable'}
                  >
                    {isSelected ? '已選擇' : '選擇此服務'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* 服務說明 */}
      <Card className="bg-muted/50">
        <CardContent className="p-4">
          <h4 className="font-medium mb-2">服務說明</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>• 所有司機均經過專業訓練與背景調查</p>
            <p>• 提供 24 小時客服支援</p>
            <p>• 支援線上支付與現金付款</p>
            <p>• 可提前 24 小時預約或即時叫車</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

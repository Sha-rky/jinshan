'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, MapPin, DollarSign, User, Phone } from 'lucide-react'

interface ShuttleService {
  id: string
  type: 'elderly_care' | 'shared_ride' | 'medical' | 'shopping'
  name: string
  description: string
  priceRange: string
  availability: 'available' | 'limited' | 'unavailable'
  features: string[]
}

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

interface BookingFormProps {
  service: ShuttleService
  driver: Driver
  onSubmit: (bookingData: any) => void
  onCancel: () => void
}

export function BookingForm({ service, driver, onSubmit, onCancel }: BookingFormProps) {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    pickup: '',
    destination: '',
    passengers: '1',
    contactName: '',
    contactPhone: '',
    specialRequests: '',
    estimatedPrice: 200
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const timeSlots = [
    '06:00', '06:30', '07:00', '07:30', '08:00', '08:30',
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'
  ]

  const popularLocations = [
    '金山區公所',
    '金山老街',
    '朱銘美術館',
    '台北榮總',
    '馬偕醫院',
    '基隆長庚',
    '家樂福金山店',
    '全聯金山店'
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const calculatePrice = () => {
    let basePrice = 150
    
    // 根據服務類型調整價格
    switch (service.type) {
      case 'elderly_care':
        basePrice = 250
        break
      case 'medical':
        basePrice = 300
        break
      case 'shared_ride':
        basePrice = 100
        break
      case 'shopping':
        basePrice = 180
        break
    }

    // 根據乘客數量調整
    const passengers = parseInt(formData.passengers)
    if (passengers > 1) {
      basePrice += (passengers - 1) * 50
    }

    setFormData(prev => ({ ...prev, estimatedPrice: basePrice }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.date) newErrors.date = '請選擇日期'
    if (!formData.time) newErrors.time = '請選擇時間'
    if (!formData.pickup) newErrors.pickup = '請輸入上車地點'
    if (!formData.destination) newErrors.destination = '請輸入目的地'
    if (!formData.contactName) newErrors.contactName = '請輸入聯絡人姓名'
    if (!formData.contactPhone) newErrors.contactPhone = '請輸入聯絡電話'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  // 計算價格當表單數據變化時
  React.useEffect(() => {
    calculatePrice()
  }, [formData.passengers, service.type])

  return (
    <Card>
      <CardHeader>
        <CardTitle>預約接駁服務</CardTitle>
        <CardDescription>
          請填寫預約資訊，我們將為您安排最適合的接駁服務
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 服務與司機資訊 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
            <div>
              <Label className="text-sm font-medium">選擇服務</Label>
              <div className="flex items-center space-x-2 mt-1">
                <Badge>{service.name}</Badge>
                <span className="text-sm text-muted-foreground">{service.priceRange}</span>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium">指定司機</Label>
              <div className="flex items-center space-x-2 mt-1">
                <User className="h-4 w-4" />
                <span className="text-sm">{driver.name}</span>
                <Badge variant="outline">{driver.rating}★</Badge>
              </div>
            </div>
          </div>

          {/* 日期時間 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">預約日期 *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="pl-10"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">預約時間 *</Label>
              <Select value={formData.time} onValueChange={(value) => handleInputChange('time', value)}>
                <SelectTrigger>
                  <Clock className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="選擇時間" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.time && <p className="text-sm text-red-500">{errors.time}</p>}
            </div>
          </div>

          {/* 地點資訊 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pickup">上車地點 *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="pickup"
                  value={formData.pickup}
                  onChange={(e) => handleInputChange('pickup', e.target.value)}
                  placeholder="輸入上車地點"
                  className="pl-10"
                />
              </div>
              {errors.pickup && <p className="text-sm text-red-500">{errors.pickup}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination">目的地 *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="destination"
                  value={formData.destination}
                  onChange={(e) => handleInputChange('destination', e.target.value)}
                  placeholder="輸入目的地"
                  className="pl-10"
                />
              </div>
              {errors.destination && <p className="text-sm text-red-500">{errors.destination}</p>}
            </div>
          </div>

          {/* 熱門地點 */}
          <div className="space-y-2">
            <Label className="text-sm">熱門地點</Label>
            <div className="flex flex-wrap gap-2">
              {popularLocations.map((location) => (
                <Badge
                  key={location}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => {
                    if (!formData.pickup) {
                      handleInputChange('pickup', location)
                    } else if (!formData.destination) {
                      handleInputChange('destination', location)
                    }
                  }}
                >
                  {location}
                </Badge>
              ))}
            </div>
          </div>

          {/* 乘客數量 */}
          <div className="space-y-2">
            <Label htmlFor="passengers">乘客人數</Label>
            <Select value={formData.passengers} onValueChange={(value) => handleInputChange('passengers', value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} 人
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 聯絡資訊 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactName">聯絡人姓名 *</Label>
              <Input
                id="contactName"
                value={formData.contactName}
                onChange={(e) => handleInputChange('contactName', e.target.value)}
                placeholder="輸入聯絡人姓名"
              />
              {errors.contactName && <p className="text-sm text-red-500">{errors.contactName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone">聯絡電話 *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="contactPhone"
                  value={formData.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                  placeholder="輸入聯絡電話"
                  className="pl-10"
                />
              </div>
              {errors.contactPhone && <p className="text-sm text-red-500">{errors.contactPhone}</p>}
            </div>
          </div>

          {/* 特殊需求 */}
          <div className="space-y-2">
            <Label htmlFor="specialRequests">特殊需求</Label>
            <Textarea
              id="specialRequests"
              value={formData.specialRequests}
              onChange={(e) => handleInputChange('specialRequests', e.target.value)}
              placeholder="如有輪椅、嬰兒座椅等特殊需求請說明"
              rows={3}
            />
          </div>

          {/* 費用預估 */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <span className="font-medium">預估費用</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">${formData.estimatedPrice}</div>
                <div className="text-sm text-muted-foreground">實際費用以服務完成後為準</div>
              </div>
            </div>
          </div>

          {/* 操作按鈕 */}
          <div className="flex space-x-4">
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              取消
            </Button>
            <Button type="submit" className="flex-1">
              確認預約
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

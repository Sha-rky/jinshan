'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Calendar, Clock, Users, MapPin, DollarSign, Phone, User } from 'lucide-react'

interface RuralExperience {
  id: string
  title: string
  category: 'farming' | 'craft' | 'culture' | 'food'
  description: string
  location: string
  duration: number
  price: number
  rating: number
  reviewCount: number
  maxParticipants: number
  difficulty: 'easy' | 'medium' | 'hard'
  images: string[]
  highlights: string[]
  includes: string[]
  schedule: string[]
  host: {
    name: string
    avatar: string
    experience: number
    specialty: string
  }
  availableDates: string[]
  tags: string[]
}

interface BookingModalProps {
  experience: RuralExperience
  onSubmit: (bookingData: any) => void
  onClose: () => void
}

export function BookingModal({ experience, onSubmit, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState({
    date: '',
    time: '09:00',
    participants: 1,
    contactName: '',
    contactPhone: '',
    specialRequests: '',
    totalPrice: experience.price
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30'
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
    
    // 計算總價
    if (field === 'participants') {
      setFormData(prev => ({ ...prev, totalPrice: experience.price * value }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.date) newErrors.date = '請選擇日期'
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

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>預約體驗活動</DialogTitle>
          <DialogDescription>
            請填寫預約資訊，我們將為您安排最棒的體驗
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Experience Info */}
          <div className="p-4 bg-muted/50 rounded-lg space-y-3">
            <div className="flex items-start space-x-4">
              <img
                src={experience.images[0] || "/placeholder.svg"}
                alt={experience.title}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{experience.title}</h3>
                <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{Math.floor(experience.duration / 60)}小時</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{experience.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>最多{experience.maxParticipants}人</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Host Info */}
            <div className="flex items-center space-x-3 pt-3 border-t">
              <Avatar className="h-10 w-10">
                <AvatarImage src={experience.host.avatar || "/placeholder.svg"} alt={experience.host.name} />
                <AvatarFallback>{experience.host.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{experience.host.name}</div>
                <div className="text-sm text-muted-foreground">
                  {experience.host.specialty} • {experience.host.experience}年經驗
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">選擇日期 *</Label>
                <Select value={formData.date} onValueChange={(value) => handleInputChange('date', value)}>
                  <SelectTrigger>
                    <Calendar className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="選擇日期" />
                  </SelectTrigger>
                  <SelectContent>
                    {experience.availableDates.map((date) => (
                      <SelectItem key={date} value={date}>
                        {new Date(date).toLocaleDateString('zh-TW', {
                          month: 'long',
                          day: 'numeric',
                          weekday: 'short'
                        })}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">選擇時間</Label>
                <Select value={formData.time} onValueChange={(value) => handleInputChange('time', value)}>
                  <SelectTrigger>
                    <Clock className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Participants */}
            <div className="space-y-2">
              <Label htmlFor="participants">參加人數</Label>
              <Select 
                value={formData.participants.toString()} 
                onValueChange={(value) => handleInputChange('participants', parseInt(value))}
              >
                <SelectTrigger className="w-32">
                  <Users className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: experience.maxParticipants }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} 人
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">聯絡人姓名 *</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange('contactName', e.target.value)}
                    placeholder="輸入聯絡人姓名"
                    className="pl-10"
                  />
                </div>
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

            {/* Special Requests */}
            <div className="space-y-2">
              <Label htmlFor="specialRequests">特殊需求</Label>
              <Textarea
                id="specialRequests"
                value={formData.specialRequests}
                onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                placeholder="如有特殊需求或注意事項請說明"
                rows={3}
              />
            </div>

            {/* Experience Details */}
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
              <h4 className="font-medium">體驗包含</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {experience.includes.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Summary */}
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <span className="font-medium">費用總計</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">${formData.totalPrice}</div>
                  <div className="text-sm text-muted-foreground">
                    ${experience.price} × {formData.participants} 人
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex space-x-4 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                取消
              </Button>
              <Button type="submit" className="flex-1">
                確認預約
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

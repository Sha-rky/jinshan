'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Calendar, Users, DollarSign, MapPin, Plus, X } from 'lucide-react'

interface Attraction {
  id: string
  name: string
  category: 'nature' | 'culture' | 'food' | 'activity'
  description: string
  location: string
  rating: number
  reviewCount: number
  estimatedTime: number
  ticketPrice: number
  images: string[]
  highlights: string[]
  openingHours: string
  coordinates: {
    lat: number
    lng: number
  }
  tags: string[]
}

interface Accommodation {
  id: string
  name: string
  type: 'hotel' | 'bnb' | 'resort' | 'hostel'
  description: string
  location: string
  rating: number
  reviewCount: number
  pricePerNight: number
  images: string[]
  amenities: string[]
  roomTypes: string[]
  coordinates: {
    lat: number
    lng: number
  }
}

interface TripPlannerProps {
  attractions: Attraction[]
  accommodations: Accommodation[]
  onTripCreate: (trip: any) => void
}

export function TripPlanner({ attractions, accommodations, onTripCreate }: TripPlannerProps) {
  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    participants: 2,
    budget: 10000,
    selectedAttractions: [] as string[],
    selectedAccommodations: [] as string[],
    transportation: [] as string[],
    notes: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const transportationOptions = [
    '自駕',
    '公車',
    '計程車',
    '機車',
    '腳踏車',
    '步行'
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleAttractionToggle = (attractionId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedAttractions: prev.selectedAttractions.includes(attractionId)
        ? prev.selectedAttractions.filter(id => id !== attractionId)
        : [...prev.selectedAttractions, attractionId]
    }))
  }

  const handleAccommodationToggle = (accommodationId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedAccommodations: prev.selectedAccommodations.includes(accommodationId)
        ? prev.selectedAccommodations.filter(id => id !== accommodationId)
        : [...prev.selectedAccommodations, accommodationId]
    }))
  }

  const handleTransportationToggle = (transport: string) => {
    setFormData(prev => ({
      ...prev,
      transportation: prev.transportation.includes(transport)
        ? prev.transportation.filter(t => t !== transport)
        : [...prev.transportation, transport]
    }))
  }

  const calculateEstimatedCost = () => {
    const attractionCost = formData.selectedAttractions.reduce((sum, id) => {
      const attraction = attractions.find(a => a.id === id)
      return sum + (attraction?.ticketPrice || 0) * formData.participants
    }, 0)

    const accommodationCost = formData.selectedAccommodations.reduce((sum, id) => {
      const accommodation = accommodations.find(a => a.id === id)
      const days = formData.startDate && formData.endDate 
        ? Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24))
        : 1
      return sum + (accommodation?.pricePerNight || 0) * days
    }, 0)

    return attractionCost + accommodationCost
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title) newErrors.title = '請輸入行程標題'
    if (!formData.startDate) newErrors.startDate = '請選擇開始日期'
    if (!formData.endDate) newErrors.endDate = '請選擇結束日期'
    if (formData.selectedAttractions.length === 0) newErrors.attractions = '請至少選擇一個景點'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      const days = Math.ceil((new Date(formData.endDate).getTime() - new Date(formData.startDate).getTime()) / (1000 * 60 * 60 * 24)) + 1
      
      const newTrip = {
        id: Date.now().toString(),
        title: formData.title,
        startDate: formData.startDate,
        endDate: formData.endDate,
        days,
        participants: formData.participants,
        budget: formData.budget,
        status: 'planning' as const,
        attractions: formData.selectedAttractions,
        accommodation: formData.selectedAccommodations,
        transportation: formData.transportation,
        totalCost: calculateEstimatedCost(),
        notes: formData.notes
      }
      
      onTripCreate(newTrip)
      
      // Reset form
      setFormData({
        title: '',
        startDate: '',
        endDate: '',
        participants: 2,
        budget: 10000,
        selectedAttractions: [],
        selectedAccommodations: [],
        transportation: [],
        notes: ''
      })
    }
  }

  const estimatedCost = calculateEstimatedCost()

  return (
    <Card>
      <CardHeader>
        <CardTitle>建立新行程</CardTitle>
        <CardDescription>規劃您的完美旅程，我們來幫您安排</CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">行程標題 *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="輸入行程標題"
              />
              {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="participants">參加人數</Label>
              <Select 
                value={formData.participants.toString()} 
                onValueChange={(value) => handleInputChange('participants', parseInt(value))}
              >
                <SelectTrigger>
                  <Users className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} 人
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">開始日期 *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  className="pl-10"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              {errors.startDate && <p className="text-sm text-red-500">{errors.startDate}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">結束日期 *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  className="pl-10"
                  min={formData.startDate || new Date().toISOString().split('T')[0]}
                />
              </div>
              {errors.endDate && <p className="text-sm text-red-500">{errors.endDate}</p>}
            </div>
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <Label htmlFor="budget">預算</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="budget"
                type="number"
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', parseInt(e.target.value))}
                className="pl-10"
                min="0"
                step="1000"
              />
            </div>
          </div>

          {/* Attractions */}
          <div className="space-y-4">
            <div>
              <Label>選擇景點 *</Label>
              {errors.attractions && <p className="text-sm text-red-500">{errors.attractions}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-60 overflow-y-auto">
              {attractions.map((attraction) => (
                <div key={attraction.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <Checkbox
                    checked={formData.selectedAttractions.includes(attraction.id)}
                    onCheckedChange={() => handleAttractionToggle(attraction.id)}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{attraction.name}</div>
                    <div className="text-xs text-muted-foreground">{attraction.location}</div>
                    <div className="text-xs text-primary">${attraction.ticketPrice}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Accommodations */}
          <div className="space-y-4">
            <Label>選擇住宿 (可選)</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-48 overflow-y-auto">
              {accommodations.map((accommodation) => (
                <div key={accommodation.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <Checkbox
                    checked={formData.selectedAccommodations.includes(accommodation.id)}
                    onCheckedChange={() => handleAccommodationToggle(accommodation.id)}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{accommodation.name}</div>
                    <div className="text-xs text-muted-foreground">{accommodation.location}</div>
                    <div className="text-xs text-primary">${accommodation.pricePerNight}/晚</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Transportation */}
          <div className="space-y-4">
            <Label>交通方式</Label>
            <div className="flex flex-wrap gap-2">
              {transportationOptions.map((transport) => (
                <Badge
                  key={transport}
                  variant={formData.transportation.includes(transport) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => handleTransportationToggle(transport)}
                >
                  {transport}
                </Badge>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">備註</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="特殊需求或注意事項"
              rows={3}
            />
          </div>

          {/* Cost Summary */}
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">預估費用</div>
                <div className="text-sm text-muted-foreground">
                  景點門票 + 住宿費用
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">${estimatedCost}</div>
                <div className="text-sm text-muted-foreground">
                  預算: ${formData.budget}
                </div>
              </div>
            </div>
            {estimatedCost > formData.budget && (
              <div className="mt-2 text-sm text-red-500">
                預估費用超出預算 ${estimatedCost - formData.budget}
              </div>
            )}
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            建立行程
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

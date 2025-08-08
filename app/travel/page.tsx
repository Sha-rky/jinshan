'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { TripPlanner } from './components/trip-planner'
import { AttractionCard } from './components/attraction-card'
import { AccommodationCard } from './components/accommodation-card'
import { MyTrips } from './components/my-trips'
import { RouteOptimizer } from './components/route-optimizer'
import { MapPin, Calendar, Bed, Route, Star, Clock } from 'lucide-react'

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

interface Trip {
  id: string
  title: string
  startDate: string
  endDate: string
  days: number
  participants: number
  budget: number
  status: 'planning' | 'confirmed' | 'completed'
  attractions: string[]
  accommodation: string[]
  transportation: string[]
  totalCost: number
}

export default function TravelPage() {
  const [attractions, setAttractions] = useState<Attraction[]>([])
  const [accommodations, setAccommodations] = useState<Accommodation[]>([])
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'attractions' | 'accommodations' | 'planner' | 'trips'>('attractions')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockAttractions: Attraction[] = [
        {
          id: '1',
          name: '野柳地質公園',
          category: 'nature',
          description: '世界級的地質奇觀，女王頭等奇岩景觀聞名國際',
          location: '新北市萬里區',
          rating: 4.5,
          reviewCount: 2847,
          estimatedTime: 120,
          ticketPrice: 120,
          images: ['/placeholder.svg?height=300&width=400&text=野柳地質公園'],
          highlights: ['女王頭', '仙女鞋', '燭台石', '地質導覽'],
          openingHours: '08:00-17:00',
          coordinates: { lat: 25.2017, lng: 121.6893 },
          tags: ['地質', '攝影', '自然', '親子']
        },
        {
          id: '2',
          name: '朱銘美術館',
          category: 'culture',
          description: '國際知名雕塑家朱銘的作品展示空間，結合藝術與自然',
          location: '新北市金山區',
          rating: 4.7,
          reviewCount: 1523,
          estimatedTime: 180,
          ticketPrice: 350,
          images: ['/placeholder.svg?height=300&width=400&text=朱銘美術館'],
          highlights: ['太極系列', '人間系列', '戶外雕塑', '藝術工坊'],
          openingHours: '10:00-17:00',
          coordinates: { lat: 25.2156, lng: 121.6289 },
          tags: ['藝術', '雕塑', '文化', '教育']
        },
        {
          id: '3',
          name: '金山老街',
          category: 'food',
          description: '百年老街，品嚐道地金山美食與傳統小吃',
          location: '新北市金山區',
          rating: 4.3,
          reviewCount: 3241,
          estimatedTime: 90,
          ticketPrice: 0,
          images: ['/placeholder.svg?height=300&width=400&text=金山老街'],
          highlights: ['鴨肉', '芋餅', '紅心地瓜', '傳統糕點'],
          openingHours: '09:00-21:00',
          coordinates: { lat: 25.2298, lng: 121.6385 },
          tags: ['美食', '老街', '傳統', '購物']
        },
        {
          id: '4',
          name: '金山海水浴場',
          category: 'activity',
          description: '北海岸知名海水浴場，夏日戲水的絕佳去處',
          location: '新北市金山區',
          rating: 4.1,
          reviewCount: 1876,
          estimatedTime: 240,
          ticketPrice: 100,
          images: ['/placeholder.svg?height=300&width=400&text=金山海水浴場'],
          highlights: ['海水浴場', '沙灘活動', '水上運動', '日落美景'],
          openingHours: '08:00-18:00',
          coordinates: { lat: 25.2198, lng: 121.6445 },
          tags: ['海灘', '戲水', '運動', '夏季']
        },
        {
          id: '5',
          name: '石門洞',
          category: 'nature',
          description: '天然海蝕洞穴，北海岸著名地標景點',
          location: '新北市石門區',
          rating: 4.2,
          reviewCount: 987,
          estimatedTime: 60,
          ticketPrice: 0,
          images: ['/placeholder.svg?height=300&width=400&text=石門洞'],
          highlights: ['海蝕洞', '海岸步道', '攝影勝地', '地質景觀'],
          openingHours: '全天開放',
          coordinates: { lat: 25.2951, lng: 121.5684 },
          tags: ['地質', '海岸', '免費', '攝影']
        },
        {
          id: '6',
          name: '富貴角燈塔',
          category: 'culture',
          description: '台灣最北端的燈塔，黑白相間的八角形建築',
          location: '新北市石門區',
          rating: 4.4,
          reviewCount: 1234,
          estimatedTime: 90,
          ticketPrice: 0,
          images: ['/placeholder.svg?height=300&width=400&text=富貴角燈塔'],
          highlights: ['最北燈塔', '八角建築', '海岸步道', '風稜石'],
          openingHours: '09:00-17:00',
          coordinates: { lat: 25.2975, lng: 121.5369 },
          tags: ['燈塔', '歷史', '海岸', '步道']
        }
      ]

      const mockAccommodations: Accommodation[] = [
        {
          id: '1',
          name: '金山海景溫泉會館',
          type: 'resort',
          description: '面海溫泉度假村，享受海景與溫泉的雙重療癒',
          location: '新北市金山區',
          rating: 4.6,
          reviewCount: 456,
          pricePerNight: 3800,
          images: ['/placeholder.svg?height=300&width=400&text=海景溫泉會館'],
          amenities: ['溫泉', '海景', '餐廳', '停車場', 'WiFi', '健身房'],
          roomTypes: ['海景雙人房', '溫泉套房', '家庭房'],
          coordinates: { lat: 25.2245, lng: 121.6412 }
        },
        {
          id: '2',
          name: '金山青年活動中心',
          type: 'hostel',
          description: '經濟實惠的住宿選擇，適合團體旅遊',
          location: '新北市金山區',
          rating: 4.1,
          reviewCount: 234,
          pricePerNight: 1200,
          images: ['/placeholder.svg?height=300&width=400&text=青年活動中心'],
          amenities: ['餐廳', '會議室', '停車場', 'WiFi', '活動空間'],
          roomTypes: ['雙人房', '四人房', '團體房'],
          coordinates: { lat: 25.2245, lng: 121.6412 }
        },
        {
          id: '3',
          name: '野柳民宿',
          type: 'bnb',
          description: '溫馨家庭式民宿，體驗在地生活文化',
          location: '新北市萬里區',
          rating: 4.4,
          reviewCount: 189,
          pricePerNight: 2200,
          images: ['/placeholder.svg?height=300&width=400&text=野柳民宿'],
          amenities: ['早餐', '停車場', 'WiFi', '腳踏車租借', '在地導覽'],
          roomTypes: ['雙人房', '三人房', '包棟'],
          coordinates: { lat: 25.2017, lng: 121.6893 }
        },
        {
          id: '4',
          name: '石門海景飯店',
          type: 'hotel',
          description: '現代化海景飯店，設施完善服務優質',
          location: '新北市石門區',
          rating: 4.3,
          reviewCount: 567,
          pricePerNight: 2800,
          images: ['/placeholder.svg?height=300&width=400&text=石門海景飯店'],
          amenities: ['海景', '餐廳', '會議室', '停車場', 'WiFi', '商務中心'],
          roomTypes: ['標準雙人房', '海景房', '商務套房'],
          coordinates: { lat: 25.2951, lng: 121.5684 }
        }
      ]

      const mockTrips: Trip[] = [
        {
          id: '1',
          title: '北海岸二日遊',
          startDate: '2024-01-20',
          endDate: '2024-01-21',
          days: 2,
          participants: 4,
          budget: 15000,
          status: 'planning',
          attractions: ['1', '2', '3'],
          accommodation: ['1'],
          transportation: ['公車', '步行'],
          totalCost: 12800
        },
        {
          id: '2',
          title: '金山文化之旅',
          startDate: '2024-01-15',
          endDate: '2024-01-15',
          days: 1,
          participants: 2,
          budget: 3000,
          status: 'completed',
          attractions: ['2', '3'],
          accommodation: [],
          transportation: ['計程車'],
          totalCost: 2400
        }
      ]
      
      setAttractions(mockAttractions)
      setAccommodations(mockAccommodations)
      setTrips(mockTrips)
      setLoading(false)
    }

    fetchData()
  }, [])

  const filteredAttractions = attractions.filter(attraction =>
    selectedCategory === 'all' || attraction.category === selectedCategory
  )

  const totalAttractions = attractions.length
  const avgRating = attractions.reduce((sum, attr) => sum + attr.rating, 0) / attractions.length
  const totalTrips = trips.length
  const completedTrips = trips.filter(t => t.status === 'completed').length

  const tabs = [
    { id: 'attractions', name: '景點探索', icon: MapPin },
    { id: 'accommodations', name: '住宿推薦', icon: Bed },
    { id: 'planner', name: '行程規劃', icon: Calendar },
    { id: 'trips', name: '我的行程', icon: Route }
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
          <MapPin className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">旅遊行程規劃</h1>
        </div>
        <p className="text-muted-foreground">探索金山萬里，規劃完美旅程</p>
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
            <MapPin className="h-6 w-6 mx-auto mb-2 text-blue-500" />
            <div className="text-xl font-bold">{totalAttractions}</div>
            <div className="text-sm text-muted-foreground">推薦景點</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
            <div className="text-xl font-bold">{avgRating.toFixed(1)}</div>
            <div className="text-sm text-muted-foreground">平均評分</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-6 w-6 mx-auto mb-2 text-green-500" />
            <div className="text-xl font-bold">{totalTrips}</div>
            <div className="text-sm text-muted-foreground">規劃行程</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-6 w-6 mx-auto mb-2 text-orange-500" />
            <div className="text-xl font-bold">{completedTrips}</div>
            <div className="text-sm text-muted-foreground">完成旅程</div>
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
        {activeTab === 'attractions' && (
          <div className="space-y-6">
            {/* Category Filter */}
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'all', name: '全部景點' },
                    { id: 'nature', name: '自然景觀' },
                    { id: 'culture', name: '文化古蹟' },
                    { id: 'food', name: '美食體驗' },
                    { id: 'activity', name: '休閒活動' }
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

            {/* Attractions Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <Skeleton className="h-48 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAttractions.map((attraction, index) => (
                  <motion.div
                    key={attraction.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <AttractionCard attraction={attraction} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'accommodations' && (
          <div className="space-y-6">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <Skeleton className="h-48 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {accommodations.map((accommodation, index) => (
                  <motion.div
                    key={accommodation.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <AccommodationCard accommodation={accommodation} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'planner' && (
          <div className="space-y-6">
            <TripPlanner 
              attractions={attractions}
              accommodations={accommodations}
              onTripCreate={(trip) => setTrips(prev => [trip, ...prev])}
            />
            <RouteOptimizer attractions={attractions} />
          </div>
        )}

        {activeTab === 'trips' && (
          <MyTrips 
            trips={trips}
            attractions={attractions}
            accommodations={accommodations}
          />
        )}
      </motion.div>
    </div>
  )
}

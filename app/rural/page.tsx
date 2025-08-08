'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { ExperienceFilter } from './components/experience-filter'
import { ExperienceCard } from './components/experience-card'
import { BookingModal } from './components/booking-modal'
import { MyBookings } from './components/my-bookings'
import { Wheat, Palette, Calendar, Users, Star, MapPin } from 'lucide-react'

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

interface Booking {
  id: string
  experienceId: string
  experienceTitle: string
  date: string
  time: string
  participants: number
  totalPrice: number
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled'
  hostName: string
}

export default function RuralPage() {
  const [experiences, setExperiences] = useState<RuralExperience[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedExperience, setSelectedExperience] = useState<RuralExperience | null>(null)
  const [showBookingModal, setShowBookingModal] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockExperiences: RuralExperience[] = [
        {
          id: '1',
          title: '有機農場體驗 - 季節蔬菜種植',
          category: 'farming',
          description: '親手體驗有機農法，從播種到收成，學習永續農業的精神',
          location: '金山有機農場',
          duration: 240,
          price: 800,
          rating: 4.8,
          reviewCount: 156,
          maxParticipants: 12,
          difficulty: 'easy',
          images: ['/placeholder.svg?height=300&width=400&text=有機農場'],
          highlights: ['親手種植蔬菜', '學習有機農法', '品嚐新鮮蔬果', '農場導覽'],
          includes: ['專業指導', '農具使用', '午餐', '農產品伴手禮'],
          schedule: [
            '09:00 - 農場集合與介紹',
            '09:30 - 有機農法講解',
            '10:00 - 實際種植體驗',
            '12:00 - 農場午餐',
            '13:00 - 收成體驗',
            '13:30 - 結束與伴手禮'
          ],
          host: {
            name: '陳農夫',
            avatar: '/placeholder-user.jpg',
            experience: 15,
            specialty: '有機農業專家'
          },
          availableDates: ['2024-01-20', '2024-01-21', '2024-01-27', '2024-01-28'],
          tags: ['有機', '親子友善', '教育體驗']
        },
        {
          id: '2',
          title: '傳統陶藝工坊 - 手拉坯體驗',
          category: 'craft',
          description: '學習傳統陶藝技法，親手製作獨一無二的陶瓷作品',
          location: '金山陶藝工作室',
          duration: 180,
          price: 1200,
          rating: 4.9,
          reviewCount: 89,
          maxParticipants: 8,
          difficulty: 'medium',
          images: ['/placeholder.svg?height=300&width=400&text=陶藝工坊'],
          highlights: ['手拉坯技法', '釉藥調配', '燒製過程', '作品帶回'],
          includes: ['材料費', '工具使用', '專業指導', '作品燒製'],
          schedule: [
            '14:00 - 工坊介紹',
            '14:30 - 陶土準備',
            '15:00 - 手拉坯教學',
            '16:00 - 作品修整',
            '16:30 - 釉藥上色',
            '17:00 - 結束'
          ],
          host: {
            name: '李師傅',
            avatar: '/placeholder-user.jpg',
            experience: 25,
            specialty: '傳統陶藝大師'
          },
          availableDates: ['2024-01-19', '2024-01-26', '2024-02-02', '2024-02-09'],
          tags: ['手作', '藝術', '傳統工藝']
        },
        {
          id: '3',
          title: '金山老街文化巡禮',
          category: 'culture',
          description: '深度探索金山老街的歷史文化，品嚐在地美食',
          location: '金山老街',
          duration: 150,
          price: 600,
          rating: 4.6,
          reviewCount: 234,
          maxParticipants: 20,
          difficulty: 'easy',
          images: ['/placeholder.svg?height=300&width=400&text=金山老街'],
          highlights: ['歷史建築導覽', '在地美食品嚐', '文化故事分享', '拍照打卡'],
          includes: ['專業導覽', '美食試吃', '文化手冊', '紀念品'],
          schedule: [
            '10:00 - 老街入口集合',
            '10:15 - 歷史建築介紹',
            '11:00 - 傳統店家參訪',
            '11:30 - 美食品嚐',
            '12:00 - 文化故事時間',
            '12:30 - 結束'
          ],
          host: {
            name: '王導覽員',
            avatar: '/placeholder-user.jpg',
            experience: 8,
            specialty: '在地文史工作者'
          },
          availableDates: ['2024-01-20', '2024-01-21', '2024-01-22', '2024-01-23'],
          tags: ['文化', '美食', '導覽', '攝影']
        },
        {
          id: '4',
          title: '傳統米食製作體驗',
          category: 'food',
          description: '學習製作傳統米食，體驗古早味的製作工藝',
          location: '金山社區活動中心',
          duration: 200,
          price: 900,
          rating: 4.7,
          reviewCount: 112,
          maxParticipants: 15,
          difficulty: 'easy',
          images: ['/placeholder.svg?height=300&width=400&text=米食製作'],
          highlights: ['手工製作', '傳統技法', '品嚐成果', '食譜分享'],
          includes: ['材料費', '工具使用', '專業教學', '成品帶回'],
          schedule: [
            '09:00 - 集合與介紹',
            '09:30 - 米食文化講解',
            '10:00 - 實作體驗',
            '11:30 - 蒸煮過程',
            '12:00 - 品嚐與分享',
            '12:20 - 結束'
          ],
          host: {
            name: '張阿嬤',
            avatar: '/placeholder-user.jpg',
            experience: 30,
            specialty: '傳統料理達人'
          },
          availableDates: ['2024-01-25', '2024-02-01', '2024-02-08', '2024-02-15'],
          tags: ['料理', '傳統', '親子', '文化']
        },
        {
          id: '5',
          title: '茶園採茶與製茶體驗',
          category: 'farming',
          description: '體驗採茶樂趣，學習傳統製茶工藝',
          location: '金山茶園',
          duration: 300,
          price: 1500,
          rating: 4.9,
          reviewCount: 67,
          maxParticipants: 10,
          difficulty: 'medium',
          images: ['/placeholder.svg?height=300&width=400&text=茶園體驗'],
          highlights: ['採茶體驗', '製茶工藝', '茶藝品茗', '茶葉帶回'],
          includes: ['採茶工具', '製茶指導', '茶點', '茶葉伴手禮'],
          schedule: [
            '08:00 - 茶園集合',
            '08:30 - 採茶教學',
            '10:00 - 採茶體驗',
            '11:30 - 製茶工藝',
            '12:30 - 茶藝品茗',
            '13:00 - 結束'
          ],
          host: {
            name: '林茶農',
            avatar: '/placeholder-user.jpg',
            experience: 20,
            specialty: '製茶工藝師'
          },
          availableDates: ['2024-01-24', '2024-01-31', '2024-02-07', '2024-02-14'],
          tags: ['茶文化', '農業', '工藝', '品茗']
        },
        {
          id: '6',
          title: '竹編工藝創作坊',
          category: 'craft',
          description: '學習傳統竹編技藝，製作實用的竹編作品',
          location: '金山竹藝工作室',
          duration: 240,
          price: 1000,
          rating: 4.5,
          reviewCount: 43,
          maxParticipants: 12,
          difficulty: 'hard',
          images: ['/placeholder.svg?height=300&width=400&text=竹編工藝'],
          highlights: ['竹材處理', '編織技法', '創意設計', '實用作品'],
          includes: ['竹材', '工具使用', '專業指導', '作品帶回'],
          schedule: [
            '13:00 - 工作室介紹',
            '13:30 - 竹材認識',
            '14:00 - 基礎編織',
            '15:30 - 進階技法',
            '16:30 - 作品完成',
            '17:00 - 結束'
          ],
          host: {
            name: '黃師傅',
            avatar: '/placeholder-user.jpg',
            experience: 18,
            specialty: '竹編工藝師'
          },
          availableDates: ['2024-01-23', '2024-01-30', '2024-02-06', '2024-02-13'],
          tags: ['竹編', '手工藝', '傳統', '創作']
        }
      ]

      const mockBookings: Booking[] = [
        {
          id: '1',
          experienceId: '1',
          experienceTitle: '有機農場體驗 - 季節蔬菜種植',
          date: '2024-01-20',
          time: '09:00',
          participants: 2,
          totalPrice: 1600,
          status: 'confirmed',
          hostName: '陳農夫'
        },
        {
          id: '2',
          experienceId: '3',
          experienceTitle: '金山老街文化巡禮',
          date: '2024-01-15',
          time: '10:00',
          participants: 1,
          totalPrice: 600,
          status: 'completed',
          hostName: '王導覽員'
        }
      ]
      
      setExperiences(mockExperiences)
      setBookings(mockBookings)
      setLoading(false)
    }

    fetchData()
  }, [])

  const filteredExperiences = experiences.filter(experience => {
    const matchesCategory = selectedCategory === 'all' || experience.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'all' || experience.difficulty === selectedDifficulty
    const matchesPrice = experience.price >= priceRange[0] && experience.price <= priceRange[1]
    const matchesSearch = experience.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         experience.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         experience.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesCategory && matchesDifficulty && matchesPrice && matchesSearch
  })

  const handleBooking = (experience: RuralExperience) => {
    setSelectedExperience(experience)
    setShowBookingModal(true)
  }

  const handleBookingSubmit = (bookingData: any) => {
    const newBooking: Booking = {
      id: Date.now().toString(),
      experienceId: selectedExperience!.id,
      experienceTitle: selectedExperience!.title,
      date: bookingData.date,
      time: bookingData.time,
      participants: bookingData.participants,
      totalPrice: bookingData.totalPrice,
      status: 'pending',
      hostName: selectedExperience!.host.name
    }
    
    setBookings(prev => [newBooking, ...prev])
    setShowBookingModal(false)
    setSelectedExperience(null)
  }

  const totalExperiences = experiences.length
  const avgRating = experiences.reduce((sum, exp) => sum + exp.rating, 0) / experiences.length
  const totalBookings = bookings.length
  const completedBookings = bookings.filter(b => b.status === 'completed').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <div className="flex items-center justify-center space-x-2">
          <Wheat className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">農村體驗活動</h1>
        </div>
        <p className="text-muted-foreground">體驗在地農村文化，學習傳統工藝技術</p>
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
            <Palette className="h-6 w-6 mx-auto mb-2 text-blue-500" />
            <div className="text-xl font-bold">{totalExperiences}</div>
            <div className="text-sm text-muted-foreground">體驗活動</div>
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
            <div className="text-xl font-bold">{totalBookings}</div>
            <div className="text-sm text-muted-foreground">我的預約</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 mx-auto mb-2 text-orange-500" />
            <div className="text-xl font-bold">{completedBookings}</div>
            <div className="text-sm text-muted-foreground">完成體驗</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ExperienceFilter
          selectedCategory={selectedCategory}
          selectedDifficulty={selectedDifficulty}
          priceRange={priceRange}
          searchQuery={searchQuery}
          onCategoryChange={setSelectedCategory}
          onDifficultyChange={setSelectedDifficulty}
          onPriceRangeChange={setPriceRange}
          onSearchChange={setSearchQuery}
        />
      </motion.div>

      {/* Experiences Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            體驗活動 ({filteredExperiences.length})
          </h2>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <ExperienceCard
                  experience={experience}
                  onBook={() => handleBooking(experience)}
                />
              </motion.div>
            ))}
          </div>
        )}

        {!loading && filteredExperiences.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Wheat className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">找不到符合條件的體驗</h3>
              <p className="text-muted-foreground">請調整篩選條件或搜尋關鍵字</p>
            </CardContent>
          </Card>
        )}
      </motion.div>

      {/* My Bookings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <MyBookings bookings={bookings} />
      </motion.div>

      {/* Booking Modal */}
      {showBookingModal && selectedExperience && (
        <BookingModal
          experience={selectedExperience}
          onSubmit={handleBookingSubmit}
          onClose={() => {
            setShowBookingModal(false)
            setSelectedExperience(null)
          }}
        />
      )}
    </div>
  )
}

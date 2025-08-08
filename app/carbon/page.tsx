'use client'

import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Leaf, Award, TrendingUp, Users, Gift, Target } from 'lucide-react'
import PointsOverview from './components/points-overview'
import EarnHistory from './components/earn-history'
import RewardStore from './components/reward-store'
import EcoChallenge from './components/eco-challenge'
import CarbonFootprint from './components/carbon-footprint'
import Leaderboard from './components/leaderboard'

interface UserPoints {
  total: number
  available: number
  used: number
  thisMonth: number
  rank: number
  level: string
  nextLevelPoints: number
}

interface EarnRecord {
  id: string
  activity: string
  points: number
  date: string
  category: 'transport' | 'energy' | 'waste' | 'challenge'
  description: string
  multiplier?: number
}

interface Reward {
  id: string
  name: string
  description: string
  points: number
  category: 'discount' | 'gift' | 'service'
  image: string
  stock: number
  claimed: number
  isPopular: boolean
  validUntil?: string
}

interface Challenge {
  id: string
  title: string
  description: string
  target: number
  current: number
  points: number
  deadline: string
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
  isCompleted: boolean
  participants: number
}

interface CarbonData {
  totalSaved: number
  thisMonth: number
  breakdown: {
    transport: number
    energy: number
    waste: number
  }
  trend: Array<{
    month: string
    saved: number
  }>
}

export default function CarbonPage() {
  const [userPoints, setUserPoints] = useState<UserPoints | null>(null)
  const [earnHistory, setEarnHistory] = useState<EarnRecord[]>([])
  const [rewards, setRewards] = useState<Reward[]>([])
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [carbonData, setCarbonData] = useState<CarbonData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockUserPoints: UserPoints = {
        total: 2850,
        available: 1650,
        used: 1200,
        thisMonth: 420,
        rank: 15,
        level: 'eco-warrior',
        nextLevelPoints: 3500
      }

      const mockEarnHistory: EarnRecord[] = [
        {
          id: '1',
          activity: '搭乘公車',
          points: 10,
          date: '2024-01-15',
          category: 'transport',
          description: '使用大眾運輸工具，減少碳排放',
          multiplier: 2
        },
        {
          id: '2',
          activity: '使用YouBike',
          points: 15,
          date: '2024-01-14',
          category: 'transport',
          description: '騎乘共享單車30分鐘'
        },
        {
          id: '3',
          activity: '垃圾分類',
          points: 5,
          date: '2024-01-13',
          category: 'waste',
          description: '正確進行垃圾分類'
        },
        {
          id: '4',
          activity: '完成每日挑戰',
          points: 50,
          date: '2024-01-12',
          category: 'challenge',
          description: '連續7天使用綠色交通工具'
        },
        {
          id: '5',
          activity: '節能行為',
          points: 8,
          date: '2024-01-11',
          category: 'energy',
          description: '關閉不必要的電器設備'
        }
      ]

      const mockRewards: Reward[] = [
        {
          id: '1',
          name: '公車月票8折券',
          description: '購買公車月票享有8折優惠',
          points: 200,
          category: 'discount',
          image: '/placeholder.svg?height=100&width=100&text=公車券',
          stock: 50,
          claimed: 12,
          isPopular: true,
          validUntil: '2024-03-31'
        },
        {
          id: '2',
          name: '環保購物袋',
          description: '100%可回收材質製作的購物袋',
          points: 150,
          category: 'gift',
          image: '/placeholder.svg?height=100&width=100&text=購物袋',
          stock: 30,
          claimed: 8,
          isPopular: false
        },
        {
          id: '3',
          name: 'YouBike免費騎乘券',
          description: '免費騎乘YouBike 2小時',
          points: 100,
          category: 'service',
          image: '/placeholder.svg?height=100&width=100&text=單車券',
          stock: 100,
          claimed: 45,
          isPopular: true,
          validUntil: '2024-02-29'
        },
        {
          id: '4',
          name: '金山老街美食券',
          description: '老街指定店家100元抵用券',
          points: 300,
          category: 'discount',
          image: '/placeholder.svg?height=100&width=100&text=美食券',
          stock: 25,
          claimed: 5,
          isPopular: true,
          validUntil: '2024-04-30'
        },
        {
          id: '5',
          name: '環保種子包',
          description: '在地原生植物種子包',
          points: 80,
          category: 'gift',
          image: '/placeholder.svg?height=100&width=100&text=種子',
          stock: 60,
          claimed: 15,
          isPopular: false
        },
        {
          id: '6',
          name: '碳中和證書',
          description: '個人碳中和貢獻認證證書',
          points: 500,
          category: 'service',
          image: '/placeholder.svg?height=100&width=100&text=證書',
          stock: 10,
          claimed: 2,
          isPopular: false
        }
      ]

      const mockChallenges: Challenge[] = [
        {
          id: '1',
          title: '綠色通勤週',
          description: '連續7天使用大眾運輸或單車通勤',
          target: 7,
          current: 4,
          points: 100,
          deadline: '2024-01-21',
          difficulty: 'medium',
          category: '交通',
          isCompleted: false,
          participants: 156
        },
        {
          id: '2',
          title: '零廢棄日',
          description: '一天內不產生任何不可回收垃圾',
          target: 1,
          current: 0,
          points: 50,
          deadline: '2024-01-18',
          difficulty: 'hard',
          category: '環保',
          isCompleted: false,
          participants: 89
        },
        {
          id: '3',
          title: '節能達人',
          description: '本月用電量比上月減少10%',
          target: 10,
          current: 6,
          points: 150,
          deadline: '2024-01-31',
          difficulty: 'medium',
          category: '節能',
          isCompleted: false,
          participants: 234
        },
        {
          id: '4',
          title: '步行健將',
          description: '每日步行超過8000步，持續一週',
          target: 7,
          current: 7,
          points: 80,
          deadline: '2024-01-20',
          difficulty: 'easy',
          category: '健康',
          isCompleted: true,
          participants: 312
        }
      ]

      const mockCarbonData: CarbonData = {
        totalSaved: 125.6,
        thisMonth: 18.3,
        breakdown: {
          transport: 78.2,
          energy: 32.1,
          waste: 15.3
        },
        trend: [
          { month: '2023-07', saved: 8.5 },
          { month: '2023-08', saved: 12.3 },
          { month: '2023-09', saved: 15.7 },
          { month: '2023-10', saved: 18.9 },
          { month: '2023-11', saved: 22.1 },
          { month: '2023-12', saved: 19.8 },
          { month: '2024-01', saved: 18.3 }
        ]
      }
      
      setUserPoints(mockUserPoints)
      setEarnHistory(mockEarnHistory)
      setRewards(mockRewards)
      setChallenges(mockChallenges)
      setCarbonData(mockCarbonData)
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-800 dark:text-green-400 flex items-center gap-2">
            <Leaf className="h-8 w-8" />
            低碳點數系統
          </h1>
          <p className="text-muted-foreground mt-2">
            透過環保行為累積點數，兌換獎品，共同守護地球
          </p>
        </div>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          <Award className="h-4 w-4 mr-2" />
          環保達人
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            總覽
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            記錄
          </TabsTrigger>
          <TabsTrigger value="store" className="flex items-center gap-2">
            <Gift className="h-4 w-4" />
            商城
          </TabsTrigger>
          <TabsTrigger value="challenge" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            挑戰
          </TabsTrigger>
          <TabsTrigger value="footprint" className="flex items-center gap-2">
            <Leaf className="h-4 w-4" />
            足跡
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            排行
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {userPoints && carbonData && (
            <PointsOverview 
              userPoints={userPoints}
              carbonData={carbonData}
              recentEarns={earnHistory.slice(0, 5)}
            />
          )}
        </TabsContent>

        <TabsContent value="history">
          <EarnHistory 
            records={earnHistory}
            loading={loading}
          />
        </TabsContent>

        <TabsContent value="store">
          <RewardStore 
            rewards={rewards}
            userPoints={userPoints?.available || 0}
            onRedeem={(rewardId) => {
              const reward = rewards.find(r => r.id === rewardId)
              if (reward && userPoints && userPoints.available >= reward.points) {
                setUserPoints(prev => prev ? {
                  ...prev,
                  available: prev.available - reward.points,
                  used: prev.used + reward.points
                } : null)
                setRewards(prev => prev.map(r => 
                  r.id === rewardId ? { ...r, claimed: r.claimed + 1, stock: r.stock - 1 } : r
                ))
              }
            }}
            loading={loading}
          />
        </TabsContent>

        <TabsContent value="challenge">
          <EcoChallenge 
            challenges={challenges}
            onJoinChallenge={(challengeId) => {
              setChallenges(prev => prev.map(c => 
                c.id === challengeId ? { ...c, participants: c.participants + 1 } : c
              ))
            }}
            loading={loading}
          />
        </TabsContent>

        <TabsContent value="footprint">
          {carbonData && (
            <CarbonFootprint 
              data={carbonData}
              loading={loading}
            />
          )}
        </TabsContent>

        <TabsContent value="leaderboard">
          {userPoints && (
            <Leaderboard 
              currentUser={{
                rank: userPoints.rank,
                points: userPoints.total,
                level: userPoints.level
              }}
              loading={loading}
            />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

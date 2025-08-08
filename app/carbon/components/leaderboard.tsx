'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Medal, Award, Crown, TrendingUp, Users, Leaf, SkullIcon as Skeleton } from 'lucide-react'

interface LeaderboardEntry {
  id: string
  name: string
  points: number
  level: string
  rank: number
  avatar: string
}

interface LeaderboardProps {
  currentUser: {
    rank: number
    points: number
    level: string
  }
  loading: boolean
}

export default function Leaderboard({ currentUser, loading }: LeaderboardProps) {
  const [timeRange, setTimeRange] = useState('month')
  const [category, setCategory] = useState('total')

  // Mock data for leaderboard
  const mockLeaderboard: LeaderboardEntry[] = [
    { id: '1', name: '環保小尖兵', points: 5200, level: 'eco-master', rank: 1, avatar: '/placeholder.svg?height=40&width=40&text=1' },
    { id: '2', name: '綠色守護者', points: 4800, level: 'eco-master', rank: 2, avatar: '/placeholder.svg?height=40&width=40&text=2' },
    { id: '3', name: '地球英雄', points: 4500, level: 'eco-master', rank: 3, avatar: '/placeholder.svg?height=40&width=40&text=3' },
    { id: '4', name: '低碳先鋒', points: 3900, level: 'eco-warrior', rank: 4, avatar: '/placeholder.svg?height=40&width=40&text=4' },
    { id: '5', name: '節能達人', points: 3700, level: 'eco-warrior', rank: 5, avatar: '/placeholder.svg?height=40&width=40&text=5' },
    { id: '6', name: '環保實踐家', points: 3200, level: 'eco-advocate', rank: 6, avatar: '/placeholder.svg?height=40&width=40&text=6' },
    { id: '7', name: '綠色生活家', points: 2900, level: 'eco-advocate', rank: 7, avatar: '/placeholder.svg?height=40&width=40&text=7' },
    { id: '8', name: '碳足跡追蹤者', points: 2500, level: 'eco-beginner', rank: 8, avatar: '/placeholder.svg?height=40&width=40&text=8' },
    { id: '9', name: '環保新手', points: 2100, level: 'eco-beginner', rank: 9, avatar: '/placeholder.svg?height=40&width=40&text=9' },
    { id: '10', name: '點數收集者', points: 1800, level: 'eco-beginner', rank: 10, avatar: '/placeholder.svg?height=40&width=40&text=10' },
  ];

  // Insert current user into the leaderboard if not in top 10
  const leaderboardWithCurrentUser = [...mockLeaderboard];
  const isCurrentUserInTop10 = leaderboardWithCurrentUser.some(user => user.rank === currentUser.rank);

  if (!isCurrentUserInTop10 && currentUser.rank > 10) {
    leaderboardWithCurrentUser.splice(9, 0, {
      id: 'current',
      name: '您 (Current User)',
      points: currentUser.points,
      level: currentUser.level,
      rank: currentUser.rank,
      avatar: '/placeholder.svg?height=40&width=40&text=您'
    });
    // Re-sort to ensure correct order after insertion
    leaderboardWithCurrentUser.sort((a, b) => a.rank - b.rank);
  }

  const getRankBadgeColor = (rank: number) => {
    if (rank === 1) return 'bg-yellow-500 text-white';
    if (rank === 2) return 'bg-gray-400 text-white';
    if (rank === 3) return 'bg-amber-700 text-white';
    return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
  };

  const leaderboardData = {
    month: {
      total: [
        {
          id: 1,
          name: '環保達人王小明',
          points: 5420,
          rank: 1,
          avatar: '/placeholder.svg?height=40&width=40&text=王',
          carbonReduction: 245.8,
          streak: 28,
          badge: 'crown'
        },
        {
          id: 2,
          name: '綠色生活李小華',
          points: 4890,
          rank: 2,
          avatar: '/placeholder.svg?height=40&width=40&text=李',
          carbonReduction: 220.3,
          streak: 25,
          badge: 'gold'
        },
        {
          id: 3,
          name: '節能專家張大同',
          points: 4650,
          rank: 3,
          avatar: '/placeholder.svg?height=40&width=40&text=張',
          carbonReduction: 210.7,
          streak: 22,
          badge: 'silver'
        },
        {
          id: 4,
          name: '環保新星陳小美',
          points: 4320,
          rank: 4,
          avatar: '/placeholder.svg?height=40&width=40&text=陳',
          carbonReduction: 195.4,
          streak: 20,
          badge: 'bronze'
        },
        {
          id: 5,
          name: '低碳生活林志明',
          points: 4100,
          rank: 5,
          avatar: '/placeholder.svg?height=40&width=40&text=林',
          carbonReduction: 185.2,
          streak: 18,
          badge: 'none'
        },
        {
          id: 6,
          name: '綠能推手黃小芳',
          points: 3950,
          rank: 6,
          avatar: '/placeholder.svg?height=40&width=40&text=黃',
          carbonReduction: 178.9,
          streak: 16,
          badge: 'none'
        },
        {
          id: 7,
          name: '環保志工劉大偉',
          points: 3800,
          rank: 7,
          avatar: '/placeholder.svg?height=40&width=40&text=劉',
          carbonReduction: 172.1,
          streak: 15,
          badge: 'none'
        },
        {
          id: 8,
          name: '節約達人吳小玲',
          points: 3650,
          rank: 8,
          avatar: '/placeholder.svg?height=40&width=40&text=吳',
          carbonReduction: 165.8,
          streak: 14,
          badge: 'none'
        },
        {
          id: 9,
          name: '綠色出行趙小強',
          points: 3500,
          rank: 9,
          avatar: '/placeholder.svg?height=40&width=40&text=趙',
          carbonReduction: 158.4,
          streak: 12,
          badge: 'none'
        },
        {
          id: 10,
          name: '環保教育周小雯',
          points: 3350,
          rank: 10,
          avatar: '/placeholder.svg?height=40&width=40&text=周',
          carbonReduction: 151.7,
          streak: 11,
          badge: 'none'
        }
      ]
    }
  }

  const getBadgeIcon = (badge, rank) => {
    switch (badge) {
      case 'crown':
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 'gold':
        return <Trophy className="h-5 w-5 text-yellow-600" />
      case 'silver':
        return <Medal className="h-5 w-5 text-gray-400" />
      case 'bronze':
        return <Award className="h-5 w-5 text-orange-600" />
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>
    }
  }

  const getRankColor = (rank) => {
    if (rank === 1) return 'text-yellow-600'
    if (rank === 2) return 'text-gray-400'
    if (rank === 3) return 'text-orange-600'
    return 'text-muted-foreground'
  }

  const currentData = leaderboardData[timeRange][category]

  return (
    <div className="space-y-6">
      {/* 用戶排名概覽 */}
      <Card className="border-2 border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            我的排名
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={currentUser.avatar || "/placeholder.svg"} />
                <AvatarFallback>您</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{currentUser.name}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>排名: #{currentUser.rank}</span>
                  <span>連續: {currentUser.streak} 天</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">
                {currentUser.points.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">點數</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 篩選器 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>環保排行榜</CardTitle>
              <CardDescription>查看社區環保貢獻排名</CardDescription>
            </div>
            <div className="flex gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">本週</SelectItem>
                  <SelectItem value="month">本月</SelectItem>
                  <SelectItem value="year">今年</SelectItem>
                </SelectContent>
              </Select>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="total">總點數</SelectItem>
                  <SelectItem value="carbon">減碳量</SelectItem>
                  <SelectItem value="streak">連續天數</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentData.map((user, index) => (
              <div 
                key={user.id} 
                className={`flex items-center justify-between p-4 rounded-lg border transition-all hover:shadow-md ${
                  user.rank <= 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950' : 'bg-card'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8">
                    {getBadgeIcon(user.badge, user.rank)}
                  </div>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{user.name}</h4>
                      {user.rank <= 3 && (
                        <Badge variant="secondary" className="text-xs">
                          {user.rank === 1 ? '冠軍' : user.rank === 2 ? '亞軍' : '季軍'}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>減碳: {user.carbonReduction} kg</span>
                      <span>連續: {user.streak} 天</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-xl font-bold ${getRankColor(user.rank)}`}>
                    {user.points.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">點數</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 排行榜統計 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-600" />
              本月冠軍
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={currentData[0].avatar || "/placeholder.svg"} />
                <AvatarFallback>{currentData[0].name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">{currentData[0].name}</h4>
                <p className="text-sm text-muted-foreground">
                  {currentData[0].points.toLocaleString()} 點數
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">參與用戶</p>
                <p className="text-2xl font-bold">1,247</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">總減碳量</p>
                <p className="text-2xl font-bold text-green-600">15.2 噸</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 成就徽章 */}
      <Card>
        <CardHeader>
          <CardTitle>排行榜成就</CardTitle>
          <CardDescription>根據排名獲得的特殊徽章</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg border bg-gradient-to-b from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900">
              <Crown className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <h4 className="font-medium">環保王者</h4>
              <p className="text-xs text-muted-foreground">排名第1</p>
            </div>
            <div className="text-center p-4 rounded-lg border bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
              <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <h4 className="font-medium">環保精英</h4>
              <p className="text-xs text-muted-foreground">排名前3</p>
            </div>
            <div className="text-center p-4 rounded-lg border bg-gradient-to-b from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900">
              <Medal className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h4 className="font-medium">環保達人</h4>
              <p className="text-xs text-muted-foreground">排名前10</p>
            </div>
            <div className="text-center p-4 rounded-lg border bg-gradient-to-b from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
              <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-medium">環保新星</h4>
              <p className="text-xs text-muted-foreground">排名前50</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 新的排行榜 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-600" />
            低碳點數排行榜
          </CardTitle>
          <CardDescription>查看您在社區中的環保貢獻排名</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-3 border rounded-lg">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                  <Skeleton className="h-6 w-16" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {leaderboardWithCurrentUser.map((entry) => (
                <div
                  key={entry.id}
                  className={`flex items-center gap-4 p-3 rounded-lg transition-all duration-200 ${
                    entry.id === 'current' ? 'bg-green-50 dark:bg-green-950 border-2 border-green-500 shadow-md' : 'border'
                  }`}
                >
                  <Badge className={`text-lg font-bold w-10 h-10 flex items-center justify-center ${getRankBadgeColor(entry.rank)}`}>
                    {entry.rank}
                  </Badge>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={entry.avatar || "/placeholder.svg"} alt={entry.name} />
                    <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-lg">{entry.name}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Award className="h-4 w-4" />
                      {entry.level}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-green-600 flex items-center gap-1">
                      <Leaf className="h-5 w-5" />
                      {entry.points}
                    </p>
                    <p className="text-sm text-muted-foreground">點</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

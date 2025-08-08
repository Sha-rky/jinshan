import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Leaf, TrendingUp, Award, Clock } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

interface PointsOverviewProps {
  userPoints: {
    total: number
    available: number
    used: number
    thisMonth: number
    rank: number
    level: string
    nextLevelPoints: number
  }
  carbonData: {
    totalSaved: number
    thisMonth: number
  }
  recentEarns: Array<{
    id: string
    activity: string
    points: number
    date: string
    description: string
  }>
}

export default function PointsOverview({ userPoints, carbonData, recentEarns }: PointsOverviewProps) {
  const progressValue = (userPoints.total / userPoints.nextLevelPoints) * 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Points Summary */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-green-600" />
            點數總覽
          </CardTitle>
          <CardDescription>您的低碳點數概況和等級進度</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <div className="text-5xl font-bold text-green-700 dark:text-green-300">
                {userPoints.available}
              </div>
              <p className="text-muted-foreground">可用點數</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-semibold">{userPoints.total}</div>
                <p className="text-sm text-muted-foreground">總點數</p>
              </div>
              <div>
                <div className="text-2xl font-semibold">{userPoints.used}</div>
                <p className="text-sm text-muted-foreground">已使用點數</p>
              </div>
            </div>
            <div>
              <div className="text-2xl font-semibold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                {userPoints.thisMonth}
              </div>
              <p className="text-sm text-muted-foreground">本月獲得點數</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-600" />
                您的等級: <Badge variant="secondary">{userPoints.level}</Badge>
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                距離下一等級還需 {userPoints.nextLevelPoints - userPoints.total} 點
              </p>
              <Progress value={progressValue} className="w-full mt-2" />
            </div>
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                您的排名: #{userPoints.rank}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                在所有用戶中的排名
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Leaf className="h-5 w-5 text-green-600" />
                本月減碳量: {carbonData.thisMonth} kg
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                總減碳量: {carbonData.totalSaved} kg
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Earns */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-600" />
            最新獲得記錄
          </CardTitle>
          <CardDescription>您最近的點數獲得活動</CardDescription>
        </CardHeader>
        <CardContent>
          {recentEarns.length > 0 ? (
            <ul className="space-y-4">
              {recentEarns.map((record) => (
                <li key={record.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{record.activity}</p>
                    <p className="text-sm text-muted-foreground">{record.description}</p>
                    <p className="text-xs text-muted-foreground">{record.date}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    +{record.points} 點
                  </Badge>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground text-center">暫無最新獲得記錄。</p>
          )}
          <Separator className="my-4" />
          <p className="text-sm text-center text-muted-foreground">
            查看 <span className="font-semibold">獲得記錄</span> 頁面了解更多
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

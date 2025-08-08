import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { Target, Leaf, Trophy, Users, CalendarDays, Search, Filter } from 'lucide-react'

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

interface EcoChallengeProps {
  challenges: Challenge[]
  onJoinChallenge: (challengeId: string) => void
  loading: boolean
}

export default function EcoChallenge({ challenges, onJoinChallenge, loading }: EcoChallengeProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDifficulty, setFilterDifficulty] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')

  const difficulties = [
    { value: 'all', label: '所有難度' },
    { value: 'easy', label: '簡單' },
    { value: 'medium', label: '中等' },
    { value: 'hard', label: '困難' },
  ]

  const categories = [
    { value: 'all', label: '所有類別' },
    { value: '交通', label: '交通' },
    { value: '環保', label: '環保' },
    { value: '節能', label: '節能' },
    { value: '健康', label: '健康' },
  ]

  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          challenge.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = filterDifficulty === 'all' || challenge.difficulty === filterDifficulty
    const matchesCategory = filterCategory === 'all' || challenge.category === filterCategory
    return matchesSearch && matchesDifficulty && matchesCategory
  })

  const getDifficultyBadgeColor = (difficulty: Challenge['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-orange-600" />
          環保挑戰
        </CardTitle>
        <CardDescription>參與環保挑戰，累積點數並為地球盡一份心力</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜尋挑戰名稱或描述..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
            <SelectTrigger className="w-full md:w-[180px]">
              <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="篩選難度" />
            </SelectTrigger>
            <SelectContent>
              {difficulties.map(diff => (
                <SelectItem key={diff.value} value={diff.value}>{diff.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full md:w-[180px]">
              <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="篩選類別" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChallenges.length > 0 ? (
              filteredChallenges.map(challenge => (
                <Card key={challenge.id} className="flex flex-col">
                  <CardContent className="p-4 flex-grow flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold">{challenge.title}</h3>
                      <Badge className={getDifficultyBadgeColor(challenge.difficulty)}>
                        {difficulties.find(d => d.value === challenge.difficulty)?.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 flex-grow">{challenge.description}</p>
                    
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        {challenge.participants} 參與者
                      </span>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <CalendarDays className="h-4 w-4" />
                        截止: {challenge.deadline}
                      </span>
                    </div>

                    <div className="mb-3">
                      <div className="flex items-center justify-between text-sm font-medium mb-1">
                        <span>進度: {challenge.current}/{challenge.target}</span>
                        <span>{((challenge.current / challenge.target) * 100).toFixed(0)}%</span>
                      </div>
                      <Progress value={(challenge.current / challenge.target) * 100} className="w-full" />
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-1 text-lg font-bold text-green-700 dark:text-green-300">
                        <Leaf className="h-4 w-4" />
                        +{challenge.points} 點
                      </div>
                      <Button
                        onClick={() => onJoinChallenge(challenge.id)}
                        disabled={challenge.isCompleted}
                        variant={challenge.isCompleted ? 'outline' : 'default'}
                      >
                        {challenge.isCompleted ? (
                          <span className="flex items-center gap-1">
                            <Trophy className="h-4 w-4" /> 已完成
                          </span>
                        ) : '參與挑戰'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8 col-span-full">
                沒有找到符合條件的挑戰。
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

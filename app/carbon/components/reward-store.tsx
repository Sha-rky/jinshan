import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import { ShoppingCart, Leaf, Tag, Gift, CheckCircle, XCircle } from 'lucide-react'
import Image from 'next/image'

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

interface RewardStoreProps {
  rewards: Reward[]
  userPoints: number
  onRedeem: (rewardId: string) => void
  loading: boolean
}

export default function RewardStore({ rewards, userPoints, onRedeem, loading }: RewardStoreProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null)
  const [redeemSuccess, setRedeemSuccess] = useState<boolean | null>(null)

  const categories = [
    { value: 'all', label: '所有類別' },
    { value: 'discount', label: '優惠券' },
    { value: 'gift', label: '實體禮品' },
    { value: 'service', label: '服務體驗' },
  ]

  const filteredRewards = rewards.filter(reward => {
    const matchesSearch = reward.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          reward.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || reward.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const handleRedeem = () => {
    if (selectedReward) {
      if (userPoints >= selectedReward.points && selectedReward.stock > 0) {
        onRedeem(selectedReward.id)
        setRedeemSuccess(true)
      } else {
        setRedeemSuccess(false)
      }
    }
  }

  const getCategoryBadgeColor = (category: Reward['category']) => {
    switch (category) {
      case 'discount': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'gift': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'service': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-blue-600" />
          點數兌換商城
        </CardTitle>
        <CardDescription>使用您的低碳點數兌換豐富獎品</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜尋獎品名稱或描述..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full md:w-[180px]">
              <Gift className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="篩選類別" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mb-6 text-lg font-semibold flex items-center gap-2">
          <Leaf className="h-5 w-5 text-green-600" />
          您的可用點數: <span className="text-green-700 dark:text-green-300">{userPoints}</span> 點
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4 space-y-3">
                  <Skeleton className="h-32 w-full rounded-md" />
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-10 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRewards.length > 0 ? (
              filteredRewards.map(reward => (
                <Dialog key={reward.id} onOpenChange={(open) => {
                  if (!open) {
                    setSelectedReward(null);
                    setRedeemSuccess(null);
                  } else {
                    setSelectedReward(reward);
                  }
                }}>
                  <DialogTrigger asChild>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer flex flex-col">
                      <CardContent className="p-4 flex-grow flex flex-col">
                        <div className="relative w-full h-40 mb-4 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <Image
                            src={reward.image || "/placeholder.svg"}
                            alt={reward.name}
                            width={150}
                            height={150}
                            className="object-contain"
                          />
                          {reward.isPopular && (
                            <Badge className="absolute top-2 right-2 bg-red-500 text-white">熱門</Badge>
                          )}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{reward.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3 flex-grow">{reward.description}</p>
                        <div className="flex items-center justify-between mt-auto">
                          <Badge className={getCategoryBadgeColor(reward.category)}>
                            {categories.find(c => c.value === reward.category)?.label}
                          </Badge>
                          <div className="flex items-center gap-1 text-lg font-bold text-green-700 dark:text-green-300">
                            <Leaf className="h-4 w-4" />
                            {reward.points} 點
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground mt-2">
                          庫存: {reward.stock} | 已兌換: {reward.claimed}
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>{selectedReward?.name}</DialogTitle>
                      <DialogDescription>
                        {selectedReward?.description}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">所需點數:</span>
                        <span className="flex items-center gap-1 text-lg font-bold text-green-700 dark:text-green-300">
                          <Leaf className="h-4 w-4" />
                          {selectedReward?.points} 點
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">您的可用點數:</span>
                        <span className="flex items-center gap-1 text-lg font-bold text-green-700 dark:text-green-300">
                          <Leaf className="h-4 w-4" />
                          {userPoints} 點
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-medium">庫存:</span>
                        <span>{selectedReward?.stock}</span>
                      </div>
                      {selectedReward?.validUntil && (
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span className="font-medium">有效期至:</span>
                          <span>{selectedReward.validUntil}</span>
                        </div>
                      )}
                      {redeemSuccess !== null && (
                        <div className={`flex items-center gap-2 mt-2 ${redeemSuccess ? 'text-green-600' : 'text-red-600'}`}>
                          {redeemSuccess ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                          {redeemSuccess ? '兌換成功！' : (userPoints < (selectedReward?.points || 0) ? '點數不足！' : '庫存不足！')}
                        </div>
                      )}
                    </div>
                    <DialogFooter>
                      <Button
                        onClick={handleRedeem}
                        disabled={userPoints < (selectedReward?.points || 0) || (selectedReward?.stock || 0) <= 0 || redeemSuccess !== null}
                      >
                        立即兌換
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8 col-span-full">
                沒有找到符合條件的獎品。
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

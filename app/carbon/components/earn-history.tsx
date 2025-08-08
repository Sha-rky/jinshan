import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Filter, Search, CalendarDays, Leaf } from 'lucide-react'

interface EarnRecord {
  id: string
  activity: string
  points: number
  date: string
  category: 'transport' | 'energy' | 'waste' | 'challenge'
  description: string
  multiplier?: number
}

interface EarnHistoryProps {
  records: EarnRecord[]
  loading: boolean
}

export default function EarnHistory({ records, loading }: EarnHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [filterMonth, setFilterMonth] = useState('all')

  const categories = [
    { value: 'all', label: '所有類別' },
    { value: 'transport', label: '交通' },
    { value: 'energy', label: '節能' },
    { value: 'waste', label: '環保' },
    { value: 'challenge', label: '挑戰' },
  ]

  const months = [
    { value: 'all', label: '所有月份' },
    { value: '2024-01', label: '2024年1月' },
    { value: '2023-12', label: '2023年12月' },
    { value: '2023-11', label: '2023年11月' },
  ]

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.activity.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          record.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || record.category === filterCategory
    const matchesMonth = filterMonth === 'all' || record.date.startsWith(filterMonth)
    return matchesSearch && matchesCategory && matchesMonth
  })

  const getCategoryBadgeVariant = (category: EarnRecord['category']) => {
    switch (category) {
      case 'transport': return 'default';
      case 'energy': return 'secondary';
      case 'waste': return 'outline';
      case 'challenge': return 'destructive';
      default: return 'default';
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-green-600" />
          點數獲得記錄
        </CardTitle>
        <CardDescription>查看您所有低碳點數的獲得歷史</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜尋活動或描述..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
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
          <Select value={filterMonth} onValueChange={setFilterMonth}>
            <SelectTrigger className="w-full md:w-[180px]">
              <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="篩選月份" />
            </SelectTrigger>
            <SelectContent>
              {months.map(month => (
                <SelectItem key={month.value} value={month.value}>{month.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-64" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRecords.length > 0 ? (
              filteredRecords.map(record => (
                <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-semibold text-lg">{record.activity}</p>
                    <p className="text-sm text-muted-foreground">{record.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={getCategoryBadgeVariant(record.category)}>{categories.find(c => c.value === record.category)?.label}</Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <CalendarDays className="h-3 w-3" />
                        {record.date}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-green-600">+{record.points}</p>
                    <p className="text-sm text-muted-foreground">點</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">
                沒有找到符合條件的獲得記錄。
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

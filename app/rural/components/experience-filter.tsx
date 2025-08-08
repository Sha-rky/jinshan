'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Search, Filter, Wheat, Palette, Users, UtensilsCrossed } from 'lucide-react'

interface ExperienceFilterProps {
  selectedCategory: string
  selectedDifficulty: string
  priceRange: [number, number]
  searchQuery: string
  onCategoryChange: (category: string) => void
  onDifficultyChange: (difficulty: string) => void
  onPriceRangeChange: (range: [number, number]) => void
  onSearchChange: (query: string) => void
}

export function ExperienceFilter({
  selectedCategory,
  selectedDifficulty,
  priceRange,
  searchQuery,
  onCategoryChange,
  onDifficultyChange,
  onPriceRangeChange,
  onSearchChange
}: ExperienceFilterProps) {
  const categories = [
    { id: 'all', name: '全部', icon: Filter },
    { id: 'farming', name: '農事體驗', icon: Wheat },
    { id: 'craft', name: '工藝製作', icon: Palette },
    { id: 'culture', name: '文化導覽', icon: Users },
    { id: 'food', name: '料理體驗', icon: UtensilsCrossed }
  ]

  const difficulties = [
    { id: 'all', name: '全部難度' },
    { id: 'easy', name: '簡單' },
    { id: 'medium', name: '中等' },
    { id: 'hard', name: '困難' }
  ]

  const handleReset = () => {
    onCategoryChange('all')
    onDifficultyChange('all')
    onPriceRangeChange([0, 2000])
    onSearchChange('')
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold">搜尋體驗</h3>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜尋體驗名稱、關鍵字..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="space-y-3">
          <h4 className="font-medium">體驗類型</h4>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const CategoryIcon = category.icon
              const isSelected = selectedCategory === category.id
              
              return (
                <Badge
                  key={category.id}
                  variant={isSelected ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-3 py-2"
                  onClick={() => onCategoryChange(category.id)}
                >
                  <CategoryIcon className="h-4 w-4 mr-1" />
                  {category.name}
                </Badge>
              )
            })}
          </div>
        </div>

        {/* Difficulty and Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-medium">難度等級</h4>
            <Select value={selectedDifficulty} onValueChange={onDifficultyChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map((difficulty) => (
                  <SelectItem key={difficulty.id} value={difficulty.id}>
                    {difficulty.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">價格範圍</h4>
              <span className="text-sm text-muted-foreground">
                ${priceRange[0]} - ${priceRange[1]}
              </span>
            </div>
            <Slider
              value={priceRange}
              onValueChange={(value) => onPriceRangeChange(value as [number, number])}
              max={2000}
              min={0}
              step={100}
              className="w-full"
            />
          </div>
        </div>

        {/* Reset Button */}
        <div className="flex justify-end">
          <Button variant="outline" onClick={handleReset}>
            重置篩選
          </Button>
        </div>

        {/* Popular Tags */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground">熱門標籤</h4>
          <div className="flex flex-wrap gap-2">
            {['親子友善', '傳統工藝', '有機', '文化', '手作', '品茗'].map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => onSearchChange(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

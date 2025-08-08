"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Package, MapPin, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import logisticsData from "@/mock/logistics_data.json"

const statusColors = {
  "已取件": "bg-blue-100 text-blue-800",
  "運送中": "bg-yellow-100 text-yellow-800",
  "配送中": "bg-orange-100 text-orange-800",
  "已送達": "bg-green-100 text-green-800",
  "異常": "bg-red-100 text-red-800"
}

const statusIcons = {
  "已取件": Package,
  "運送中": MapPin,
  "配送中": Clock,
  "已送達": CheckCircle,
  "異常": AlertCircle
}

export function PackageTracker() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [packages] = useState(logisticsData.packages)

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.recipient.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || pkg.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            包裹追蹤
          </CardTitle>
          <CardDescription>
            輸入追蹤號碼或收件人姓名來查詢包裹狀態
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="輸入追蹤號碼或收件人姓名..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="選擇狀態" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部狀態</SelectItem>
                <SelectItem value="已取件">已取件</SelectItem>
                <SelectItem value="運送中">運送中</SelectItem>
                <SelectItem value="配送中">配送中</SelectItem>
                <SelectItem value="已送達">已送達</SelectItem>
                <SelectItem value="異常">異常</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Search className="h-4 w-4 mr-2" />
              搜尋
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredPackages.map((pkg) => {
          const StatusIcon = statusIcons[pkg.status as keyof typeof statusIcons]
          return (
            <Card key={pkg.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <StatusIcon className="h-5 w-5" />
                      <span className="font-semibold">{pkg.trackingNumber}</span>
                      <Badge className={statusColors[pkg.status as keyof typeof statusColors]}>
                        {pkg.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>收件人: {pkg.recipient}</p>
                      <p>目的地: {pkg.destination}</p>
                      <p>預計送達: {pkg.estimatedDelivery}</p>
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <p className="font-medium">當前位置</p>
                    <p className="text-muted-foreground">{pkg.currentLocation}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      更新時間: {pkg.lastUpdate}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">配送進度</span>
                    <span className="text-sm font-medium">{pkg.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${pkg.progress}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredPackages.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">找不到相關包裹</h3>
            <p className="text-muted-foreground">
              請檢查追蹤號碼是否正確，或嘗試其他搜尋條件
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

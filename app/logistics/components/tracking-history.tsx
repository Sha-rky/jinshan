"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { History, Search, Download, Calendar, Clock, MapPin } from 'lucide-react'
import logisticsData from "@/mock/logistics_data.json"

export function TrackingHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateRange, setDateRange] = useState("7days")
  const [history] = useState(logisticsData.trackingHistory)

  const filteredHistory = history.filter(record => {
    const matchesSearch = record.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.event.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const exportData = () => {
    // 模擬匯出功能
    console.log("匯出歷史數據...")
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            追蹤歷史
          </CardTitle>
          <CardDescription>
            查看完整的包裹配送歷史記錄和事件時間軸
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="搜尋追蹤號碼或事件..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="時間範圍" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1day">今天</SelectItem>
                <SelectItem value="7days">最近7天</SelectItem>
                <SelectItem value="30days">最近30天</SelectItem>
                <SelectItem value="90days">最近90天</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={exportData}>
              <Download className="h-4 w-4 mr-2" />
              匯出
            </Button>
            <Button>
              <Search className="h-4 w-4 mr-2" />
              搜尋
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredHistory.map((record) => (
          <Card key={record.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{record.trackingNumber}</Badge>
                    <Badge className={
                      record.type === "pickup" ? "bg-blue-100 text-blue-800" :
                      record.type === "transit" ? "bg-yellow-100 text-yellow-800" :
                      record.type === "delivery" ? "bg-green-100 text-green-800" :
                      "bg-red-100 text-red-800"
                    }>
                      {record.type === "pickup" ? "取件" :
                       record.type === "transit" ? "運送" :
                       record.type === "delivery" ? "配送" : "異常"}
                    </Badge>
                  </div>
                  <h3 className="font-semibold">{record.event}</h3>
                  <p className="text-sm text-muted-foreground">{record.description}</p>
                </div>
                <div className="text-right text-sm space-y-1">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{record.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{record.time}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{record.location}</span>
                  </div>
                </div>
              </div>
              
              {record.details && (
                <div className="mt-4 pt-4 border-t">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {Object.entries(record.details).map(([key, value]) => (
                      <div key={key}>
                        <span className="text-muted-foreground">{key}: </span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHistory.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <History className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">沒有找到歷史記錄</h3>
            <p className="text-muted-foreground">
              請嘗試調整搜尋條件或時間範圍
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

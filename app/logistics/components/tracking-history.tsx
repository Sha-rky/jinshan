"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, History, Package, Clock, MapPin, CheckCircle, AlertCircle, Calendar } from "lucide-react"

interface TrackingRecord {
  id: string
  trackingNumber: string
  timestamp: string
  location: string
  status: string
  description: string
  operator: string
  type: "pickup" | "transit" | "delivery" | "exception"
}

interface PackageHistory {
  trackingNumber: string
  sender: string
  recipient: string
  status: "delivered" | "in_transit" | "exception"
  createdDate: string
  deliveredDate?: string
  records: TrackingRecord[]
}

const mockHistory: PackageHistory[] = [
  {
    trackingNumber: "JS2024001234",
    sender: "金山農會",
    recipient: "王小明",
    status: "delivered",
    createdDate: "2024-01-14 09:00",
    deliveredDate: "2024-01-15 11:45",
    records: [
      {
        id: "1",
        trackingNumber: "JS2024001234",
        timestamp: "2024-01-15 11:45",
        location: "台北市中正區",
        status: "已送達",
        description: "包裹已成功送達收件人",
        operator: "配送員張三",
        type: "delivery",
      },
      {
        id: "2",
        trackingNumber: "JS2024001234",
        timestamp: "2024-01-15 10:30",
        location: "基隆配送中心",
        status: "配送中",
        description: "包裹已出庫，正在配送途中",
        operator: "系統自動",
        type: "transit",
      },
      {
        id: "3",
        trackingNumber: "JS2024001234",
        timestamp: "2024-01-14 16:20",
        location: "基隆轉運中心",
        status: "已到達",
        description: "包裹已到達轉運中心，等待分揀",
        operator: "轉運中心",
        type: "transit",
      },
      {
        id: "4",
        trackingNumber: "JS2024001234",
        timestamp: "2024-01-14 09:00",
        location: "金山農會",
        status: "已取件",
        description: "包裹已從寄件地點取件",
        operator: "取件員李四",
        type: "pickup",
      },
    ],
  },
  {
    trackingNumber: "JS2024001235",
    sender: "金山溫泉會館",
    recipient: "李美華",
    status: "in_transit",
    createdDate: "2024-01-15 08:30",
    records: [
      {
        id: "5",
        trackingNumber: "JS2024001235",
        timestamp: "2024-01-15 11:15",
        location: "淡水配送站",
        status: "配送中",
        description: "包裹已出庫，預計16:00送達",
        operator: "配送員王五",
        type: "delivery",
      },
      {
        id: "6",
        trackingNumber: "JS2024001235",
        timestamp: "2024-01-15 09:45",
        location: "淡水轉運中心",
        status: "已到達",
        description: "包裹已到達淡水轉運中心",
        operator: "轉運中心",
        type: "transit",
      },
      {
        id: "7",
        trackingNumber: "JS2024001235",
        timestamp: "2024-01-15 08:30",
        location: "金山溫泉會館",
        status: "已取件",
        description: "包裹已從寄件地點取件",
        operator: "取件員趙六",
        type: "pickup",
      },
    ],
  },
]

const getStatusColor = (status: PackageHistory["status"]) => {
  switch (status) {
    case "delivered":
      return "bg-green-500"
    case "in_transit":
      return "bg-blue-500"
    case "exception":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

const getStatusText = (status: PackageHistory["status"]) => {
  switch (status) {
    case "delivered":
      return "已送達"
    case "in_transit":
      return "運送中"
    case "exception":
      return "異常"
    default:
      return "未知"
  }
}

const getRecordIcon = (type: TrackingRecord["type"]) => {
  switch (type) {
    case "pickup":
      return <Package className="h-4 w-4" />
    case "transit":
      return <MapPin className="h-4 w-4" />
    case "delivery":
      return <CheckCircle className="h-4 w-4" />
    case "exception":
      return <AlertCircle className="h-4 w-4" />
    default:
      return <Clock className="h-4 w-4" />
  }
}

const getRecordColor = (type: TrackingRecord["type"]) => {
  switch (type) {
    case "pickup":
      return "text-blue-600"
    case "transit":
      return "text-yellow-600"
    case "delivery":
      return "text-green-600"
    case "exception":
      return "text-red-600"
    default:
      return "text-gray-600"
  }
}

export function TrackingHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedPackage, setSelectedPackage] = useState<PackageHistory | null>(null)

  const filteredHistory = mockHistory.filter((pkg) => {
    const matchesSearch =
      pkg.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.recipient.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || pkg.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            追蹤歷史
          </CardTitle>
          <CardDescription>查看所有包裹的詳細追蹤記錄和配送歷史</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜尋追蹤號碼、寄件人或收件人..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="選擇狀態" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部狀態</SelectItem>
                <SelectItem value="delivered">已送達</SelectItem>
                <SelectItem value="in_transit">運送中</SelectItem>
                <SelectItem value="exception">異常</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 包裹列表 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">包裹列表</h3>
          {filteredHistory.map((pkg) => (
            <Card
              key={pkg.trackingNumber}
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedPackage?.trackingNumber === pkg.trackingNumber ? "ring-2 ring-blue-500" : ""
              }`}
              onClick={() => setSelectedPackage(pkg)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono font-medium">{pkg.trackingNumber}</span>
                  <Badge className={`${getStatusColor(pkg.status)} text-white`}>{getStatusText(pkg.status)}</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">寄件人:</span>
                    <span>{pkg.sender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">收件人:</span>
                    <span>{pkg.recipient}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">建立時間:</span>
                    <span>{pkg.createdDate}</span>
                  </div>
                  {pkg.deliveredDate && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">送達時間:</span>
                      <span>{pkg.deliveredDate}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredHistory.length === 0 && (
            <Card>
              <CardContent className="py-8 text-center">
                <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">找不到符合條件的追蹤記錄</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* 詳細追蹤記錄 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">追蹤詳情</h3>
          {selectedPackage ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  {selectedPackage.trackingNumber}
                </CardTitle>
                <CardDescription>
                  {selectedPackage.sender} → {selectedPackage.recipient}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedPackage.records.map((record, index) => (
                    <div key={record.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`p-2 rounded-full bg-white border-2 ${getRecordColor(record.type)}`}>
                          {getRecordIcon(record.type)}
                        </div>
                        {index < selectedPackage.records.length - 1 && <div className="w-px h-8 bg-border mt-2"></div>}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{record.status}</span>
                          <Badge variant="outline" className="text-xs">
                            {record.location}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{record.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {record.timestamp}
                          </div>
                          <span>操作員: {record.operator}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">請選擇左側包裹查看詳細追蹤記錄</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

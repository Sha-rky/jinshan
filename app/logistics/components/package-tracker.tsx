"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Search, Package, MapPin, Clock, CheckCircle, AlertCircle, Truck } from "lucide-react"

interface PackageStatus {
  id: string
  trackingNumber: string
  status: "pending" | "picked_up" | "in_transit" | "out_for_delivery" | "delivered" | "delayed"
  sender: string
  recipient: string
  origin: string
  destination: string
  estimatedDelivery: string
  currentLocation: string
  progress: number
  lastUpdate: string
}

const mockPackages: PackageStatus[] = [
  {
    id: "1",
    trackingNumber: "JS2024001234",
    status: "in_transit",
    sender: "金山農會",
    recipient: "王小明",
    origin: "金山區",
    destination: "台北市中正區",
    estimatedDelivery: "2024-01-15 14:00",
    currentLocation: "基隆配送中心",
    progress: 65,
    lastUpdate: "2024-01-15 10:30",
  },
  {
    id: "2",
    trackingNumber: "JS2024001235",
    status: "out_for_delivery",
    sender: "金山溫泉會館",
    recipient: "李美華",
    origin: "金山區",
    destination: "新北市淡水區",
    estimatedDelivery: "2024-01-15 16:00",
    currentLocation: "淡水配送站",
    progress: 85,
    lastUpdate: "2024-01-15 11:15",
  },
  {
    id: "3",
    trackingNumber: "JS2024001236",
    status: "delivered",
    sender: "金山老街商家",
    recipient: "陳志強",
    origin: "金山區",
    destination: "台北市信義區",
    estimatedDelivery: "2024-01-15 12:00",
    currentLocation: "已送達",
    progress: 100,
    lastUpdate: "2024-01-15 11:45",
  },
  {
    id: "4",
    trackingNumber: "JS2024001237",
    status: "delayed",
    sender: "金山漁港",
    recipient: "張雅婷",
    origin: "金山區",
    destination: "桃園市中壢區",
    estimatedDelivery: "2024-01-15 18:00",
    currentLocation: "桃園轉運中心",
    progress: 45,
    lastUpdate: "2024-01-15 09:20",
  },
]

const getStatusColor = (status: PackageStatus["status"]) => {
  switch (status) {
    case "pending":
      return "bg-gray-500"
    case "picked_up":
      return "bg-blue-500"
    case "in_transit":
      return "bg-yellow-500"
    case "out_for_delivery":
      return "bg-orange-500"
    case "delivered":
      return "bg-green-500"
    case "delayed":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

const getStatusText = (status: PackageStatus["status"]) => {
  switch (status) {
    case "pending":
      return "待取件"
    case "picked_up":
      return "已取件"
    case "in_transit":
      return "運送中"
    case "out_for_delivery":
      return "配送中"
    case "delivered":
      return "已送達"
    case "delayed":
      return "延遲"
    default:
      return "未知"
  }
}

const getStatusIcon = (status: PackageStatus["status"]) => {
  switch (status) {
    case "pending":
      return <Clock className="h-4 w-4" />
    case "picked_up":
      return <Package className="h-4 w-4" />
    case "in_transit":
      return <Truck className="h-4 w-4" />
    case "out_for_delivery":
      return <MapPin className="h-4 w-4" />
    case "delivered":
      return <CheckCircle className="h-4 w-4" />
    case "delayed":
      return <AlertCircle className="h-4 w-4" />
    default:
      return <Package className="h-4 w-4" />
  }
}

export function PackageTracker() {
  const [searchTerm, setSearchTerm] = useState("")
  const [packages] = useState<PackageStatus[]>(mockPackages)

  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.recipient.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            包裹追蹤
          </CardTitle>
          <CardDescription>輸入追蹤號碼或搜尋寄件人/收件人資訊</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="輸入追蹤號碼、寄件人或收件人..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button>搜尋</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredPackages.map((pkg) => (
          <Card key={pkg.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge className={`${getStatusColor(pkg.status)} text-white`}>
                    {getStatusIcon(pkg.status)}
                    {getStatusText(pkg.status)}
                  </Badge>
                  <span className="font-mono text-sm font-medium">{pkg.trackingNumber}</span>
                </div>
                <span className="text-sm text-muted-foreground">最後更新: {pkg.lastUpdate}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">寄件人:</span>
                    <span>{pkg.sender}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">收件人:</span>
                    <span>{pkg.recipient}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">起點:</span>
                    <span>{pkg.origin}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">終點:</span>
                    <span>{pkg.destination}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">配送進度</span>
                  <span>{pkg.progress}%</span>
                </div>
                <Progress value={pkg.progress} className="h-2" />
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">目前位置:</span>
                  <span>{pkg.currentLocation}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">預計送達:</span>
                  <span>{pkg.estimatedDelivery}</span>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  查看詳情
                </Button>
                <Button variant="outline" size="sm">
                  聯絡客服
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPackages.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">找不到符合條件的包裹</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

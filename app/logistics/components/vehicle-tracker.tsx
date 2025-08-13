"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Truck, MapPin, Clock, Fuel, User, Phone, AlertTriangle, CheckCircle } from "lucide-react"

interface Vehicle {
  id: string
  plateNumber: string
  driverName: string
  driverPhone: string
  status: "active" | "idle" | "maintenance" | "offline"
  currentLocation: string
  destination: string
  progress: number
  fuelLevel: number
  packagesCount: number
  estimatedArrival: string
  lastUpdate: string
  route: string
}

const mockVehicles: Vehicle[] = [
  {
    id: "1",
    plateNumber: "ABC-1234",
    driverName: "張志明",
    driverPhone: "0912-345-678",
    status: "active",
    currentLocation: "基隆路二段",
    destination: "台北市中正區",
    progress: 75,
    fuelLevel: 85,
    packagesCount: 12,
    estimatedArrival: "2024-01-15 14:30",
    lastUpdate: "2024-01-15 13:15",
    route: "金山 → 基隆 → 台北",
  },
  {
    id: "2",
    plateNumber: "DEF-5678",
    driverName: "李美華",
    driverPhone: "0923-456-789",
    status: "active",
    currentLocation: "淡水區中正路",
    destination: "新北市板橋區",
    progress: 45,
    fuelLevel: 60,
    packagesCount: 8,
    estimatedArrival: "2024-01-15 15:45",
    lastUpdate: "2024-01-15 13:10",
    route: "金山 → 淡水 → 板橋",
  },
  {
    id: "3",
    plateNumber: "GHI-9012",
    driverName: "王大明",
    driverPhone: "0934-567-890",
    status: "idle",
    currentLocation: "金山配送中心",
    destination: "待分配",
    progress: 0,
    fuelLevel: 95,
    packagesCount: 0,
    estimatedArrival: "待分配",
    lastUpdate: "2024-01-15 12:45",
    route: "待分配",
  },
  {
    id: "4",
    plateNumber: "JKL-3456",
    driverName: "陳志強",
    driverPhone: "0945-678-901",
    status: "maintenance",
    currentLocation: "金山維修廠",
    destination: "維修中",
    progress: 0,
    fuelLevel: 30,
    packagesCount: 0,
    estimatedArrival: "維修中",
    lastUpdate: "2024-01-15 09:30",
    route: "維修中",
  },
]

const getStatusColor = (status: Vehicle["status"]) => {
  switch (status) {
    case "active":
      return "bg-green-500"
    case "idle":
      return "bg-yellow-500"
    case "maintenance":
      return "bg-red-500"
    case "offline":
      return "bg-gray-500"
    default:
      return "bg-gray-500"
  }
}

const getStatusText = (status: Vehicle["status"]) => {
  switch (status) {
    case "active":
      return "配送中"
    case "idle":
      return "待命"
    case "maintenance":
      return "維修中"
    case "offline":
      return "離線"
    default:
      return "未知"
  }
}

const getStatusIcon = (status: Vehicle["status"]) => {
  switch (status) {
    case "active":
      return <Truck className="h-4 w-4" />
    case "idle":
      return <Clock className="h-4 w-4" />
    case "maintenance":
      return <AlertTriangle className="h-4 w-4" />
    case "offline":
      return <CheckCircle className="h-4 w-4" />
    default:
      return <Truck className="h-4 w-4" />
  }
}

const getFuelColor = (level: number) => {
  if (level > 50) return "bg-green-500"
  if (level > 25) return "bg-yellow-500"
  return "bg-red-500"
}

export function VehicleTracker() {
  const [vehicles] = useState<Vehicle[]>(mockVehicles)

  const activeVehicles = vehicles.filter((v) => v.status === "active").length
  const totalPackages = vehicles.reduce((sum, v) => sum + v.packagesCount, 0)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{activeVehicles}</p>
                <p className="text-sm text-muted-foreground">配送中車輛</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{vehicles.length}</p>
                <p className="text-sm text-muted-foreground">總車輛數</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{totalPackages}</p>
                <p className="text-sm text-muted-foreground">運送包裹數</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            車輛監控
          </CardTitle>
          <CardDescription>即時監控所有配送車輛的位置和狀態</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge className={`${getStatusColor(vehicle.status)} text-white`}>
                    {getStatusIcon(vehicle.status)}
                    {getStatusText(vehicle.status)}
                  </Badge>
                  <span className="font-mono text-lg font-bold">{vehicle.plateNumber}</span>
                </div>
                <span className="text-sm text-muted-foreground">最後更新: {vehicle.lastUpdate}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">司機:</span>
                    <span>{vehicle.driverName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">聯絡電話:</span>
                    <span>{vehicle.driverPhone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">目前位置:</span>
                    <span>{vehicle.currentLocation}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">目的地:</span>
                    <span>{vehicle.destination}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">路線:</span>
                    <span>{vehicle.route}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">預計到達:</span>
                    <span>{vehicle.estimatedArrival}</span>
                  </div>
                </div>
              </div>

              {vehicle.status === "active" && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">配送進度</span>
                    <span>{vehicle.progress}%</span>
                  </div>
                  <Progress value={vehicle.progress} className="h-2" />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Fuel className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">油量</span>
                    </div>
                    <span>{vehicle.fuelLevel}%</span>
                  </div>
                  <Progress value={vehicle.fuelLevel} className="h-2" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">載運包裹:</span>
                  <Badge variant="outline">{vehicle.packagesCount} 件</Badge>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  查看路線
                </Button>
                <Button variant="outline" size="sm">
                  聯絡司機
                </Button>
                {vehicle.status === "active" && <Button size="sm">即時追蹤</Button>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

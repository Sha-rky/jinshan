"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Truck, MapPin, Clock, Fuel, User, RefreshCw } from 'lucide-react'
import logisticsData from "@/mock/logistics_data.json"

const statusColors = {
  "配送中": "bg-green-100 text-green-800",
  "待命": "bg-blue-100 text-blue-800",
  "維修中": "bg-red-100 text-red-800",
  "休息": "bg-gray-100 text-gray-800"
}

export function VehicleTracker() {
  const [vehicles] = useState(logisticsData.vehicles)
  const [statusFilter, setStatusFilter] = useState("all")
  const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleTimeString())

  const filteredVehicles = vehicles.filter(vehicle => 
    statusFilter === "all" || vehicle.status === statusFilter
  )

  const handleRefresh = () => {
    setLastUpdate(new Date().toLocaleTimeString())
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="h-5 w-5" />
            載具監控
          </CardTitle>
          <CardDescription>
            即時監控所有配送車輛的位置和狀態
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="選擇狀態" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部狀態</SelectItem>
                  <SelectItem value="配送中">配送中</SelectItem>
                  <SelectItem value="待命">待命</SelectItem>
                  <SelectItem value="維修中">維修中</SelectItem>
                  <SelectItem value="休息">休息</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                最後更新: {lastUpdate}
              </span>
              <Button variant="outline" size="sm" onClick={handleRefresh}>
                <RefreshCw className="h-4 w-4 mr-2" />
                重新整理
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredVehicles.map((vehicle) => (
          <Card key={vehicle.id}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  {vehicle.vehicleNumber}
                </CardTitle>
                <Badge className={statusColors[vehicle.status as keyof typeof statusColors]}>
                  {vehicle.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>司機: {vehicle.driver}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>位置: {vehicle.currentLocation}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>更新: {vehicle.lastUpdate}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Fuel className="h-4 w-4 text-muted-foreground" />
                  <span>油量: {vehicle.fuelLevel}%</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>載貨量</span>
                  <span>{vehicle.loadCapacity}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${vehicle.loadCapacity}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>油量</span>
                  <span>{vehicle.fuelLevel}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      vehicle.fuelLevel > 50 ? 'bg-green-600' : 
                      vehicle.fuelLevel > 20 ? 'bg-yellow-600' : 'bg-red-600'
                    }`}
                    style={{ width: `${vehicle.fuelLevel}%` }}
                  ></div>
                </div>
              </div>

              {vehicle.route && (
                <div className="pt-2 border-t">
                  <p className="text-sm font-medium mb-1">當前路線</p>
                  <p className="text-sm text-muted-foreground">{vehicle.route}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVehicles.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Truck className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">沒有符合條件的車輛</h3>
            <p className="text-muted-foreground">
              請嘗試調整篩選條件
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

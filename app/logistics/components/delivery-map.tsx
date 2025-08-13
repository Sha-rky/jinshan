"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Map, MapPin, Truck, Package, Navigation, Layers, Filter } from "lucide-react"

interface MapLocation {
  id: string
  name: string
  type: "depot" | "vehicle" | "delivery_point" | "pickup_point"
  coordinates: { lat: number; lng: number }
  status: string
  details: string
}

const mockLocations: MapLocation[] = [
  {
    id: "1",
    name: "金山配送中心",
    type: "depot",
    coordinates: { lat: 25.2232, lng: 121.6385 },
    status: "營運中",
    details: "主要配送中心，24小時營運",
  },
  {
    id: "2",
    name: "配送車輛 ABC-1234",
    type: "vehicle",
    coordinates: { lat: 25.0478, lng: 121.517 },
    status: "配送中",
    details: "載運12件包裹，預計14:30到達",
  },
  {
    id: "3",
    name: "台北市政府",
    type: "delivery_point",
    coordinates: { lat: 25.0408, lng: 121.5598 },
    status: "待配送",
    details: "3件包裹待送達",
  },
  {
    id: "4",
    name: "淡水老街",
    type: "pickup_point",
    coordinates: { lat: 25.1677, lng: 121.4406 },
    status: "已取件",
    details: "5件包裹已取件",
  },
  {
    id: "5",
    name: "配送車輛 DEF-5678",
    type: "vehicle",
    coordinates: { lat: 25.1677, lng: 121.4406 },
    status: "配送中",
    details: "載運8件包裹，預計15:45到達",
  },
]

const getLocationIcon = (type: MapLocation["type"]) => {
  switch (type) {
    case "depot":
      return <Map className="h-4 w-4" />
    case "vehicle":
      return <Truck className="h-4 w-4" />
    case "delivery_point":
      return <MapPin className="h-4 w-4" />
    case "pickup_point":
      return <Package className="h-4 w-4" />
    default:
      return <MapPin className="h-4 w-4" />
  }
}

const getLocationColor = (type: MapLocation["type"]) => {
  switch (type) {
    case "depot":
      return "bg-blue-500"
    case "vehicle":
      return "bg-green-500"
    case "delivery_point":
      return "bg-orange-500"
    case "pickup_point":
      return "bg-purple-500"
    default:
      return "bg-gray-500"
  }
}

const getLocationTypeText = (type: MapLocation["type"]) => {
  switch (type) {
    case "depot":
      return "配送中心"
    case "vehicle":
      return "配送車輛"
    case "delivery_point":
      return "配送點"
    case "pickup_point":
      return "取件點"
    default:
      return "未知"
  }
}

export function DeliveryMap() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all")
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null)

  const filteredLocations =
    selectedFilter === "all" ? mockLocations : mockLocations.filter((loc) => loc.type === selectedFilter)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Map className="h-5 w-5" />
            配送地圖
          </CardTitle>
          <CardDescription>即時顯示所有配送車輛、配送點和取件點位置</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-4">
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="選擇篩選條件" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">顯示全部</SelectItem>
                <SelectItem value="depot">配送中心</SelectItem>
                <SelectItem value="vehicle">配送車輛</SelectItem>
                <SelectItem value="delivery_point">配送點</SelectItem>
                <SelectItem value="pickup_point">取件點</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Navigation className="h-4 w-4 mr-2" />
              重新定位
            </Button>
            <Button variant="outline">
              <Layers className="h-4 w-4 mr-2" />
              圖層設定
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 地圖區域 */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <div className="h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center relative overflow-hidden">
                {/* 模擬地圖背景 */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-4 left-4 w-32 h-24 bg-green-200 rounded"></div>
                  <div className="absolute top-12 right-8 w-24 h-16 bg-blue-200 rounded"></div>
                  <div className="absolute bottom-8 left-12 w-28 h-20 bg-yellow-200 rounded"></div>
                  <div className="absolute bottom-4 right-4 w-20 h-24 bg-purple-200 rounded"></div>
                </div>

                {/* 地圖標記點 */}
                {filteredLocations.map((location, index) => (
                  <div
                    key={location.id}
                    className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110 ${
                      selectedLocation?.id === location.id ? "scale-125 z-10" : ""
                    }`}
                    style={{
                      left: `${20 + ((index * 15) % 60)}%`,
                      top: `${20 + ((index * 20) % 60)}%`,
                    }}
                    onClick={() => setSelectedLocation(location)}
                  >
                    <div className={`${getLocationColor(location.type)} text-white p-2 rounded-full shadow-lg`}>
                      {getLocationIcon(location.type)}
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded shadow text-xs whitespace-nowrap">
                      {location.name}
                    </div>
                  </div>
                ))}

                {/* 地圖中心提示 */}
                <div className="text-center text-muted-foreground">
                  <Map className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">金山地區配送地圖</p>
                  <p className="text-xs">點擊標記查看詳細資訊</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 側邊資訊面板 */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">圖例說明</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 text-white p-1 rounded">
                  <Map className="h-4 w-4" />
                </div>
                <span className="text-sm">配送中心</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-green-500 text-white p-1 rounded">
                  <Truck className="h-4 w-4" />
                </div>
                <span className="text-sm">配送車輛</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-orange-500 text-white p-1 rounded">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="text-sm">配送點</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-purple-500 text-white p-1 rounded">
                  <Package className="h-4 w-4" />
                </div>
                <span className="text-sm">取件點</span>
              </div>
            </CardContent>
          </Card>

          {selectedLocation && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  {getLocationIcon(selectedLocation.type)}
                  位置詳情
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium">{selectedLocation.name}</p>
                  <Badge className={`${getLocationColor(selectedLocation.type)} text-white mt-1`}>
                    {getLocationTypeText(selectedLocation.type)}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">狀態: </span>
                    <span>{selectedLocation.status}</span>
                  </div>
                  <div>
                    <span className="font-medium">詳情: </span>
                    <span>{selectedLocation.details}</span>
                  </div>
                  <div>
                    <span className="font-medium">座標: </span>
                    <span className="font-mono text-xs">
                      {selectedLocation.coordinates.lat.toFixed(4)}, {selectedLocation.coordinates.lng.toFixed(4)}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline">
                    導航
                  </Button>
                  <Button size="sm" variant="outline">
                    詳情
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">即時統計</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>配送中心:</span>
                <span className="font-medium">{mockLocations.filter((l) => l.type === "depot").length} 個</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>配送車輛:</span>
                <span className="font-medium">{mockLocations.filter((l) => l.type === "vehicle").length} 輛</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>配送點:</span>
                <span className="font-medium">
                  {mockLocations.filter((l) => l.type === "delivery_point").length} 個
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>取件點:</span>
                <span className="font-medium">{mockLocations.filter((l) => l.type === "pickup_point").length} 個</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

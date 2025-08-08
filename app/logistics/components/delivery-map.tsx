"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Map, MapPin, Truck, Package, RefreshCw, ZoomIn, ZoomOut } from 'lucide-react'
import logisticsData from "@/mock/logistics_data.json"

export function DeliveryMap() {
  const [mapView, setMapView] = useState("all")
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [vehicles] = useState(logisticsData.vehicles)
  const [packages] = useState(logisticsData.packages)

  const getItemsToShow = () => {
    switch (mapView) {
      case "vehicles":
        return vehicles.map(v => ({ ...v, type: "vehicle" }))
      case "packages":
        return packages.map(p => ({ ...p, type: "package" }))
      default:
        return [
          ...vehicles.map(v => ({ ...v, type: "vehicle" })),
          ...packages.map(p => ({ ...p, type: "package" }))
        ]
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Map className="h-5 w-5" />
            配送地圖
          </CardTitle>
          <CardDescription>
            即時顯示所有車輛和包裹的位置信息
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <Select value={mapView} onValueChange={setMapView}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="選擇顯示項目" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部顯示</SelectItem>
                <SelectItem value="vehicles">僅顯示車輛</SelectItem>
                <SelectItem value="packages">僅顯示包裹</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <div className="relative h-[600px] bg-gray-100 rounded-lg overflow-hidden">
                {/* 模擬地圖背景 */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
                  <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 400 300">
                      {/* 模擬道路 */}
                      <path d="M0,150 Q100,100 200,150 T400,150" stroke="#94a3b8" strokeWidth="4" fill="none" />
                      <path d="M200,0 Q150,100 200,200 T200,300" stroke="#94a3b8" strokeWidth="4" fill="none" />
                    </svg>
                  </div>
                </div>

                {/* 顯示車輛和包裹位置 */}
                {getItemsToShow().map((item, index) => (
                  <div
                    key={`${item.type}-${item.id}`}
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
                    style={{
                      left: `${20 + (index * 15) % 80}%`,
                      top: `${20 + (index * 20) % 60}%`
                    }}
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="relative">
                      {item.type === "vehicle" ? (
                        <div className="bg-blue-600 text-white p-2 rounded-full shadow-lg">
                          <Truck className="h-4 w-4" />
                        </div>
                      ) : (
                        <div className="bg-orange-600 text-white p-2 rounded-full shadow-lg">
                          <Package className="h-4 w-4" />
                        </div>
                      )}
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs whitespace-nowrap">
                        {item.type === "vehicle" ? item.vehicleNumber : item.trackingNumber}
                      </div>
                    </div>
                  </div>
                ))}

                {/* 圖例 */}
                <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-lg">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="bg-blue-600 p-1 rounded-full">
                        <Truck className="h-3 w-3 text-white" />
                      </div>
                      <span>配送車輛</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="bg-orange-600 p-1 rounded-full">
                        <Package className="h-3 w-3 text-white" />
                      </div>
                      <span>包裹位置</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">即時統計</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">活躍車輛</span>
                <span className="font-semibold">{vehicles.filter(v => v.status === "配送中").length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">運送中包裹</span>
                <span className="font-semibold">{packages.filter(p => p.status === "運送中").length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">今日配送</span>
                <span className="font-semibold">{packages.filter(p => p.status === "已送達").length}</span>
              </div>
            </CardContent>
          </Card>

          {selectedItem && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  {selectedItem.type === "vehicle" ? (
                    <Truck className="h-5 w-5" />
                  ) : (
                    <Package className="h-5 w-5" />
                  )}
                  詳細資訊
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedItem.type === "vehicle" ? (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">車輛編號</p>
                      <p className="font-semibold">{selectedItem.vehicleNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">司機</p>
                      <p className="font-semibold">{selectedItem.driver}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">狀態</p>
                      <Badge className="mt-1">{selectedItem.status}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">當前位置</p>
                      <p className="font-semibold">{selectedItem.currentLocation}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">追蹤號碼</p>
                      <p className="font-semibold">{selectedItem.trackingNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">收件人</p>
                      <p className="font-semibold">{selectedItem.recipient}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">狀態</p>
                      <Badge className="mt-1">{selectedItem.status}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">目的地</p>
                      <p className="font-semibold">{selectedItem.destination}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

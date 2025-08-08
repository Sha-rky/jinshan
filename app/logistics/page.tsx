"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PackageTracker } from "./components/package-tracker"
import { VehicleTracker } from "./components/vehicle-tracker"
import { DeliveryMap } from "./components/delivery-map"
import { TrackingHistory } from "./components/tracking-history"
import { NotificationSettings } from "./components/notification-settings"
import { Package, Truck, Map, History, Settings } from 'lucide-react'

export default function LogisticsPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center gap-2">
        <Package className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold">物流追蹤系統</h1>
          <p className="text-muted-foreground">即時追蹤包裹配送狀態和車輛位置</p>
        </div>
      </div>

      <Tabs defaultValue="packages" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="packages" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            包裹追蹤
          </TabsTrigger>
          <TabsTrigger value="vehicles" className="flex items-center gap-2">
            <Truck className="h-4 w-4" />
            載具監控
          </TabsTrigger>
          <TabsTrigger value="map" className="flex items-center gap-2">
            <Map className="h-4 w-4" />
            配送地圖
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            追蹤歷史
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            通知設定
          </TabsTrigger>
        </TabsList>

        <TabsContent value="packages">
          <PackageTracker />
        </TabsContent>

        <TabsContent value="vehicles">
          <VehicleTracker />
        </TabsContent>

        <TabsContent value="map">
          <DeliveryMap />
        </TabsContent>

        <TabsContent value="history">
          <TrackingHistory />
        </TabsContent>

        <TabsContent value="settings">
          <NotificationSettings />
        </TabsContent>
      </Tabs>
    </div>
  )
}

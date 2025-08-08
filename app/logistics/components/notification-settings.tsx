"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Settings, Bell, Mail, MessageSquare, Clock } from 'lucide-react'

export function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    deliveryUpdates: true,
    delayAlerts: true,
    completionNotice: true,
    quietHours: true,
    quietStart: "22:00",
    quietEnd: "08:00",
    frequency: "immediate"
  })

  const updateSetting = (key: string, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const saveSettings = () => {
    console.log("儲存通知設定:", settings)
    // 這裡會實際儲存設定到後端
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            通知設定
          </CardTitle>
          <CardDescription>
            自訂您的通知偏好和接收方式
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="h-5 w-5" />
            通知方式
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                電子郵件通知
              </Label>
              <p className="text-sm text-muted-foreground">
                透過電子郵件接收配送更新
              </p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => updateSetting("emailNotifications", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                簡訊通知
              </Label>
              <p className="text-sm text-muted-foreground">
                透過簡訊接收重要更新
              </p>
            </div>
            <Switch
              checked={settings.smsNotifications}
              onCheckedChange={(checked) => updateSetting("smsNotifications", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>推播通知</Label>
              <p className="text-sm text-muted-foreground">
                在應用程式中顯示推播通知
              </p>
            </div>
            <Switch
              checked={settings.pushNotifications}
              onCheckedChange={(checked) => updateSetting("pushNotifications", checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">通知內容</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>配送狀態更新</Label>
              <p className="text-sm text-muted-foreground">
                包裹狀態變更時通知
              </p>
            </div>
            <Switch
              checked={settings.deliveryUpdates}
              onCheckedChange={(checked) => updateSetting("deliveryUpdates", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>延遲警告</Label>
              <p className="text-sm text-muted-foreground">
                配送延遲時發送警告
              </p>
            </div>
            <Switch
              checked={settings.delayAlerts}
              onCheckedChange={(checked) => updateSetting("delayAlerts", checked)}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>完成通知</Label>
              <p className="text-sm text-muted-foreground">
                包裹送達時通知
              </p>
            </div>
            <Switch
              checked={settings.completionNotice}
              onCheckedChange={(checked) => updateSetting("completionNotice", checked)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5" />
            通知時間設定
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>安靜時間</Label>
              <p className="text-sm text-muted-foreground">
                在指定時間內暫停通知
              </p>
            </div>
            <Switch
              checked={settings.quietHours}
              onCheckedChange={(checked) => updateSetting("quietHours", checked)}
            />
          </div>

          {settings.quietHours && (
            <>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>開始時間</Label>
                  <Select value={settings.quietStart} onValueChange={(value) => updateSetting("quietStart", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => {
                        const hour = i.toString().padStart(2, '0')
                        return (
                          <SelectItem key={hour} value={`${hour}:00`}>
                            {hour}:00
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>結束時間</Label>
                  <Select value={settings.quietEnd} onValueChange={(value) => updateSetting("quietEnd", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => {
                        const hour = i.toString().padStart(2, '0')
                        return (
                          <SelectItem key={hour} value={`${hour}:00`}>
                            {hour}:00
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}

          <Separator />

          <div className="space-y-2">
            <Label>通知頻率</Label>
            <Select value={settings.frequency} onValueChange={(value) => updateSetting("frequency", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">立即通知</SelectItem>
                <SelectItem value="hourly">每小時彙整</SelectItem>
                <SelectItem value="daily">每日彙整</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-end gap-4">
            <Button variant="outline">重設為預設值</Button>
            <Button onClick={saveSettings}>儲存設定</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

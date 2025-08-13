"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  HelpCircle,
  Info,
  Camera,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Trash2,
  Download,
  Upload,
} from "lucide-react"

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: "王小明",
    email: "wang.xiaoming@example.com",
    phone: "0912-345-678",
    address: "新北市金山區中山路123號",
    avatar: "/placeholder-user.jpg",
  })

  const [preferences, setPreferences] = useState({
    language: "zh-TW",
    theme: "system",
    notifications: true,
    locationServices: true,
    dataSync: true,
    autoUpdate: true,
  })

  const [privacy, setPrivacy] = useState({
    shareLocation: true,
    shareUsageData: false,
    marketingEmails: true,
    thirdPartySharing: false,
  })

  const updateProfile = (key: string, value: string) => {
    setProfile((prev) => ({ ...prev, [key]: value }))
  }

  const updatePreferences = (key: string, value: boolean | string) => {
    setPreferences((prev) => ({ ...prev, [key]: value }))
  }

  const updatePrivacy = (key: string, value: boolean) => {
    setPrivacy((prev) => ({ ...prev, [key]: value }))
  }

  const saveSettings = () => {
    console.log("儲存設定:", { profile, preferences, privacy })
    // 實際儲存邏輯
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Settings className="h-6 w-6" />
        <h1 className="text-2xl font-bold">設定</h1>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            個人資料
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            偏好設定
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            通知設定
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            隱私安全
          </TabsTrigger>
          <TabsTrigger value="about" className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            關於
          </TabsTrigger>
        </TabsList>

        {/* 個人資料 */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>個人資料</CardTitle>
              <CardDescription>管理您的個人資訊和帳戶設定</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 頭像 */}
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                  <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">
                    <Camera className="h-4 w-4 mr-2" />
                    更換頭像
                  </Button>
                  <p className="text-sm text-muted-foreground">支援 JPG、PNG 格式，檔案大小不超過 2MB</p>
                </div>
              </div>

              <Separator />

              {/* 基本資訊 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">姓名</Label>
                  <Input id="name" value={profile.name} onChange={(e) => updateProfile("name", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">電子郵件</Label>
                  <div className="flex gap-2">
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => updateProfile("email", e.target.value)}
                    />
                    <Badge variant="secondary">已驗證</Badge>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">手機號碼</Label>
                  <Input id="phone" value={profile.phone} onChange={(e) => updateProfile("phone", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">地址</Label>
                  <Input
                    id="address"
                    value={profile.address}
                    onChange={(e) => updateProfile("address", e.target.value)}
                  />
                </div>
              </div>

              <Separator />

              {/* 帳戶管理 */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">帳戶管理</h3>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline">
                    <CreditCard className="h-4 w-4 mr-2" />
                    付款方式
                  </Button>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    匯出資料
                  </Button>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    匯入資料
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    刪除帳戶
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 偏好設定 */}
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>應用程式偏好</CardTitle>
              <CardDescription>自訂您的應用程式體驗</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    語言
                  </Label>
                  <Select value={preferences.language} onValueChange={(value) => updatePreferences("language", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zh-TW">繁體中文</SelectItem>
                      <SelectItem value="zh-CN">简体中文</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ja">日本語</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Palette className="h-4 w-4" />
                    主題
                  </Label>
                  <Select value={preferences.theme} onValueChange={(value) => updatePreferences("theme", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">淺色模式</SelectItem>
                      <SelectItem value="dark">深色模式</SelectItem>
                      <SelectItem value="system">跟隨系統</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">功能設定</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>位置服務</Label>
                      <p className="text-sm text-muted-foreground">允許應用程式使用您的位置資訊</p>
                    </div>
                    <Switch
                      checked={preferences.locationServices}
                      onCheckedChange={(checked) => updatePreferences("locationServices", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>資料同步</Label>
                      <p className="text-sm text-muted-foreground">在不同裝置間同步您的資料</p>
                    </div>
                    <Switch
                      checked={preferences.dataSync}
                      onCheckedChange={(checked) => updatePreferences("dataSync", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>自動更新</Label>
                      <p className="text-sm text-muted-foreground">自動下載並安裝應用程式更新</p>
                    </div>
                    <Switch
                      checked={preferences.autoUpdate}
                      onCheckedChange={(checked) => updatePreferences("autoUpdate", checked)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 通知設定 */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>通知偏好</CardTitle>
              <CardDescription>管理您接收通知的方式和時間</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    <Bell className="h-4 w-4" />
                    推播通知
                  </Label>
                  <p className="text-sm text-muted-foreground">接收重要更新和提醒</p>
                </div>
                <Switch
                  checked={preferences.notifications}
                  onCheckedChange={(checked) => updatePreferences("notifications", checked)}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">通知類型</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">交通更新</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">班次提醒</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">優惠活動</Label>
                      <Switch />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">物流狀態</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">點數變動</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">系統維護</Label>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">安靜時間</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>開始時間</Label>
                    <Select defaultValue="22:00">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => {
                          const hour = i.toString().padStart(2, "0")
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
                    <Select defaultValue="08:00">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => {
                          const hour = i.toString().padStart(2, "0")
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 隱私安全 */}
        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>隱私與安全</CardTitle>
              <CardDescription>控制您的資料隱私和帳戶安全</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">資料隱私</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>分享位置資訊</Label>
                      <p className="text-sm text-muted-foreground">允許與其他用戶分享您的位置</p>
                    </div>
                    <Switch
                      checked={privacy.shareLocation}
                      onCheckedChange={(checked) => updatePrivacy("shareLocation", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>使用資料分析</Label>
                      <p className="text-sm text-muted-foreground">協助改善應用程式體驗</p>
                    </div>
                    <Switch
                      checked={privacy.shareUsageData}
                      onCheckedChange={(checked) => updatePrivacy("shareUsageData", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>行銷郵件</Label>
                      <p className="text-sm text-muted-foreground">接收產品更新和優惠資訊</p>
                    </div>
                    <Switch
                      checked={privacy.marketingEmails}
                      onCheckedChange={(checked) => updatePrivacy("marketingEmails", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>第三方資料分享</Label>
                      <p className="text-sm text-muted-foreground">與合作夥伴分享匿名化資料</p>
                    </div>
                    <Switch
                      checked={privacy.thirdPartySharing}
                      onCheckedChange={(checked) => updatePrivacy("thirdPartySharing", checked)}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">帳戶安全</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Shield className="h-4 w-4 mr-2" />
                    變更密碼
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Phone className="h-4 w-4 mr-2" />
                    雙重驗證
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Mail className="h-4 w-4 mr-2" />
                    登入記錄
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 關於 */}
        <TabsContent value="about" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>關於金山智慧平台</CardTitle>
              <CardDescription>應用程式資訊和支援</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <MapPin className="h-8 w-8 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">金山智慧平台</h3>
                  <p className="text-muted-foreground">版本 1.0.0</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">應用程式資訊</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label>版本號</Label>
                    <p className="text-muted-foreground">1.0.0 (Build 100)</p>
                  </div>
                  <div>
                    <Label>更新日期</Label>
                    <p className="text-muted-foreground">2024年1月15日</p>
                  </div>
                  <div>
                    <Label>開發商</Label>
                    <p className="text-muted-foreground">金山區公所</p>
                  </div>
                  <div>
                    <Label>授權</Label>
                    <p className="text-muted-foreground">MIT License</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">支援與幫助</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    使用說明
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Mail className="h-4 w-4 mr-2" />
                    聯絡客服
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Info className="h-4 w-4 mr-2" />
                    隱私政策
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Shield className="h-4 w-4 mr-2" />
                    服務條款
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="text-center text-sm text-muted-foreground">
                <p>© 2024 金山區公所. 版權所有.</p>
                <p>致力於提供便民的智慧交通服務</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 儲存按鈕 */}
      <div className="flex justify-end gap-4">
        <Button variant="outline">重設</Button>
        <Button onClick={saveSettings}>儲存變更</Button>
      </div>
    </div>
  )
}

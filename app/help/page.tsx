"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  HelpCircle,
  Search,
  BookOpen,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Bus,
  Bike,
  Plane,
  Package,
  Leaf,
  Gift,
  Users,
  ChevronRight,
  ExternalLink,
  Download,
  Play,
  FileText,
  Clock,
  Star,
  CheckCircle,
} from "lucide-react"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const helpCategories = [
    { id: "getting-started", name: "快速入門", icon: BookOpen, color: "bg-blue-500" },
    { id: "transportation", name: "交通服務", icon: Bus, color: "bg-green-500" },
    { id: "travel", name: "旅遊規劃", icon: Plane, color: "bg-purple-500" },
    { id: "logistics", name: "物流追蹤", icon: Package, color: "bg-orange-500" },
    { id: "carbon", name: "碳足跡", icon: Leaf, color: "bg-emerald-500" },
    { id: "discounts", name: "在地優惠", icon: Gift, color: "bg-pink-500" },
    { id: "account", name: "帳戶管理", icon: Users, color: "bg-indigo-500" },
  ]

  const quickGuides = [
    {
      title: "如何註冊帳戶",
      description: "建立您的金山智慧平台帳戶",
      duration: "2 分鐘",
      steps: 4,
      category: "getting-started",
    },
    {
      title: "查詢公車時刻表",
      description: "快速找到您需要的公車資訊",
      duration: "1 分鐘",
      steps: 3,
      category: "transportation",
    },
    {
      title: "預訂接駁車服務",
      description: "預約便民接駁車服務",
      duration: "3 分鐘",
      steps: 5,
      category: "transportation",
    },
    {
      title: "規劃旅遊行程",
      description: "使用AI助手規劃完美行程",
      duration: "5 分鐘",
      steps: 6,
      category: "travel",
    },
  ]

  const faqData = [
    {
      category: "getting-started",
      questions: [
        {
          q: "如何開始使用金山智慧平台？",
          a: "首先下載應用程式並註冊帳戶。完成手機號碼驗證後，您就可以開始使用所有服務功能。建議先完善個人資料，以獲得更好的服務體驗。",
        },
        {
          q: "忘記密碼怎麼辦？",
          a: "在登入頁面點擊「忘記密碼」，輸入您的註冊手機號碼或電子郵件，系統會發送重設密碼的連結給您。",
        },
        {
          q: "可以在多個裝置上使用同一個帳戶嗎？",
          a: "可以的。您可以在手機、平板和電腦上使用同一個帳戶，資料會自動同步。",
        },
      ],
    },
    {
      category: "transportation",
      questions: [
        {
          q: "如何查詢即時公車資訊？",
          a: "進入「公車」頁面，輸入起點和終點，系統會顯示所有可用路線和即時到站時間。您也可以收藏常用路線以便快速查詢。",
        },
        {
          q: "YouBike站點資訊準確嗎？",
          a: "我們的YouBike資訊每30秒更新一次，包含可借車輛數和可還車位數。資料來源為YouBike官方API，確保準確性。",
        },
        {
          q: "接駁車服務如何預約？",
          a: "在「接駁車」頁面選擇服務類型，填寫出發地、目的地和時間，選擇合適的司機後確認預約。系統會發送確認通知。",
        },
      ],
    },
    {
      category: "travel",
      questions: [
        {
          q: "AI旅遊規劃如何使用？",
          a: "在「旅遊規劃」頁面輸入您的偏好（預算、天數、興趣等），AI會為您推薦景點、住宿和交通方案，並生成完整行程。",
        },
        {
          q: "可以修改AI推薦的行程嗎？",
          a: "當然可以。您可以新增、刪除或調整行程中的任何項目，系統會自動重新計算時間和路線。",
        },
        {
          q: "農村體驗活動如何預訂？",
          a: "瀏覽「農村體驗」頁面的活動列表，選擇感興趣的體驗，查看詳細資訊後點擊預訂，填寫參與人數和聯絡資訊即可。",
        },
      ],
    },
    {
      category: "logistics",
      questions: [
        {
          q: "如何追蹤包裹狀態？",
          a: "在「物流追蹤」頁面輸入追蹤號碼，系統會顯示包裹的即時位置和配送狀態。您也可以設定到貨通知。",
        },
        {
          q: "支援哪些物流公司？",
          a: "目前支援中華郵政、黑貓宅急便、新竹物流等主要物流業者，持續新增更多合作夥伴。",
        },
      ],
    },
    {
      category: "carbon",
      questions: [
        {
          q: "碳足跡點數如何計算？",
          a: "根據您使用的交通方式計算碳排放量，選擇低碳交通可獲得點數。例如：搭乘大眾運輸、騎YouBike、步行等都能累積點數。",
        },
        {
          q: "點數可以兌換什麼？",
          a: "點數可在「獎勵商店」兌換優惠券、環保商品或參與抽獎活動。也可以捐贈給環保公益組織。",
        },
      ],
    },
    {
      category: "discounts",
      questions: [
        {
          q: "如何使用在地優惠？",
          a: "在「在地優惠」頁面瀏覽可用優惠，點擊「使用優惠」生成QR Code，在合作商家出示即可享受折扣。",
        },
        {
          q: "優惠券有使用期限嗎？",
          a: "是的，每張優惠券都有有效期限，請在期限內使用。過期的優惠券會自動從錢包中移除。",
        },
      ],
    },
  ]

  const contactOptions = [
    {
      title: "客服專線",
      description: "週一至週五 09:00-18:00",
      contact: "02-2498-5965",
      icon: Phone,
      action: "撥打電話",
    },
    {
      title: "電子郵件",
      description: "24小時內回覆",
      contact: "support@jinshan.gov.tw",
      icon: Mail,
      action: "發送郵件",
    },
    {
      title: "線上客服",
      description: "即時線上協助",
      contact: "點擊開始對話",
      icon: MessageCircle,
      action: "開始對話",
    },
    {
      title: "服務中心",
      description: "親臨現場諮詢",
      contact: "新北市金山區中山路123號",
      icon: MapPin,
      action: "查看地圖",
    },
  ]

  const filteredFAQ = faqData.filter((category) =>
    selectedCategory === "all" ? true : category.category === selectedCategory,
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <HelpCircle className="h-6 w-6" />
        <h1 className="text-2xl font-bold">幫助中心</h1>
      </div>

      {/* 搜尋區域 */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜尋幫助內容..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="guides" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="guides">快速指南</TabsTrigger>
          <TabsTrigger value="faq">常見問題</TabsTrigger>
          <TabsTrigger value="tutorials">教學影片</TabsTrigger>
          <TabsTrigger value="contact">聯絡我們</TabsTrigger>
        </TabsList>

        {/* 快速指南 */}
        <TabsContent value="guides" className="space-y-6">
          {/* 功能分類 */}
          <Card>
            <CardHeader>
              <CardTitle>功能分類</CardTitle>
              <CardDescription>選擇您需要幫助的功能類別</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {helpCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant="outline"
                    className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <div className={`p-2 rounded-full ${category.color}`}>
                      <category.icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xs text-center">{category.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 快速指南 */}
          <Card>
            <CardHeader>
              <CardTitle>快速指南</CardTitle>
              <CardDescription>跟著步驟快速上手各項功能</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickGuides.map((guide, index) => (
                  <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium">{guide.title}</h3>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{guide.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {guide.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          {guide.steps} 個步驟
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 熱門功能說明 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bus className="h-5 w-5 text-blue-500" />
                  <CardTitle className="text-lg">公車查詢</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">查詢即時公車資訊和路線規劃</p>
                <ul className="text-sm space-y-1">
                  <li>• 即時到站時間</li>
                  <li>• 路線規劃建議</li>
                  <li>• 收藏常用路線</li>
                  <li>• 站牌地圖導航</li>
                </ul>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  查看詳細說明
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bike className="h-5 w-5 text-green-500" />
                  <CardTitle className="text-lg">YouBike</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">尋找附近的YouBike站點</p>
                <ul className="text-sm space-y-1">
                  <li>• 站點即時資訊</li>
                  <li>• 可借還車數量</li>
                  <li>• 路線導航</li>
                  <li>• 使用記錄</li>
                </ul>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  查看詳細說明
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-emerald-500" />
                  <CardTitle className="text-lg">碳足跡追蹤</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">記錄您的環保行為並獲得獎勵</p>
                <ul className="text-sm space-y-1">
                  <li>• 自動記錄碳排放</li>
                  <li>• 累積環保點數</li>
                  <li>• 參與環保挑戰</li>
                  <li>• 兌換獎勵</li>
                </ul>
                <Button variant="outline" size="sm" className="w-full bg-transparent">
                  查看詳細說明
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 常見問題 */}
        <TabsContent value="faq" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>常見問題</CardTitle>
              <CardDescription>快速找到您問題的答案</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-6">
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("all")}
                >
                  全部
                </Button>
                {helpCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>

              <div className="space-y-4">
                {filteredFAQ.map((categoryData, categoryIndex) => (
                  <div key={categoryIndex}>
                    <Accordion type="single" collapsible className="w-full">
                      {categoryData.questions.map((faq, faqIndex) => (
                        <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`}>
                          <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 教學影片 */}
        <TabsContent value="tutorials" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>教學影片</CardTitle>
              <CardDescription>透過影片學習如何使用各項功能</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "平台介紹與註冊",
                    duration: "3:24",
                    views: "1.2K",
                    thumbnail: "/tutorial-video-thumbnail.png",
                  },
                  {
                    title: "公車查詢完整教學",
                    duration: "5:16",
                    views: "856",
                    thumbnail: "/bus-tutorial-video.png",
                  },
                  {
                    title: "旅遊規劃AI助手",
                    duration: "4:32",
                    views: "642",
                    thumbnail: "/placeholder-8ll3d.png",
                  },
                  {
                    title: "碳足跡追蹤與獎勵",
                    duration: "2:48",
                    views: "423",
                    thumbnail: "/carbon-tracking-tutorial.png",
                  },
                  {
                    title: "在地優惠使用方法",
                    duration: "3:05",
                    views: "789",
                    thumbnail: "/discount-tutorial-video.png",
                  },
                  {
                    title: "物流追蹤功能",
                    duration: "2:15",
                    views: "334",
                    thumbnail: "/logistics-tracking-tutorial.png",
                  },
                ].map((video, index) => (
                  <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                    <div className="relative">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-full h-40 object-cover rounded-t-lg"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-t-lg">
                        <div className="bg-white/90 rounded-full p-3">
                          <Play className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <Badge className="absolute bottom-2 right-2 bg-black/70 text-white">{video.duration}</Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium mb-2">{video.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{video.views} 次觀看</span>
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>4.8</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 聯絡我們 */}
        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>聯絡我們</CardTitle>
              <CardDescription>多種方式與我們取得聯繫</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contactOptions.map((option, index) => (
                  <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <option.icon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium mb-1">{option.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{option.description}</p>
                          <p className="text-sm font-medium mb-3">{option.contact}</p>
                          <Button size="sm" className="w-full">
                            {option.action}
                            <ExternalLink className="h-3 w-3 ml-2" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 服務時間 */}
          <Card>
            <CardHeader>
              <CardTitle>服務時間</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">客服專線</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>週一至週五</span>
                      <span>09:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>週六</span>
                      <span>09:00 - 12:00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>週日及國定假日</span>
                      <span>休息</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-3">線上客服</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>週一至週日</span>
                      <span>24小時</span>
                    </div>
                    <div className="flex justify-between">
                      <span>平均回應時間</span>
                      <span>5分鐘內</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 下載資源 */}
          <Card>
            <CardHeader>
              <CardTitle>下載資源</CardTitle>
              <CardDescription>下載使用手冊和相關文件</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-between bg-transparent">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    使用者手冊 (PDF)
                  </div>
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between bg-transparent">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    功能介紹簡報 (PDF)
                  </div>
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full justify-between bg-transparent">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    隱私政策 (PDF)
                  </div>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

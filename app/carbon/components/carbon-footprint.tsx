import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { Skeleton } from '@/components/ui/skeleton'
import { Leaf, TrendingUp, BarChart3 } from 'lucide-react'

interface CarbonData {
  totalSaved: number
  thisMonth: number
  breakdown: {
    transport: number
    energy: number
    waste: number
  }
  trend: Array<{
    month: string
    saved: number
  }>
}

interface CarbonFootprintProps {
  data: CarbonData
  loading: boolean
}

const COLORS = ['#82ca9d', '#8884d8', '#ffc658']; // Colors for pie chart segments

export default function CarbonFootprint({ data, loading }: CarbonFootprintProps) {
  const pieData = [
    { name: '交通', value: data.breakdown.transport },
    { name: '節能', value: data.breakdown.energy },
    { name: '廢棄物', value: data.breakdown.waste },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Leaf className="h-5 w-5 text-green-600" />
          碳足跡追蹤
        </CardTitle>
        <CardDescription>監測您的碳排放減少量和環保貢獻</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-500" />
                    總減碳量
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-5xl font-bold text-green-700 dark:text-green-300">
                    {data.totalSaved.toFixed(1)} kg
                  </div>
                  <p className="text-muted-foreground mt-2">您累計減少的碳排放量</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-purple-500" />
                    本月減碳量
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-5xl font-bold text-green-700 dark:text-green-300">
                    {data.thisMonth.toFixed(1)} kg
                  </div>
                  <p className="text-muted-foreground mt-2">本月您減少的碳排放量</p>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-gray-600" />
                減碳趨勢 (過去7個月)
              </h3>
              <Card>
                <CardContent className="h-80 p-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={data.trend}
                      margin={{
                        top: 20, right: 30, left: 20, bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis label={{ value: '減碳量 (kg)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip />
                      <Bar dataKey="saved" fill="#82ca9d" name="減碳量" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <PieChart className="h-5 w-5 text-gray-600" />
                減碳類別分佈
              </h3>
              <Card>
                <CardContent className="h-80 p-6 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => `${value.toFixed(1)} kg`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

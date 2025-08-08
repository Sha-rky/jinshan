import { MapPin } from 'lucide-react'

export function SiteLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-primary text-primary-foreground p-2 rounded-md">
        <MapPin className="h-5 w-5" />
      </div>
      <div className="leading-tight">
        <div className="font-semibold">金山 MaaS</div>
        <div className="text-xs text-muted-foreground">一站式智慧出行</div>
      </div>
    </div>
  )
}

"use client"

import { ReactNode } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar on md+ */}
        <AppSidebar />
        {/* Main content */}
        <div className="flex min-h-screen flex-1 flex-col">
          <Header />
          <main className="flex-1">
            <div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
              {children}
            </div>
          </main>
          <footer className="border-t">
            <div className="mx-auto w-full max-w-7xl px-4 py-4 text-xs text-muted-foreground sm:px-6 lg:px-8">
              {'© '}{new Date().getFullYear()}{' 金山 MaaS · 提供統一設計與一致的使用體驗'}
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

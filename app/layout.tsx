import "./globals.css"
import { ReactNode } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hant" suppressHydrationWarning>
      <body className="min-h-svh bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SidebarProvider defaultOpen>
            <AppSidebar />
            <SidebarInset>
              <Header />
              <main className="flex-1 p-4 md:p-6">{children}</main>
            </SidebarInset>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };

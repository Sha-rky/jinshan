import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { MobileNav } from '@/components/mobile-nav'
import { Header } from '@/components/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '金山智慧交通生活平台',
  description: '整合交通行動服務與在地生活體驗的智慧平台',
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <div className="flex min-h-screen">
              <AppSidebar />
              <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-4 pb-20 md:pb-4">
                  {children}
                </main>
              </div>
            </div>
            <MobileNav />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

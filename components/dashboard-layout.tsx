"use client"

import type React from "react"

import { Sidebar } from "@/components/sidebar"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { Bell, Search, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    const checkSidebar = () => {
      const sidebar = document.querySelector("aside")
      if (sidebar) {
        setSidebarCollapsed(sidebar.classList.contains("w-[70px]"))
      }
    }

    const observer = new MutationObserver(checkSidebar)
    const sidebar = document.querySelector("aside")
    if (sidebar) {
      observer.observe(sidebar, { attributes: true, attributeFilter: ["class"] })
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className={cn("transition-all duration-300 ease-in-out", sidebarCollapsed ? "ml-[70px]" : "ml-[240px]")}>
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/80 backdrop-blur-md">
          <div className="flex items-center justify-between h-full px-6">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search anything..."
                className="pl-10 bg-secondary border-0 focus-visible:ring-1 focus-visible:ring-primary"
              />
            </div>
            <div className="flex items-center gap-3">
              <Button size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                New Project
              </Button>
              <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
              </button>
            </div>
          </div>
        </header>

        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}

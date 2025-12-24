"use client"

import type React from "react"

import { Sidebar } from "@/components/sidebar"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { Bell, Search, Plus, Menu } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden animate-in fade-in duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div className={cn(
        "md:block",
        mobileMenuOpen ? "fixed inset-y-0 left-0 z-50 w-[240px] animate-in slide-in-from-left duration-300" : "hidden"
      )}>
        <Sidebar mobile={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />
      </div>

      <main className={cn(
        "transition-all duration-300 ease-in-out min-h-screen",
        sidebarCollapsed ? "md:ml-[70px]" : "md:ml-[240px]",
        "ml-0"
      )}>
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-16 border-b border-border bg-background/80 backdrop-blur-md">
          <div className="flex items-center justify-between h-full px-4 sm:px-6 gap-4">
            <div className="flex items-center gap-4 flex-1">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 rounded-lg hover:bg-secondary md:hidden"
              >
                <Menu className="w-5 h-5 text-muted-foreground" />
              </button>
              <div className="relative w-full max-w-[200px] sm:max-w-80 hidden xs:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-10 bg-secondary border-0 focus-visible:ring-1 focus-visible:ring-primary h-9 text-sm"
                />
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Button size="sm" className="gap-2 h-9 px-3 sm:px-4">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">New Project</span>
              </Button>
              <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
              </button>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6">{children}</div>
      </main>
    </div>
  )
}

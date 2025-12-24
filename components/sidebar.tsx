"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  UserCheck,
  FolderKanban,
  CheckSquare,
  UsersRound,
  Settings,
  ChevronLeft,
  Zap,
  DollarSign,
  X,
} from "lucide-react"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/clients", label: "Clients", icon: UserCheck },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/tasks", label: "Tasks", icon: CheckSquare },
  { href: "/team", label: "Team", icon: UsersRound },
  { href: "/finances", label: "Finances", icon: DollarSign },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function Sidebar({ mobile, setMobileOpen }: { mobile?: boolean, setMobileOpen?: (open: boolean) => void }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out flex flex-col",
        collapsed ? "w-[70px]" : "w-[240px]",
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary">
          <Zap className="w-5 h-5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="font-semibold text-lg text-sidebar-foreground animate-in fade-in slide-in-from-left-2 duration-200">
            AgencyFlow
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => mobile && setMobileOpen?.(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-110",
                  isActive && "text-sidebar-primary",
                )}
              />
              {!collapsed && <span className="animate-in fade-in slide-in-from-left-2 duration-200">{item.label}</span>}
              {isActive && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-sidebar-primary animate-in zoom-in duration-200" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* User Profile & Collapse */}
      <div className="border-t border-sidebar-border p-3 space-y-2">
        <div
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent/50 cursor-pointer transition-colors",
            collapsed && "justify-center px-0",
          )}
        >
          <Avatar className="w-8 h-8">
            <AvatarImage src="/professional-avatar.png" />
            <AvatarFallback className="bg-primary/20 text-primary text-xs">JD</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0 animate-in fade-in slide-in-from-left-2 duration-200">
              <p className="text-sm font-medium text-sidebar-foreground truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">Admin</p>
            </div>
          )}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:flex items-center justify-center w-full py-2 rounded-lg hover:bg-sidebar-accent/50 text-muted-foreground hover:text-sidebar-foreground transition-colors"
        >
          <ChevronLeft className={cn("w-5 h-5 transition-transform duration-300", collapsed && "rotate-180")} />
        </button>

        {mobile && (
          <button
            onClick={() => setMobileOpen?.(false)}
            className="flex md:hidden items-center justify-center w-full py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </aside>
  )
}

"use client"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import type { ReactNode } from "react"

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
  delay?: number
  hover?: boolean
}

export function AnimatedCard({ children, className, delay = 0, hover = true, ...props }: AnimatedCardProps) {
  return (
    <Card
      className={cn(
        "bg-card border-border animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-both",
        hover && "transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1",
        className,
      )}
      style={{ animationDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </Card>
  )
}

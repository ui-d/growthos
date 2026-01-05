import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  badge?: string
  centered?: boolean
  children?: ReactNode
  className?: string
}

export function SectionHeader({
  title,
  subtitle,
  badge,
  centered = false,
  children,
  className
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12",
        centered && "text-center",
        className
      )}
    >
      {badge && (
        <span className="inline-flex items-center px-3 py-1 mb-4 text-xs font-medium bg-primary/10 text-primary rounded-full">
          {badge}
        </span>
      )}
      <h2 className="heading-secondary mb-4">{title}</h2>
      {subtitle && (
        <p className={cn(
          "text-lg text-muted-foreground",
          centered && "max-w-2xl mx-auto"
        )}>
          {subtitle}
        </p>
      )}
      {children}
    </div>
  )
}
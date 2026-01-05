"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Target,
  Zap,
  BarChart3,
  Funnel,
  FlaskConical,
  LayoutDashboard,
  ShieldCheck,
  RefreshCw,
  type LucideIcon
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { Module } from "@/lib/mdx"

interface ModuleSidebarProps {
  modules: Module[]
}

const moduleIcons: Record<string, LucideIcon> = {
  "kpi-tree": Target,
  "activation-definition": Zap,
  "tracking-spec": BarChart3,
  "funnels": Funnel,
  "experiments": FlaskConical,
  "dashboards": LayoutDashboard,
  "data-quality": ShieldCheck,
  "cadence": RefreshCw,
}

export function ModuleSidebar({ modules }: ModuleSidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto pr-6 border-r border-border">
        <div className="pb-8">
          <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
            Modules
          </h3>
          <ul className="space-y-1">
            {modules.map((module) => {
              const Icon = moduleIcons[module.slug] || Target
              const isActive = pathname === `/modules/${module.slug}`

              return (
                <li key={module.slug}>
                  <Link
                    href={`/modules/${module.slug}`}
                    className={cn(
                      "group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-4 h-4 shrink-0 transition-colors",
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-foreground"
                      )}
                    />
                    <span className="truncate">{module.frontmatter.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </aside>
  )
}

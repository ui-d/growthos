"use client"

import { cn } from "@/lib/utils"
import {
  Settings2,
  ShieldCheck,
  Cog,
  Eye,
  Share2,
  Server
} from "lucide-react"

const steps = [
  {
    icon: Settings2,
    title: "Builder",
    subtitle: "User inputs",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: ShieldCheck,
    title: "Zod Validate",
    subtitle: "Schema check",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: Cog,
    title: "Generator",
    subtitle: "Pure function",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    icon: Eye,
    title: "Preview",
    subtitle: "Live output",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    icon: Share2,
    title: "Encode",
    subtitle: "lz-string",
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
  },
  {
    icon: Server,
    title: "Share SSR",
    subtitle: "OG + render",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
]

function StepConnector({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      {/* Horizontal connector for desktop */}
      <div className="hidden md:block w-8 h-px bg-border" />
      {/* Vertical connector for mobile */}
      <div className="md:hidden h-6 w-px bg-border" />
    </div>
  )
}

export function ArchitectureDiagram() {
  return (
    <div className="p-6 rounded-2xl bg-muted/30 border border-border/40">
      {/* Desktop: Horizontal layout */}
      <div className="hidden md:flex items-center justify-between gap-0">
        {steps.map((step, index) => (
          <div key={step.title} className="contents">
            <div className="flex flex-col items-center text-center min-w-0 flex-1">
              <div
                className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-3",
                  step.bgColor
                )}
              >
                <step.icon className={cn("h-6 w-6", step.color)} />
              </div>
              <div className="font-medium text-sm mb-0.5">{step.title}</div>
              <div className="text-xs text-muted-foreground">{step.subtitle}</div>
            </div>
            {index < steps.length - 1 && (
              <StepConnector className="shrink-0" />
            )}
          </div>
        ))}
      </div>

      {/* Mobile: Vertical layout */}
      <div className="md:hidden space-y-0">
        {steps.map((step, index) => (
          <div key={step.title}>
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                  step.bgColor
                )}
              >
                <step.icon className={cn("h-5 w-5", step.color)} />
              </div>
              <div className="min-w-0">
                <div className="font-medium text-sm">{step.title}</div>
                <div className="text-xs text-muted-foreground">{step.subtitle}</div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="ml-5 pl-[3px]">
                <StepConnector />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

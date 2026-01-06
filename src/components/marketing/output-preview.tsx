"use client"

import Link from "next/link"
import { useState } from "react"
import { Target, FileCode, BarChart3, LayoutDashboard } from "lucide-react"

const tabs = [
  { id: "activation", label: "Activation", icon: Target },
  { id: "tracking", label: "Tracking", icon: FileCode },
  { id: "kpi", label: "KPIs", icon: BarChart3 },
  { id: "dashboards", label: "Dashboards", icon: LayoutDashboard },
]

const tabContent: Record<string, string> = {
  activation: `## Activation Definition

**Event:** user_activated

**Rules:**
- Created primary object
- Completed value action
- Invited teammate (optional)

**Time to Value:** 15 minutes

**Formula:**
\`activated_users / signed_up_users\``,
  tracking: `## Tracking Plan

| Event           | Trigger          | Required Props      |
|-----------------|------------------|---------------------|
| user_signup     | Form submit      | user_id, source     |
| object_created  | Save action      | object_id, type     |
| feature_used    | Click/action     | feature_name        |
| user_activated  | Rules met        | ttv_minutes         |`,
  kpi: `## KPI Tree

### North Star Metric
**Weekly Active Creators**
- Formula: \`count(users where created >= 1)\`

### Input Metrics
- Signup Rate
- Activation Rate
- Time to Value (TTV)
- Feature Adoption Rate

### Guardrails
- Churn Rate < 5%
- Support Tickets < 2/user`,
  dashboards: `## Dashboard Pack

1. Activation Funnel
   - Signup → Setup → Value → Activated

2. Retention Cohorts
   - D1 / D7 / D30 retention curves

3. Feature Adoption
   - Usage by feature, by cohort

4. Revenue Metrics
   - MRR, Trial conversion, Expansion

5. Time to Value
   - TTV distribution, p50/p90`,
}

export function OutputPreview() {
  const [activeTab, setActiveTab] = useState("activation")

  return (
    <Link href="/builder" className="block group">
      <div className="relative rounded-xl overflow-hidden shadow-2xl border border-border/50 bg-card transition-all duration-300 group-hover:shadow-3xl group-hover:scale-[1.01] group-hover:border-primary/30">
        {/* Browser Chrome */}
        <div className="bg-muted/80 border-b border-border/50 px-4 py-2.5 flex items-center gap-3">
          {/* Window Controls */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <div className="w-3 h-3 rounded-full bg-green-400/80" />
          </div>
          {/* URL Bar */}
          <div className="flex-1 bg-background/60 rounded-md px-3 py-1 text-xs text-muted-foreground font-mono truncate">
            growthos.fyi/builder
          </div>
        </div>

        {/* App Header */}
        <div className="bg-background border-b border-border/30 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
              <FileCode className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="text-sm font-medium text-foreground">Growth OS Builder</span>
          </div>
          <div className="text-xs text-muted-foreground">Click to open →</div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-muted/30 border-b border-border/30 px-2 py-1.5 flex gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setActiveTab(tab.id)
                }}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  activeTab === tab.id
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                }`}
              >
                <Icon className="h-3 w-3" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Content Area - Fixed Height */}
        <div className="bg-muted/20 h-[240px] overflow-hidden">
          <pre className="text-xs leading-relaxed font-mono p-4 whitespace-pre-wrap text-foreground/90 h-full overflow-auto">
            {tabContent[activeTab]}
          </pre>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>
    </Link>
  )
}

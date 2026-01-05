"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileCode, Target, BarChart3, LayoutDashboard } from "lucide-react"

export function OutputPreview() {
  return (
    <Card className="border-2 border-border/50 shadow-lg">
      <CardHeader className="border-b bg-muted/30 pb-3 pt-4">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <FileCode className="h-4 w-4 text-primary" />
          Output Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="activation" className="w-full">
          <TabsList className="w-full rounded-none border-b bg-muted/20 h-auto p-1 flex flex-wrap">
            <TabsTrigger value="activation" className="flex-1 text-xs px-2 py-1.5 min-w-[80px]">
              <Target className="h-3 w-3 mr-1 hidden sm:inline" />
              Activation
            </TabsTrigger>
            <TabsTrigger value="tracking" className="flex-1 text-xs px-2 py-1.5 min-w-[80px]">
              <FileCode className="h-3 w-3 mr-1 hidden sm:inline" />
              Tracking
            </TabsTrigger>
            <TabsTrigger value="kpi" className="flex-1 text-xs px-2 py-1.5 min-w-[80px]">
              <BarChart3 className="h-3 w-3 mr-1 hidden sm:inline" />
              KPIs
            </TabsTrigger>
            <TabsTrigger value="dashboards" className="flex-1 text-xs px-2 py-1.5 min-w-[80px]">
              <LayoutDashboard className="h-3 w-3 mr-1 hidden sm:inline" />
              Dashboards
            </TabsTrigger>
          </TabsList>

          <div className="bg-muted/50 min-h-[220px] max-h-[280px] overflow-auto">
            <TabsContent value="activation" className="m-0">
              <pre className="text-xs leading-relaxed font-mono p-4 whitespace-pre-wrap text-foreground/90">
{`## Activation Definition

**Event:** user_activated

**Rules:**
- Created primary object
- Completed value action
- Invited teammate (optional)

**Time to Value:** 15 minutes

**Formula:**
\`activated_users / signed_up_users\``}
              </pre>
            </TabsContent>

            <TabsContent value="tracking" className="m-0">
              <pre className="text-xs leading-relaxed font-mono p-4 whitespace-pre-wrap text-foreground/90">
{`## Tracking Plan

| Event           | Trigger          | Required Props      |
|-----------------|------------------|---------------------|
| user_signup     | Form submit      | user_id, source     |
| object_created  | Save action      | object_id, type     |
| feature_used    | Click/action     | feature_name        |
| user_activated  | Rules met        | ttv_minutes         |`}
              </pre>
            </TabsContent>

            <TabsContent value="kpi" className="m-0">
              <pre className="text-xs leading-relaxed font-mono p-4 whitespace-pre-wrap text-foreground/90">
{`## KPI Tree

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
- Support Tickets < 2/user`}
              </pre>
            </TabsContent>

            <TabsContent value="dashboards" className="m-0">
              <pre className="text-xs leading-relaxed font-mono p-4 whitespace-pre-wrap text-foreground/90">
{`## Dashboard Pack

1. Activation Funnel
   - Signup → Setup → Value → Activated

2. Retention Cohorts
   - D1 / D7 / D30 retention curves

3. Feature Adoption
   - Usage by feature, by cohort

4. Revenue Metrics
   - MRR, Trial conversion, Expansion

5. Time to Value
   - TTV distribution, p50/p90

6. Engagement Scores
   - DAU/MAU, session frequency`}
              </pre>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}

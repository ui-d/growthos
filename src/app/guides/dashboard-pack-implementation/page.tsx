import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, ArrowLeft, BarChart3, CheckCircle2, AlertTriangle, Target, TrendingUp, Bell, Database } from "lucide-react"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.growthos.fyi"

export const metadata: Metadata = {
  title: "Dashboard Pack Implementation - Implementation Guide - Growth OS",
  description: "Build North Star and Activation dashboards with clear metric definitions, example queries, and alerting strategies for product-led growth.",
  openGraph: {
    title: "Dashboard Pack Implementation - Implementation Guide",
    description: "Build North Star and Activation dashboards for product-led growth.",
    url: `${baseUrl}/guides/dashboard-pack-implementation`,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dashboard Pack Implementation - Implementation Guide",
    description: "Build North Star and Activation dashboards for product-led growth.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: `${baseUrl}/guides/dashboard-pack-implementation`,
  },
}

export default function DashboardPackImplementationPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-purple-500/5">
        <div className="container-wide section-spacing-sm">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex mb-6">
              <ol className="flex items-center space-x-2 border border-primary/20 rounded-full px-4 py-1.5 w-fit bg-primary/5">
                <li>
                  <Link
                    href="/guides"
                    className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    Guides
                  </Link>
                </li>
                <li className="flex items-center">
                  <ChevronRight className="text-primary w-3 h-3 mx-1" />
                  <span className="text-xs font-medium text-primary">
                    Dashboard Pack Implementation
                  </span>
                </li>
              </ol>
            </nav>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-600 dark:text-red-400">
                Advanced
              </span>
              <span className="text-sm text-muted-foreground">25 min read</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-4">
              Dashboard Pack Implementation
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Build the two dashboards every PLG company needs: a North Star board for company-wide
              alignment and an Activation board for understanding user journey health.
            </p>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="container-wide section-spacing-sm">
        <div className="max-w-4xl mx-auto">
          <Card className="p-6 border-primary/20 bg-primary/5">
            <div className="flex items-start gap-4">
              <BarChart3 className="h-6 w-6 text-primary shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold mb-2">Why This Matters</h2>
                <p className="text-muted-foreground">
                  Most teams have dozens of dashboards but no single source of truth. Engineers check different
                  metrics than PMs, who check different metrics than execs. A standardized dashboard pack
                  ensures everyone is looking at the same numbers, debating strategy instead of data accuracy.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* North Star Dashboard */}
      <section className="container-wide section-spacing-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            North Star Dashboard
          </h2>

          <p className="text-muted-foreground mb-6">
            The North Star dashboard answers one question: &quot;Is the business healthy?&quot; It should be
            glanceable in under 10 seconds and updated daily.
          </p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Recommended Metrics Layout</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 pr-4 font-medium">Metric</th>
                      <th className="text-left py-2 pr-4 font-medium">Definition</th>
                      <th className="text-left py-2 font-medium">Refresh</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b bg-primary/5">
                      <td className="py-3 pr-4 font-semibold text-foreground">North Star Metric</td>
                      <td className="py-3 pr-4">Weekly Active {`{Objects}`} — the core unit of value delivered</td>
                      <td className="py-3">Daily</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4 font-mono text-primary">WAU</td>
                      <td className="py-2 pr-4">Users with &ge;1 session in rolling 7 days</td>
                      <td className="py-2">Daily</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4 font-mono text-primary">Signups</td>
                      <td className="py-2 pr-4">New user registrations (cumulative + daily)</td>
                      <td className="py-2">Real-time</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4 font-mono text-primary">Activation Rate</td>
                      <td className="py-2 pr-4">% of signups completing activation within 7 days</td>
                      <td className="py-2">Daily</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4 font-mono text-primary">Revenue (MRR/ARR)</td>
                      <td className="py-2 pr-4">Monthly recurring revenue, with expansion/contraction</td>
                      <td className="py-2">Daily</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-mono text-primary">Churn Rate</td>
                      <td className="py-2 pr-4">% of accounts churning in trailing 30 days</td>
                      <td className="py-2">Weekly</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6 bg-muted/30 mb-6">
            <h3 className="font-semibold mb-3">North Star Metric: Weekly Active Objects</h3>
            <p className="text-sm text-muted-foreground mb-4">
              The North Star should capture value delivery, not just activity. For a dashboard tool,
              it&apos;s &quot;Weekly Active Dashboards&quot; (dashboards viewed by &ge;1 user in 7 days).
            </p>
            <pre className="text-xs font-mono overflow-x-auto bg-background p-4 rounded-lg">
{`-- Weekly Active Dashboards (North Star)
SELECT
  DATE_TRUNC('week', event_timestamp) AS week,
  COUNT(DISTINCT dashboard_id) AS weekly_active_dashboards
FROM events
WHERE
  event_name = 'dashboard_viewed'
  AND event_timestamp >= CURRENT_DATE - INTERVAL '12 weeks'
GROUP BY 1
ORDER BY 1 DESC;`}
            </pre>
          </Card>
        </div>
      </section>

      {/* Activation Dashboard */}
      <section className="container-wide section-spacing-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Activation Dashboard
          </h2>

          <p className="text-muted-foreground mb-6">
            The Activation dashboard tracks the user journey from signup to value realization.
            It identifies where users drop off and which behaviors correlate with retention.
          </p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Activation Funnel Stages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 pr-4 font-medium">Stage</th>
                      <th className="text-left py-2 pr-4 font-medium">Event</th>
                      <th className="text-left py-2 pr-4 font-medium">Target</th>
                      <th className="text-left py-2 font-medium">Timeframe</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-2 pr-4 font-semibold text-foreground">1. Signed Up</td>
                      <td className="py-2 pr-4"><code className="text-primary">user_signed_up</code></td>
                      <td className="py-2 pr-4">100%</td>
                      <td className="py-2">—</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4 font-semibold text-foreground">2. Setup Complete</td>
                      <td className="py-2 pr-4"><code className="text-primary">onboarding_completed</code></td>
                      <td className="py-2 pr-4">&ge;80%</td>
                      <td className="py-2">Within 24h</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4 font-semibold text-foreground">3. First Object Created</td>
                      <td className="py-2 pr-4"><code className="text-primary">dashboard_created</code></td>
                      <td className="py-2 pr-4">&ge;60%</td>
                      <td className="py-2">Within 48h</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4 font-semibold text-foreground">4. Value Action</td>
                      <td className="py-2 pr-4"><code className="text-primary">dashboard_shared</code></td>
                      <td className="py-2 pr-4">&ge;40%</td>
                      <td className="py-2">Within 7d</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-semibold text-foreground bg-green-500/10">5. Activated</td>
                      <td className="py-2 pr-4"><code className="text-primary">user_activated</code></td>
                      <td className="py-2 pr-4">&ge;30%</td>
                      <td className="py-2">Within 7d</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="p-6 bg-muted/30 mb-6">
            <h3 className="font-semibold mb-3">Activation Funnel Query</h3>
            <pre className="text-xs font-mono overflow-x-auto bg-background p-4 rounded-lg">
{`-- Activation Funnel (7-day cohorts)
WITH signups AS (
  SELECT
    user_id,
    DATE_TRUNC('week', event_timestamp) AS cohort_week
  FROM events
  WHERE event_name = 'user_signed_up'
    AND event_timestamp >= CURRENT_DATE - INTERVAL '8 weeks'
),
funnel AS (
  SELECT
    s.user_id,
    s.cohort_week,
    MAX(CASE WHEN e.event_name = 'onboarding_completed'
      AND e.event_timestamp <= s.cohort_week + INTERVAL '1 day'
      THEN 1 ELSE 0 END) AS setup_complete,
    MAX(CASE WHEN e.event_name = 'dashboard_created'
      AND e.event_timestamp <= s.cohort_week + INTERVAL '2 days'
      THEN 1 ELSE 0 END) AS first_object,
    MAX(CASE WHEN e.event_name = 'dashboard_shared'
      AND e.event_timestamp <= s.cohort_week + INTERVAL '7 days'
      THEN 1 ELSE 0 END) AS value_action,
    MAX(CASE WHEN e.event_name = 'user_activated'
      AND e.event_timestamp <= s.cohort_week + INTERVAL '7 days'
      THEN 1 ELSE 0 END) AS activated
  FROM signups s
  LEFT JOIN events e ON s.user_id = e.user_id
  GROUP BY 1, 2
)
SELECT
  cohort_week,
  COUNT(*) AS signups,
  SUM(setup_complete) AS setup_complete,
  SUM(first_object) AS first_object,
  SUM(value_action) AS value_action,
  SUM(activated) AS activated,
  ROUND(100.0 * SUM(activated) / COUNT(*), 1) AS activation_rate
FROM funnel
GROUP BY 1
ORDER BY 1 DESC;`}
            </pre>
          </Card>
        </div>
      </section>

      {/* Metric Definitions */}
      <section className="container-wide section-spacing-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Suggested Metric Definitions
          </h2>

          <p className="text-muted-foreground mb-6">
            Clear definitions prevent &quot;which revenue number?&quot; debates. Document these in a
            shared metrics dictionary and reference them in dashboards.
          </p>

          <div className="space-y-4 mb-6">
            <Card className="p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Active User
              </h4>
              <p className="text-sm text-muted-foreground">
                A user with at least one <code className="text-primary">page_viewed</code> or{" "}
                <code className="text-primary">dashboard_viewed</code> event in the measurement period.
                Exclude internal users (email domain filter) and known bots.
              </p>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Activated User
              </h4>
              <p className="text-sm text-muted-foreground">
                A user who completes the activation criteria within 7 days of signup: created at least
                one {`{object}`} AND performed the value action (share/export/deploy). Logged via{" "}
                <code className="text-primary">user_activated</code> event.
              </p>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                MRR (Monthly Recurring Revenue)
              </h4>
              <p className="text-sm text-muted-foreground">
                Sum of all active subscription values normalized to monthly. Annual plans divided by 12.
                Excludes one-time payments, refunds, and disputed charges. Source: billing system.
              </p>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Churn Rate
              </h4>
              <p className="text-sm text-muted-foreground">
                (Lost MRR in period) / (MRR at start of period) × 100. A &quot;churned&quot; account is
                one that had active subscription at period start and doesn&apos;t at period end.
                Excludes paused accounts and downgrades (count as contraction).
              </p>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Time to Value (TTV)
              </h4>
              <p className="text-sm text-muted-foreground">
                Median time from <code className="text-primary">user_signed_up</code> to{" "}
                <code className="text-primary">user_activated</code> event for users who do activate.
                Measure in minutes. Target: under 30 minutes for self-serve PLG.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Example Queries */}
      <section className="container-wide section-spacing-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            Example Queries
          </h2>

          <div className="space-y-6">
            <Card className="p-6 bg-muted/30">
              <h3 className="font-semibold mb-3">Daily Active Users (DAU) Trend</h3>
              <pre className="text-xs font-mono overflow-x-auto bg-background p-4 rounded-lg">
{`-- DAU over last 30 days
SELECT
  DATE(event_timestamp) AS date,
  COUNT(DISTINCT user_id) AS dau
FROM events
WHERE
  event_name IN ('page_viewed', 'dashboard_viewed')
  AND event_timestamp >= CURRENT_DATE - INTERVAL '30 days'
  AND user_id NOT IN (SELECT user_id FROM internal_users)
GROUP BY 1
ORDER BY 1;`}
              </pre>
            </Card>

            <Card className="p-6 bg-muted/30">
              <h3 className="font-semibold mb-3">Feature Adoption by Cohort</h3>
              <pre className="text-xs font-mono overflow-x-auto bg-background p-4 rounded-lg">
{`-- Feature adoption rates by signup cohort
WITH user_cohorts AS (
  SELECT
    user_id,
    DATE_TRUNC('week', MIN(event_timestamp)) AS cohort_week
  FROM events
  WHERE event_name = 'user_signed_up'
  GROUP BY 1
)
SELECT
  uc.cohort_week,
  COUNT(DISTINCT uc.user_id) AS cohort_size,
  COUNT(DISTINCT CASE WHEN e.event_name = 'dashboard_shared' THEN e.user_id END) AS shared,
  COUNT(DISTINCT CASE WHEN e.event_name = 'report_exported' THEN e.user_id END) AS exported,
  COUNT(DISTINCT CASE WHEN e.event_name = 'teammate_invited' THEN e.user_id END) AS invited_team
FROM user_cohorts uc
LEFT JOIN events e ON uc.user_id = e.user_id
  AND e.event_timestamp <= uc.cohort_week + INTERVAL '14 days'
GROUP BY 1
ORDER BY 1 DESC
LIMIT 12;`}
              </pre>
            </Card>

            <Card className="p-6 bg-muted/30">
              <h3 className="font-semibold mb-3">Retention Cohort Analysis</h3>
              <pre className="text-xs font-mono overflow-x-auto bg-background p-4 rounded-lg">
{`-- Week-over-week retention by signup cohort
WITH signup_cohorts AS (
  SELECT
    user_id,
    DATE_TRUNC('week', event_timestamp) AS cohort_week
  FROM events
  WHERE event_name = 'user_signed_up'
),
activity AS (
  SELECT
    user_id,
    DATE_TRUNC('week', event_timestamp) AS activity_week
  FROM events
  WHERE event_name IN ('page_viewed', 'dashboard_viewed')
)
SELECT
  sc.cohort_week,
  COUNT(DISTINCT sc.user_id) AS cohort_size,
  COUNT(DISTINCT CASE WHEN a.activity_week = sc.cohort_week + INTERVAL '1 week'
    THEN sc.user_id END) AS week_1,
  COUNT(DISTINCT CASE WHEN a.activity_week = sc.cohort_week + INTERVAL '2 weeks'
    THEN sc.user_id END) AS week_2,
  COUNT(DISTINCT CASE WHEN a.activity_week = sc.cohort_week + INTERVAL '4 weeks'
    THEN sc.user_id END) AS week_4,
  COUNT(DISTINCT CASE WHEN a.activity_week = sc.cohort_week + INTERVAL '8 weeks'
    THEN sc.user_id END) AS week_8
FROM signup_cohorts sc
LEFT JOIN activity a ON sc.user_id = a.user_id
GROUP BY 1
ORDER BY 1 DESC
LIMIT 12;`}
              </pre>
            </Card>
          </div>
        </div>
      </section>

      {/* Alerting */}
      <section className="container-wide section-spacing-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Alerting Strategy
          </h2>

          <p className="text-muted-foreground mb-6">
            Dashboards are reactive; alerts are proactive. Set up alerts for metrics that need
            immediate attention when they breach thresholds.
          </p>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Recommended Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 pr-4 font-medium">Alert</th>
                      <th className="text-left py-2 pr-4 font-medium">Condition</th>
                      <th className="text-left py-2 pr-4 font-medium">Severity</th>
                      <th className="text-left py-2 font-medium">Channel</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b">
                      <td className="py-2 pr-4 font-medium text-foreground">DAU Drop</td>
                      <td className="py-2 pr-4">DAU down &gt;20% vs 7-day average</td>
                      <td className="py-2 pr-4"><span className="text-red-600 font-semibold">Critical</span></td>
                      <td className="py-2">Slack #alerts, PagerDuty</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4 font-medium text-foreground">Signup Drop</td>
                      <td className="py-2 pr-4">Daily signups &lt;50% of 7-day avg</td>
                      <td className="py-2 pr-4"><span className="text-red-600 font-semibold">Critical</span></td>
                      <td className="py-2">Slack #growth</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4 font-medium text-foreground">Activation Rate Drop</td>
                      <td className="py-2 pr-4">7-day activation rate &lt;25%</td>
                      <td className="py-2 pr-4"><span className="text-yellow-600 font-semibold">Warning</span></td>
                      <td className="py-2">Slack #product</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4 font-medium text-foreground">TTV Spike</td>
                      <td className="py-2 pr-4">Median TTV &gt;60 minutes</td>
                      <td className="py-2 pr-4"><span className="text-yellow-600 font-semibold">Warning</span></td>
                      <td className="py-2">Slack #product</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 pr-4 font-medium text-foreground">Error Rate Spike</td>
                      <td className="py-2 pr-4">Error events &gt;5% of total</td>
                      <td className="py-2 pr-4"><span className="text-red-600 font-semibold">Critical</span></td>
                      <td className="py-2">Slack #eng, PagerDuty</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 font-medium text-foreground">Churn Spike</td>
                      <td className="py-2 pr-4">Weekly churn &gt;3% (for low-churn products)</td>
                      <td className="py-2 pr-4"><span className="text-yellow-600 font-semibold">Warning</span></td>
                      <td className="py-2">Slack #cs, Email to CS lead</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="p-4 bg-yellow-500/5 border-yellow-500/20">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-yellow-600 mb-1">Alert Fatigue Warning</p>
                <p className="text-muted-foreground">
                  Too many alerts = ignored alerts. Start with 3-5 critical alerts. Add more only when you have
                  bandwidth to respond. Every alert should have a clear owner and response playbook.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="container-wide section-spacing-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Common Mistakes
          </h2>

          <div className="space-y-4">
            <Card className="p-4 border-destructive/20">
              <div className="flex items-start gap-3">
                <span className="text-destructive font-bold">1.</span>
                <div>
                  <h4 className="font-medium text-destructive mb-1">Vanity Metrics on North Star</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Total signups, page views, or registered users as North Star—they go up forever regardless of value.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Fix:</strong> North Star must correlate with business outcomes. &quot;Weekly Active Objects&quot;
                    captures actual value delivery.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-destructive/20">
              <div className="flex items-start gap-3">
                <span className="text-destructive font-bold">2.</span>
                <div>
                  <h4 className="font-medium text-destructive mb-1">Undefined Activation</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    &quot;Activated&quot; means different things to different teams. No clear event marking activation.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Fix:</strong> Define explicit activation criteria. Fire <code className="text-primary">user_activated</code> event
                    when criteria met. Document in metrics dictionary.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-destructive/20">
              <div className="flex items-start gap-3">
                <span className="text-destructive font-bold">3.</span>
                <div>
                  <h4 className="font-medium text-destructive mb-1">No Time Boundaries on Funnel</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Activation funnel counts users who activated &quot;ever&quot;—not actionable.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Fix:</strong> Time-bound each funnel stage (setup within 24h, activation within 7 days).
                    Cohort analysis should show weekly progress.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-destructive/20">
              <div className="flex items-start gap-3">
                <span className="text-destructive font-bold">4.</span>
                <div>
                  <h4 className="font-medium text-destructive mb-1">Missing Segmentation</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Company-wide metrics hide segment-specific problems. Enterprise and SMB behave differently.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Fix:</strong> Add segment breakdowns (plan tier, company size, acquisition channel).
                    Create segment-specific dashboards for detailed analysis.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 border-destructive/20">
              <div className="flex items-start gap-3">
                <span className="text-destructive font-bold">5.</span>
                <div>
                  <h4 className="font-medium text-destructive mb-1">Stale Dashboards</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Dashboards built once and never updated. Queries break when schema changes.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Fix:</strong> Dashboard-as-code. Version control queries. Add data freshness checks.
                    Quarterly dashboard review meetings.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Implementation Checklist */}
      <section className="container-wide section-spacing-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            Implementation Checklist
          </h2>

          <Card className="p-6">
            <div className="space-y-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">North Star Dashboard</h3>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Define North Star metric with clear formula</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Add supporting metrics (WAU, Signups, Revenue, Churn)</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Set up daily refresh schedule</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Add historical trend lines (at least 12 weeks)</span>
                </label>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Activation Dashboard</h3>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Define activation criteria and fire tracking event</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Build 5-stage activation funnel with time bounds</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Add week-over-week cohort comparison</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Include Time to Value (TTV) distribution</span>
                </label>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Alerting</h3>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Set up DAU drop alert (critical)</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Set up signup drop alert (critical)</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Document alert owners and response playbooks</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Configure Slack/PagerDuty notification channels</span>
                </label>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Maintenance</h3>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Document all metric definitions in shared dictionary</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Version control dashboard queries</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Schedule quarterly dashboard review</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1 rounded border-muted-foreground/30" />
                  <span className="text-sm">Add data freshness indicator to dashboards</span>
                </label>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Navigation */}
      <section className="container-wide section-spacing-sm">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center pt-8 border-t">
            <Button variant="outline" asChild>
              <Link href="/guides/typed-event-tracking">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Typed Event Tracking
              </Link>
            </Button>
            <Button asChild>
              <Link href="/guides">
                Back to All Guides
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

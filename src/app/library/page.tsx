"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/ui/section-header"
import {
  FileText,
  Download,
  Eye,
  BarChart3,
  Code2,
  Database,
  GitBranch,
  Layers,
  BookOpen,
  FileSpreadsheet,
  FileJson,
  ArrowRight,
  Copy,
  Check,
  ExternalLink,
  Target,
  TrendingUp,
  Users,
  Zap,
  PieChart,
  Activity,
  LineChart,
  Settings,
  Workflow,
  TestTube,
  Gauge,
  Filter,
  LayoutGrid
} from "lucide-react"
import { useState } from "react"

const resources = {
  templates: [
    {
      title: "Activation Tracking Spec",
      description: "Complete template for defining and documenting activation events with stakeholder alignment framework",
      icon: FileText,
      format: "Google Docs",
      category: "Activation",
      downloadUrl: "#activation-spec",
      previewContent: `# Activation Tracking Specification

## Activation Definition
- **Primary Object**: [Your core value unit]
- **Value Action**: [Key action that delivers value]
- **Time Boundary**: [Expected time to activation]

## Required Events
1. user_signed_up
2. onboarding_started
3. core_action_completed
4. activation_achieved

## Properties to Track
- user_id, timestamp, source, campaign`
    },
    {
      title: "Growth Metrics Dashboard",
      description: "Pre-built dashboard template with key growth metrics including acquisition, activation, retention, and revenue",
      icon: BarChart3,
      format: "Looker Studio",
      category: "Analytics",
      downloadUrl: "#growth-dashboard",
      previewContent: `# Growth Metrics Dashboard Template

## Key Metrics
- DAU/WAU/MAU
- Activation Rate
- D1/D7/D30 Retention
- Revenue per User

## Dimensions
- Acquisition Channel
- User Segment
- Time Period
- Geography`
    },
    {
      title: "Event Taxonomy",
      description: "Structured naming convention for analytics events with object-action pattern and property standards",
      icon: Database,
      format: "Spreadsheet",
      category: "Tracking",
      downloadUrl: "#event-taxonomy",
      previewContent: `# Event Taxonomy Template

## Naming Convention
[object]_[action]_[context]

## Examples
- page_viewed
- button_clicked
- form_submitted
- feature_activated

## Required Properties
- event_id, timestamp, user_id, session_id`
    },
    {
      title: "A/B Test Calculator",
      description: "Statistical significance calculator for experiments with sample size estimation and confidence intervals",
      icon: GitBranch,
      format: "Spreadsheet",
      category: "Experimentation",
      downloadUrl: "#ab-calculator",
      previewContent: `# A/B Test Calculator

## Inputs
- Baseline Conversion Rate
- Minimum Detectable Effect
- Statistical Significance (95%)
- Statistical Power (80%)

## Outputs
- Required Sample Size
- Test Duration Estimate
- Confidence Interval`
    },
    {
      title: "Retention Cohorts",
      description: "Cohort analysis template for retention tracking with weekly and monthly views",
      icon: Layers,
      format: "SQL Template",
      category: "Retention",
      downloadUrl: "#retention-cohorts",
      previewContent: `-- Retention Cohort Analysis
WITH cohorts AS (
  SELECT
    user_id,
    DATE_TRUNC('week', first_seen) as cohort_week
  FROM users
),
activity AS (
  SELECT DISTINCT
    user_id,
    DATE_TRUNC('week', event_time) as activity_week
  FROM events
)
SELECT cohort_week, week_number, retention_rate
FROM ...`
    },
    {
      title: "Growth Model",
      description: "Financial model template for growth projections with acquisition and retention assumptions",
      icon: FileSpreadsheet,
      format: "Excel/Sheets",
      category: "Planning",
      downloadUrl: "#growth-model",
      previewContent: `# Growth Model Template

## Inputs
- Monthly New Users
- Activation Rate
- Retention Curves
- ARPU

## Outputs
- Monthly Active Users
- Revenue Projections
- LTV Calculations
- Payback Period`
    },
    {
      title: "North Star Metric Framework",
      description: "Template for defining and aligning on your North Star metric with input metrics hierarchy",
      icon: Target,
      format: "Notion Template",
      category: "Strategy",
      downloadUrl: "#north-star",
      previewContent: `# North Star Metric Framework

## North Star Definition
- Metric Name: [e.g., Weekly Active Publishers]
- Why it matters: [Value to customer & business]
- How it's measured: [Exact definition]

## Input Metrics
1. Breadth: How many users?
2. Depth: How engaged?
3. Frequency: How often?
4. Efficiency: How quickly?`
    },
    {
      title: "Funnel Analysis Template",
      description: "Step-by-step funnel breakdown with conversion rates and drop-off analysis",
      icon: Filter,
      format: "Spreadsheet",
      category: "Analytics",
      downloadUrl: "#funnel-template",
      previewContent: `# Funnel Analysis Template

## Funnel Steps
1. Landing Page Visit → 100%
2. Sign Up Started → 45%
3. Sign Up Completed → 32%
4. Onboarding Started → 28%
5. Activation Achieved → 18%

## Drop-off Analysis
- Biggest drop: Step 1→2 (55% drop)
- Root cause analysis template included`
    },
    {
      title: "User Segmentation Matrix",
      description: "Framework for segmenting users by behavior, value, and engagement level",
      icon: Users,
      format: "Spreadsheet",
      category: "Analytics",
      downloadUrl: "#segmentation",
      previewContent: `# User Segmentation Matrix

## Behavioral Segments
- Power Users: Daily active, high engagement
- Regular Users: Weekly active
- Casual Users: Monthly active
- At-Risk: Declining activity
- Dormant: No recent activity

## Value Segments
- High LTV / Low LTV
- Paid / Free
- Enterprise / SMB / Individual`
    },
    {
      title: "OKR Planning Template",
      description: "Quarterly OKR planning template aligned with growth metrics and initiatives",
      icon: Target,
      format: "Notion Template",
      category: "Planning",
      downloadUrl: "#okr-template",
      previewContent: `# OKR Planning Template

## Objective
Increase user activation and engagement

## Key Results
1. Improve activation rate from 35% to 50%
2. Increase D7 retention from 25% to 35%
3. Grow WAU by 40%

## Initiatives
- Redesign onboarding flow
- Add in-app guidance
- Implement email nurture sequence`
    },
    {
      title: "Feature Adoption Tracker",
      description: "Track feature discovery, adoption, and retention rates across your product",
      icon: Zap,
      format: "Spreadsheet",
      category: "Activation",
      downloadUrl: "#feature-adoption",
      previewContent: `# Feature Adoption Tracker

## Metrics per Feature
- Discovery Rate: % who see feature
- Trial Rate: % who try feature
- Adoption Rate: % who use regularly
- Feature Retention: % still using after 30d

## Feature Health Score
Composite score based on above metrics`
    },
    {
      title: "Churn Analysis Framework",
      description: "Framework for analyzing churn patterns, predicting at-risk users, and planning interventions",
      icon: TrendingUp,
      format: "Spreadsheet",
      category: "Retention",
      downloadUrl: "#churn-analysis",
      previewContent: `# Churn Analysis Framework

## Churn Indicators
- Login frequency decline
- Feature usage decline
- Support ticket sentiment
- Billing issues

## Intervention Playbook
- At-risk identification
- Re-engagement campaigns
- Success team outreach
- Win-back offers`
    }
  ],
  guides: [
    {
      title: "Implementing Segment Tracking",
      description: "Step-by-step guide to implement Segment analytics with best practices for data governance",
      icon: Code2,
      readTime: "15 min",
      level: "Intermediate",
      href: "/modules/tracking-spec",
      content: `Learn how to set up Segment for your analytics infrastructure, including:
- Installing the Segment SDK
- Configuring destinations
- Implementing identify and track calls
- Setting up data governance rules`
    },
    {
      title: "Building Growth Loops",
      description: "Framework for designing and implementing sustainable growth loops in your product",
      icon: BarChart3,
      readTime: "20 min",
      level: "Advanced",
      href: "/modules/funnels",
      content: `Master the art of creating self-reinforcing growth mechanisms:
- Understanding loop mechanics
- Identifying your core loop
- Optimizing loop efficiency
- Measuring loop performance`
    },
    {
      title: "Activation Metrics 101",
      description: "How to identify, measure, and optimize your activation metrics for better retention",
      icon: BookOpen,
      readTime: "10 min",
      level: "Beginner",
      href: "/modules/activation-definition",
      content: `Foundation guide for activation metrics:
- What is activation?
- Finding your aha moment
- Measuring activation rate
- Improving time to value`
    },
    {
      title: "Data Layer Architecture",
      description: "Best practices for structuring your analytics data layer for scalability and accuracy",
      icon: Database,
      readTime: "25 min",
      level: "Advanced",
      href: "/modules/data-quality",
      content: `Build a robust analytics foundation:
- Data layer design patterns
- Event schema standards
- Property normalization
- Data validation strategies`
    },
    {
      title: "KPI Tree Construction",
      description: "How to build a metrics hierarchy that connects team efforts to business outcomes",
      icon: GitBranch,
      readTime: "18 min",
      level: "Intermediate",
      href: "/modules/kpi-tree",
      content: `Create meaningful metric relationships:
- Identifying your North Star
- Breaking down into input metrics
- Assigning metric ownership
- Building dashboards from trees`
    },
    {
      title: "Running Effective Experiments",
      description: "End-to-end guide to designing, running, and analyzing A/B tests and experiments",
      icon: TestTube,
      readTime: "22 min",
      level: "Intermediate",
      href: "/modules/experiments",
      content: `Master experimentation methodology:
- Hypothesis formation
- Sample size calculation
- Test implementation
- Statistical analysis
- Decision frameworks`
    },
    {
      title: "Dashboard Design Principles",
      description: "Create actionable dashboards that drive decisions instead of just displaying data",
      icon: LayoutGrid,
      readTime: "15 min",
      level: "Beginner",
      href: "/modules/dashboards",
      content: `Design dashboards that matter:
- Choosing the right metrics
- Visual hierarchy
- Actionable insights
- Alert configuration
- Stakeholder alignment`
    },
    {
      title: "Engagement Cadence Strategy",
      description: "Design optimal user engagement patterns across email, push, and in-app channels",
      icon: Activity,
      readTime: "20 min",
      level: "Advanced",
      href: "/modules/cadence",
      content: `Optimize user communication:
- Channel selection
- Timing optimization
- Frequency management
- Personalization strategies
- Measuring effectiveness`
    }
  ],
  codeSnippets: [
    {
      title: "React Analytics Hook",
      description: "Custom React hook for tracking user events with automatic page views",
      language: "TypeScript",
      icon: FileJson,
      code: `import { useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';

interface EventProperties {
  [key: string]: string | number | boolean;
}

export function useAnalytics() {
  const pathname = usePathname();

  // Track page views automatically
  useEffect(() => {
    trackEvent('page_viewed', { path: pathname });
  }, [pathname]);

  const trackEvent = useCallback((
    eventName: string,
    properties?: EventProperties
  ) => {
    // Replace with your analytics provider
    if (typeof window !== 'undefined' && window.analytics) {
      window.analytics.track(eventName, {
        ...properties,
        timestamp: new Date().toISOString(),
      });
    }
  }, []);

  const identifyUser = useCallback((
    userId: string,
    traits?: EventProperties
  ) => {
    if (typeof window !== 'undefined' && window.analytics) {
      window.analytics.identify(userId, traits);
    }
  }, []);

  return { trackEvent, identifyUser };
}`
    },
    {
      title: "Mixpanel Implementation",
      description: "Complete Mixpanel setup with TypeScript types and utility functions",
      language: "TypeScript",
      icon: FileJson,
      code: `import mixpanel from 'mixpanel-browser';

// Initialize Mixpanel
mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_TOKEN!, {
  track_pageview: true,
  persistence: 'localStorage',
});

// Type-safe event tracking
type EventName =
  | 'sign_up_started'
  | 'sign_up_completed'
  | 'feature_activated'
  | 'subscription_started';

interface BaseProperties {
  source?: string;
  campaign?: string;
}

export function track<T extends BaseProperties>(
  event: EventName,
  properties?: T
) {
  mixpanel.track(event, {
    ...properties,
    $current_url: window.location.href,
  });
}

export function identify(userId: string, traits?: Record<string, any>) {
  mixpanel.identify(userId);
  if (traits) {
    mixpanel.people.set(traits);
  }
}

export function reset() {
  mixpanel.reset();
}`
    },
    {
      title: "Retention Cohort SQL",
      description: "SQL query for calculating weekly retention cohorts",
      language: "SQL",
      icon: Database,
      code: `-- Weekly Retention Cohort Analysis
WITH user_cohorts AS (
  SELECT
    user_id,
    DATE_TRUNC('week', MIN(created_at)) AS cohort_week
  FROM users
  GROUP BY user_id
),
user_activity AS (
  SELECT DISTINCT
    user_id,
    DATE_TRUNC('week', event_timestamp) AS activity_week
  FROM events
  WHERE event_name = 'session_started'
),
cohort_size AS (
  SELECT
    cohort_week,
    COUNT(DISTINCT user_id) AS num_users
  FROM user_cohorts
  GROUP BY cohort_week
),
retention_data AS (
  SELECT
    c.cohort_week,
    DATEDIFF('week', c.cohort_week, a.activity_week) AS week_number,
    COUNT(DISTINCT c.user_id) AS retained_users
  FROM user_cohorts c
  LEFT JOIN user_activity a ON c.user_id = a.user_id
  WHERE a.activity_week >= c.cohort_week
  GROUP BY c.cohort_week, week_number
)
SELECT
  r.cohort_week,
  r.week_number,
  r.retained_users,
  s.num_users AS cohort_size,
  ROUND(100.0 * r.retained_users / s.num_users, 2) AS retention_rate
FROM retention_data r
JOIN cohort_size s ON r.cohort_week = s.cohort_week
ORDER BY r.cohort_week, r.week_number;`
    },
    {
      title: "Event Tracking Utils",
      description: "Utility functions for consistent event tracking across your application",
      language: "JavaScript",
      icon: Code2,
      code: `// Standardized event tracking utilities
const EventTracker = {
  // Generate consistent event names
  formatEventName(object, action, context = null) {
    const parts = [object, action];
    if (context) parts.push(context);
    return parts.join('_').toLowerCase();
  },

  // Track with automatic enrichment
  track(eventName, properties = {}) {
    const enrichedProps = {
      ...properties,
      timestamp: new Date().toISOString(),
      page_url: window.location.href,
      page_path: window.location.pathname,
      referrer: document.referrer,
      user_agent: navigator.userAgent,
      screen_width: window.innerWidth,
      session_id: this.getSessionId(),
    };

    // Send to your analytics provider
    window.analytics?.track(eventName, enrichedProps);
  },

  // Session management
  getSessionId() {
    let sessionId = sessionStorage.getItem('session_id');
    if (!sessionId) {
      sessionId = 'sess_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('session_id', sessionId);
    }
    return sessionId;
  },

  // Timing helper for measuring durations
  startTimer(name) {
    this.timers = this.timers || {};
    this.timers[name] = performance.now();
  },

  endTimer(name) {
    if (this.timers?.[name]) {
      return Math.round(performance.now() - this.timers[name]);
    }
    return null;
  }
};

export default EventTracker;`
    },
    {
      title: "Activation Rate Query",
      description: "SQL query to calculate activation rate by cohort and source",
      language: "SQL",
      icon: Database,
      code: `-- Activation Rate by Signup Cohort and Source
WITH signups AS (
  SELECT
    user_id,
    DATE_TRUNC('week', created_at) AS signup_week,
    acquisition_source,
    acquisition_campaign
  FROM users
  WHERE created_at >= CURRENT_DATE - INTERVAL '90 days'
),
activations AS (
  SELECT DISTINCT user_id
  FROM events
  WHERE event_name = 'activation_completed'
)
SELECT
  s.signup_week,
  s.acquisition_source,
  COUNT(DISTINCT s.user_id) AS total_signups,
  COUNT(DISTINCT a.user_id) AS activated_users,
  ROUND(
    100.0 * COUNT(DISTINCT a.user_id) / COUNT(DISTINCT s.user_id),
    2
  ) AS activation_rate
FROM signups s
LEFT JOIN activations a ON s.user_id = a.user_id
GROUP BY s.signup_week, s.acquisition_source
ORDER BY s.signup_week DESC, activation_rate DESC;`
    },
    {
      title: "Segment Middleware",
      description: "Next.js middleware for automatic page tracking with Segment",
      language: "TypeScript",
      icon: Code2,
      code: `// middleware.ts - Automatic page tracking
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add tracking headers for server-side analytics
  const trackingData = {
    path: request.nextUrl.pathname,
    search: request.nextUrl.search,
    referrer: request.headers.get('referer') || '',
    userAgent: request.headers.get('user-agent') || '',
    timestamp: new Date().toISOString(),
  };

  // Pass tracking data to the page
  response.headers.set(
    'x-tracking-data',
    JSON.stringify(trackingData)
  );

  return response;
}

export const config = {
  matcher: [
    // Match all paths except static files
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};`
    },
    {
      title: "Funnel Analysis Query",
      description: "SQL query to analyze conversion funnel with step-by-step drop-off",
      language: "SQL",
      icon: PieChart,
      code: `-- Funnel Analysis with Drop-off Rates
WITH funnel_events AS (
  SELECT
    user_id,
    event_name,
    MIN(event_timestamp) AS first_occurrence
  FROM events
  WHERE event_name IN (
    'signup_page_viewed',
    'signup_started',
    'signup_completed',
    'onboarding_started',
    'activation_completed'
  )
  AND event_timestamp >= CURRENT_DATE - INTERVAL '30 days'
  GROUP BY user_id, event_name
),
funnel_steps AS (
  SELECT
    event_name,
    COUNT(DISTINCT user_id) AS users,
    CASE event_name
      WHEN 'signup_page_viewed' THEN 1
      WHEN 'signup_started' THEN 2
      WHEN 'signup_completed' THEN 3
      WHEN 'onboarding_started' THEN 4
      WHEN 'activation_completed' THEN 5
    END AS step_order
  FROM funnel_events
  GROUP BY event_name
)
SELECT
  step_order,
  event_name AS step_name,
  users,
  FIRST_VALUE(users) OVER (ORDER BY step_order) AS top_of_funnel,
  ROUND(100.0 * users / FIRST_VALUE(users) OVER (ORDER BY step_order), 2) AS conversion_from_top,
  LAG(users) OVER (ORDER BY step_order) AS previous_step_users,
  ROUND(100.0 * users / LAG(users) OVER (ORDER BY step_order), 2) AS step_conversion
FROM funnel_steps
ORDER BY step_order;`
    },
    {
      title: "A/B Test Results Calculator",
      description: "JavaScript function to calculate A/B test statistical significance",
      language: "JavaScript",
      icon: TestTube,
      code: `// A/B Test Statistical Significance Calculator
function calculateABTestResults(control, variant) {
  const { visitors: nA, conversions: xA } = control;
  const { visitors: nB, conversions: xB } = variant;

  // Conversion rates
  const pA = xA / nA;
  const pB = xB / nB;

  // Pooled probability
  const pPooled = (xA + xB) / (nA + nB);

  // Standard error
  const se = Math.sqrt(
    pPooled * (1 - pPooled) * (1/nA + 1/nB)
  );

  // Z-score
  const zScore = (pB - pA) / se;

  // P-value (two-tailed)
  const pValue = 2 * (1 - normalCDF(Math.abs(zScore)));

  // Confidence interval (95%)
  const lift = ((pB - pA) / pA) * 100;
  const marginOfError = 1.96 * se * 100 / pA;

  return {
    controlRate: (pA * 100).toFixed(2) + '%',
    variantRate: (pB * 100).toFixed(2) + '%',
    relativeLift: lift.toFixed(2) + '%',
    pValue: pValue.toFixed(4),
    isSignificant: pValue < 0.05,
    confidenceInterval: {
      lower: (lift - marginOfError).toFixed(2) + '%',
      upper: (lift + marginOfError).toFixed(2) + '%'
    }
  };
}

// Normal CDF approximation
function normalCDF(x) {
  const a1 =  0.254829592;
  const a2 = -0.284496736;
  const a3 =  1.421413741;
  const a4 = -1.453152027;
  const a5 =  1.061405429;
  const p  =  0.3275911;

  const sign = x < 0 ? -1 : 1;
  x = Math.abs(x) / Math.sqrt(2);

  const t = 1.0 / (1.0 + p * x);
  const y = 1.0 - (((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t * Math.exp(-x*x);

  return 0.5 * (1.0 + sign * y);
}

// Usage example:
const results = calculateABTestResults(
  { visitors: 10000, conversions: 350 },  // Control
  { visitors: 10000, conversions: 420 }   // Variant
);
console.log(results);`
    }
  ]
}

const categoryColors: Record<string, string> = {
  Activation: "bg-green-500/10 text-green-600 dark:text-green-400",
  Analytics: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Tracking: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  Experimentation: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  Retention: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  Planning: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  Strategy: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
}

const levelColors: Record<string, string> = {
  Beginner: "bg-green-500/10 text-green-600 dark:text-green-400",
  Intermediate: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  Advanced: "bg-red-500/10 text-red-600 dark:text-red-400"
}

function CodePreviewModal({
  isOpen,
  onClose,
  title,
  content,
  language
}: {
  isOpen: boolean
  onClose: () => void
  title: string
  content: string
  language?: string
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-background border rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{title}</h3>
            {language && <Badge variant="outline">{language}</Badge>}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleCopy}>
              {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
              {copied ? "Copied!" : "Copy"}
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
          </div>
        </div>
        <div className="p-4 overflow-auto max-h-[60vh]">
          <pre className="text-sm bg-muted p-4 rounded-lg overflow-x-auto">
            <code>{content}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}

export default function LibraryPage() {
  const [previewModal, setPreviewModal] = useState<{
    isOpen: boolean
    title: string
    content: string
    language?: string
  }>({ isOpen: false, title: "", content: "" })

  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null)

  const handleCopySnippet = (title: string, code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedSnippet(title)
    setTimeout(() => setCopiedSnippet(null), 2000)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50/50 via-background to-purple-50/50 dark:from-background dark:via-background dark:to-background border-b">
        <div className="container-wide section-spacing-sm">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium bg-primary/10 text-primary rounded-full">
              <BookOpen className="mr-2 h-3 w-3" />
              Growth Resources
            </span>
            <h1 className="heading-primary mb-4">Resource Library</h1>
            <p className="text-lg text-muted-foreground">
              Templates, guides, and code snippets to accelerate your growth engineering implementation. All resources are free and ready to use.
            </p>
            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                {resources.templates.length} Templates
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                {resources.guides.length} Guides
              </span>
              <span className="flex items-center gap-1">
                <Code2 className="h-4 w-4" />
                {resources.codeSnippets.length} Code Snippets
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="container-wide section-spacing">
        <SectionHeader
          title="Templates & Tools"
          subtitle="Ready-to-use templates for implementing growth systems"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resources.templates.map((template, idx) => {
            const Icon = template.icon
            return (
              <Card key={idx} className="card-hover group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="secondary" className={categoryColors[template.category] || ""}>
                      {template.category}
                    </Badge>
                  </div>
                  <CardTitle className="mt-4">{template.title}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{template.format}</span>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setPreviewModal({
                          isOpen: true,
                          title: template.title,
                          content: template.previewContent,
                          language: template.format
                        })}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                          navigator.clipboard.writeText(template.previewContent)
                          alert(`${template.title} content copied to clipboard!`)
                        }}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Guides Section */}
      <section className="bg-muted/30">
        <div className="container-wide section-spacing">
          <SectionHeader
            title="Implementation Guides"
            subtitle="In-depth tutorials and best practices"
          />
          <div className="grid gap-6 md:grid-cols-2">
            {resources.guides.map((guide, idx) => {
              const Icon = guide.icon
              return (
                <Card key={idx} className="card-hover group">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{guide.readTime}</Badge>
                          <Badge className={levelColors[guide.level] || ""}>
                            {guide.level}
                          </Badge>
                        </div>
                        <CardTitle className="mb-2">{guide.title}</CardTitle>
                        <CardDescription>{guide.description}</CardDescription>
                        <div className="flex items-center gap-3 mt-3">
                          <Button variant="link" className="p-0 h-auto" asChild>
                            <Link href={guide.href}>
                              Read Guide
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-1"
                            onClick={() => setPreviewModal({
                              isOpen: true,
                              title: guide.title,
                              content: guide.content,
                            })}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            Preview
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Code Snippets Section */}
      <section className="container-wide section-spacing">
        <SectionHeader
          title="Code Snippets"
          subtitle="Copy-paste ready code for common growth implementations"
        />
        <div className="grid gap-4 md:grid-cols-2">
          {resources.codeSnippets.map((snippet, idx) => {
            const Icon = snippet.icon
            const isCopied = copiedSnippet === snippet.title
            return (
              <Card key={idx} className="card-hover group">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{snippet.title}</CardTitle>
                        <CardDescription className="text-sm mt-1">
                          {snippet.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline">{snippet.language}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="bg-muted rounded-lg p-3 mb-3 max-h-32 overflow-hidden relative">
                    <pre className="text-xs overflow-hidden">
                      <code>{snippet.code.slice(0, 300)}...</code>
                    </pre>
                    <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-muted to-transparent" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCopySnippet(snippet.title, snippet.code)}
                    >
                      {isCopied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                      {isCopied ? "Copied!" : "Copy Code"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setPreviewModal({
                        isOpen: true,
                        title: snippet.title,
                        content: snippet.code,
                        language: snippet.language
                      })}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View Full
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-muted/30">
        <div className="container-narrow section-spacing-sm">
          <Card className="bg-gradient-to-r from-primary/10 to-purple-500/10 border-2 border-primary/20">
            <CardContent className="p-8 text-center">
              <h2 className="heading-tertiary mb-4">Need a Custom Template?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Use our Growth OS Builder to generate custom tracking specs and implementation guides tailored to your product.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/builder">
                    Open Builder
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/modules">
                    Browse Modules
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Preview Modal */}
      <CodePreviewModal
        isOpen={previewModal.isOpen}
        onClose={() => setPreviewModal({ ...previewModal, isOpen: false })}
        title={previewModal.title}
        content={previewModal.content}
        language={previewModal.language}
      />
    </div>
  );
}

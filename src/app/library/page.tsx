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
  BookOpen,
  FileSpreadsheet,
  ArrowRight,
  Copy,
  Check,
  ExternalLink,
  TestTube,
  ClipboardCheck,
  LayoutGrid,
  FileCode
} from "lucide-react"
import { useState } from "react"

const downloadableAssets = [
  {
    title: "Tracking Plan Template",
    description: "CSV template for documenting events, properties, and ownership in your analytics tracking plan.",
    icon: FileSpreadsheet,
    format: "CSV",
    category: "Tracking",
    fileName: "tracking-plan-template.csv",
    downloadPath: "/downloads/tracking-plan-template.csv"
  },
  {
    title: "Property Dictionary Template",
    description: "CSV template for defining and standardizing event properties across your analytics implementation.",
    icon: Database,
    format: "CSV",
    category: "Tracking",
    fileName: "property-dictionary-template.csv",
    downloadPath: "/downloads/property-dictionary-template.csv"
  },
  {
    title: "Event Naming Conventions",
    description: "Markdown guide for consistent event and property naming using object_action patterns.",
    icon: FileCode,
    format: "Markdown",
    category: "Standards",
    fileName: "event-naming-conventions.md",
    downloadPath: "/downloads/event-naming-conventions.md"
  },
  {
    title: "Activation Definition Template",
    description: "Template for documenting your product's activation metrics, criteria, and validation framework.",
    icon: FileText,
    format: "Markdown",
    category: "Analytics",
    fileName: "activation-definition-template.md",
    downloadPath: "/downloads/activation-definition-template.md"
  },
  {
    title: "KPI Tree Template",
    description: "Framework for building a metrics hierarchy that connects team efforts to business outcomes.",
    icon: GitBranch,
    format: "Markdown",
    category: "Analytics",
    fileName: "kpi-tree-template.md",
    downloadPath: "/downloads/kpi-tree-template.md"
  },
  {
    title: "Dashboard Pack Checklist",
    description: "Comprehensive checklist for building executive, acquisition, activation, and retention dashboards.",
    icon: LayoutGrid,
    format: "Markdown",
    category: "Analytics",
    fileName: "dashboard-pack-checklist.md",
    downloadPath: "/downloads/dashboard-pack-checklist.md"
  },
  {
    title: "Experiment Card Template",
    description: "Template for documenting A/B test hypotheses, design, statistical parameters, and results.",
    icon: TestTube,
    format: "Markdown",
    category: "Experimentation",
    fileName: "experiment-card-template.md",
    downloadPath: "/downloads/experiment-card-template.md"
  },
  {
    title: "Data Quality Audit Checklist",
    description: "Quarterly audit checklist covering event volume, property quality, identity, and schema compliance.",
    icon: ClipboardCheck,
    format: "Markdown",
    category: "Data Quality",
    fileName: "data-quality-audit-checklist.md",
    downloadPath: "/downloads/data-quality-audit-checklist.md"
  }
]

const guides = [
  {
    title: "Segment Tracking & Governance",
    description: "Build a scalable tracking implementation with event dictionaries, environment management, and governance best practices",
    icon: Code2,
    readTime: "20 min",
    level: "Intermediate",
    href: "/guides/segment-tracking-governance",
    cta: "Read Guide"
  },
  {
    title: "Typed Event Tracking",
    description: "Eliminate tracking bugs at compile time with type-safe analytics for Mixpanel, PostHog, or any provider",
    icon: Database,
    readTime: "18 min",
    level: "Intermediate",
    href: "/guides/typed-event-tracking",
    cta: "Read Guide"
  },
  {
    title: "Dashboard Pack Implementation",
    description: "Build North Star and Activation dashboards with clear metric definitions, SQL queries, and alerting strategies",
    icon: BarChart3,
    readTime: "25 min",
    level: "Advanced",
    href: "/guides/dashboard-pack-implementation",
    cta: "Read Guide"
  },
  {
    title: "Activation Metrics Overview",
    description: "Overview of how to identify, measure, and optimize your activation metrics for better retention",
    icon: BookOpen,
    readTime: "10 min",
    level: "Beginner",
    href: "/modules/activation-definition",
    cta: "View Module"
  },
  {
    title: "KPI Tree Overview",
    description: "Overview of how to build a metrics hierarchy that connects team efforts to business outcomes",
    icon: GitBranch,
    readTime: "18 min",
    level: "Intermediate",
    href: "/modules/kpi-tree",
    cta: "View Module"
  },
  {
    title: "Experiments Overview",
    description: "Overview of designing, running, and analyzing A/B tests and experiments",
    icon: TestTube,
    readTime: "22 min",
    level: "Intermediate",
    href: "/modules/experiments",
    cta: "View Module"
  }
]

const codeSnippets = [
  {
    title: "React Analytics Hook",
    description: "Custom React hook for tracking user events with automatic page views",
    language: "TypeScript",
    icon: FileText,
    code: `import { useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';

interface EventProperties {
  [key: string]: string | number | boolean;
}

export function useAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    trackEvent('page_viewed', { path: pathname });
  }, [pathname]);

  const trackEvent = useCallback((
    eventName: string,
    properties?: EventProperties
  ) => {
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
)
SELECT
  r.cohort_week,
  r.week_number,
  ROUND(100.0 * r.retained_users / s.num_users, 2) AS retention_rate
FROM retention_data r
JOIN cohort_size s ON r.cohort_week = s.cohort_week
ORDER BY r.cohort_week, r.week_number;`
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
    acquisition_source
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
    title: "Event Tracking Utils",
    description: "Utility functions for consistent event tracking across your application",
    language: "JavaScript",
    icon: Code2,
    code: `const EventTracker = {
  formatEventName(object, action, context = null) {
    const parts = [object, action];
    if (context) parts.push(context);
    return parts.join('_').toLowerCase();
  },

  track(eventName, properties = {}) {
    const enrichedProps = {
      ...properties,
      timestamp: new Date().toISOString(),
      page_url: window.location.href,
      page_path: window.location.pathname,
      session_id: this.getSessionId(),
    };
    window.analytics?.track(eventName, enrichedProps);
  },

  getSessionId() {
    let sessionId = sessionStorage.getItem('session_id');
    if (!sessionId) {
      sessionId = 'sess_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('session_id', sessionId);
    }
    return sessionId;
  }
};

export default EventTracker;`
  }
]

const categoryColors: Record<string, string> = {
  Tracking: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  Standards: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Analytics: "bg-green-500/10 text-green-600 dark:text-green-400",
  Experimentation: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  "Data Quality": "bg-pink-500/10 text-pink-600 dark:text-pink-400"
}

const levelColors: Record<string, string> = {
  Beginner: "bg-green-500/10 text-green-600 dark:text-green-400",
  Intermediate: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  Advanced: "bg-red-500/10 text-red-600 dark:text-red-400"
}

function ContentPreviewModal({
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

  const handleDownload = (downloadPath: string, fileName: string) => {
    const link = document.createElement('a')
    link.href = downloadPath
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
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
              Starter templates and code snippets to accelerate your growth engineering implementation. All resources are free to download and adapt to your stack.
            </p>
            <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                {downloadableAssets.length} Downloads
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                {guides.length} Guides
              </span>
              <span className="flex items-center gap-1">
                <Code2 className="h-4 w-4" />
                {codeSnippets.length} Code Snippets
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Downloadable Assets Section */}
      <section className="container-wide section-spacing">
        <SectionHeader
          title="Downloadable Templates"
          subtitle="Ready-to-use templates for your analytics and experimentation workflows"
        />
        <p className="text-sm text-muted-foreground mb-8 -mt-4">
          These are starter templates. Adapt them to your specific stack and requirements.
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {downloadableAssets.map((asset, idx) => {
            const Icon = asset.icon
            return (
              <Card key={idx} className="card-hover group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="secondary" className={categoryColors[asset.category] || ""}>
                      {asset.category}
                    </Badge>
                  </div>
                  <CardTitle className="mt-4">{asset.title}</CardTitle>
                  <CardDescription>{asset.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{asset.format}</span>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleDownload(asset.downloadPath, asset.fileName)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
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
            {guides.map((guide, idx) => {
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
                              {guide.cta}
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Link>
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
          {codeSnippets.map((snippet, idx) => {
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
              <h2 className="heading-tertiary mb-4">Need a Custom Tracking Spec?</h2>
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
      <ContentPreviewModal
        isOpen={previewModal.isOpen}
        onClose={() => setPreviewModal({ ...previewModal, isOpen: false })}
        title={previewModal.title}
        content={previewModal.content}
        language={previewModal.language}
      />
    </div>
  );
}

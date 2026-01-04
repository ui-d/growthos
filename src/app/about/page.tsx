'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin, ArrowRight, Rocket, BarChart3, Zap } from "lucide-react";
import Link from "next/link";

// Editable tooling constants
const TOOLS = {
  analytics: ["Segment", "Mixpanel", "Amplitude", "Google Analytics"],
  development: ["Next.js", "React", "TypeScript", "Node.js"],
  experimentation: ["Optimizely", "LaunchDarkly", "Statsig"],
  data: ["BigQuery", "Snowflake", "dbt", "Looker"]
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Hero Section */}
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          Growth Engineering Leader
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          I build activation and revenue systems that scale. From tracking infrastructure to experiment frameworks, I ship the tools that drive growth.
        </p>
      </div>

      {/* What I Do Section */}
      <Card className="mb-12">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-primary" />
            <CardTitle className="text-2xl">What I Do</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">Design activation systems</span> that convert signups into engaged users through data-driven onboarding flows, personalized experiences, and strategic touchpoints that reduce time-to-value
              </p>
            </li>
            <li className="flex gap-3">
              <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">Build revenue infrastructure</span> that accelerates monetization through intelligent pricing experiments, conversion optimization, and scalable billing systems that support rapid growth
              </p>
            </li>
            <li className="flex gap-3">
              <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">Scale experimentation culture</span> by implementing robust A/B testing frameworks, feature flagging systems, and analytics pipelines that empower teams to make data-driven decisions
              </p>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Artifacts I Ship Section */}
      <Card className="mb-12">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <CardTitle className="text-2xl">Artifacts I Ship</CardTitle>
          </div>
          <CardDescription>Tangible systems that drive measurable impact</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Badge variant="outline">Analytics</Badge>
                Tracking Specifications
              </h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive event tracking documentation and implementation guides that ensure consistent, actionable data collection across all product surfaces
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Badge variant="outline">Insights</Badge>
                Growth Dashboards
              </h3>
              <p className="text-sm text-muted-foreground">
                Real-time KPI monitoring systems and cohort analysis tools that surface actionable insights for product and business teams
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Badge variant="outline">Automation</Badge>
                Lifecycle Triggers
              </h3>
              <p className="text-sm text-muted-foreground">
                Automated engagement systems that nurture users through critical moments with personalized messaging and intelligent timing
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                <Badge variant="outline">Experimentation</Badge>
                Testing Infrastructure
              </h3>
              <p className="text-sm text-muted-foreground">
                Robust A/B testing frameworks and feature flag systems that enable rapid iteration and continuous optimization
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tooling Section */}
      <Card className="mb-12">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <CardTitle className="text-2xl">Tooling</CardTitle>
          </div>
          <CardDescription>Technologies I leverage to build growth systems</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-3">Analytics & Data</h3>
              <div className="flex flex-wrap gap-2">
                {TOOLS.analytics.map((tool) => (
                  <Badge key={tool} variant="secondary">{tool}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-3">Development</h3>
              <div className="flex flex-wrap gap-2">
                {TOOLS.development.map((tool) => (
                  <Badge key={tool} variant="secondary">{tool}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-3">Experimentation</h3>
              <div className="flex flex-wrap gap-2">
                {TOOLS.experimentation.map((tool) => (
                  <Badge key={tool} variant="secondary">{tool}</Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-3">Data Infrastructure</h3>
              <div className="flex flex-wrap gap-2">
                {TOOLS.data.map((tool) => (
                  <Badge key={tool} variant="secondary">{tool}</Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Work Style Section */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-2xl">Work Style</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            I thrive in fast-paced environments where data drives decisions and experimentation is the norm.
            My approach combines technical depth with strategic thinking—I&apos;m equally comfortable architecting
            systems, analyzing metrics, or presenting to stakeholders. I believe in building for scale from day one,
            maintaining clear documentation, and empowering teams through automation and self-service tools.
          </p>
        </CardContent>
      </Card>

      {/* CTA Section */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Let&apos;s Build Something Great</h2>
              <p className="text-muted-foreground">
                Ready to accelerate your growth? Let&apos;s discuss how I can help scale your activation and revenue systems.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="group">
                <Link href="https://linkedin.com/in/placeholder" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" />
                  Connect on LinkedIn
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group">
                <Link href="mailto:contact@example.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
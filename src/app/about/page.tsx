'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Linkedin, ArrowRight, Rocket, BarChart3, Zap } from "lucide-react";
import Link from "next/link";

// Editable tooling constants
const TOOLS = {
  analytics: ["Segment", "Mixpanel", "Amplitude"],
  data: ["SQL", "reverse ETL"],
  experimentation: ["Feature flags", "experimentation"],
  development: ["Next.js", "TypeScript"]
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-purple-500/5 border-b">
        <div className="container-narrow section-spacing">
          <div className="text-center space-y-4">
            <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium bg-primary/10 text-primary rounded-full">
              <Rocket className="mr-2 h-3 w-3" />
              About Growth OS
            </span>
            <h1 className="heading-primary gradient-text">
              About
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              I build activation and revenue infrastructure for PLG SaaS.
            </p>
          </div>
        </div>
      </section>

      <div className="container-narrow section-spacing space-y-12">

        {/* What I Do Section */}
        <Card className="border-2 hover:border-primary/20 transition-colors">
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
              <p className="text-foreground">
                Design activation definitions tied to real product value.
              </p>
            </li>
            <li className="flex gap-3">
              <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
              <p className="text-foreground">
                Ship tracking specs (events + properties) that teams can actually maintain.
              </p>
            </li>
            <li className="flex gap-3">
              <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
              <p className="text-foreground">
                Build dashboards + experiment systems to turn data into decisions.
              </p>
            </li>
          </ul>
        </CardContent>
      </Card>

        {/* Artifacts I Ship Section */}
        <Card className="border-2 hover:border-primary/20 transition-colors">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <CardTitle className="text-2xl">Artifacts I Ship</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
              <p className="text-foreground">
                KPI tree + North Star definitions
              </p>
            </li>
            <li className="flex gap-3">
              <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
              <p className="text-foreground">
                Activation spec + TTV instrumentation
              </p>
            </li>
            <li className="flex gap-3">
              <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
              <p className="text-foreground">
                Tracking plan + property dictionary
              </p>
            </li>
            <li className="flex gap-3">
              <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
              <p className="text-foreground">
                Dashboard pack (activation, retention, adoption, revenue)
              </p>
            </li>
            <li className="flex gap-3">
              <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
              <p className="text-foreground">
                Experiment backlog + scoring + decision log
              </p>
            </li>
            <li className="flex gap-3">
              <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
              <p className="text-foreground">
                Data quality checklist + governance
              </p>
            </li>
          </ul>
        </CardContent>
      </Card>

        {/* Tooling Section */}
        <Card className="border-2 hover:border-primary/20 transition-colors">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <CardTitle className="text-2xl">Tooling</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex flex-wrap gap-2">
                {TOOLS.analytics.map((tool) => (
                  <Badge key={tool} variant="secondary">{tool}</Badge>
                ))}
              </div>
            </div>
            <div>
              <div className="flex flex-wrap gap-2">
                {TOOLS.data.map((tool) => (
                  <Badge key={tool} variant="secondary">{tool}</Badge>
                ))}
              </div>
            </div>
            <div>
              <div className="flex flex-wrap gap-2">
                {TOOLS.experimentation.map((tool) => (
                  <Badge key={tool} variant="secondary">{tool}</Badge>
                ))}
              </div>
            </div>
            <div>
              <div className="flex flex-wrap gap-2">
                {TOOLS.development.map((tool) => (
                  <Badge key={tool} variant="secondary">{tool}</Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

        {/* Work Style Section */}
        <Card className="border-2 hover:border-primary/20 transition-colors">
        <CardHeader>
          <CardTitle className="text-2xl">Work Style</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
              <p className="text-foreground">
                Definitions first, instrumentation second, experiments third, scale last.
              </p>
            </li>
            <li className="flex gap-3">
              <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
              <p className="text-foreground">
                Bias toward small, measurable changes.
              </p>
            </li>
          </ul>
        </CardContent>
      </Card>

      </div>

      {/* Contact Section */}
      <section className="border-t bg-gradient-to-br from-primary/5 via-background to-purple-500/5">
        <div className="container-narrow section-spacing">
          <Card className="bg-gradient-to-r from-primary/10 to-purple-500/10 border-2 border-primary/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Contact</h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="group">
                <Link href="https://linkedin.com/in/growthos" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" />
                  Connect on LinkedIn
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group">
                <Link href="mailto:hello@growthos.com">
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
      </section>
    </div>
  );
}
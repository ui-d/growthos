'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Linkedin,
  ArrowRight,
  Rocket,
  BarChart3,
  Zap,
  Briefcase,
  Code2,
  Github,
  Youtube,
  Globe,
  MapPin,
  GraduationCap,
  Bot
} from "lucide-react";
import Link from "next/link";

const SKILLS = {
  aiFirst: ["Claude Code", "Cursor", "Lovable", "Gemini", "v0.dev", "AI Agents"],
  frontend: ["TypeScript", "React", "Next.js", "Vue", "Tailwind", "GSAP"],
  backend: ["Node.js", "Python", "Serverless/Edge", "Headless CMS", "Vercel"],
  data: ["SQL", "PostgreSQL", "Supabase", "BigQuery", "Looker", "Fivetran"],
  marketing: ["Mixpanel", "GA4", "Segment", "Intercom", "A/B Testing"],
  automation: ["Make.com", "Zapier", "n8n", "Airtable", "Clay", "Cargo"]
};

const EXPERIENCE = [
  {
    role: "Growth Engineer",
    company: "Appsmith",
    period: "Jun 2024 - Present",
    tech: "TypeScript | Node | Contentful | Analytics / GTM Stack",
    highlights: [
      "Technical owner of appsmith.com acquisition surfaces: architecture, reusable components, UX patterns",
      "Shipped full-stack features: sign-up flows, landing pages, promotions, and conversion-critical experiences",
      "Designed automation: lead enrichment, attribution consistency, and routing between marketing and sales",
      "Applied AI-first workflows for faster delivery while maintaining high code review quality"
    ]
  },
  {
    role: "Web Engineer (Marketing)",
    company: "Stenn",
    period: "Mar 2024 - Jun 2024",
    tech: "Webflow | JavaScript | React | Salesforce | GTM",
    highlights: [
      "Built and optimized pages in Webflow with focus on SEO, accessibility, and performance",
      "Managed tracking and analytics through Google Tag Manager; diagnosed attribution issues",
      "Collaborated with Product and Marketing to ship changes quickly without breaking measurement"
    ]
  },
  {
    role: "Frontend Developer (Marketing)",
    company: "Hygraph",
    period: "Sep 2023 - Mar 2024",
    tech: "Next.js 13 | TypeScript | Tailwind | Storybook | Vercel",
    highlights: [
      "Developed and maintained hygraph.com marketing website and design system",
      "Shipped pixel-perfect, accessible UI components in collaboration with design/product",
      "Supported infrastructure for marketing automation, experimentation, and attribution"
    ]
  },
  {
    role: "Growth Engineer",
    company: "Pilot",
    period: "Feb 2022 - Aug 2023",
    tech: "React | Next.js | Tailwind | Storyblok | GSAP | Node.js",
    highlights: [
      "Led major homepage rebuild: architecture, implementation, and migration for maintainability",
      "Shipped programmatic SEO initiatives and executed performance/technical SEO improvements",
      "Implemented analytics/marketing stack integrations (Segment, GA4, experimentation tools)",
      "Supported A/B tests for demo request flows and funnel improvements"
    ]
  },
  {
    role: "Web Developer (Marketing)",
    company: "Ziflow",
    period: "Oct 2019 - Feb 2022",
    tech: "HubSpot | HTML5 | CSS3 | ES6+ | GSAP | Lottie | Node.js",
    highlights: [
      "Delivered marketing pages and interactive elements with high visual fidelity",
      "Built marketing automations and integrations (Make, Zapier, Chili Piper, enrichment tooling)",
      "Partnered with content and demand gen teams to ship experiments without breaking measurement"
    ]
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-purple-500/5">
        <div className="container-narrow section-spacing">
          <div className="text-center space-y-6">
            <span className="inline-flex items-center px-3 py-1 mb-4 text-sm font-medium bg-primary/10 text-primary rounded-full">
              <Rocket className="mr-2 h-3 w-3" />
              Growth Engineer
            </span>
            <h1 className="heading-primary gradient-text">
              Dawid Nawrocki
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Growth Engineer with full-stack expertise in React, Next.js, Node.js, and modern marketing stacks.
              I build and optimize acquisition + activation surfaces: marketing websites, landing pages,
              signup/demo flows, and experimentation frameworks.
            </p>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Toruń, Poland</span>
              <span className="mx-2">•</span>
              <span>Open to Remote</span>
            </div>
            <div className="flex flex-wrap gap-3 justify-center pt-4">
              <Button asChild size="lg" className="group">
                <Link href="https://linkedin.com/in/dawid-nawrocki" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="https://github.com/ui-d" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="https://youtube.com/uideveloper" target="_blank" rel="noopener noreferrer">
                  <Youtube className="mr-2 h-4 w-4" />
                  YouTube
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="https://dawidat.work" target="_blank" rel="noopener noreferrer">
                  <Globe className="mr-2 h-4 w-4" />
                  Portfolio
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container-narrow section-spacing space-y-12">

        {/* What I Do Section */}
        <Card className="shadow-sm hover:shadow-lg transition-all duration-300">
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
                  <strong>Acquisition & Activation Surfaces</strong> — Marketing websites, landing pages, signup/demo flows, and conversion-critical experiences.
                </p>
              </li>
              <li className="flex gap-3">
                <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                <p className="text-foreground">
                  <strong>Measurement & Automation</strong> — Instrumentation, attribution hygiene, lead routing, and enrichment that improves pipeline quality and revenue.
                </p>
              </li>
              <li className="flex gap-3">
                <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                <p className="text-foreground">
                  <strong>Experimentation Frameworks</strong> — A/B testing infrastructure, feature flags, and structured testing systems to turn data into decisions.
                </p>
              </li>
              <li className="flex gap-3">
                <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                <p className="text-foreground">
                  <strong>AI-First Workflows</strong> — Leveraging AI tools for faster prototyping, debugging, refactoring, and documentation while maintaining high standards.
                </p>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Technical Skills Section */}
        <Card className="shadow-sm hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Code2 className="h-5 w-5 text-primary" />
              <CardTitle className="text-2xl">Technical Skills</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Bot className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">AI-First</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.aiFirst.map((skill) => (
                    <Badge key={skill} variant="default">{skill}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground mb-3 block">Frontend</span>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.frontend.map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground mb-3 block">Backend & Infrastructure</span>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.backend.map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground mb-3 block">Data & Analytics</span>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.data.map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground mb-3 block">Marketing Tools</span>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.marketing.map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground mb-3 block">Automation & Low-Code</span>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.automation.map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Experience Section */}
        <Card className="shadow-sm hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-primary" />
              <CardTitle className="text-2xl">Experience</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {EXPERIENCE.map((job, index) => (
                <div key={index} className={index !== EXPERIENCE.length - 1 ? "pb-8 border-b border-border" : ""}>
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{job.role}</h3>
                      <p className="text-primary font-medium">{job.company}</p>
                    </div>
                    <span className="text-sm text-muted-foreground whitespace-nowrap">{job.period}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 font-mono">{job.tech}</p>
                  <ul className="space-y-2">
                    {job.highlights.map((highlight, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground flex-shrink-0" />
                        <span className="text-muted-foreground">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="pt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  + 15 years of freelance web development experience with international clients
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Artifacts I Ship Section */}
        <Card className="shadow-sm hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <CardTitle className="text-2xl">Artifacts I Ship</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <p className="text-foreground">KPI tree + North Star definitions</p>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <p className="text-foreground">Activation spec + TTV instrumentation</p>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <p className="text-foreground">Tracking plan + property dictionary</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <p className="text-foreground">Dashboard pack (activation, retention, revenue)</p>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <p className="text-foreground">Experiment backlog + decision log</p>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  <p className="text-foreground">Data quality checklist + governance</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Work Style Section */}
        <Card className="shadow-sm hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <CardTitle className="text-2xl">Work Philosophy</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                <p className="text-foreground">
                  <strong>Definitions first</strong> — instrumentation second, experiments third, scale last.
                </p>
              </li>
              <li className="flex gap-3">
                <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                <p className="text-foreground">
                  <strong>Bias toward action</strong> — small, measurable changes that compound over time.
                </p>
              </li>
              <li className="flex gap-3">
                <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                <p className="text-foreground">
                  <strong>High standards</strong> — for performance (Core Web Vitals), accessibility, and experiment validity.
                </p>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Education Section */}
        <Card className="shadow-sm hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <CardTitle className="text-2xl">Education</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <div>
                  <p className="font-medium">Polish-Japanese Academy of Information Technology</p>
                  <p className="text-sm text-muted-foreground">Sound Production, Postgraduate studies</p>
                </div>
                <span className="text-sm text-muted-foreground">2010-2011</span>
              </li>
              <li className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <div>
                  <p className="font-medium">Adam Mickiewicz University, Poznań</p>
                  <p className="text-sm text-muted-foreground">New Media Studies, Master&apos;s degree</p>
                </div>
                <span className="text-sm text-muted-foreground">2005-2010</span>
              </li>
            </ul>
          </CardContent>
        </Card>

      </div>

      {/* Contact Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-purple-500/5">
        <div className="container-narrow section-spacing">
          <Card className="bg-gradient-to-r from-primary/10 to-purple-500/10 shadow-lg">
            <CardContent className="pt-6">
              <div className="text-center space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Let&apos;s Connect</h2>
                  <p className="text-muted-foreground">
                    Interested in working together? Let&apos;s talk about growth engineering.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="group">
                    <Link href="https://linkedin.com/in/dawid-nawrocki" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="mr-2 h-4 w-4" />
                      Connect on LinkedIn
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="group">
                    <Link href="mailto:dawiddeveloper@gmail.com">
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

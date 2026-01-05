"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Info,
  Rocket,
  Layers,
  Route,
  Users,
  FileText,
  Mail,
  Shield,
  RotateCcw,
  Download,
  RotateCw,
  Globe,
  Palette,
  Code,
  LayoutGrid,
  Ruler,
  ChevronRight
} from "lucide-react"

import { cn } from "@/lib/utils"

const navigationSections = [
  {
    title: "Introduction",
    items: [
      { href: "/", label: "Getting Started", icon: Info },
      { href: "/quick-start", label: "Quick Start", icon: Rocket },
      { href: "/concepts", label: "Concepts", icon: Layers },
      { href: "/roadmap", label: "Roadmap", icon: Route },
      { href: "/community", label: "Community", icon: Users },
    ],
  },
  {
    title: "Setup Tutorials",
    items: [
      { href: "/setup/overview", label: "Overview", icon: FileText },
      { href: "/setup/email", label: "Sign Up with Email", icon: Mail },
      { href: "/setup/verification", label: "Server-side Verification", icon: Shield },
      { href: "/setup/recovery", label: "Account Recovery", icon: RotateCcw },
      { href: "/setup/installation", label: "Installation", icon: Download },
      { href: "/setup/upgrade", label: "Upgrade Guide", icon: RotateCw },
    ],
  },
  {
    title: "Customizations",
    items: [
      { href: "/customizations/design", label: "Design Tutorial", icon: Globe },
      { href: "/customizations/themes", label: "Themes & Settings", icon: Palette },
      { href: "/customizations/css", label: "Custom CSS", icon: Code },
      { href: "/customizations/layout", label: "Layout", icon: LayoutGrid },
      { href: "/customizations/sizing", label: "Basic Sizing", icon: Ruler, active: true },
    ],
  },
]

const tableOfContents = [
  {
    title: "How to set an element to a width?",
    items: [
      { href: "#fixed-widths", label: "Fixed widths", active: true },
      { href: "#percentage-widths", label: "Percentage widths" },
      { href: "#resetting-width", label: "Resetting the width" },
      { href: "#min-width", label: "Min-Width" },
      { href: "#max-width", label: "Max-Width" },
    ],
  },
  {
    title: "How to set an element to a height?",
    items: [
      { href: "#fixed-heights", label: "Fixed heights" },
      { href: "#percentage-heights", label: "Percentage heights" },
      { href: "#resetting-heights", label: "Resetting the heights" },
      { href: "#min-height", label: "Min-Height" },
      { href: "#max-heights", label: "Max-Heights" },
    ],
  },
  {
    title: "How to set an element to a size?",
    items: [
      { href: "#class-properties", label: "Class & properties" },
      { href: "#fixed-sizes", label: "Fixed sizes" },
      { href: "#percentage-sizes", label: "Percentage sizes" },
      { href: "#resetting-size", label: "Resetting the size" },
    ],
  },
]

interface DocsLayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
  breadcrumb?: { label: string; href: string }[]
}

export function DocsLayout({
  children,
  title = "Basic Width, Height & Size",
  description = "Customizations for setting the width and height of an element at the same time.",
  breadcrumb = [
    { label: "Overview", href: "/" },
    { label: "Customizations", href: "/customizations" },
    { label: "Basic Sizing", href: "/customizations/sizing" }
  ]
}: DocsLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex min-h-screen">
      {/* Left Sidebar */}
      <aside className="hidden lg:block w-64 pt-10 pb-20 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto pr-4 border-r border-transparent">
        {navigationSections.map((section) => (
          <div key={section.title} className="mb-8">
            <h3 className="font-bold text-foreground mb-3">{section.title}</h3>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "group flex items-center px-2 py-1.5 text-sm font-medium rounded-md transition-colors",
                      item.active || pathname === item.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-primary"
                    )}
                  >
                    <item.icon className="text-lg mr-2 w-4 h-4 flex-shrink-0 group-hover:text-primary" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 py-10 px-4 sm:px-6 lg:px-12">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex mb-6">
          <ol className="flex items-center space-x-2 border border-primary/20 rounded-full px-4 py-1 w-fit bg-primary/5">
            {breadcrumb.map((item, index) => (
              <li key={item.href} className="flex items-center">
                {index > 0 && (
                  <ChevronRight className="text-primary text-xs mx-1 w-3 h-3" />
                )}
                <Link
                  href={item.href}
                  className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-4">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground">
            {description}
          </p>
        </div>

        {/* Content */}
        <div className="prose dark:prose-invert max-w-4xl">
          {children}
        </div>
      </main>

      {/* Right Sidebar - Table of Contents */}
      <aside className="hidden xl:block w-72 pt-10 pb-20 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto pl-6">
        <h4 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider">
          On this page
        </h4>
        <nav className="space-y-6">
          {tableOfContents.map((section) => (
            <div key={section.title}>
              <h5 className="text-sm font-semibold text-primary mb-3">
                {section.title}
              </h5>
              <ul className="space-y-2 border-l border-border ml-1">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block pl-4 py-1 text-sm transition-colors",
                        item.active
                          ? "font-medium text-primary border-l-2 border-primary -ml-[2px]"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </div>
  )
}
"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, List } from "lucide-react"

interface Section {
  id: string
  label: string
}

interface ArchitectureTOCProps {
  sections: Section[]
}

export function ArchitectureTOC({ sections }: ArchitectureTOCProps) {
  const [activeSection, setActiveSection] = React.useState<string>("")
  const [mobileOpen, setMobileOpen] = React.useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: 0,
      }
    )

    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [sections])

  const handleClick = (id: string) => {
    setMobileOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      {/* Mobile TOC */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center justify-between w-full p-3 rounded-lg bg-muted/50 border border-border/40 text-sm font-medium"
        >
          <span className="flex items-center gap-2">
            <List className="h-4 w-4" />
            On this page
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              mobileOpen && "rotate-180"
            )}
          />
        </button>
        {mobileOpen && (
          <nav className="mt-2 p-3 rounded-lg bg-muted/30 border border-border/40">
            <ul className="space-y-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => handleClick(section.id)}
                    className={cn(
                      "block w-full text-left px-3 py-2 text-sm rounded-md transition-colors",
                      activeSection === section.id
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Desktop TOC */}
      <aside className="hidden lg:block w-56 shrink-0">
        <div className="sticky top-24">
          <div className="text-sm font-medium text-muted-foreground mb-3">
            On this page
          </div>
          <nav>
            <ul className="space-y-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => handleClick(section.id)}
                    className={cn(
                      "block w-full text-left px-3 py-1.5 text-sm rounded-md transition-colors border-l-2",
                      activeSection === section.id
                        ? "border-primary text-primary font-medium bg-primary/5"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                    )}
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  )
}

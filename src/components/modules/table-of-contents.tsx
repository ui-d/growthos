"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import type { TocHeading } from "@/lib/mdx"

interface TableOfContentsProps {
  headings: TocHeading[]
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = React.useState<string>("")

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-80px 0px -80% 0px" }
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) {
    return null
  }

  // Group headings by h2 sections
  const groupedHeadings = headings.reduce<{ h2: TocHeading; children: TocHeading[] }[]>(
    (acc, heading) => {
      if (heading.level === 2) {
        acc.push({ h2: heading, children: [] })
      } else if (heading.level === 3 && acc.length > 0) {
        acc[acc.length - 1].children.push(heading)
      }
      return acc
    },
    []
  )

  return (
    <aside className="hidden xl:block w-64 shrink-0">
      <div className="sticky top-24 h-[calc(100vh-8rem)] overflow-y-auto pr-4">
        <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
          On this page
        </h4>
        <nav className="space-y-4">
          {groupedHeadings.map((group) => (
            <div key={group.h2.id}>
              <a
                href={`#${group.h2.id}`}
                className={cn(
                  "block text-sm font-medium transition-colors py-1",
                  activeId === group.h2.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {group.h2.text}
              </a>
              {group.children.length > 0 && (
                <ul className="mt-2 space-y-1 border-l border-border ml-1">
                  {group.children.map((child) => (
                    <li key={child.id}>
                      <a
                        href={`#${child.id}`}
                        className={cn(
                          "block pl-4 py-1 text-sm transition-colors",
                          activeId === child.id
                            ? "text-primary border-l-2 border-primary -ml-[1px]"
                            : "text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {child.text}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  )
}

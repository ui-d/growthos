"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Search, FileText, BookOpen, Wrench, Library, Home, Info, Layers } from "lucide-react"

import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface SearchItem {
  title: string
  description: string
  href: string
  category: string
  icon: React.ComponentType<{ className?: string }>
  keywords?: string[]
}

const searchItems: SearchItem[] = [
  // Pages
  {
    title: "Home",
    description: "Welcome to Growth OS",
    href: "/",
    category: "Pages",
    icon: Home,
    keywords: ["main", "landing", "start"]
  },
  {
    title: "Builder",
    description: "Create custom growth specs and implementations",
    href: "/builder",
    category: "Pages",
    icon: Wrench,
    keywords: ["create", "generate", "spec", "wizard"]
  },
  {
    title: "Modules",
    description: "Implementation guides and templates",
    href: "/modules",
    category: "Pages",
    icon: Layers,
    keywords: ["guides", "templates", "documentation"]
  },
  {
    title: "Library",
    description: "Templates, guides, and code snippets",
    href: "/library",
    category: "Pages",
    icon: Library,
    keywords: ["resources", "templates", "code"]
  },
  {
    title: "Examples",
    description: "Example implementations and use cases",
    href: "/examples",
    category: "Pages",
    icon: FileText,
    keywords: ["samples", "demos", "use cases"]
  },
  {
    title: "About",
    description: "Learn more about Growth OS",
    href: "/about",
    category: "Pages",
    icon: Info,
    keywords: ["information", "team", "mission"]
  },

  // Documentation Topics
  {
    title: "Activation Tracking",
    description: "Define and measure user activation events",
    href: "/modules/activation-definition",
    category: "Documentation",
    icon: BookOpen,
    keywords: ["activation", "tracking", "events", "onboarding"]
  },
  {
    title: "Tracking Spec",
    description: "Implement Segment analytics tracking",
    href: "/modules/tracking-spec",
    category: "Documentation",
    icon: BookOpen,
    keywords: ["segment", "analytics", "events", "implementation"]
  },
  {
    title: "Funnels & Growth Loops",
    description: "Build sustainable growth mechanisms",
    href: "/modules/funnels",
    category: "Documentation",
    icon: BookOpen,
    keywords: ["funnel", "loop", "conversion", "growth"]
  },
  {
    title: "Data Quality",
    description: "Best practices for data layer architecture",
    href: "/modules/data-quality",
    category: "Documentation",
    icon: BookOpen,
    keywords: ["data", "quality", "validation", "schema"]
  },
  {
    title: "KPI Tree",
    description: "Build metrics hierarchy from North Star to inputs",
    href: "/modules/kpi-tree",
    category: "Documentation",
    icon: BookOpen,
    keywords: ["kpi", "metrics", "north star", "okr"]
  },
  {
    title: "Experimentation",
    description: "A/B testing and experiment design",
    href: "/modules/experiments",
    category: "Documentation",
    icon: BookOpen,
    keywords: ["ab test", "experiment", "hypothesis", "statistical"]
  },

  // Library Resources
  {
    title: "Activation Tracking Template",
    description: "Template for defining activation events",
    href: "/library#templates",
    category: "Templates",
    icon: FileText,
    keywords: ["template", "activation", "spec"]
  },
  {
    title: "Growth Metrics Dashboard",
    description: "Pre-built dashboard with key metrics",
    href: "/library#templates",
    category: "Templates",
    icon: FileText,
    keywords: ["dashboard", "looker", "metrics"]
  },
  {
    title: "React Analytics Hook",
    description: "Custom hook for tracking user events",
    href: "/library#code-snippets",
    category: "Code",
    icon: FileText,
    keywords: ["react", "hook", "typescript", "analytics"]
  },
  {
    title: "Retention Cohort SQL",
    description: "SQL query for cohort analysis",
    href: "/library#code-snippets",
    category: "Code",
    icon: FileText,
    keywords: ["sql", "retention", "cohort", "query"]
  },
]

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter()
  const [query, setQuery] = React.useState("")
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const listRef = React.useRef<HTMLDivElement>(null)

  // Filter results based on query
  const filteredItems = React.useMemo(() => {
    if (!query.trim()) {
      return searchItems
    }

    const searchTerms = query.toLowerCase().split(" ")
    return searchItems.filter((item) => {
      const searchableText = [
        item.title,
        item.description,
        item.category,
        ...(item.keywords || [])
      ].join(" ").toLowerCase()

      return searchTerms.every(term => searchableText.includes(term))
    })
  }, [query])

  // Group items by category
  const groupedItems = React.useMemo(() => {
    const groups: Record<string, SearchItem[]> = {}
    filteredItems.forEach((item) => {
      if (!groups[item.category]) {
        groups[item.category] = []
      }
      groups[item.category].push(item)
    })
    return groups
  }, [filteredItems])

  // Reset selection when query changes
  React.useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  // Focus input when dialog opens
  React.useEffect(() => {
    if (open) {
      setQuery("")
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [open])

  // Scroll selected item into view
  React.useEffect(() => {
    if (listRef.current) {
      const selectedElement = listRef.current.querySelector(`[data-index="${selectedIndex}"]`)
      selectedElement?.scrollIntoView({ block: "nearest" })
    }
  }, [selectedIndex])

  const handleSelect = (href: string) => {
    onOpenChange(false)
    router.push(href)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) =>
          prev < filteredItems.length - 1 ? prev + 1 : prev
        )
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
        break
      case "Enter":
        e.preventDefault()
        if (filteredItems[selectedIndex]) {
          handleSelect(filteredItems[selectedIndex].href)
        }
        break
      case "Escape":
        e.preventDefault()
        onOpenChange(false)
        break
    }
  }

  let currentIndex = 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="overflow-hidden p-0 sm:max-w-xl"
        showCloseButton={false}
      >
        <div className="flex items-center border-b px-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search documentation..."
            className="flex h-12 w-full border-0 bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            ESC
          </kbd>
        </div>
        <div ref={listRef} className="max-h-[300px] overflow-y-auto overflow-x-hidden">
          {filteredItems.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No results found for &quot;{query}&quot;
            </div>
          ) : (
            Object.entries(groupedItems).map(([category, items]) => (
              <div key={category} className="px-2 py-2">
                <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                  {category}
                </div>
                {items.map((item) => {
                  const index = currentIndex++
                  const Icon = item.icon
                  return (
                    <button
                      key={item.href}
                      data-index={index}
                      className={cn(
                        "relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none",
                        selectedIndex === index
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-accent/50"
                      )}
                      onClick={() => handleSelect(item.href)}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <Icon className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                      <div className="flex flex-col items-start">
                        <span className="font-medium">{item.title}</span>
                        <span className="text-xs text-muted-foreground line-clamp-1">
                          {item.description}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            ))
          )}
        </div>
        <div className="flex items-center justify-between border-t px-3 py-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <kbd className="rounded border bg-muted px-1 py-0.5">↑</kbd>
              <kbd className="rounded border bg-muted px-1 py-0.5">↓</kbd>
              to navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border bg-muted px-1 py-0.5">↵</kbd>
              to select
            </span>
          </div>
          <span className="flex items-center gap-1">
            <kbd className="rounded border bg-muted px-1 py-0.5">esc</kbd>
            to close
          </span>
        </div>
      </DialogContent>
    </Dialog>
  )
}

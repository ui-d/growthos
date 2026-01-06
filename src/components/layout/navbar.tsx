"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, BookOpen, Search, ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "./theme-toggle"
import { SearchDialog } from "./search-dialog"

const mainNavItems = [
  { href: "/", label: "Home" },
  { href: "/builder", label: "Builder" },
  { href: "/modules", label: "Modules" },
  { href: "/library", label: "Library" },
  { href: "/examples", label: "Examples" },
  { href: "/about", label: "About" },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)
  const [searchOpen, setSearchOpen] = React.useState(false)

  // Handle keyboard shortcut (Cmd+K / Ctrl+K)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setSearchOpen(true)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <>
      {/* Main Header */}
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b border-border/50 shadow-sm">
        <div className="container-full">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Version */}
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight hover:text-primary transition-colors">
                <BookOpen className="text-primary text-2xl" />
                Growth OS
              </Link>
              <Badge variant="secondary" className="hidden sm:flex items-center gap-1 text-xs px-2 py-1">
                v1.0.0
              </Badge>
            </div>

            {/* Search Bar */}
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden lg:flex flex-1 max-w-md mx-8 relative group items-center"
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="w-full h-9 pl-10 pr-12 rounded-md border border-input bg-transparent text-sm text-muted-foreground text-left flex items-center transition-colors hover:border-primary/50 hover:bg-accent/50">
                Search documentation...
              </div>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <kbd className="text-muted-foreground text-xs border border-border rounded px-1.5 py-0.5 bg-muted font-mono">
                  ⌘K
                </kbd>
              </div>
            </button>

            {/* Get Started and Theme */}
            <div className="flex items-center gap-4">
              <Button asChild className="gap-2 shadow-sm group">
                <Link href="/builder">
                  Get Started
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <ThemeToggle />

              {/* Mobile Navigation */}
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px]">
                  <div className="flex flex-col space-y-4 mt-4">
                    <button
                      onClick={() => {
                        setOpen(false)
                        setSearchOpen(true)
                      }}
                      className="relative flex items-center"
                    >
                      <Search className="h-4 w-4 absolute left-3 text-muted-foreground" />
                      <div className="w-full h-10 pl-10 rounded-md border border-input bg-transparent text-sm text-muted-foreground text-left flex items-center">
                        Search...
                      </div>
                    </button>
                    <nav className="flex flex-col space-y-2">
                      {mainNavItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                            pathname === item.href
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent"
                          )}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Secondary Navigation */}
      <nav className="bg-background/50 backdrop-blur-sm border-b border-border/50 hidden md:block">
        <div className="container-full">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-1">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                <Link href="https://github.com/ui-d" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                <Link href="https://linkedin.com/in/dawid-nawrocki" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}

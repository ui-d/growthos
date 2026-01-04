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
            <div className="hidden lg:flex flex-1 max-w-md mx-8 relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              </div>
              <Input
                className="pl-10 pr-12 transition-all focus:ring-2 focus:ring-primary/20"
                placeholder="Search documentation..."
                type="text"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <kbd className="text-muted-foreground text-xs border border-border rounded px-1.5 py-0.5 bg-muted font-mono">
                  ⌘K
                </kbd>
              </div>
            </div>

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
                    <div className="relative">
                      <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                      <Input
                        className="pl-10"
                        placeholder="Search"
                        type="text"
                      />
                    </div>
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
                <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

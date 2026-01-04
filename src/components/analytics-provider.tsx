"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { analytics } from "@/lib/analytics"

export function AnalyticsProvider() {
  const pathname = usePathname()

  useEffect(() => {
    analytics.trackPageView()
  }, [pathname])

  return null
}
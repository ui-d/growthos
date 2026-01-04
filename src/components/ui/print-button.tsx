"use client"

import { Button } from "@/components/ui/button"
import { Printer } from "lucide-react"
import { cn } from "@/lib/utils"

interface PrintButtonProps {
  className?: string
  size?: "sm" | "default" | "lg"
  variant?: "outline" | "default" | "ghost"
  onPrint?: () => void
}

export function PrintButton({
  className,
  size = "sm",
  variant = "outline",
  onPrint,
}: PrintButtonProps) {
  const handlePrint = () => {
    // Call optional callback before printing
    onPrint?.()

    // Use browser's print functionality
    window.print()
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handlePrint}
      className={cn("gap-2 print-hide", className)}
    >
      <Printer className="h-4 w-4" />
      Print / Save PDF
    </Button>
  )
}
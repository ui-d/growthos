import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface HeroProps {
  children?: ReactNode
  className?: string
  gradient?: "orange" | "purple" | "blue" | "green"
}

export function Hero({ children, className, gradient = "orange" }: HeroProps) {
  const gradients = {
    orange: "from-orange-500 to-red-600",
    purple: "from-purple-500 to-pink-600",
    blue: "from-blue-500 to-cyan-600",
    green: "from-green-500 to-emerald-600"
  }

  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-2xl bg-gradient-to-br",
        gradients[gradient],
        "section-spacing",
        className
      )}
    >
      <div className="absolute inset-0 opacity-80 mix-blend-multiply">
        <div className={cn("w-full h-full bg-gradient-to-br", gradients[gradient])} />
      </div>
      <div className="relative container-wide text-white">
        {children}
      </div>
    </section>
  )
}
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  icon?: LucideIcon
  title: string
  description: string
  className?: string
  iconClassName?: string
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  className,
  iconClassName
}: FeatureCardProps) {
  return (
    <Card className={cn("card-hover h-full", className)}>
      <CardHeader>
        {Icon && (
          <div className={cn(
            "w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4",
            iconClassName
          )}>
            <Icon className="h-6 w-6 text-primary" />
          </div>
        )}
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
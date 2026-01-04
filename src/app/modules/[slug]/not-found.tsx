import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ModuleNotFound() {
  return (
    <div className="container py-8 md:py-10">
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Module Not Found</CardTitle>
            <CardDescription>
              The module you&apos;re looking for doesn&apos;t exist or has been moved.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              You can browse all available modules or go back to the homepage.
            </p>
            <div className="flex gap-3 justify-center">
              <Link href="/modules">
                <Button>Browse Modules</Button>
              </Link>
              <Link href="/">
                <Button variant="outline">Go Home</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
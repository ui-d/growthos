import { Metadata } from "next"
import { Suspense } from "react"
import { SharedSpecViewer } from "@/components/shared/shared-spec-viewer"

export const metadata: Metadata = {
  title: "Shared Growth Spec - Growth OS",
  description: "View a shared Growth OS configuration",
}

function SharedSpecFallback() {
  return (
    <div className="container py-8 md:py-10">
      <div className="mx-auto max-w-screen-xl">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading shared configuration...</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SharedSpecPage() {
  return (
    <Suspense fallback={<SharedSpecFallback />}>
      <SharedSpecViewer />
    </Suspense>
  )
}
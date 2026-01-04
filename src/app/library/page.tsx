import { Metadata } from "next"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://growthos.com"

export const metadata: Metadata = {
  title: "Growth OS Library - Resources & Templates",
  description: "Browse our library of growth frameworks, templates, and best practices for product-led growth strategies.",
  openGraph: {
    title: "Growth OS Library - Resources & Templates",
    description: "Browse our library of growth frameworks, templates, and best practices for product-led growth strategies.",
    url: `${baseUrl}/library`,
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Growth OS Library - Resources & Templates",
    description: "Browse our library of growth frameworks, templates, and best practices for product-led growth strategies.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: `${baseUrl}/library`,
  },
}

export default function LibraryPage() {
  return (
    <div className="container py-8 md:py-10">
      <h1 className="text-4xl font-bold mb-4">Library</h1>
      <p className="text-muted-foreground">
        Access your resource library. This is a placeholder page.
      </p>
    </div>
  );
}

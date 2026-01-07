import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "sonner";
import { AnalyticsProvider } from "@/components/analytics-provider";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.growthos.fyi"

export const metadata: Metadata = {
  title: {
    default: "Growth OS — Activation system for PLG SaaS",
    template: "%s | Growth OS",
  },
  description: "A builder + templates for KPI trees, activation specs, tracking plans, and dashboard packs. Less chaos, faster time-to-value.",
  metadataBase: new URL(baseUrl),
  keywords: ["PLG", "product-led growth", "SaaS", "activation", "KPI", "metrics", "tracking", "analytics", "dashboard"],
  authors: [{ name: "Growth OS" }],
  creator: "Growth OS",
  publisher: "Growth OS",
  openGraph: {
    title: "Growth OS — Activation system for PLG SaaS",
    description: "A builder + templates for KPI trees, activation specs, tracking plans, and dashboard packs. Less chaos, faster time-to-value.",
    url: baseUrl,
    siteName: "Growth OS",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Growth OS — Activation system for PLG SaaS",
    description: "A builder + templates for KPI trees, activation specs, tracking plans, and dashboard packs. Less chaos, faster time-to-value.",
    creator: "@growthos",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const plausibleApiHost = process.env.NEXT_PUBLIC_PLAUSIBLE_API_HOST || 'https://plausible.io';

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {plausibleDomain && (
          <Script
            defer
            data-domain={plausibleDomain}
            data-api={`${plausibleApiHost}/api/event`}
            src={`${plausibleApiHost}/js/script.js`}
            strategy="afterInteractive"
          />
        )}
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AnalyticsProvider />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}

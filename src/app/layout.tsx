import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "sonner";
import { AnalyticsProvider } from "@/components/analytics-provider";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://growthos.com"

export const metadata: Metadata = {
  title: "Growth OS - Product Growth Operating System",
  description: "Build and optimize your product growth strategy with Growth OS. Define KPIs, track activation metrics, and implement data-driven experiments.",
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: "Growth OS - Product Growth Operating System",
    description: "Build and optimize your product growth strategy with Growth OS. Define KPIs, track activation metrics, and implement data-driven experiments.",
    url: baseUrl,
    siteName: "Growth OS",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Growth OS - Product Growth Operating System",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Growth OS - Product Growth Operating System",
    description: "Build and optimize your product growth strategy with Growth OS. Define KPIs, track activation metrics, and implement data-driven experiments.",
    images: ["/og.png"],
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
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

export function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.growthos.fyi'

  return new Response(`User-agent: *
Allow: /

# Main pages
Allow: /builder
Allow: /library
Allow: /modules

# Block dynamic share pages from indexing
Disallow: /s

Sitemap: ${baseUrl}/sitemap.xml`, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
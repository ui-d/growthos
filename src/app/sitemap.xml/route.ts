export function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://growthos.com'

  const routes = [
    {
      url: '/',
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 1.0
    },
    {
      url: '/builder',
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: '/modules',
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: '/library',
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7
    }
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${route.lastModified}</lastmod>
    <changefreq>${route.changeFrequency}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
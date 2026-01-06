export function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.growthos.fyi'

  const routes = [
    // Main pages
    { url: '/', changeFrequency: 'weekly', priority: 1.0 },
    { url: '/builder', changeFrequency: 'weekly', priority: 0.9 },
    { url: '/examples', changeFrequency: 'weekly', priority: 0.8 },
    { url: '/modules', changeFrequency: 'weekly', priority: 0.8 },
    { url: '/library', changeFrequency: 'monthly', priority: 0.7 },
    { url: '/about', changeFrequency: 'monthly', priority: 0.6 },

    // Documentation pages
    { url: '/documentation', changeFrequency: 'monthly', priority: 0.7 },
    { url: '/docs', changeFrequency: 'monthly', priority: 0.6 },
    { url: '/guides', changeFrequency: 'monthly', priority: 0.6 },
    { url: '/architecture', changeFrequency: 'monthly', priority: 0.6 },

    // Secondary pages
    { url: '/pricing', changeFrequency: 'monthly', priority: 0.6 },
    { url: '/changelog', changeFrequency: 'weekly', priority: 0.5 },

    // Company pages
    { url: '/careers', changeFrequency: 'monthly', priority: 0.4 },
    { url: '/contact', changeFrequency: 'monthly', priority: 0.5 },
    { url: '/partners', changeFrequency: 'monthly', priority: 0.4 },

    // Legal pages
    { url: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
    { url: '/terms', changeFrequency: 'yearly', priority: 0.3 },
    { url: '/cookies', changeFrequency: 'yearly', priority: 0.3 },
    { url: '/license', changeFrequency: 'yearly', priority: 0.3 },
  ]

  const lastModified = new Date().toISOString()

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${lastModified}</lastmod>
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

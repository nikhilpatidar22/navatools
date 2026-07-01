import tools from '@/config/tools'
import { siteConfig } from '@/config/site'

export async function GET() {
  const SITE_URL = siteConfig.url

  const staticPages = [
    { loc: '/', priority: '1.0', changefreq: 'daily' },
    { loc: '/category/finance', priority: '0.9', changefreq: 'weekly' },
    { loc: '/category/ai', priority: '0.9', changefreq: 'weekly' },
    { loc: '/category/pdf', priority: '0.9', changefreq: 'weekly' },
    { loc: '/category/developer', priority: '0.8', changefreq: 'weekly' },
    { loc: '/category/crypto', priority: '0.8', changefreq: 'weekly' },
  ]

  const toolPages = tools.map((tool) => ({
    loc: `/${tool.slug}`,
    priority: '0.8',
    changefreq: 'monthly',
  }))

  const allPages = [...staticPages, ...toolPages]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemap.org/schemas/sitemap/0.9">
${allPages.map((page) => `  <url>
    <loc>${SITE_URL}${page.loc}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}

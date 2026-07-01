import { siteConfig } from '@/config/site'

export async function GET() {
  const robots = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${siteConfig.url}/sitemap.xml

# Host
Host: ${siteConfig.url}
`

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}

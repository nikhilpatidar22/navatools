import tools from '@/config/tools'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://tools.navahq.in'

export default function sitemap() {
  const homepage = {
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  }

  const categories = [
    { slug: 'finance', priority: 0.9 },
    { slug: 'ai', priority: 0.9 },
    { slug: 'pdf', priority: 0.9 },
    { slug: 'developer', priority: 0.8 },
    { slug: 'crypto', priority: 0.8 },
  ].map((cat) => ({
    url: `${BASE_URL}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: cat.priority,
  }))

  const toolPages = tools.map((tool) => ({
    url: `${BASE_URL}/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [homepage, ...categories, ...toolPages]
}

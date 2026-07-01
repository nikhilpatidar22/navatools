import tools from '@/config/tools'
import { siteConfig } from '@/config/site'

export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const tool = tools.find((t) => t.slug === slug)
  if (!tool) return {}
  const url = `${siteConfig.url}/${tool.slug}`
  return {
    title: `${tool.name} - Free Online ${tool.name} | NavaHQ`,
    description: tool.description,
    keywords: tool.keywords?.join(', ') || '',
    openGraph: { title: `${tool.name} - Free Online Tool`, description: tool.description, url, siteName: 'NavaHQ', locale: 'en_US', type: 'website' },
    twitter: { card: 'summary_large_image', title: `${tool.name} - NavaHQ`, description: tool.description },
    alternates: { canonical: url },
  }
}

const schemaCache = new Map()

function ToolSchemaScript({ tool }) {
  const key = tool?.slug
  if (!key) return null
  if (schemaCache.has(key)) {
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaCache.get(key) }} />
  }
  const schema = JSON.stringify([
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteConfig.url },
        { '@type': 'ListItem', position: 2, name: tool.category, item: `${siteConfig.url}/category/${tool.category.toLowerCase()}` },
        { '@type': 'ListItem', position: 3, name: tool.name, item: `${siteConfig.url}/${tool.slug}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: tool.name,
      description: tool.description,
      url: `${siteConfig.url}/${tool.slug}`,
      applicationCategory: tool.category,
      operatingSystem: 'All',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    tool.faq?.length > 0 ? {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: tool.faq.map((f) => ({
        '@type': 'Question', name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    } : null,
  ].filter(Boolean))
  schemaCache.set(key, schema)
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} />
}

export default async function ToolPage({ params }) {
  const { slug } = await params
  const tool = tools.find((t) => t.slug === slug)
  if (!tool) return <div className="max-w-4xl mx-auto px-4 py-20 text-center"><h1 className="text-2xl font-bold">Tool not found</h1></div>

  let ToolComponent
  try {
    const mod = await import(`@/tools/${tool.componentPath}/page`)
    ToolComponent = mod.default
  } catch {
    return <div className="max-w-4xl mx-auto px-4 py-20 text-center"><h1 className="text-2xl font-bold">Tool component not loaded</h1></div>
  }

  const [{ Breadcrumb }, { FAQ }, { ToolCard }, { ShareButtons }] = await Promise.all([
    import('@/components/ui/Breadcrumb'),
    import('@/components/ui/FAQ'),
    import('@/components/ui/ToolCard'),
    import('@/components/ui/ShareButtons'),
  ])
  const { categoryConfig } = await import('@/config/site')
  const lucideIcons = await import('lucide-react')

  const cat = categoryConfig[tool.category]
  const relatedTools = tools.filter((t) => t.category === tool.category && t.slug !== tool.slug).slice(0, 3)
  const popularTools = tools.slice(0, 6)
  const IconComponent = lucideIcons[tool.icon]

  return (
    <div className="min-h-screen">
      <ToolSchemaScript tool={tool} />

      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <Breadcrumb items={[{ label: tool.category, href: `/category/${tool.category.toLowerCase()}` }, { label: tool.name }]} className="mb-6" />
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-3.5 rounded-2xl bg-gradient-to-br text-white shadow-lg ${cat?.color}`}>
              {IconComponent && <IconComponent className="h-7 w-7" />}
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{tool.name}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">{tool.description}</p>
            </div>
          </div>
          <ShareButtons url={`${siteConfig.url}/${tool.slug}`} title={`${tool.name} - ${siteConfig.name}`} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <ToolComponent />

        {tool.content?.longDescription && (
          <div className="prose prose-gray dark:prose-invert max-w-none mb-16">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{tool.content.longDescription}</p>
          </div>
        )}

        {tool.content?.howItWorks && (
          <div className="mt-16 p-8 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tool.content.howItWorks.map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">{item.step}</div>
                  <div><h3 className="font-semibold text-gray-900 dark:text-white text-sm">{item.title}</h3><p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tool.content?.benefits && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tool.content.benefits.map((benefit) => (
                <div key={benefit.title} className="p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{benefit.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {tool.faq?.length > 0 && (
          <div className="mt-16">
            <FAQ items={tool.faq} />
          </div>
        )}

        {relatedTools.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related {tool.category} Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedTools.map((t) => <ToolCard key={t.slug} tool={t} />)}
            </div>
          </div>
        )}

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Popular Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {popularTools.map((t) => <ToolCard key={t.slug} tool={t} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

import tools from '@/config/tools'
import { siteConfig, categoryConfig } from '@/config/site'
import * as Icons from 'lucide-react'

export async function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const tool = tools.find((t) => t.slug === slug)
  if (!tool) return {}
  const url = `${siteConfig.url}/${tool.slug}`
  return {
    title: `${tool.name} - Free Online ${tool.name} | NavaTools`,
    description: tool.description,
    keywords: tool.keywords?.join(', ') || '',
    openGraph: { title: `${tool.name} - Free Online Tool`, description: tool.description, url, siteName: 'NavaTools', locale: 'en_US', type: 'website' },
    twitter: { card: 'summary_large_image', title: `${tool.name} - NavaTools`, description: tool.description },
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

function ToolHeader({ tool }) {
  const cat = categoryConfig[tool.category] || {}
  const IconComponent = Icons[tool.icon] || Icons.Box

  return (
    <div className="border-b border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)]">
      <div className="mx-auto max-w-4xl px-6 lg:px-8 py-10 md:py-12">
        <div className="flex items-center gap-4">
          <div
            className="inline-flex p-3 rounded-[12px]"
            style={{ backgroundColor: cat.bg || '#F3F4F6' }}
          >
            <IconComponent className="h-6 w-6" strokeWidth={1.75} style={{ color: cat.accent || '#6B7280' }} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-[#111111] dark:text-white tracking-tight">{tool.name}</h1>
            <p className="text-sm text-[#6B7280] dark:text-[#A1A1AA] mt-0.5">{tool.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ContentSection({ title, children }) {
  return (
    <section className="border-t border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] py-10 md:py-12 first:border-t-0 first:pt-0">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {title && <h2 className="text-lg font-semibold text-[#111111] dark:text-white mb-5">{title}</h2>}
        {children}
      </div>
    </section>
  )
}

async function ToolContent({ tool }) {
  const [{ FAQ }, { ToolCard }] = await Promise.all([
    import('@/components/ui/FAQ'),
    import('@/components/ui/ToolCard'),
  ])

  const sameCatTools = tools.filter(t => t.category === tool.category && t.slug !== tool.slug).slice(0, 3)

  return (
    <>
      {tool.content?.longDescription && (
        <ContentSection title="About">
          <p className="text-sm text-[#6B7280] dark:text-[#A1A1AA] leading-relaxed max-w-3xl">{tool.content.longDescription}</p>
        </ContentSection>
      )}

      {tool.content?.howItWorks?.length > 0 && (
        <ContentSection title="How It Works">
          <div className="grid sm:grid-cols-3 gap-3">
            {tool.content.howItWorks.map((step, i) => (
              <div key={i} className="rounded-[12px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-[#111113] p-5">
                <div className="w-8 h-8 rounded-[10px] bg-[#111111] dark:bg-white flex items-center justify-center text-white dark:text-[#111111] text-xs font-bold mb-3">{step.step}</div>
                <h3 className="font-medium text-[#111111] dark:text-white text-sm mb-1">{step.title}</h3>
                <p className="text-xs text-[#6B7280] dark:text-[#A1A1AA] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </ContentSection>
      )}

      {tool.content?.benefits?.length > 0 && (
        <ContentSection title="Benefits">
          <div className="grid sm:grid-cols-2 gap-3">
            {tool.content.benefits.map((b, i) => (
              <div key={i} className="rounded-[12px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-[#111113] p-5">
                <h3 className="font-medium text-[#111111] dark:text-white text-sm mb-1">{b.title}</h3>
                <p className="text-xs text-[#6B7280] dark:text-[#A1A1AA] leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </ContentSection>
      )}

      {tool.faq?.length > 0 && (
        <ContentSection title="Frequently Asked Questions">
          <FAQ items={tool.faq} />
        </ContentSection>
      )}

      {sameCatTools.length > 0 && (
        <ContentSection title={`More ${tool.category} Tools`}>
          <div className="grid sm:grid-cols-3 gap-3">
            {sameCatTools.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </ContentSection>
      )}
    </>
  )
}

export default async function ToolPage({ params }) {
  const { slug } = await params
  const tool = tools.find((t) => t.slug === slug)
  if (!tool) return <div className="mx-auto max-w-4xl px-6 py-24 text-center"><h1 className="text-2xl font-bold">Tool not found</h1></div>

  let ToolComponent
  try {
    const mod = await import(`@/tools/${tool.componentPath}/page`)
    ToolComponent = mod.default
  } catch {
    return <div className="mx-auto max-w-4xl px-6 py-24 text-center"><h1 className="text-2xl font-bold">Tool component not loaded</h1></div>
  }

  return (
    <>
      <ToolSchemaScript tool={tool} />
      <ToolHeader tool={tool} />
      <div className="mx-auto max-w-4xl px-6 lg:px-8 py-10 md:py-12">
        <ToolComponent />
      </div>
      <ToolContent tool={tool} />
    </>
  )
}

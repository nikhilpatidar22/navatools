import { siteConfig } from '@/config/site'

export function generateMetadata(tool, category) {
  const url = `${siteConfig.url}/${tool.slug}`
  return {
    title: tool.seoTitle || `${tool.name} - Free Online ${tool.name} | ${siteConfig.name}`,
    description: tool.seoDescription || tool.description,
    keywords: tool.keywords?.join(', ') || '',
    openGraph: {
      title: tool.seoTitle || `${tool.name} - ${siteConfig.name}`,
      description: tool.seoDescription || tool.description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.seoTitle || `${tool.name} - ${siteConfig.name}`,
      description: tool.seoDescription || tool.description,
    },
    alternates: { canonical: url },
  }
}

export function generateBreadcrumb(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateToolSchema(tool) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    description: tool.description,
    url: `${siteConfig.url}/${tool.slug}`,
    applicationCategory: tool.category,
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }
}

export function generateFaqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }
}

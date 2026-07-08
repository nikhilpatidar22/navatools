import { GeistSans } from 'geist/font/sans'
import { Providers } from './providers'
import { siteConfig } from '@/config/site'
import './globals.css'

export const metadata = {
  title: `${siteConfig.name} - 1000+ Free Online Tools`,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  openGraph: {
    title: `${siteConfig.name} - 1000+ Free Online Tools`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: `${siteConfig.name} - 1000+ Free Online Tools`, description: siteConfig.description },
  robots: { index: true, follow: true },
  alternates: { canonical: siteConfig.url },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href={siteConfig.url} />
        <meta name="google-site-verification" content="h9tbxcpS3sygXm0zlnZ1nwqOFD4hTuODJ7MAOCrXRp4" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: siteConfig.name,
              url: siteConfig.url,
              potentialAction: {
                '@type': 'SearchAction',
                target: `${siteConfig.url}/search?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className={`${GeistSans.variable} font-sans antialiased bg-[#FAFAFA] dark:bg-[#09090B] text-[#111111] dark:text-white`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

'use client'
import { motion } from 'framer-motion'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { FAQ } from '@/components/ui/FAQ'
import { ToolCard } from '@/components/ui/ToolCard'
import { ShareButtons } from '@/components/ui/ShareButtons'
import { categoryConfig } from '@/config/site'
import tools from '@/config/tools'

export function ToolLayout({ tool, children }) {
  const cat = categoryConfig[tool.category]
  const relatedTools = tools.filter((t) => t.category === tool.category && t.slug !== tool.slug).slice(0, 3)
  const popularTools = tools.slice(0, 6)

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <Breadcrumb items={[{ label: tool.category, href: `/category/${tool.category.toLowerCase()}` }, { label: tool.name }]} className="mb-6" />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <div className="flex items-center gap-4 mb-4">
              <div className={cn('p-3.5 rounded-2xl bg-gradient-to-br text-white shadow-lg', cat?.color)}>
                <tool.icon className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{tool.name}</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">{tool.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <ShareButtons url={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://navatools.in'}/${tool.slug}`} title={`${tool.name} - NavaTools`} />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
          {children}
        </motion.div>

        {tool.faq?.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16">
            <FAQ items={tool.faq} />
          </motion.div>
        )}

        {relatedTools.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related {tool.category} Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedTools.map((t) => <ToolCard key={t.slug} tool={t} />)}
            </div>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Popular Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {popularTools.map((t) => <ToolCard key={t.slug} tool={t} />)}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

import { cn } from '@/utils/cn'

import tools from '@/config/tools'
import { categoryConfig } from '@/config/site'
import { ToolCard } from '@/components/ui/ToolCard'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import * as Icons from 'lucide-react'

export async function generateStaticParams() {
  return Object.keys(categoryConfig).map((category) => ({ category: category.toLowerCase() }))
}

export async function generateMetadata({ params }) {
  const { category } = await params
  const catName = Object.keys(categoryConfig).find((k) => k.toLowerCase() === category)
  const count = tools.filter((t) => t.category === catName).length
  return {
    title: `${catName} Tools - ${count} Free Online ${catName} Tools | NavaTools`,
    description: `Free online ${catName?.toLowerCase()} tools. ${count} tools to help you with your ${catName?.toLowerCase()} needs.`,
  }
}

export default async function CategoryPage({ params }) {
  const { category } = await params
  const catName = Object.keys(categoryConfig).find((k) => k.toLowerCase() === category)
  if (!catName) return <div className="mx-auto max-w-4xl px-6 py-24 text-center"><h1 className="text-2xl font-bold">Category not found</h1></div>

  const cat = categoryConfig[catName] || {}
  const catTools = tools.filter((t) => t.category === catName)
  const IconComponent = Icons[cat?.icon] || Icons.Box

  return (
    <div>
      <div className="border-b border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10 md:py-12">
          <Breadcrumb items={[{ label: `${catName} Tools` }]} className="mb-6" />
          <div className="flex items-center gap-4">
            <div
              className="inline-flex p-3 rounded-[12px]"
              style={{ backgroundColor: cat.bg || '#F3F4F6' }}
            >
              <IconComponent className="h-6 w-6" strokeWidth={1.75} style={{ color: cat.accent || '#6B7280' }} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-[#111111] dark:text-white tracking-tight">{catName} Tools</h1>
              <p className="text-sm text-[#6B7280] dark:text-[#A1A1AA] mt-0.5">{catTools.length} free online {catTools.length === 1 ? 'tool' : 'tools'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10 md:py-12">
        {catTools.length === 0 ? (
          <div className="text-center py-20 text-[#6B7280] dark:text-[#A1A1AA]">No tools in this category yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {catTools.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
          </div>
        )}
      </div>
    </div>
  )
}

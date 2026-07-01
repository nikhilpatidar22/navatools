import Link from 'next/link'
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
    title: `${catName} Tools - ${count} Free Online ${catName} Tools | NavaHQ`,
    description: `Free online ${catName?.toLowerCase()} tools. ${count} tools to help you with your ${catName?.toLowerCase()} needs.`,
  }
}

export default async function CategoryPage({ params }) {
  const { category } = await params
  const catName = Object.keys(categoryConfig).find((k) => k.toLowerCase() === category)
  if (!catName) return <div className="max-w-4xl mx-auto px-4 py-20 text-center"><h1 className="text-2xl font-bold">Category not found</h1></div>

  const cat = categoryConfig[catName]
  const catTools = tools.filter((t) => t.category === catName)
  const IconComponent = Icons[cat?.icon] || Icons.Box

  return (
    <div>
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <Breadcrumb items={[{ label: `${catName} Tools` }]} className="mb-6" />
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-3.5 rounded-2xl bg-gradient-to-br text-white shadow-lg ${cat?.color}`}>
              <IconComponent className="h-7 w-7" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{catName} Tools</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">{catTools.length} free online tools</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {catTools.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No tools in this category yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {catTools.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
          </div>
        )}
      </div>
    </div>
  )
}

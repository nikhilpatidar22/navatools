'use client'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/Card'
import { cn } from '@/utils/cn'
import { categoryConfig } from '@/config/site'
import * as Icons from 'lucide-react'

export function ToolCard({ tool, className }) {
  const IconComponent = Icons[tool.icon] || Icons.Box
  const cat = categoryConfig[tool.category]

  return (
    <Link href={`/${tool.slug}`}>
      <Card hover className={cn('group relative overflow-hidden', className)}>
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${cat?.gradient}`} />
        <CardContent className="relative z-10 p-5">
          <div className={cn('inline-flex p-3 rounded-2xl bg-gradient-to-br text-white shadow-lg mb-4', cat?.color)}>
            <IconComponent className="h-6 w-6" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {tool.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
            {tool.description}
          </p>
          <div className="flex items-center gap-2 mt-3">
            <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white', cat?.color)}>
              {tool.category}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

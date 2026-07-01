'use client'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/Card'
import { cn } from '@/utils/cn'
import { categoryConfig } from '@/config/site'
import * as Icons from 'lucide-react'

export function CategoryCard({ category, count, className }) {
  const cat = categoryConfig[category]
  const IconComponent = Icons[cat?.icon] || Icons.Box

  return (
    <Link href={`/category/${category.toLowerCase()}`}>
      <Card hover className={cn('group relative overflow-hidden', className)}>
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${cat?.gradient}`} />
        <CardContent className="relative z-10 p-5 flex items-center gap-4">
          <div className={cn('inline-flex p-3 rounded-2xl bg-gradient-to-br text-white shadow-lg shrink-0', cat?.color)}>
            <IconComponent className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {category}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{count} tools</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

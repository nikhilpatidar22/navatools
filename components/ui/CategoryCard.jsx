'use client'
import Link from 'next/link'
import { cn } from '@/utils/cn'
import { categoryConfig } from '@/config/site'
import * as Icons from 'lucide-react'

export function CategoryCard({ category, count, className }) {
  const cat = categoryConfig[category] || {}
  const IconComponent = Icons[cat?.icon] || Icons.Box

  return (
    <Link
      href={`/category/${category.toLowerCase()}`}
      className={cn(
        'group flex items-center gap-4 rounded-[12px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-[#111113] p-4',
        'hover:border-[#D1D5DB] dark:hover:border-[rgba(255,255,255,0.15)] hover:-translate-y-0.5 transition-all duration-200',
        className
      )}
    >
      <div
        className="inline-flex p-2.5 rounded-[10px] shrink-0"
        style={{ backgroundColor: `${cat.bg || '#F3F4F6'}` }}
      >
        <IconComponent className="h-5 w-5" strokeWidth={1.75} style={{ color: cat.accent || '#6B7280' }} />
      </div>
      <div className="min-w-0">
        <h3 className="font-medium text-[#111111] dark:text-white text-sm group-hover:text-[#6B7280] dark:group-hover:text-[#A1A1AA] transition-colors duration-200 truncate">
          {category}
        </h3>
        <p className="text-xs text-[#6B7280] dark:text-[#A1A1AA]">{count} {count === 1 ? 'tool' : 'tools'}</p>
      </div>
    </Link>
  )
}

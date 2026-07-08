'use client'
import Link from 'next/link'
import { cn } from '@/utils/cn'
import { categoryConfig } from '@/config/site'
import * as Icons from 'lucide-react'

export function ToolCard({ tool, className }) {
  const IconComponent = Icons[tool.icon] || Icons.Box
  const cat = categoryConfig[tool.category] || {}
  const isNew = tool.isNew
  const isPopular = tool.isPopular

  return (
    <Link
      href={`/${tool.slug}`}
      className={cn(
        'group block rounded-[12px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-[#111113] p-5',
        'hover:border-[#D1D5DB] dark:hover:border-[rgba(255,255,255,0.15)] transition-all duration-200',
        'hover:-translate-y-0.5',
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="inline-flex p-2.5 rounded-[10px]"
          style={{ backgroundColor: `${cat.bg || '#F3F4F6'}` }}
        >
          <IconComponent className="h-5 w-5" strokeWidth={1.75} style={{ color: cat.accent || '#6B7280' }} />
        </div>
        <div className="flex items-center gap-1.5">
          {isNew && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[11px] font-medium bg-[#111111] dark:bg-white text-white dark:text-[#111111]">
              NEW
            </span>
          )}
          {isPopular && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-md text-[11px] font-medium bg-[#F3F4F6] dark:bg-[rgba(255,255,255,0.06)] text-[#6B7280] dark:text-[#A1A1AA]">
              Popular
            </span>
          )}
        </div>
      </div>
      <h3 className="font-medium text-[#111111] dark:text-white text-sm mb-1 group-hover:text-[#6B7280] dark:group-hover:text-[#A1A1AA] transition-colors duration-200">
        {tool.name}
      </h3>
      <p className="text-xs text-[#6B7280] dark:text-[#A1A1AA] line-clamp-2 leading-relaxed">
        {tool.description}
      </p>
      <div className="flex items-center gap-2 mt-3">
        <span
          className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium"
          style={{ backgroundColor: `${cat.bg || '#F3F4F6'}`, color: cat.accent || '#6B7280' }}
        >
          {tool.category}
        </span>
      </div>
    </Link>
  )
}

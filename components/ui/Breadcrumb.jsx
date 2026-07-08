import Link from 'next/link'
import { cn } from '@/utils/cn'
import { ChevronRight, Home } from 'lucide-react'

export function Breadcrumb({ items, className }) {
  return (
    <nav className={cn('flex items-center space-x-1.5 text-sm text-[#6B7280] dark:text-[#A1A1AA]', className)}>
      <Link href="/" className="hover:text-[#111111] dark:hover:text-white transition-colors flex items-center gap-1">
        <Home className="h-3.5 w-3.5" strokeWidth={1.75} />
        <span className="hidden sm:inline">Home</span>
      </Link>
      {items?.map((item, i) => (
        <span key={i} className="flex items-center space-x-1.5">
          <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.75} />
          {item.href ? (
            <Link href={item.href} className="hover:text-[#111111] dark:hover:text-white transition-colors">{item.label}</Link>
          ) : (
            <span className="text-[#111111] dark:text-white font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

import Link from 'next/link'
import { cn } from '@/utils/cn'
import { ChevronRight, Home } from 'lucide-react'

export function Breadcrumb({ items, className }) {
  return (
    <nav className={cn('flex items-center space-x-1.5 text-sm text-gray-500 dark:text-gray-400', className)}>
      <Link href="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1">
        <Home className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Home</span>
      </Link>
      {items?.map((item, i) => (
        <span key={i} className="flex items-center space-x-1.5">
          <ChevronRight className="h-3.5 w-3.5" />
          {item.href ? (
            <Link href={item.href} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{item.label}</Link>
          ) : (
            <span className="text-gray-900 dark:text-gray-100 font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

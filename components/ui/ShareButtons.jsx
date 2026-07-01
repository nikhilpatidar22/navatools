'use client'
import { Button } from '@/components/ui/Button'
import { Share2, Link as LinkIcon } from 'lucide-react'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { cn } from '@/utils/cn'

export function ShareButtons({ url, title, className }) {
  const { copy } = useCopyToClipboard()

  const shareLinks = [
    { name: 'Twitter', icon: Share2, href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, color: 'hover:bg-blue-500/10 hover:text-blue-500' },
    { name: 'Facebook', icon: Share2, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, color: 'hover:bg-blue-600/10 hover:text-blue-600' },
    { name: 'LinkedIn', icon: Share2, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, color: 'hover:bg-blue-700/10 hover:text-blue-700' },
  ]

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="text-sm text-gray-500 dark:text-gray-400 mr-1">Share:</span>
      {shareLinks.map((s) => (
        <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className={cn('p-2 rounded-xl text-gray-400 dark:text-gray-500 transition-all', s.color)} title={s.name}>
          <s.icon className="h-4 w-4" />
        </a>
      ))}
      <button onClick={() => copy(url)} className={cn('p-2 rounded-xl text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all')} title="Copy Link">
        <LinkIcon className="h-4 w-4" />
      </button>
    </div>
  )
}

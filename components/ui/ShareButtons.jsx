'use client'
import { Button } from '@/components/ui/Button'
import { Share2, Link as LinkIcon } from 'lucide-react'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { cn } from '@/utils/cn'

export function ShareButtons({ url, title, className }) {
  const { copy } = useCopyToClipboard()

  const shareLinks = [
    { name: 'X', icon: Share2, href: `https://x.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}` },
    { name: 'Facebook', icon: Share2, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
    { name: 'LinkedIn', icon: Share2, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
  ]

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="text-sm text-[#6B7280] dark:text-[#A1A1AA] mr-1">Share</span>
      {shareLinks.map((s) => (
        <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="p-2 rounded-[10px] text-[#6B7280] dark:text-[#A1A1AA] hover:bg-[#F3F4F6] dark:hover:bg-[rgba(255,255,255,0.04)] transition-all" title={s.name}>
          <s.icon className="h-4 w-4" strokeWidth={1.75} />
        </a>
      ))}
      <button onClick={() => copy(url)} className="p-2 rounded-[10px] text-[#6B7280] dark:text-[#A1A1AA] hover:bg-[#F3F4F6] dark:hover:bg-[rgba(255,255,255,0.04)] transition-all" title="Copy Link">
        <LinkIcon className="h-4 w-4" strokeWidth={1.75} />
      </button>
    </div>
  )
}

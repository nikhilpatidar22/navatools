'use client'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { Button } from '@/components/ui/Button'
import { Copy, Check } from 'lucide-react'

export function CopyButton({ text, className }) {
  const { copied, copy } = useCopyToClipboard()

  return (
    <Button variant="outline" size="sm" onClick={() => copy(text)} className={className}>
      {copied ? <Check className="h-4 w-4 text-[#16A34A]" strokeWidth={1.75} /> : <Copy className="h-4 w-4" strokeWidth={1.75} />}
      <span className="ml-1.5">{copied ? 'Copied!' : 'Copy'}</span>
    </Button>
  )
}

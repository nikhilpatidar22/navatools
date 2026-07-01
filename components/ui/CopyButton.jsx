'use client'
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard'
import { Button } from '@/components/ui/Button'
import { Copy, Check } from 'lucide-react'

export function CopyButton({ text, className }) {
  const { copied, copy } = useCopyToClipboard()

  return (
    <Button variant="outline" size="sm" onClick={() => copy(text)} className={className}>
      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
      <span className="ml-1.5">{copied ? 'Copied!' : 'Copy'}</span>
    </Button>
  )
}

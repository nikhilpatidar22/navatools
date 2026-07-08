'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { CopyButton } from '@/components/ui/CopyButton'
import { Fingerprint, Play, AlertCircle } from 'lucide-react'

export default function JWTDecoderTool() {
  const [input, setInput] = useState('')
  const [decoded, setDecoded] = useState(null)
  const [error, setError] = useState(null)

  const decodeBase64 = (str) => {
    try {
      return JSON.parse(atob(str.replace(/-/g, '+').replace(/_/g, '/')))
    } catch {
      return null
    }
  }

  const handleDecode = () => {
    setError(null); setDecoded(null)
    try {
      const parts = input.trim().split('.')
      if (parts.length !== 3) { setError('Invalid JWT format'); return }
      const header = decodeBase64(parts[0])
      const payload = decodeBase64(parts[1])
      if (!header || !payload) { setError('Invalid JWT encoding'); return }
      setDecoded({ header, payload, signature: parts[2] })
    } catch {
      setError('Failed to decode JWT')
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 md:p-8 space-y-5">
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Paste your JWT token here..." rows={4} className="w-full rounded-[10px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-transparent p-4 text-sm font-mono text-[#111111] dark:text-white placeholder:text-[#6B7280] dark:placeholder:text-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#111111] dark:focus:ring-white" spellCheck={false} />
          <Button onClick={handleDecode} disabled={!input.trim()} size="lg" className="w-full"><Play className="h-4 w-4 mr-2" strokeWidth={1.75} /> Decode</Button>
          {error && <div className="flex items-center gap-2 p-3 rounded-[10px] bg-[#FEF2F2] dark:bg-[rgba(220,38,38,0.1)] text-[#DC2626] text-sm"><AlertCircle className="h-4 w-4 shrink-0" strokeWidth={1.75} />{error}</div>}
          {decoded && (
            <div className="space-y-4">
              <div className="p-4 rounded-[10px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)]">
                <div className="flex items-center justify-between mb-2"><h3 className="text-sm font-medium text-[#111111] dark:text-white">Header</h3><CopyButton text={JSON.stringify(decoded.header, null, 2)} /></div>
                <pre className="text-xs font-mono text-[#6B7280] dark:text-[#A1A1AA] whitespace-pre-wrap">{JSON.stringify(decoded.header, null, 2)}</pre>
              </div>
              <div className="p-4 rounded-[10px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)]">
                <div className="flex items-center justify-between mb-2"><h3 className="text-sm font-medium text-[#111111] dark:text-white">Payload</h3><CopyButton text={JSON.stringify(decoded.payload, null, 2)} /></div>
                <pre className="text-xs font-mono text-[#6B7280] dark:text-[#A1A1AA] whitespace-pre-wrap">{JSON.stringify(decoded.payload, null, 2)}</pre>
              </div>
              <div className="p-4 rounded-[10px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)]">
                <h3 className="text-sm font-medium text-[#111111] dark:text-white mb-2">Signature</h3>
                <p className="text-xs font-mono text-[#6B7280] dark:text-[#A1A1AA] break-all">{decoded.signature}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { CopyButton } from '@/components/ui/CopyButton'
import { Fingerprint, Play, AlertCircle } from 'lucide-react'

export default function JWTDecoderTool() {
  const [token, setToken] = useState('')
  const [header, setHeader] = useState('')
  const [payload, setPayload] = useState('')
  const [error, setError] = useState(null)

  const handleDecode = () => {
    setError(null)
    setHeader('')
    setPayload('')
    if (!token.trim()) return
    const parts = token.trim().split('.')
    if (parts.length !== 3) { setError('Invalid JWT format. A JWT must have 3 parts separated by dots.'); return }
    try {
      const decodedHeader = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')))
      const decodedPayload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')))
      setHeader(JSON.stringify(decodedHeader, null, 2))
      setPayload(JSON.stringify(decodedPayload, null, 2))
    } catch {
      setError('Invalid JWT token. Cannot decode base64 payload.')
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6 md:p-8 space-y-5">
          <Input label="JWT Token" value={token} onChange={(e) => setToken(e.target.value)} placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." />
          {error && <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-sm"><AlertCircle className="h-4 w-4 shrink-0" />{error}</div>}
          <Button onClick={handleDecode} size="lg" className="w-full"><Play className="h-5 w-5 mr-2" /> Decode JWT</Button>
          {header && (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Header</label>
                <pre className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 text-xs font-mono overflow-auto max-h-48">{header}</pre>
                <CopyButton text={header} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Payload</label>
                <pre className="p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 text-xs font-mono overflow-auto max-h-48">{payload}</pre>
                <CopyButton text={payload} />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

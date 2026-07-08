'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { CopyButton } from '@/components/ui/CopyButton'
import { Hash, Copy, RefreshCw } from 'lucide-react'

export default function UUIDGeneratorTool() {
  const [uuids, setUuids] = useState([])
  const [count, setCount] = useState(5)

  const generateUUIDv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
    })
  }

  const handleGenerate = () => {
    const generated = Array.from({ length: count }, () => generateUUIDv4())
    setUuids(generated)
  }

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 md:p-8 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Hash className="h-5 w-5 text-[#6B7280]" strokeWidth={1.75} />
              <h3 className="font-medium text-[#111111] dark:text-white">UUID v4 Generator</h3>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <label className="text-sm text-[#6B7280] dark:text-[#A1A1AA]">Count:</label>
                <select value={count} onChange={(e) => setCount(Number(e.target.value))} className="rounded-[10px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-transparent px-3 py-1.5 text-sm text-[#111111] dark:text-white">
                  {[1, 5, 10, 25, 50, 100].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <Button onClick={handleGenerate}><RefreshCw className="h-4 w-4 mr-2" strokeWidth={1.75} /> Generate</Button>
              {uuids.length > 0 && <Button variant="outline" onClick={copyAll}><Copy className="h-4 w-4 mr-2" strokeWidth={1.75} /> Copy All</Button>}
            </div>
          </div>
          {uuids.length > 0 ? (
            <div className="space-y-1.5">
              {uuids.map((uuid, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-[10px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] bg-[#FAFAFA] dark:bg-transparent group">
                  <code className="text-sm font-mono text-[#111111] dark:text-white">{uuid}</code>
                  <CopyButton text={uuid} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-[#6B7280] dark:text-[#A1A1AA]">
              <Hash className="h-12 w-12 mx-auto mb-2 opacity-50" strokeWidth={1.75} />
              <p className="text-sm">Click Generate to create UUIDs</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

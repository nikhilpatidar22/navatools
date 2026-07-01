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
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6 md:p-8 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Hash className="h-6 w-6 text-indigo-500" />
              <h3 className="font-semibold text-gray-900 dark:text-white">UUID v4 Generator</h3>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-500">Count:</label>
                <select value={count} onChange={(e) => setCount(Number(e.target.value))} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-1.5 text-sm">
                  {[1, 5, 10, 25, 50, 100].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <Button onClick={handleGenerate}><RefreshCw className="h-4 w-4 mr-2" /> Generate</Button>
              {uuids.length > 0 && <Button variant="outline" onClick={copyAll}><Copy className="h-4 w-4 mr-2" /> Copy All</Button>}
            </div>
          </div>
          {uuids.length > 0 ? (
            <div className="space-y-1.5">
              {uuids.map((uuid, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 group">
                  <code className="text-sm font-mono text-gray-700 dark:text-gray-300">{uuid}</code>
                  <CopyButton text={uuid} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-gray-400 dark:text-gray-500">
              <Hash className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Click Generate to create UUIDs</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

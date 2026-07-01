'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { CopyButton } from '@/components/ui/CopyButton'
import { Braces, Play, AlertCircle, Check } from 'lucide-react'

export default function JSONFormatterTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState(null)

  const handleFormat = () => {
    setError(null)
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, 2))
    } catch (err) {
      setError('Invalid JSON: ' + err.message)
      setOutput('')
    }
  }

  const handleMinify = () => {
    setError(null)
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
    } catch (err) {
      setError('Invalid JSON: ' + err.message)
      setOutput('')
    }
  }

  const handleClear = () => { setInput(''); setOutput(''); setError(null) }

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6 md:p-8 space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Input JSON</label>
              </div>
              <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder='{"name": "John", "age": 30}' rows={12} className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500" spellCheck={false} />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Output</label>
              <textarea value={output} readOnly rows={12} className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 p-4 text-sm font-mono text-gray-900 dark:text-gray-100" spellCheck={false} placeholder="Formatted JSON will appear here..." />
            </div>
          </div>
          {error && <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-sm"><AlertCircle className="h-4 w-4 shrink-0" />{error}</div>}
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleFormat} size="lg"><Play className="h-5 w-5 mr-2" /> Format / Beautify</Button>
            <Button onClick={handleMinify} variant="outline" size="lg"><Braces className="h-5 w-5 mr-2" /> Minify</Button>
            <Button onClick={handleClear} variant="ghost" size="lg">Clear</Button>
            {output && <CopyButton text={output} />}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

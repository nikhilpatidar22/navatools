'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { CopyButton } from '@/components/ui/CopyButton'
import { Braces, Play, AlertCircle } from 'lucide-react'

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
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 md:p-8 space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="text-sm font-medium text-[#111111] dark:text-white">Input JSON</label>
              <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder='{"name": "John", "age": 30}' rows={12} className="w-full rounded-[10px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-transparent p-4 text-sm font-mono text-[#111111] dark:text-white placeholder:text-[#6B7280] dark:placeholder:text-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#111111] dark:focus:ring-white" spellCheck={false} />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-[#111111] dark:text-white">Output</label>
              <textarea value={output} readOnly rows={12} className="w-full rounded-[10px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] bg-[#FAFAFA] dark:bg-[rgba(255,255,255,0.02)] p-4 text-sm font-mono text-[#111111] dark:text-white" spellCheck={false} placeholder="Formatted JSON will appear here..." />
            </div>
          </div>
          {error && <div className="flex items-center gap-2 p-3 rounded-[10px] bg-[#FEF2F2] dark:bg-[rgba(220,38,38,0.1)] text-[#DC2626] text-sm"><AlertCircle className="h-4 w-4 shrink-0" strokeWidth={1.75} />{error}</div>}
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleFormat} size="lg"><Play className="h-4 w-4 mr-2" strokeWidth={1.75} /> Format</Button>
            <Button onClick={handleMinify} variant="outline" size="lg"><Braces className="h-4 w-4 mr-2" strokeWidth={1.75} /> Minify</Button>
            <Button onClick={handleClear} variant="ghost" size="lg">Clear</Button>
            {output && <CopyButton text={output} />}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

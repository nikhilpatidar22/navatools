'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { useAIResponse } from '@/hooks/useAIResponse'
import { CopyButton } from '@/components/ui/CopyButton'
import { SpellCheck2, Loader2 } from 'lucide-react'

export default function GrammarCheckerTool() {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const { generate, loading } = useAIResponse()

  const handleCheck = async () => {
    if (!text.trim()) return
    const res = await generate({
      prompt: text,
      systemPrompt: 'You are a professional grammar and spell checker. Analyze the text and: 1) List all errors found (grammar, spelling, punctuation, style), 2) Show the corrected version of the full text, 3) Provide a brief explanation for each correction. Format clearly.',
    })
    if (res) setResult(res)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 md:p-8 space-y-5">
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste or type your text here for grammar checking..." rows={8} className="w-full rounded-[10px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-transparent p-4 text-sm text-[#111111] dark:text-white placeholder:text-[#6B7280] dark:placeholder:text-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#111111] dark:focus:ring-white" />
          <Button onClick={handleCheck} disabled={loading || !text.trim()} size="lg" className="w-full">
            {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" strokeWidth={1.75} /> Checking...</> : <><SpellCheck2 className="h-4 w-4 mr-2" strokeWidth={1.75} /> Check Grammar</>}
          </Button>
          {result && (
            <div className="p-5 rounded-[12px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-[#111113]">
              <h3 className="font-medium text-[#111111] dark:text-white mb-3">Results</h3>
              <div className="whitespace-pre-wrap text-sm text-[#6B7280] dark:text-[#A1A1AA] leading-relaxed">{result}</div>
              <div className="mt-4"><CopyButton text={result} /></div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

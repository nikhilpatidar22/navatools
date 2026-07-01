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
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6 md:p-8 space-y-5">
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Paste or type your text here for grammar checking..." rows={8} className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <Button onClick={handleCheck} disabled={loading || !text.trim()} size="lg" className="w-full">
            {loading ? <><Loader2 className="h-5 w-5 mr-2 animate-spin" /> Checking...</> : <><SpellCheck2 className="h-5 w-5 mr-2" /> Check Grammar</>}
          </Button>
          {result && (
            <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Grammar Check Results</h3>
              <div className="whitespace-pre-wrap text-sm text-gray-600 dark:text-gray-400">{result}</div>
              <div className="mt-4"><CopyButton text={result} /></div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

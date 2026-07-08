'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { useAIResponse } from '@/hooks/useAIResponse'
import { CopyButton } from '@/components/ui/CopyButton'
import { Sparkles, Loader2 } from 'lucide-react'

const categories = [
  { value: 'text', label: 'Text Writing' },
  { value: 'image', label: 'Image Generation' },
  { value: 'code', label: 'Code & Development' },
  { value: 'creative', label: 'Creative & Fun' },
]

export default function AIPromptGeneratorTool() {
  const [category, setCategory] = useState('text')
  const [topic, setTopic] = useState('')
  const [result, setResult] = useState(null)
  const { generate, loading } = useAIResponse()

  const handleGenerate = async () => {
    if (!topic.trim()) return
    const res = await generate({
      prompt: `Generate 5 AI prompts for ${category} about "${topic}".`,
      systemPrompt: 'You are an expert prompt engineer. Generate 5 detailed, high-quality prompts optimized for AI tools. Each prompt should be specific, actionable, and include context. Number them 1-5.',
    })
    if (res) setResult(res)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 md:p-8 space-y-5">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button key={c.value} onClick={() => setCategory(c.value)} className={`px-3 py-1.5 rounded-[10px] text-sm font-medium transition-all duration-150 ${category === c.value ? 'bg-[#111111] dark:bg-white text-white dark:text-[#111111]' : 'border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] text-[#6B7280] dark:text-[#A1A1AA] hover:border-[#D1D5DB] dark:hover:border-[rgba(255,255,255,0.15)]'}`}>{c.label}</button>
            ))}
          </div>
          <div className="flex gap-3">
            <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Describe what you want prompts about..." className="flex-1 h-11 rounded-[10px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-transparent px-4 text-sm text-[#111111] dark:text-white placeholder:text-[#6B7280] dark:placeholder:text-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#111111] dark:focus:ring-white" />
            <Button onClick={handleGenerate} disabled={loading || !topic.trim()}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.75} /> : <Sparkles className="h-4 w-4 mr-2" strokeWidth={1.75} />}
              {loading ? 'Generating...' : 'Generate'}
            </Button>
          </div>
          {result && (
            <div className="p-5 rounded-[12px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-[#111113]">
              <h3 className="font-medium text-[#111111] dark:text-white mb-3">Your Prompts</h3>
              <div className="whitespace-pre-wrap text-sm text-[#6B7280] dark:text-[#A1A1AA] leading-relaxed">{result}</div>
              <div className="mt-4"><CopyButton text={result} /></div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

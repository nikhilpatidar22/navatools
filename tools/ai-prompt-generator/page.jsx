'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { useAIResponse } from '@/hooks/useAIResponse'
import { CopyButton } from '@/components/ui/CopyButton'
import { Sparkles, Loader2, Image, MessageSquare, Code, PenTool } from 'lucide-react'

const promptTypes = [
  { id: 'text', label: 'Text', icon: MessageSquare, desc: 'ChatGPT, Claude, Gemini' },
  { id: 'image', label: 'Image', icon: Image, desc: 'Midjourney, DALL-E, Stable Diffusion' },
  { id: 'code', label: 'Code', icon: Code, desc: 'GitHub Copilot, Cursor' },
  { id: 'creative', label: 'Creative', icon: PenTool, desc: 'Writing, Marketing, SEO' },
]

export default function AIPromptGeneratorTool() {
  const [topic, setTopic] = useState('')
  const [type, setType] = useState('text')
  const [result, setResult] = useState(null)
  const { generate, loading } = useAIResponse()

  const handleGenerate = async () => {
    if (!topic.trim()) return
    const res = await generate({
      prompt: `Generate ${type} AI prompts for: ${topic}`,
      systemPrompt: `You are an expert prompt engineer. Generate 5 powerful, detailed prompts for ${type} AI tools. Each prompt should be specific, actionable, and optimized for the best results. Number them 1-5.`,
    })
    if (res) setResult(res)
  }

  const TypeIcon = promptTypes.find(t => t.id === type)?.icon

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6 md:p-8 space-y-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {promptTypes.map((pt) => (
              <button key={pt.id} onClick={() => setType(pt.id)} className={`p-4 rounded-xl text-left transition-all ${type === pt.id ? 'bg-indigo-600 text-white shadow-md ring-2 ring-indigo-500' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
                <pt.icon className="h-5 w-5 mb-1" />
                <p className="text-sm font-medium">{pt.label}</p>
                <p className="text-xs opacity-70">{pt.desc}</p>
              </button>
            ))}
          </div>
          <Input label="What do you want prompts about?" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g., social media marketing, React components, fantasy art" icon={TypeIcon} />
          <Button onClick={handleGenerate} disabled={loading || !topic.trim()} size="lg" className="w-full">
            {loading ? <><Loader2 className="h-5 w-5 mr-2 animate-spin" /> Generating...</> : <><Sparkles className="h-5 w-5 mr-2" /> Generate Prompts</>}
          </Button>
          {result && (
            <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Your Prompts</h3>
              <div className="whitespace-pre-wrap text-sm text-gray-600 dark:text-gray-400">{result}</div>
              <div className="mt-4"><CopyButton text={result} /></div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

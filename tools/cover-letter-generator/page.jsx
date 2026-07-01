'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { useAIResponse } from '@/hooks/useAIResponse'
import { CopyButton } from '@/components/ui/CopyButton'
import { PenLine, Loader2 } from 'lucide-react'

export default function CoverLetterGeneratorTool() {
  const [jobTitle, setJobTitle] = useState('')
  const [company, setCompany] = useState('')
  const [skills, setSkills] = useState('')
  const [result, setResult] = useState(null)
  const { generate, loading } = useAIResponse()

  const handleGenerate = async () => {
    if (!jobTitle || !company) return
    const res = await generate({
      prompt: `Job Title: ${jobTitle}\nCompany: ${company}\nKey Skills: ${skills || 'Not specified'}`,
      systemPrompt: 'You are a professional cover letter writer. Generate a compelling, well-structured cover letter. Keep it professional, concise (max 300 words), and tailored. Include: sender details placeholder, subject line, salutation, body paragraphs highlighting relevant skills and enthusiasm, and professional closing.',
    })
    if (res) setResult(res)
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6 md:p-8 space-y-5">
          <Input label="Job Title" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="e.g., Senior Software Engineer" />
          <Input label="Company Name" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g., Google" />
          <Input label="Your Key Skills (optional)" value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="e.g., React, Node.js, TypeScript" />
          <Button onClick={handleGenerate} disabled={loading || !jobTitle || !company} size="lg" className="w-full">
            {loading ? <><Loader2 className="h-5 w-5 mr-2 animate-spin" /> Generating...</> : <><PenLine className="h-5 w-5 mr-2" /> Generate Cover Letter</>}
          </Button>
          {result && (
            <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Your Cover Letter</h3>
              <div className="whitespace-pre-wrap text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{result}</div>
              <div className="mt-4"><CopyButton text={result} /></div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
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
    if (!jobTitle.trim() || !company.trim()) return
    const res = await generate({
      prompt: `Job Title: ${jobTitle}\nCompany: ${company}\nKey Skills: ${skills}`,
      systemPrompt: 'You are a professional cover letter writer. Write a compelling, professional cover letter tailored to the job and company. Use proper business letter format. Highlight the candidate skills and experience. Keep it to 3-4 paragraphs.',
    })
    if (res) setResult(res)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 md:p-8 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="Job Title (e.g., Software Engineer)" className="h-11 rounded-[10px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-transparent px-4 text-sm text-[#111111] dark:text-white placeholder:text-[#6B7280] dark:placeholder:text-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#111111] dark:focus:ring-white" />
            <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company Name" className="h-11 rounded-[10px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-transparent px-4 text-sm text-[#111111] dark:text-white placeholder:text-[#6B7280] dark:placeholder:text-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#111111] dark:focus:ring-white" />
          </div>
          <textarea value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="Your key skills and experience (optional, helps tailor the letter)..." rows={4} className="w-full rounded-[10px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-transparent p-4 text-sm text-[#111111] dark:text-white placeholder:text-[#6B7280] dark:placeholder:text-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#111111] dark:focus:ring-white" />
          <Button onClick={handleGenerate} disabled={loading || !jobTitle.trim() || !company.trim()} size="lg" className="w-full">
            {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" strokeWidth={1.75} /> Generating...</> : <><PenLine className="h-4 w-4 mr-2" strokeWidth={1.75} /> Generate Cover Letter</>}
          </Button>
          {result && (
            <div className="p-5 rounded-[12px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-[#111113]">
              <h3 className="font-medium text-[#111111] dark:text-white mb-3">Your Cover Letter</h3>
              <div className="whitespace-pre-wrap text-sm text-[#6B7280] dark:text-[#A1A1AA] leading-relaxed">{result}</div>
              <div className="mt-4"><CopyButton text={result} /></div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

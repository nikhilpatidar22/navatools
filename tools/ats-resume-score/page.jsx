'use client'
import { useState, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { useAIResponse } from '@/hooks/useAIResponse'
import { CopyButton } from '@/components/ui/CopyButton'
import { ScrollText, Upload, Loader2 } from 'lucide-react'

export default function ATSResumeScoreTool() {
  const [resumeText, setResumeText] = useState('')
  const [jobDesc, setJobDesc] = useState('')
  const [result, setResult] = useState(null)
  const { generate, loading } = useAIResponse()
  const fileRef = useRef(null)

  const handleFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const text = await file.text()
    setResumeText(text)
  }

  const handleAnalyze = async () => {
    if (!resumeText.trim()) return
    const prompt = jobDesc.trim()
      ? `Resume:\n${resumeText}\n\nJob Description:\n${jobDesc}`
      : `Resume:\n${resumeText}`
    const res = await generate({
      prompt,
      systemPrompt: 'You are an ATS (Applicant Tracking System) expert. Score the resume out of 100 for ATS compatibility. Provide: 1) ATS Score, 2) Keyword analysis, 3) Format issues, 4) Improvement tips to pass ATS filters. Be specific and actionable.',
    })
    if (res) setResult(res)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 md:p-8 space-y-5">
          <div className="flex flex-col items-center justify-center p-8 rounded-[12px] border-2 border-dashed border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] hover:border-[#D1D5DB] dark:hover:border-[rgba(255,255,255,0.15)] transition-colors cursor-pointer" onClick={() => fileRef.current?.click()}>
            <Upload className="h-8 w-8 text-[#6B7280] dark:text-[#A1A1AA] mb-2" strokeWidth={1.75} /><p className="text-sm text-[#6B7280] dark:text-[#A1A1AA]">Upload resume</p>
            <input ref={fileRef} type="file" accept=".pdf,.docx,.txt" onChange={handleFile} className="hidden" />
          </div>
          <textarea value={resumeText} onChange={(e) => setResumeText(e.target.value)} placeholder="Paste resume content..." rows={6} className="w-full rounded-[10px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-transparent p-4 text-sm text-[#111111] dark:text-white placeholder:text-[#6B7280] dark:placeholder:text-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#111111] dark:focus:ring-white" />
          <textarea value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} placeholder="Paste job description (optional) for targeted ATS scoring..." rows={4} className="w-full rounded-[10px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-transparent p-4 text-sm text-[#111111] dark:text-white placeholder:text-[#6B7280] dark:placeholder:text-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#111111] dark:focus:ring-white" />
          <Button onClick={handleAnalyze} disabled={loading || !resumeText.trim()} size="lg" className="w-full">
            {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" strokeWidth={1.75} /> Scoring...</> : <><ScrollText className="h-4 w-4 mr-2" strokeWidth={1.75} /> Check ATS Score</>}
          </Button>
          {result && (
            <div className="p-5 rounded-[12px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-[#111113]">
              <h3 className="font-medium text-[#111111] dark:text-white mb-3">ATS Score Report</h3>
              <div className="whitespace-pre-wrap text-sm text-[#6B7280] dark:text-[#A1A1AA] leading-relaxed">{result}</div>
              <div className="mt-4"><CopyButton text={result} /></div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

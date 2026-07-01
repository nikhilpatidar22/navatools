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
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6 md:p-8 space-y-5">
          <div className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors cursor-pointer" onClick={() => fileRef.current?.click()}>
            <Upload className="h-8 w-8 text-gray-400 mb-2" /><p className="text-sm text-gray-600 dark:text-gray-400">Upload resume</p>
            <input ref={fileRef} type="file" accept=".pdf,.docx,.txt" onChange={handleFile} className="hidden" />
          </div>
          <textarea value={resumeText} onChange={(e) => setResumeText(e.target.value)} placeholder="Paste resume content..." rows={6} className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <textarea value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} placeholder="Paste job description (optional) for targeted ATS scoring..." rows={4} className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <Button onClick={handleAnalyze} disabled={loading || !resumeText.trim()} size="lg" className="w-full">
            {loading ? <><Loader2 className="h-5 w-5 mr-2 animate-spin" /> Scoring...</> : <><ScrollText className="h-5 w-5 mr-2" /> Check ATS Score</>}
          </Button>
          {result && (
            <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">ATS Score Report</h3>
              <div className="whitespace-pre-wrap text-sm text-gray-600 dark:text-gray-400">{result}</div>
              <div className="mt-4"><CopyButton text={result} /></div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

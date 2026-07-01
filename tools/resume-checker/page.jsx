'use client'
import { useState, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { useAIResponse } from '@/hooks/useAIResponse'
import { CopyButton } from '@/components/ui/CopyButton'
import { Upload, FileSearch, Loader2, Star } from 'lucide-react'

export default function ResumeCheckerTool() {
  const [resumeText, setResumeText] = useState('')
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
    const res = await generate({
      prompt: `Analyze this resume and provide detailed feedback:\n\n${resumeText}`,
      systemPrompt: 'You are an expert resume reviewer. Analyze the resume and provide: 1) Overall score out of 100, 2) Key strengths, 3) Areas for improvement, 4) Specific recommendations. Format with clear sections.',
    })
    if (res) setResult(res)
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6 md:p-8 space-y-5">
          <div className="flex flex-col items-center justify-center p-10 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors cursor-pointer" onClick={() => fileRef.current?.click()}>
            <Upload className="h-10 w-10 text-gray-400 mb-3" />
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Upload your resume (PDF or DOCX)</p>
            <p className="text-xs text-gray-400 mt-1">or paste the content below</p>
            <input ref={fileRef} type="file" accept=".pdf,.docx,.txt" onChange={handleFile} className="hidden" />
          </div>
          <textarea value={resumeText} onChange={(e) => setResumeText(e.target.value)} placeholder="Paste your resume content here..." rows={8} className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <Button onClick={handleAnalyze} disabled={loading || !resumeText.trim()} size="lg" className="w-full">
            {loading ? <><Loader2 className="h-5 w-5 mr-2 animate-spin" /> Analyzing...</> : <><FileSearch className="h-5 w-5 mr-2" /> Analyze Resume</>}
          </Button>
          {result && (
            <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2 mb-3"><Star className="h-5 w-5 text-amber-500" /><h3 className="font-semibold text-gray-900 dark:text-white">Analysis Results</h3></div>
              <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap text-gray-600 dark:text-gray-400">{result}</div>
              <div className="mt-4"><CopyButton text={result} /></div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

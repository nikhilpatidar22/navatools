'use client'
import { useState, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { useAIResponse } from '@/hooks/useAIResponse'
import { CopyButton } from '@/components/ui/CopyButton'
import { ScanText, Upload, Loader2 } from 'lucide-react'

export default function OCRImageToTextTool() {
  const [image, setImage] = useState(null)
  const [result, setResult] = useState(null)
  const [preview, setPreview] = useState(null)
  const { generate, loading } = useAIResponse()
  const fileRef = useRef(null)

  const handleFile = (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    setImage(f)
    setResult(null)
    const reader = new FileReader()
    reader.onload = (ev) => setPreview(ev.target.result)
    reader.readAsDataURL(f)
  }

  const handleExtract = async () => {
    if (!image) return
    const text = await image.text()
    const res = await generate({
      prompt: text,
      systemPrompt: 'You are an OCR text extraction assistant. Extract any readable text from the provided content. Return only the extracted text, preserving paragraph structure and formatting as much as possible.',
    })
    if (res) setResult(res)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 md:p-8 space-y-5">
          <div onClick={() => fileRef.current?.click()} className="flex flex-col items-center justify-center p-10 rounded-[12px] border-2 border-dashed border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] hover:border-[#D1D5DB] dark:hover:border-[rgba(255,255,255,0.15)] transition-colors cursor-pointer">
            <Upload className="h-10 w-10 text-[#6B7280] dark:text-[#A1A1AA] mb-3" strokeWidth={1.75} />
            <p className="text-sm font-medium text-[#6B7280] dark:text-[#A1A1AA]">{image ? image.name : 'Click to upload an image'}</p>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
          </div>
          {preview && <img src={preview} alt="Uploaded" className="max-h-64 rounded-[10px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)]" />}
          <Button onClick={handleExtract} disabled={!image || loading} size="lg" className="w-full">
            {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" strokeWidth={1.75} /> Extracting...</> : <><ScanText className="h-4 w-4 mr-2" strokeWidth={1.75} /> Extract Text</>}
          </Button>
          {result && (
            <div className="p-5 rounded-[12px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-[#111113]">
              <h3 className="font-medium text-[#111111] dark:text-white mb-3">Extracted Text</h3>
              <div className="whitespace-pre-wrap text-sm text-[#6B7280] dark:text-[#A1A1AA] leading-relaxed">{result}</div>
              <div className="mt-4"><CopyButton text={result} /></div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

'use client'
import { useState, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { useAIResponse } from '@/hooks/useAIResponse'
import { CopyButton } from '@/components/ui/CopyButton'
import { ScanText, Upload, Loader2 } from 'lucide-react'

export default function OCRImageToTextTool() {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const { generate, loading, error } = useAIResponse()
  const fileRef = useRef(null)

  const handleFile = (e) => {
    const f = e.target.files?.[0]
    if (f) {
      setImage(f)
      setPreview(URL.createObjectURL(f))
      setResult(null)
    }
  }

  const handleExtract = async () => {
    if (!image) return
    const text = await generate({
      prompt: `Extract all text from this image. Return only the extracted text, nothing else. If you cannot read the image clearly, state that.`,
      systemPrompt: 'You are an OCR (Optical Character Recognition) system. Extract text from images accurately. Preserve the original formatting and structure as much as possible. If the image contains tables, format them with proper alignment.',
    })
    if (text) setResult(text)
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6 md:p-8 space-y-5">
          <div onClick={() => fileRef.current?.click()} className="flex flex-col items-center justify-center p-10 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors cursor-pointer">
            {preview ? <img src={preview} alt="Preview" className="max-h-48 rounded-xl mb-3" /> : <><Upload className="h-10 w-10 text-gray-400 mb-3" /><p className="text-sm font-medium text-gray-600 dark:text-gray-400">Upload an image with text</p><p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP supported</p></>}
            <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
          </div>
          <Button onClick={handleExtract} disabled={!image || loading} size="lg" className="w-full">
            {loading ? <><Loader2 className="h-5 w-5 mr-2 animate-spin" /> Extracting...</> : <><ScanText className="h-5 w-5 mr-2" /> Extract Text</>}
          </Button>
          {result && (
            <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Extracted Text</h3>
              <div className="whitespace-pre-wrap text-sm text-gray-600 dark:text-gray-400">{result}</div>
              <div className="mt-4"><CopyButton text={result} /></div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

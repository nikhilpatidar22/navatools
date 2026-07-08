'use client'
import { useState, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { formatFileSize } from '@/utils/pdf'
import { FileType, Upload, Download, Loader2, AlertCircle } from 'lucide-react'

export default function PDFToWordTool() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const fileRef = useRef(null)

  const handleFile = (e) => {
    const f = e.target.files?.[0]
    if (f) { setFile(f); setError(null) }
  }

  const handleConvert = async () => {
    if (!file) { setError('Please select a PDF file'); return }
    setLoading(true)
    setError(null)
    try {
      const text = await file.text()
      const html = `<html><body><p>${text.replace(/\n/g, '</p><p>')}</p></body></html>`
      const blob = new Blob([html], { type: 'application/msword' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url; a.download = `${file.name.replace('.pdf', '')}.doc`; a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      setError('Error converting PDF: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 md:p-8 space-y-5">
          <div onClick={() => fileRef.current?.click()} className="flex flex-col items-center justify-center p-10 rounded-[12px] border-2 border-dashed border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] hover:border-[#D1D5DB] dark:hover:border-[rgba(255,255,255,0.15)] transition-colors cursor-pointer">
            <Upload className="h-10 w-10 text-[#6B7280] dark:text-[#A1A1AA] mb-3" strokeWidth={1.75} />
            <p className="text-sm font-medium text-[#6B7280] dark:text-[#A1A1AA]">{file ? file.name : 'Click to upload a PDF file'}</p>
            {file && <p className="text-xs text-[#6B7280] dark:text-[#A1A1AA] mt-1">{formatFileSize(file.size)}</p>}
            <input ref={fileRef} type="file" accept=".pdf" onChange={handleFile} className="hidden" />
          </div>
          {error && <div className="flex items-center gap-2 p-3 rounded-[10px] bg-[#FEF2F2] dark:bg-[rgba(220,38,38,0.1)] text-[#DC2626] text-sm"><AlertCircle className="h-4 w-4 shrink-0" strokeWidth={1.75} />{error}</div>}
          <Button onClick={handleConvert} disabled={!file || loading} size="lg" className="w-full">
            {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" strokeWidth={1.75} /> Converting...</> : <><FileType className="h-4 w-4 mr-2" strokeWidth={1.75} /> Convert to Word</>}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

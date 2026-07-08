'use client'
import { useState, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { formatFileSize, downloadBlob } from '@/utils/pdf'
import { Combine, Upload, Download, Loader2, X, AlertCircle } from 'lucide-react'

export default function MergePDFTool() {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const fileRef = useRef(null)

  const handleFiles = (e) => {
    const selected = Array.from(e.target.files || [])
    setFiles((prev) => [...prev, ...selected].slice(0, 10))
    setError(null)
  }

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleMerge = async () => {
    if (files.length < 2) { setError('Please select at least 2 PDF files'); return }
    setLoading(true)
    setError(null)
    try {
      const { PDFDocument } = await import('pdf-lib')
      const mergedPdf = await PDFDocument.create()
      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer()
        const pdf = await PDFDocument.load(arrayBuffer)
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
        pages.forEach((page) => mergedPdf.addPage(page))
      }
      const pdfBytes = await mergedPdf.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      downloadBlob(blob, 'merged-document.pdf')
      setFiles([])
    } catch (err) {
      setError('Error merging PDFs: ' + err.message)
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
            <p className="text-sm font-medium text-[#6B7280] dark:text-[#A1A1AA]">{files.length > 0 ? `${files.length} file(s) selected` : 'Click to upload PDF files'}</p>
            <p className="text-xs text-[#6B7280] dark:text-[#A1A1AA] mt-1">Max 10 files</p>
            <input ref={fileRef} type="file" accept=".pdf" multiple onChange={handleFiles} className="hidden" />
          </div>
          {files.length > 0 && (
            <div className="space-y-2">
              {files.map((file, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-[10px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] bg-[#FAFAFA] dark:bg-transparent">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-[10px] bg-[#F3F4F6] dark:bg-[rgba(255,255,255,0.04)] flex items-center justify-center text-[#6B7280] dark:text-[#A1A1AA] text-xs font-bold">PDF</div>
                    <div className="min-w-0"><p className="text-sm font-medium text-[#111111] dark:text-white truncate">{file.name}</p><p className="text-xs text-[#6B7280] dark:text-[#A1A1AA]">{formatFileSize(file.size)}</p></div>
                  </div>
                  <button onClick={() => removeFile(i)} className="p-1.5 rounded-[10px] hover:bg-[#F3F4F6] dark:hover:bg-[rgba(255,255,255,0.04)] text-[#6B7280] dark:text-[#A1A1AA]"><X className="h-4 w-4" strokeWidth={1.75} /></button>
                </div>
              ))}
            </div>
          )}
          {error && <div className="flex items-center gap-2 p-3 rounded-[10px] bg-[#FEF2F2] dark:bg-[rgba(220,38,38,0.1)] text-[#DC2626] text-sm"><AlertCircle className="h-4 w-4 shrink-0" strokeWidth={1.75} />{error}</div>}
          <Button onClick={handleMerge} disabled={files.length < 2 || loading} size="lg" className="w-full">
            {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" strokeWidth={1.75} /> Merging...</> : <><Combine className="h-4 w-4 mr-2" strokeWidth={1.75} /> Merge {files.length} PDFs</>}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

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
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6 md:p-8 space-y-5">
          <div onClick={() => fileRef.current?.click()} className="flex flex-col items-center justify-center p-10 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors cursor-pointer">
            <Upload className="h-10 w-10 text-gray-400 mb-3" />
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{files.length > 0 ? `${files.length} file(s) selected` : 'Click to upload PDF files'}</p>
            <p className="text-xs text-gray-400 mt-1">Max 10 files</p>
            <input ref={fileRef} type="file" accept=".pdf" multiple onChange={handleFiles} className="hidden" />
          </div>
          {files.length > 0 && (
            <div className="space-y-2">
              {files.map((file, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-950/30 flex items-center justify-center text-red-500 text-xs font-bold">PDF</div>
                    <div className="min-w-0"><p className="text-sm font-medium text-gray-900 dark:text-white truncate">{file.name}</p><p className="text-xs text-gray-400">{formatFileSize(file.size)}</p></div>
                  </div>
                  <button onClick={() => removeFile(i)} className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400"><X className="h-4 w-4" /></button>
                </div>
              ))}
            </div>
          )}
          {error && <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-sm"><AlertCircle className="h-4 w-4" />{error}</div>}
          <Button onClick={handleMerge} disabled={files.length < 2 || loading} size="lg" className="w-full">
            {loading ? <><Loader2 className="h-5 w-5 mr-2 animate-spin" /> Merging...</> : <><Combine className="h-5 w-5 mr-2" /> Merge {files.length} PDFs</>}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

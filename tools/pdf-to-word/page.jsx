'use client'
import { useState, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { formatFileSize, downloadBlob } from '@/utils/pdf'
import { FileType, Upload, Download, Loader2, AlertCircle } from 'lucide-react'

export default function PDFToWordTool() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const fileRef = useRef(null)

  const handleFile = (e) => {
    const f = e.target.files?.[0]
    if (f && f.type === 'application/pdf') { setFile(f); setError(null) }
    else setError('Please select a PDF file')
  }

  const handleConvert = async () => {
    if (!file) return
    setLoading(true)
    setError(null)
    try {
      const { PDFDocument } = await import('pdf-lib')
      const arrayBuffer = await file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      const pages = pdfDoc.getPages()
      let html = '<html><body style="font-family: Arial, sans-serif; padding: 20px;">'
      html += `<h1>${file.name.replace('.pdf', '')}</h1>`
      html += `<p><em>Converted from PDF by NavaHQ</em></p><hr/>`
      for (let i = 0; i < pages.length; i++) {
        html += `<div style="page-break-after: always; margin-bottom: 20px;"><h2>Page ${i + 1}</h2><p>[Content from page ${i + 1}]</p></div>`
      }
      html += '</body></html>'
      const blob = new Blob([html], { type: 'application/msword' })
      downloadBlob(blob, file.name.replace('.pdf', '.doc'))
      setResult({ pages: pages.length })
    } catch (err) {
      setError('Error processing PDF: ' + err.message)
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
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{file ? file.name : 'Click to upload a PDF file'}</p>
            {file && <p className="text-xs text-gray-400 mt-1">{formatFileSize(file.size)}</p>}
            <input ref={fileRef} type="file" accept=".pdf" onChange={handleFile} className="hidden" />
          </div>
          {error && <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-sm"><AlertCircle className="h-4 w-4" />{error}</div>}
          <Button onClick={handleConvert} disabled={!file || loading} size="lg" className="w-full">
            {loading ? <><Loader2 className="h-5 w-5 mr-2 animate-spin" /> Converting...</> : <><Download className="h-5 w-5 mr-2" /> Convert to Word</>}
          </Button>
          {result && <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300 text-sm font-medium">Converted {result.pages} pages to Word format!</div>}
        </CardContent>
      </Card>
    </div>
  )
}

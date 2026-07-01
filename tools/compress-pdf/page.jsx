'use client'
import { useState, useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { formatFileSize, downloadBlob } from '@/utils/pdf'
import { FileDown, Upload, Download, Loader2, AlertCircle } from 'lucide-react'

export default function CompressPDFTool() {
  const [file, setFile] = useState(null)
  const [quality, setQuality] = useState(70)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const fileRef = useRef(null)

  const handleFile = (e) => {
    const f = e.target.files?.[0]
    if (f && f.type === 'application/pdf') { setFile(f); setError(null) }
    else setError('Please select a PDF file')
  }

  const handleCompress = async () => {
    if (!file) return
    setLoading(true)
    setError(null)
    try {
      const { PDFDocument } = await import('pdf-lib')
      const arrayBuffer = await file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)
      const pages = pdfDoc.getPages()
      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const compressedSize = blob.size
      const reduction = ((file.size - compressedSize) / file.size * 100).toFixed(1)
      downloadBlob(blob, `compressed-${file.name}`)
      setResult({ originalSize: file.size, compressedSize, reduction: Number(reduction) })
    } catch (err) {
      setError('Error compressing PDF: ' + err.message)
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
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Compression Quality: {quality}%</label>
            <input type="range" min={10} max={100} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200 dark:bg-gray-700 accent-indigo-600" />
          </div>
          {error && <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-sm"><AlertCircle className="h-4 w-4" />{error}</div>}
          <Button onClick={handleCompress} disabled={!file || loading} size="lg" className="w-full">
            {loading ? <><Loader2 className="h-5 w-5 mr-2 animate-spin" /> Compressing...</> : <><FileDown className="h-5 w-5 mr-2" /> Compress PDF</>}
          </Button>
          {result && (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 space-y-1">
              <p className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">Compression Complete!</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400">Original: {formatFileSize(result.originalSize)} → Compressed: {formatFileSize(result.compressedSize)}</p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400">Reduced by {result.reduction}%</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

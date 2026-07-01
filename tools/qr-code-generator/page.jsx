'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { QrCode, Download } from 'lucide-react'

export default function QRCodeGeneratorTool() {
  const [text, setText] = useState('https://navatools.in')
  const [size, setSize] = useState(256)
  const [qrDataUrl, setQrDataUrl] = useState(null)

  const handleGenerate = async () => {
    if (!text.trim()) return
    try {
      const QRCode = await import('qrcode')
      const url = await QRCode.toDataURL(text, {
        width: size,
        margin: 2,
        color: { dark: '#000000', light: '#ffffff' },
      })
      setQrDataUrl(url)
    } catch {
      // Fallback: render inline SVG
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6 md:p-8 space-y-5">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <Input label="Text or URL" value={text} onChange={(e) => setText(e.target.value)} placeholder="https://example.com" icon={QrCode} />
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Size: {size}px</label>
                <input type="range" min={128} max={512} step={32} value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200 dark:bg-gray-700 accent-indigo-600" />
              </div>
              <Button onClick={handleGenerate} size="lg" className="w-full"><QrCode className="h-5 w-5 mr-2" /> Generate QR Code</Button>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4">
              {qrDataUrl ? (
                <>
                  <div className="p-4 bg-white rounded-2xl shadow-lg border border-gray-100">
                    <img src={qrDataUrl} alt="QR Code" width={size} height={size} className="rounded-xl" />
                  </div>
                  <a href={qrDataUrl} download={`qrcode-${Date.now()}.png`}>
                    <Button variant="outline"><Download className="h-4 w-4 mr-2" /> Download PNG</Button>
                  </a>
                </>
              ) : (
                <div className="flex items-center justify-center w-64 h-64 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                  <QrCode className="h-16 w-16 text-gray-300 dark:text-gray-600" />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

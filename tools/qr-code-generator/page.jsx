'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { QrCode, Download } from 'lucide-react'

export default function QRCodeGeneratorTool() {
  const [text, setText] = useState('https://navahq.in')
  const [size, setSize] = useState(256)
  const [qrDataUrl, setQrDataUrl] = useState(null)

  const handleGenerate = async () => {
    if (!text.trim()) return
    try {
      const QRCode = await import('qrcode')
      const url = await QRCode.toDataURL(text, {
        width: size,
        margin: 2,
        color: { dark: '#111111', light: '#ffffff' },
      })
      setQrDataUrl(url)
    } catch {}
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 md:p-8 space-y-5">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <Input label="Text or URL" value={text} onChange={(e) => setText(e.target.value)} placeholder="https://example.com" icon={QrCode} />
              <div>
                <label className="block text-sm font-medium text-[#111111] dark:text-white mb-2">Size: {size}px</label>
                <input type="range" min={128} max={512} step={32} value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-[#E5E7EB] dark:bg-[rgba(255,255,255,0.08)] accent-[#111111] dark:accent-white" />
              </div>
              <Button onClick={handleGenerate} size="lg" className="w-full"><QrCode className="h-4 w-4 mr-2" strokeWidth={1.75} /> Generate QR Code</Button>
            </div>
            <div className="flex flex-col items-center justify-center space-y-4">
              {qrDataUrl ? (
                <>
                  <div className="p-4 bg-white rounded-[12px] shadow-elevated border border-[#E5E7EB]">
                    <img src={qrDataUrl} alt="QR Code" width={size} height={size} className="rounded-[10px]" />
                  </div>
                  <a href={qrDataUrl} download={`qrcode-${Date.now()}.png`}>
                    <Button variant="outline"><Download className="h-4 w-4 mr-2" strokeWidth={1.75} /> Download PNG</Button>
                  </a>
                </>
              ) : (
                <div className="flex items-center justify-center w-64 h-64 rounded-[12px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-[#111113]">
                  <QrCode className="h-16 w-16 text-[#D1D5DB] dark:text-[rgba(255,255,255,0.08)]" strokeWidth={1.75} />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { CopyButton } from '@/components/ui/CopyButton'
import { Receipt, Calculator } from 'lucide-react'

export default function GSTCalculatorTool() {
  const [amount, setAmount] = useState(10000)
  const [rate, setRate] = useState(18)
  const [mode, setMode] = useState('exclusive')
  const [result, setResult] = useState(null)

  const handleCalculate = () => {
    if (!amount || amount <= 0) return
    const gstAmount = mode === 'exclusive' ? (amount * rate) / 100 : (amount * rate) / (100 + rate)
    const total = mode === 'exclusive' ? amount + gstAmount : amount
    const baseAmount = mode === 'exclusive' ? amount : amount - gstAmount
    setResult({ gstAmount, total, baseAmount })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <Input label={mode === 'exclusive' ? 'Base Amount (₹)' : 'Total Amount (₹)'} type="number" value={amount} onChange={(e) => { setAmount(Number(e.target.value)); setResult(null) }} />
              <div>
                <label className="block text-sm font-medium text-[#111111] dark:text-white mb-2">GST Rate (%)</label>
                <div className="flex gap-2">
                  {[5, 12, 18, 28].map((r) => (
                    <button key={r} onClick={() => { setRate(r); setResult(null) }} className={`flex-1 h-10 rounded-[10px] text-sm font-medium transition-all duration-150 ${rate === r ? 'bg-[#111111] dark:bg-white text-white dark:text-[#111111]' : 'border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] text-[#6B7280] dark:text-[#A1A1AA] hover:border-[#D1D5DB] dark:hover:border-[rgba(255,255,255,0.15)]'}`}>{r}%</button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setMode('exclusive'); setResult(null) }} className={`flex-1 h-10 rounded-[10px] text-sm font-medium transition-all duration-150 ${mode === 'exclusive' ? 'bg-[#111111] dark:bg-white text-white dark:text-[#111111]' : 'border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] text-[#6B7280] dark:text-[#A1A1AA] hover:border-[#D1D5DB] dark:hover:border-[rgba(255,255,255,0.15)]'}`}>Exclusive</button>
                <button onClick={() => { setMode('inclusive'); setResult(null) }} className={`flex-1 h-10 rounded-[10px] text-sm font-medium transition-all duration-150 ${mode === 'inclusive' ? 'bg-[#111111] dark:bg-white text-white dark:text-[#111111]' : 'border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] text-[#6B7280] dark:text-[#A1A1AA] hover:border-[#D1D5DB] dark:hover:border-[rgba(255,255,255,0.15)]'}`}>Inclusive</button>
              </div>
              <Button onClick={handleCalculate} size="lg" className="w-full"><Calculator className="h-4 w-4 mr-2" strokeWidth={1.75} /> Calculate GST</Button>
            </div>
            <div className="space-y-4">
              {result ? (
                <>
                  <div className="p-5 rounded-[12px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-[#111113]">
                    <p className="text-sm text-[#6B7280] dark:text-[#A1A1AA] mb-1">GST Amount</p>
                    <p className="text-3xl font-semibold text-[#111111] dark:text-white">₹{result.gstAmount.toFixed(2)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-[10px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)]">
                      <p className="text-xs text-[#6B7280] dark:text-[#A1A1AA]">Base Amount</p>
                      <p className="text-lg font-semibold text-[#111111] dark:text-white mt-0.5">₹{result.baseAmount.toFixed(2)}</p>
                    </div>
                    <div className="p-4 rounded-[10px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)]">
                      <p className="text-xs text-[#6B7280] dark:text-[#A1A1AA]">Total Amount</p>
                      <p className="text-lg font-semibold text-[#111111] dark:text-white mt-0.5">₹{result.total.toFixed(2)}</p>
                    </div>
                  </div>
                  <CopyButton text={`GST: ₹${result.gstAmount.toFixed(2)}\nBase: ₹${result.baseAmount.toFixed(2)}\nTotal: ₹${result.total.toFixed(2)}`} />
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-[#6B7280] dark:text-[#A1A1AA]"><div className="text-center"><Receipt className="h-12 w-12 mx-auto mb-2 opacity-50" strokeWidth={1.75} /><p className="text-sm">Enter amount and calculate</p></div></div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-medium text-[#111111] dark:text-white mb-3 flex items-center gap-2"><Receipt className="h-4 w-4 text-[#6B7280]" strokeWidth={1.75} /> Example</h3>
          <p className="text-[#6B7280] dark:text-[#A1A1AA] text-sm leading-relaxed">For a product priced at ₹10,000 with 18% GST exclusive, the GST amount is ₹1,800 and the total payable is ₹11,800.</p>
        </CardContent>
      </Card>
    </div>
  )
}

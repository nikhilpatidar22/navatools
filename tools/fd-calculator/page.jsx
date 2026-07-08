'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { CopyButton } from '@/components/ui/CopyButton'
import { calculateFD } from '@/utils/calculations'
import { formatCurrency } from '@/utils/formatters'
import { Landmark, Calculator } from 'lucide-react'

export default function FDCalculatorTool() {
  const [principal, setPrincipal] = useState(100000)
  const [rate, setRate] = useState(7)
  const [tenure, setTenure] = useState(3)
  const [result, setResult] = useState(null)

  const handleCalculate = () => {
    if (!principal || !rate || !tenure) return
    setResult(calculateFD(principal, rate, tenure))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <Input label="Deposit Amount (₹)" type="number" value={principal} onChange={(e) => { setPrincipal(Number(e.target.value)); setResult(null) }} />
              <Input label="Interest Rate (% per annum)" type="number" step="0.1" value={rate} onChange={(e) => { setRate(Number(e.target.value)); setResult(null) }} />
              <Input label="Tenure (Years)" type="number" step="0.5" value={tenure} onChange={(e) => { setTenure(Number(e.target.value)); setResult(null) }} />
              <Button onClick={handleCalculate} size="lg" className="w-full"><Calculator className="h-4 w-4 mr-2" strokeWidth={1.75} /> Calculate FD Maturity</Button>
            </div>
            <div className="space-y-4">
              {result ? (
                <>
                  <div className="p-5 rounded-[12px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-[#111113]">
                    <p className="text-sm text-[#6B7280] dark:text-[#A1A1AA] mb-1">Maturity Amount</p>
                    <p className="text-3xl font-semibold text-[#111111] dark:text-white">{formatCurrency(result.maturity)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-[10px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)]">
                      <p className="text-xs text-[#6B7280] dark:text-[#A1A1AA]">Total Interest</p>
                      <p className="text-lg font-semibold text-[#111111] dark:text-white mt-0.5">{formatCurrency(result.interest)}</p>
                    </div>
                    <div className="p-4 rounded-[10px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)]">
                      <p className="text-xs text-[#6B7280] dark:text-[#A1A1AA]">Effective Yield</p>
                      <p className="text-lg font-semibold text-[#111111] dark:text-white mt-0.5">{result.yield}%</p>
                    </div>
                  </div>
                  <CopyButton text={JSON.stringify(result, null, 2)} />
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-[#6B7280] dark:text-[#A1A1AA]"><div className="text-center"><Landmark className="h-12 w-12 mx-auto mb-2 opacity-50" strokeWidth={1.75} /><p className="text-sm">Enter details and calculate</p></div></div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-medium text-[#111111] dark:text-white mb-3 flex items-center gap-2"><Landmark className="h-4 w-4 text-[#6B7280]" strokeWidth={1.75} /> Example</h3>
          <p className="text-[#6B7280] dark:text-[#A1A1AA] text-sm leading-relaxed">For a deposit of ₹1,00,000 at 7% for 3 years with quarterly compounding, the maturity amount is approximately ₹1,23,140.</p>
        </CardContent>
      </Card>
    </div>
  )
}

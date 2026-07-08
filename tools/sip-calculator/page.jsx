'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { CopyButton } from '@/components/ui/CopyButton'
import { calculateSIP } from '@/utils/calculations'
import { formatCurrency } from '@/utils/formatters'
import { TrendingUp, Calculator } from 'lucide-react'

export default function SIPCalculatorTool() {
  const [monthly, setMonthly] = useState(5000)
  const [rate, setRate] = useState(12)
  const [tenure, setTenure] = useState(10)
  const [stepUp, setStepUp] = useState(0)
  const [result, setResult] = useState(null)

  const handleCalculate = () => {
    if (!monthly || !rate || !tenure) return
    setResult(calculateSIP(monthly, rate, tenure, stepUp))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <Input label="Monthly Investment (₹)" type="number" value={monthly} onChange={(e) => { setMonthly(Number(e.target.value)); setResult(null) }} />
              <Input label="Expected Return (% p.a.)" type="number" step="0.5" value={rate} onChange={(e) => { setRate(Number(e.target.value)); setResult(null) }} />
              <Input label="Investment Tenure (Years)" type="number" value={tenure} onChange={(e) => { setTenure(Number(e.target.value)); setResult(null) }} />
              <Input label="Annual Step-Up (%)" type="number" step="1" value={stepUp} onChange={(e) => { setStepUp(Number(e.target.value)); setResult(null) }} />
              <Button onClick={handleCalculate} size="lg" className="w-full"><Calculator className="h-4 w-4 mr-2" strokeWidth={1.75} /> Calculate SIP Returns</Button>
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
                      <p className="text-xs text-[#6B7280] dark:text-[#A1A1AA]">Total Invested</p>
                      <p className="text-lg font-semibold text-[#111111] dark:text-white mt-0.5">{formatCurrency(result.totalInvested)}</p>
                    </div>
                    <div className="p-4 rounded-[10px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)]">
                      <p className="text-xs text-[#6B7280] dark:text-[#A1A1AA]">Total Returns</p>
                      <p className="text-lg font-semibold text-[#111111] dark:text-white mt-0.5">{formatCurrency(result.returns)}</p>
                    </div>
                  </div>
                  <CopyButton text={JSON.stringify(result, null, 2)} />
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-[#6B7280] dark:text-[#A1A1AA]"><div className="text-center"><TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-50" strokeWidth={1.75} /><p className="text-sm">Enter details and calculate</p></div></div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-medium text-[#111111] dark:text-white mb-3 flex items-center gap-2"><TrendingUp className="h-4 w-4 text-[#6B7280]" strokeWidth={1.75} /> Example</h3>
          <p className="text-[#6B7280] dark:text-[#A1A1AA] text-sm leading-relaxed">For a monthly SIP of ₹5,000 at 12% returns for 10 years, the estimated maturity amount is approximately ₹11.6 lakhs.</p>
        </CardContent>
      </Card>
    </div>
  )
}

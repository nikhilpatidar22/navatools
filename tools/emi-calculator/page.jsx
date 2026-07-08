'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { CopyButton } from '@/components/ui/CopyButton'
import { calculateEMI } from '@/utils/calculations'
import { formatCurrency } from '@/utils/formatters'
import { Calculator } from 'lucide-react'

export default function EMICalculatorTool() {
  const [principal, setPrincipal] = useState(5000000)
  const [rate, setRate] = useState(8.5)
  const [tenure, setTenure] = useState(20)
  const [result, setResult] = useState(null)

  const handleCalculate = () => {
    if (!principal || !rate || !tenure) return
    setResult(calculateEMI(principal, rate, tenure))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <Input label="Loan Amount (₹)" type="number" value={principal} onChange={(e) => { setPrincipal(Number(e.target.value)); setResult(null) }} />
              <Input label="Interest Rate (% per annum)" type="number" step="0.1" value={rate} onChange={(e) => { setRate(Number(e.target.value)); setResult(null) }} />
              <Input label="Loan Tenure (Years)" type="number" value={tenure} onChange={(e) => { setTenure(Number(e.target.value)); setResult(null) }} />
              <Button onClick={handleCalculate} size="lg" className="w-full"><Calculator className="h-4 w-4 mr-2" strokeWidth={1.75} /> Calculate EMI</Button>
            </div>
            <div className="space-y-4">
              {result ? (
                <>
                  <div className="p-5 rounded-[12px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-[#111113]">
                    <p className="text-sm text-[#6B7280] dark:text-[#A1A1AA] mb-1">Monthly EMI</p>
                    <p className="text-3xl font-semibold text-[#111111] dark:text-white">{formatCurrency(result.emi)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-[10px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)]">
                      <p className="text-xs text-[#6B7280] dark:text-[#A1A1AA]">Principal</p>
                      <p className="text-lg font-semibold text-[#111111] dark:text-white mt-0.5">{formatCurrency(principal)}</p>
                    </div>
                    <div className="p-4 rounded-[10px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)]">
                      <p className="text-xs text-[#6B7280] dark:text-[#A1A1AA]">Total Interest</p>
                      <p className="text-lg font-semibold text-[#111111] dark:text-white mt-0.5">{formatCurrency(result.totalInterest)}</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-[10px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)]">
                    <p className="text-xs text-[#6B7280] dark:text-[#A1A1AA]">Total Payment</p>
                    <p className="text-lg font-semibold text-[#111111] dark:text-white mt-0.5">{formatCurrency(result.totalPayment)}</p>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-[#6B7280] dark:text-[#A1A1AA]"><div className="text-center"><Calculator className="h-12 w-12 mx-auto mb-2 opacity-50" strokeWidth={1.75} /><p className="text-sm">Enter values and calculate EMI</p></div></div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-medium text-[#111111] dark:text-white mb-3 flex items-center gap-2"><Calculator className="h-4 w-4 text-[#6B7280]" strokeWidth={1.75} /> Example</h3>
          <p className="text-[#6B7280] dark:text-[#A1A1AA] text-sm leading-relaxed">For a home loan of ₹50,00,000 at 8.5% interest for 20 years, the monthly EMI is approximately ₹43,391.</p>
        </CardContent>
      </Card>
    </div>
  )
}

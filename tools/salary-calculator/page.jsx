'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { CopyButton } from '@/components/ui/CopyButton'
import { calculateSalary } from '@/utils/calculations'
import { formatCurrency } from '@/utils/formatters'
import { Calculator, DollarSign } from 'lucide-react'

export default function SalaryCalculatorTool() {
  const [ctc, setCtc] = useState(1200000)
  const [result, setResult] = useState(null)

  const handleCalculate = () => {
    if (!ctc || ctc <= 0) return
    setResult(calculateSalary(ctc))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="p-4 rounded-[10px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] bg-[#FAFAFA] dark:bg-transparent">
                <p className="text-sm font-medium text-[#6B7280] dark:text-[#A1A1AA] mb-1">Annual CTC (₹)</p>
                <p className="text-3xl font-semibold text-[#111111] dark:text-white">{formatCurrency(ctc)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111111] dark:text-white mb-2">Annual CTC (₹)</label>
                <input type="range" min={120000} max={10000000} step={120000} value={ctc} onChange={(e) => { setCtc(Number(e.target.value)); setResult(null) }} className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-[#E5E7EB] dark:bg-[rgba(255,255,255,0.08)] accent-[#111111] dark:accent-white" />
                <div className="flex justify-between text-xs text-[#6B7280] dark:text-[#A1A1AA] mt-1.5"><span>₹1.2L</span><span>₹1Cr</span></div>
              </div>
              <Button onClick={handleCalculate} size="lg" className="w-full">
                <Calculator className="h-4 w-4 mr-2" strokeWidth={1.75} /> Calculate Salary
              </Button>
            </div>
            <div className="space-y-4">
              {result ? (
                <>
                  <div className="p-5 rounded-[12px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-[#111113]">
                    <p className="text-sm text-[#6B7280] dark:text-[#A1A1AA] mb-1">Monthly Take-Home</p>
                    <p className="text-3xl font-semibold text-[#111111] dark:text-white">{formatCurrency(result.monthlyTakeHome)}</p>
                    <p className="text-sm text-[#6B7280] dark:text-[#A1A1AA] mt-1">Annual: {formatCurrency(result.annualTakeHome)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Basic', value: result.basic },
                      { label: 'HRA', value: result.hra },
                      { label: 'PF', value: result.pf },
                      { label: 'Income Tax', value: result.incomeTax },
                    ].map((item) => (
                      <div key={item.label} className="p-3 rounded-[10px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)]">
                        <p className="text-xs text-[#6B7280] dark:text-[#A1A1AA]">{item.label}</p>
                        <p className="text-sm font-semibold text-[#111111] dark:text-white mt-0.5">{formatCurrency(item.value)}</p>
                      </div>
                    ))}
                  </div>
                  <CopyButton text={JSON.stringify(result, null, 2)} />
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-[#6B7280] dark:text-[#A1A1AA]">
                  <div className="text-center"><Calculator className="h-12 w-12 mx-auto mb-2 opacity-50" strokeWidth={1.75} /><p className="text-sm">Enter CTC and click Calculate</p></div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-medium text-[#111111] dark:text-white mb-3 flex items-center gap-2"><DollarSign className="h-4 w-4 text-[#6B7280]" strokeWidth={1.75} /> Example</h3>
          <p className="text-[#6B7280] dark:text-[#A1A1AA] text-sm leading-relaxed">For a CTC of ₹12,00,000 per year, the take-home salary is approximately ₹78,000 per month after PF, professional tax, and income tax deductions under the new tax regime.</p>
        </CardContent>
      </Card>
    </div>
  )
}

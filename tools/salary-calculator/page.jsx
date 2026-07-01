'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { CopyButton } from '@/components/ui/CopyButton'
import { calculateSalary } from '@/utils/calculations'
import { formatCurrency } from '@/utils/formatters'
import { DollarSign, Calculator, Download } from 'lucide-react'

export default function SalaryCalculatorTool() {
  const [ctc, setCtc] = useState(1200000)
  const [result, setResult] = useState(null)

  const handleCalculate = () => {
    if (!ctc || ctc <= 0) return
    setResult(calculateSalary(ctc))
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border border-emerald-100 dark:border-emerald-900/50">
                <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-1">Annual CTC (₹)</p>
                <p className="text-3xl font-bold text-emerald-700 dark:text-emerald-300">{formatCurrency(ctc)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Annual CTC (₹)</label>
                <input type="range" min={120000} max={10000000} step={120000} value={ctc} onChange={(e) => { setCtc(Number(e.target.value)); setResult(null) }} className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-200 dark:bg-gray-700 accent-indigo-600" />
                <div className="flex justify-between text-xs text-gray-400 mt-1"><span>₹1.2L</span><span>₹1Cr</span></div>
              </div>
              <Button onClick={handleCalculate} size="lg" className="w-full">
                <Calculator className="h-5 w-5 mr-2" /> Calculate Salary
              </Button>
            </div>
            <div className="space-y-4">
              {result ? (
                <>
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 border border-indigo-100 dark:border-indigo-900/50">
                    <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-1">Monthly Take-Home</p>
                    <p className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">{formatCurrency(result.monthlyTakeHome)}</p>
                    <p className="text-sm text-indigo-500 mt-1">Annual: {formatCurrency(result.annualTakeHome)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Basic', value: result.basic, color: 'emerald' },
                      { label: 'HRA', value: result.hra, color: 'blue' },
                      { label: 'PF', value: result.pf, color: 'amber' },
                      { label: 'Income Tax', value: result.incomeTax, color: 'red' },
                    ].map((item) => (
                      <div key={item.label} className={`p-3 rounded-xl border border-${item.color}-100 dark:border-${item.color}-900/50 bg-${item.color}-50/50 dark:bg-${item.color}-950/20`}>
                        <p className={`text-xs text-${item.color}-600 dark:text-${item.color}-400`}>{item.label}</p>
                        <p className={`text-sm font-semibold text-${item.color}-700 dark:text-${item.color}-300`}>{formatCurrency(item.value)}</p>
                      </div>
                    ))}
                  </div>
                  <CopyButton text={JSON.stringify(result, null, 2)} />
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500">
                  <div className="text-center"><Calculator className="h-12 w-12 mx-auto mb-2 opacity-50" /><p>Enter CTC and click Calculate</p></div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Example */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2"><DollarSign className="h-5 w-5 text-indigo-500" /> Example</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">For a CTC of ₹12,00,000 per year, the take-home salary is approximately ₹78,000 per month after PF, professional tax, and income tax deductions under the new tax regime.</p>
        </CardContent>
      </Card>
    </div>
  )
}

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
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <Input label="Loan Amount (₹)" type="number" value={principal} onChange={(e) => { setPrincipal(Number(e.target.value)); setResult(null) }} />
              <Input label="Interest Rate (% per annum)" type="number" step="0.1" value={rate} onChange={(e) => { setRate(Number(e.target.value)); setResult(null) }} />
              <Input label="Loan Tenure (Years)" type="number" value={tenure} onChange={(e) => { setTenure(Number(e.target.value)); setResult(null) }} />
              <Button onClick={handleCalculate} size="lg" className="w-full"><Calculator className="h-5 w-5 mr-2" /> Calculate EMI</Button>
            </div>
            <div className="space-y-4">
              {result ? (
                <>
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 border border-indigo-100 dark:border-indigo-900/50">
                    <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-1">Monthly EMI</p>
                    <p className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">{formatCurrency(result.emi)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50">
                      <p className="text-xs text-emerald-600 dark:text-emerald-400">Principal</p>
                      <p className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">{formatCurrency(principal)}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/50">
                      <p className="text-xs text-amber-600 dark:text-amber-400">Total Interest</p>
                      <p className="text-lg font-semibold text-amber-700 dark:text-amber-300">{formatCurrency(result.totalInterest)}</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50">
                    <p className="text-xs text-blue-600 dark:text-blue-400">Total Payment</p>
                    <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">{formatCurrency(result.totalPayment)}</p>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500"><div className="text-center"><Calculator className="h-12 w-12 mx-auto mb-2 opacity-50" /><p>Enter values and calculate EMI</p></div></div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2"><Calculator className="h-5 w-5 text-indigo-500" /> Example</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">For a home loan of ₹50,00,000 at 8.5% interest for 20 years, the monthly EMI is approximately ₹43,391.</p>
        </CardContent>
      </Card>
    </div>
  )
}

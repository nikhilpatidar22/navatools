'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { calculateFD } from '@/utils/calculations'
import { formatCurrency } from '@/utils/formatters'
import { Landmark, Calculator } from 'lucide-react'

export default function FDCalculatorTool() {
  const [principal, setPrincipal] = useState(100000)
  const [rate, setRate] = useState(7.5)
  const [tenure, setTenure] = useState(3)
  const [result, setResult] = useState(null)

  const handleCalculate = () => {
    if (!principal || !rate || !tenure) return
    setResult(calculateFD(principal, rate, tenure))
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <Input label="Deposit Amount (₹)" type="number" value={principal} onChange={(e) => { setPrincipal(Number(e.target.value)); setResult(null) }} />
              <Input label="Interest Rate (% per annum)" type="number" step="0.1" value={rate} onChange={(e) => { setRate(Number(e.target.value)); setResult(null) }} />
              <Input label="Tenure (Years)" type="number" step="0.5" value={tenure} onChange={(e) => { setTenure(Number(e.target.value)); setResult(null) }} />
              <Button onClick={handleCalculate} size="lg" className="w-full"><Calculator className="h-5 w-5 mr-2" /> Calculate FD Maturity</Button>
            </div>
            <div className="space-y-4">
              {result ? (
                <>
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 border border-indigo-100 dark:border-indigo-900/50">
                    <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-1">Maturity Amount</p>
                    <p className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">{formatCurrency(result.maturity)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50">
                      <p className="text-xs text-emerald-600 dark:text-emerald-400">Principal</p>
                      <p className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">{formatCurrency(principal)}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/50">
                      <p className="text-xs text-amber-600 dark:text-amber-400">Interest Earned</p>
                      <p className="text-lg font-semibold text-amber-700 dark:text-amber-300">{formatCurrency(result.interest)}</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50">
                    <p className="text-xs text-blue-600 dark:text-blue-400">Effective Yield</p>
                    <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">{result.effectiveYield}%</p>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500"><div className="text-center"><Landmark className="h-12 w-12 mx-auto mb-2 opacity-50" /><p>Enter deposit details</p></div></div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

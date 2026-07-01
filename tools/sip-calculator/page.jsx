'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
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
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <Input label="Monthly Investment (₹)" type="number" value={monthly} onChange={(e) => { setMonthly(Number(e.target.value)); setResult(null) }} />
              <Input label="Expected Return Rate (% p.a.)" type="number" step="0.1" value={rate} onChange={(e) => { setRate(Number(e.target.value)); setResult(null) }} />
              <Input label="Investment Period (Years)" type="number" value={tenure} onChange={(e) => { setTenure(Number(e.target.value)); setResult(null) }} />
              <Input label="Annual Step-Up (%)" type="number" step="0.5" value={stepUp} onChange={(e) => { setStepUp(Number(e.target.value)); setResult(null) }} placeholder="0 for no step-up" />
              <Button onClick={handleCalculate} size="lg" className="w-full"><Calculator className="h-5 w-5 mr-2" /> Calculate SIP Returns</Button>
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
                      <p className="text-xs text-emerald-600 dark:text-emerald-400">Total Invested</p>
                      <p className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">{formatCurrency(result.totalInvestment)}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/50">
                      <p className="text-xs text-amber-600 dark:text-amber-400">Total Gains</p>
                      <p className="text-lg font-semibold text-amber-700 dark:text-amber-300">{formatCurrency(result.gains)}</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50">
                    <p className="text-xs text-blue-600 dark:text-blue-400">Returns Ratio</p>
                    <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">{((result.gains / result.totalInvestment) * 100).toFixed(1)}%</p>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500"><div className="text-center"><TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-50" /><p>Enter SIP details</p></div></div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

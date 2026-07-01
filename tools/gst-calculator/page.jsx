'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { calculateGST } from '@/utils/calculations'
import { formatCurrency } from '@/utils/formatters'
import { Receipt, Calculator } from 'lucide-react'

const GST_RATES = [0, 5, 12, 18, 28]

export default function GSTCalculatorTool() {
  const [amount, setAmount] = useState(10000)
  const [rate, setRate] = useState(18)
  const [type, setType] = useState('exclusive')
  const [result, setResult] = useState(null)

  const handleCalculate = () => {
    if (!amount || amount <= 0) return
    setResult(calculateGST(amount, rate, type))
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <Input label={type === 'exclusive' ? 'Base Amount (₹)' : 'Total Amount (incl. GST) (₹)'} type="number" value={amount} onChange={(e) => { setAmount(Number(e.target.value)); setResult(null) }} />
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">GST Rate (%)</label>
                <div className="grid grid-cols-5 gap-2">
                  {GST_RATES.map((r) => (
                    <button key={r} onClick={() => { setRate(r); setResult(null) }} className={`py-2 rounded-xl text-sm font-medium transition-all ${rate === r ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>{r}%</button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => { setType('exclusive'); setResult(null) }} className={`py-3 rounded-xl text-sm font-medium transition-all ${type === 'exclusive' ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>Exclusive</button>
                <button onClick={() => { setType('inclusive'); setResult(null) }} className={`py-3 rounded-xl text-sm font-medium transition-all ${type === 'inclusive' ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>Inclusive</button>
              </div>
              <Button onClick={handleCalculate} size="lg" className="w-full"><Calculator className="h-5 w-5 mr-2" /> Calculate GST</Button>
            </div>
            <div className="space-y-4">
              {result ? (
                <>
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 border border-indigo-100 dark:border-indigo-900/50">
                    <p className="text-sm text-indigo-600 dark:text-indigo-400 mb-1">Total Amount</p>
                    <p className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">{formatCurrency(result.total)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50">
                      <p className="text-xs text-emerald-600 dark:text-emerald-400">Base Amount</p>
                      <p className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">{formatCurrency(result.baseAmount)}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/50">
                      <p className="text-xs text-amber-600 dark:text-amber-400">GST Amount</p>
                      <p className="text-lg font-semibold text-amber-700 dark:text-amber-300">{formatCurrency(result.gstAmount)}</p>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50">
                    <p className="text-xs text-blue-600 dark:text-blue-400">GST Rate</p>
                    <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">{rate}%</p>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500"><div className="text-center"><Receipt className="h-12 w-12 mx-auto mb-2 opacity-50" /><p>Enter amount and calculate GST</p></div></div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

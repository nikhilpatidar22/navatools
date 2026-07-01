'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent } from '@/components/ui/Card'
import { CopyButton } from '@/components/ui/CopyButton'
import { calculateCryptoProfit } from '@/utils/calculations'
import { TrendingUp, Calculator } from 'lucide-react'

export default function CryptoProfitCalculatorTool() {
  const [buyPrice, setBuyPrice] = useState(45000)
  const [sellPrice, setSellPrice] = useState(52000)
  const [quantity, setQuantity] = useState(1)
  const [fees, setFees] = useState(50)
  const [result, setResult] = useState(null)

  const handleCalculate = () => {
    if (!buyPrice || !sellPrice || !quantity) return
    setResult(calculateCryptoProfit(buyPrice, sellPrice, quantity, fees))
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <Input label="Buy Price (USD)" type="number" value={buyPrice} onChange={(e) => { setBuyPrice(Number(e.target.value)); setResult(null) }} placeholder="e.g., 45000" />
              <Input label="Sell Price (USD)" type="number" value={sellPrice} onChange={(e) => { setSellPrice(Number(e.target.value)); setResult(null) }} placeholder="e.g., 52000" />
              <Input label="Quantity" type="number" step="0.01" value={quantity} onChange={(e) => { setQuantity(Number(e.target.value)); setResult(null) }} placeholder="e.g., 1.5" />
              <Input label="Total Fees (USD)" type="number" value={fees} onChange={(e) => { setFees(Number(e.target.value)); setResult(null) }} placeholder="e.g., 50" />
              <Button onClick={handleCalculate} size="lg" className="w-full"><Calculator className="h-5 w-5 mr-2" /> Calculate Profit</Button>
            </div>
            <div className="space-y-4">
              {result ? (
                <>
                  <div className={`p-5 rounded-2xl border ${result.profit >= 0 ? 'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-emerald-100 dark:border-emerald-900/50' : 'bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20 border-red-100 dark:border-red-900/50'}`}>
                    <p className={`text-sm mb-1 ${result.profit >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                      {result.profit >= 0 ? 'Total Profit' : 'Total Loss'}
                    </p>
                    <p className={`text-3xl font-bold ${result.profit >= 0 ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300'}`}>
                      ${Math.abs(result.profit).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/50">
                      <p className="text-xs text-blue-600 dark:text-blue-400">ROI</p>
                      <p className={`text-lg font-semibold ${result.roi >= 0 ? 'text-emerald-700' : 'text-red-700'} dark:${result.roi >= 0 ? 'text-emerald-300' : 'text-red-300'}`}>{result.roi}%</p>
                    </div>
                    <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/50">
                      <p className="text-xs text-purple-600 dark:text-purple-400">Break Even</p>
                      <p className="text-lg font-semibold text-purple-700 dark:text-purple-300">${result.breakEven.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/50">
                      <p className="text-xs text-amber-600 dark:text-amber-400">Total Cost</p>
                      <p className="text-lg font-semibold text-amber-700 dark:text-amber-300">${result.totalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50">
                      <p className="text-xs text-emerald-600 dark:text-emerald-400">Total Return</p>
                      <p className="text-lg font-semibold text-emerald-700 dark:text-emerald-300">${result.totalReturn.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 dark:text-gray-500"><div className="text-center"><TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-50" /><p>Enter trade details</p></div></div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

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
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <Input label="Buy Price (USD)" type="number" value={buyPrice} onChange={(e) => { setBuyPrice(Number(e.target.value)); setResult(null) }} placeholder="e.g., 45000" />
              <Input label="Sell Price (USD)" type="number" value={sellPrice} onChange={(e) => { setSellPrice(Number(e.target.value)); setResult(null) }} placeholder="e.g., 52000" />
              <Input label="Quantity" type="number" step="0.01" value={quantity} onChange={(e) => { setQuantity(Number(e.target.value)); setResult(null) }} placeholder="e.g., 1.5" />
              <Input label="Total Fees (USD)" type="number" value={fees} onChange={(e) => { setFees(Number(e.target.value)); setResult(null) }} placeholder="e.g., 50" />
              <Button onClick={handleCalculate} size="lg" className="w-full"><Calculator className="h-4 w-4 mr-2" strokeWidth={1.75} /> Calculate Profit</Button>
            </div>
            <div className="space-y-4">
              {result ? (
                <>
                  <div className={`p-5 rounded-[12px] border ${result.profit >= 0 ? 'border-[#16A34A] dark:border-[#16A34A]/50' : 'border-[#DC2626] dark:border-[#DC2626]/50'} bg-white dark:bg-[#111113]`}>
                    <p className={`text-sm mb-1 ${result.profit >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>
                      {result.profit >= 0 ? 'Total Profit' : 'Total Loss'}
                    </p>
                    <p className={`text-3xl font-semibold ${result.profit >= 0 ? 'text-[#111111] dark:text-white' : 'text-[#111111] dark:text-white'}`}>
                      ${Math.abs(result.profit).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-[10px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)]">
                      <p className="text-xs text-[#6B7280] dark:text-[#A1A1AA]">ROI</p>
                      <p className={`text-lg font-semibold mt-0.5 ${result.roi >= 0 ? 'text-[#16A34A]' : 'text-[#DC2626]'}`}>{result.roi}%</p>
                    </div>
                    <div className="p-4 rounded-[10px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)]">
                      <p className="text-xs text-[#6B7280] dark:text-[#A1A1AA]">Break Even</p>
                      <p className="text-lg font-semibold text-[#111111] dark:text-white mt-0.5">${result.breakEven.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                    </div>
                    <div className="p-4 rounded-[10px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)]">
                      <p className="text-xs text-[#6B7280] dark:text-[#A1A1AA]">Total Cost</p>
                      <p className="text-lg font-semibold text-[#111111] dark:text-white mt-0.5">${result.totalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                    </div>
                    <div className="p-4 rounded-[10px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)]">
                      <p className="text-xs text-[#6B7280] dark:text-[#A1A1AA]">Total Return</p>
                      <p className="text-lg font-semibold text-[#111111] dark:text-white mt-0.5">${result.totalReturn.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full text-[#6B7280] dark:text-[#A1A1AA]"><div className="text-center"><TrendingUp className="h-12 w-12 mx-auto mb-2 opacity-50" strokeWidth={1.75} /><p className="text-sm">Enter trade details</p></div></div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

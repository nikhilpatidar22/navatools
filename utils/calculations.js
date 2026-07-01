export function calculateEMI(principal, rate, tenure) {
  const monthlyRate = rate / 12 / 100
  const months = tenure * 12
  const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1)
  const totalPayment = emi * months
  const totalInterest = totalPayment - principal
  return { emi: Math.round(emi), totalInterest: Math.round(totalInterest), totalPayment: Math.round(totalPayment) }
}

export function calculateGST(amount, rate, type = 'exclusive') {
  if (type === 'exclusive') {
    const gst = amount * rate / 100
    return { baseAmount: amount, gstAmount: gst, total: amount + gst }
  }
  const baseAmount = (amount * 100) / (100 + rate)
  return { baseAmount: Math.round(baseAmount * 100) / 100, gstAmount: Math.round((amount - baseAmount) * 100) / 100, total: amount }
}

export function calculateFD(principal, rate, tenure, compounding = 4) {
  const r = rate / 100 / compounding
  const n = compounding * tenure
  const maturity = principal * Math.pow(1 + r, n)
  const interest = maturity - principal
  return { maturity: Math.round(maturity), interest: Math.round(interest), effectiveYield: ((Math.pow(1 + rate / 100 / compounding, compounding) - 1) * 100).toFixed(2) }
}

export function calculateSIP(monthly, rate, tenure, stepUp = 0) {
  const monthlyRate = rate / 12 / 100
  const months = tenure * 12
  let totalInvestment = 0
  let maturity = 0
  for (let i = 0; i < months; i++) {
    const currentSIP = monthly * Math.pow(1 + stepUp / 100, Math.floor(i / 12))
    totalInvestment += currentSIP
    maturity += currentSIP * Math.pow(1 + monthlyRate, months - i)
  }
  return { totalInvestment: Math.round(totalInvestment), maturity: Math.round(maturity), gains: Math.round(maturity - totalInvestment) }
}

export function calculateSalary(ctc) {
  const basic = ctc * 0.4
  const hra = basic * 0.5
  const da = basic * 0.1
  const pf = Math.min(basic * 0.12, 1800 * 12)
  const professionalTax = 2500
  const standardDeduction = 50000
  const taxableIncome = ctc - pf - professionalTax - standardDeduction
  let incomeTax = 0
  if (taxableIncome > 1500000) incomeTax = (taxableIncome - 1500000) * 0.3 + 150000
  else if (taxableIncome > 1200000) incomeTax = (taxableIncome - 1200000) * 0.2 + 75000
  else if (taxableIncome > 900000) incomeTax = (taxableIncome - 900000) * 0.15 + 30000
  else if (taxableIncome > 600000) incomeTax = (taxableIncome - 600000) * 0.1 + 7500
  else if (taxableIncome > 300000) incomeTax = (taxableIncome - 300000) * 0.05
  const monthlyDeductions = (pf + professionalTax + incomeTax) / 12
  const monthlyTakeHome = (ctc / 12) - monthlyDeductions
  return {
    monthlyTakeHome: Math.round(monthlyTakeHome),
    annualTakeHome: Math.round(monthlyTakeHome * 12),
    basic: Math.round(basic),
    hra: Math.round(hra),
    pf: Math.round(pf),
    professionalTax,
    incomeTax: Math.round(incomeTax),
    totalDeductions: Math.round(pf + professionalTax + incomeTax),
    breakdown: { basic: Math.round(basic), hra: Math.round(hra), da: Math.round(da), pf: Math.round(pf), professionalTax, incomeTax: Math.round(incomeTax) },
  }
}

export function calculateCryptoProfit(buyPrice, sellPrice, quantity, fees) {
  const totalCost = buyPrice * quantity
  const totalReturn = sellPrice * quantity
  const totalFees = fees || 0
  const profit = totalReturn - totalCost - totalFees
  const roi = ((profit / totalCost) * 100)
  const breakEven = (totalCost + totalFees) / quantity
  return { profit: Math.round(profit * 100) / 100, roi: Math.round(roi * 100) / 100, totalCost: Math.round(totalCost * 100) / 100, totalReturn: Math.round(totalReturn * 100) / 100, breakEven: Math.round(breakEven * 100) / 100 }
}

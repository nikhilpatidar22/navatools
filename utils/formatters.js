export function formatCurrency(amount, currency = 'INR') {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatNumber(num) {
  return new Intl.NumberFormat('en-IN').format(num)
}

export function formatPercent(value) {
  return `${value.toFixed(2)}%`
}

export function slugify(text) {
  return text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
}

export function truncate(str, len = 100) {
  if (!str) return ''
  if (str.length <= len) return str
  return str.substring(0, len) + '...'
}

export function generateId() {
  return crypto.randomUUID?.() || Math.random().toString(36).substring(2, 15)
}

import { Card, CardContent } from '@/components/ui/Card'
import { cn } from '@/utils/cn'

export function FAQ({ items, className }) {
  if (!items?.length) return null
  return (
    <div className={cn('space-y-4', className)}>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
      <div className="space-y-3">
        {items.map((faq, i) => (
          <Card key={i} className="overflow-hidden">
            <details className="group">
              <summary className="p-5 cursor-pointer list-none flex items-center justify-between">
                <h3 className="font-medium text-gray-900 dark:text-white pr-4">{faq.q}</h3>
                <div className="shrink-0 text-gray-400 group-open:rotate-180 transition-transform duration-200">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </summary>
              <CardContent className="pt-0 pb-5">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
              </CardContent>
            </details>
          </Card>
        ))}
      </div>
    </div>
  )
}

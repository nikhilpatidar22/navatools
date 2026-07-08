import { cn } from '@/utils/cn'

export function FAQ({ items, className }) {
  if (!items?.length) return null
  return (
    <div className={cn('', className)}>
      <h2 className="text-2xl font-semibold text-[#111111] dark:text-white mb-6 tracking-tight">Frequently Asked Questions</h2>
      <div className="divide-y divide-[#E5E7EB] dark:divide-[rgba(255,255,255,0.08)] border-t border-b border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)]">
        {items.map((faq, i) => (
          <details key={i} className="group">
            <summary className="py-4 cursor-pointer list-none flex items-center justify-between">
              <h3 className="font-medium text-[#111111] dark:text-white pr-4 text-sm">{faq.q}</h3>
              <div className="shrink-0 text-[#6B7280] dark:text-[#A1A1AA] group-open:rotate-180 transition-transform duration-200">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </summary>
            <div className="pb-4">
              <p className="text-sm text-[#6B7280] dark:text-[#A1A1AA] leading-relaxed max-w-2xl">{faq.a}</p>
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}

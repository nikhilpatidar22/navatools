import * as React from 'react'
import { cn } from '@/utils/cn'

const Input = React.forwardRef(({ className, type = 'text', label, error, icon: Icon, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-[#111111] dark:text-white mb-1.5">{label}</label>}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B7280] dark:text-[#A1A1AA]">
            <Icon className="h-4 w-4" strokeWidth={1.75} />
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-11 w-full rounded-[10px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-transparent px-4 py-2 text-sm text-[#111111] dark:text-white placeholder:text-[#6B7280] dark:placeholder:text-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#111111] dark:focus:ring-white focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
            Icon && 'pl-10',
            error && 'border-[#DC2626] focus:ring-[#DC2626]',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-[#DC2626]">{error}</p>}
    </div>
  )
})
Input.displayName = 'Input'

export { Input }

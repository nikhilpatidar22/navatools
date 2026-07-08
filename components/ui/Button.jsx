import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/utils/cn'

const Button = React.forwardRef(({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button'
  const variants = {
    default: 'bg-[#111111] text-white hover:bg-[#2A2A2A] dark:bg-white dark:text-[#111111] dark:hover:bg-[#E5E7EB]',
    destructive: 'bg-[#DC2626] text-white hover:bg-[#B91C1C]',
    outline: 'border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-transparent hover:bg-[#F3F4F6] dark:hover:bg-[rgba(255,255,255,0.04)] text-[#111111] dark:text-white',
    secondary: 'bg-[#F3F4F6] dark:bg-[rgba(255,255,255,0.06)] text-[#111111] dark:text-white hover:bg-[#E5E7EB] dark:hover:bg-[rgba(255,255,255,0.1)]',
    ghost: 'hover:bg-[#F3F4F6] dark:hover:bg-[rgba(255,255,255,0.04)] text-[#6B7280] dark:text-[#A1A1AA]',
    link: 'text-[#6B7280] dark:text-[#A1A1AA] underline-offset-4 hover:underline',
  }
  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-[10px] px-3 text-sm',
    lg: 'h-12 rounded-[10px] px-8 text-base',
    xl: 'h-14 rounded-[10px] px-10 text-lg',
    icon: 'h-10 w-10',
  }
  return (
    <Comp
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-[10px] text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] dark:focus-visible:ring-white focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#111113] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = 'Button'

export { Button }

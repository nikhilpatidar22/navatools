import * as React from 'react'
import { cn } from '@/utils/cn'

const Card = React.forwardRef(({ className, children, hover = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-[12px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-[#111113]',
      hover && 'hover:border-[#D1D5DB] dark:hover:border-[rgba(255,255,255,0.15)] transition-all duration-200',
      className
    )}
    {...props}
  >
    {children}
  </div>
))
Card.displayName = 'Card'

const CardHeader = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn('p-5 pb-0', className)} {...props}>{children}</div>
))
CardHeader.displayName = 'CardHeader'

const CardContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn('p-5', className)} {...props}>{children}</div>
))
CardContent.displayName = 'CardContent'

export { Card, CardHeader, CardContent }

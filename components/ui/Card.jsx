import * as React from 'react'
import { cn } from '@/utils/cn'

const Card = React.forwardRef(({ className, children, hover = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm',
      hover && 'hover:shadow-lg hover:border-gray-200 dark:hover:border-gray-700 hover:-translate-y-0.5 transition-all duration-200',
      className
    )}
    {...props}
  >
    {children}
  </div>
))
Card.displayName = 'Card'

const CardHeader = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pb-0', className)} {...props}>{children}</div>
))
CardHeader.displayName = 'CardHeader'

const CardContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn('p-6', className)} {...props}>{children}</div>
))
CardContent.displayName = 'CardContent'

export { Card, CardHeader, CardContent }

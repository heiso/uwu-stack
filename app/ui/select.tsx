import { forwardRef, type SelectHTMLAttributes } from 'react'

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & { error?: string }

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ error, className, children, ...props }, ref) => {
    return (
      <select
        className={`w-full border pl-4 pr-4 pt-3 pb-3 rounded-lg outline-none ${
          error
            ? 'text-red-500 placeholder:text-red-300 border-red-300 bg-red-100 hover:border-red-500'
            : 'text-fuchsia-500 placeholder:text-fuchsia-500 border-fuchsia-500 hover:text-pink-500 hover:border-pink-500 focus:border-pink-500'
        } ${className ?? ''}`}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    )
  },
)
Select.displayName = 'Select'

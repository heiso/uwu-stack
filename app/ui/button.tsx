import { Link, type LinkProps } from '@remix-run/react'
import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...props }, ref) => {
  return (
    <button
      className={`rounded-full text-center transition-button disabled:pointer-events-none ${
        className ?? ''
      }`}
      ref={ref}
      {...props}
    />
  )
})

Button.displayName = 'Button'

const ButtonPrimary = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <Button
        className={`px-9 py-4 bg-pink-500 text-pink-100 active:bg-pink-700 font-bold text-large disabled:opacity-50 ${
          className ?? ''
        }`}
        ref={ref}
        {...props}
      />
    )
  },
)

ButtonPrimary.displayName = 'Button'

export function LinkPrimary({ className, children, ...props }: LinkProps) {
  return (
    <Link
      className={`block rounded-full text-center transition-button disabled:pointer-events-none px-9 py-4 bg-pink-500 text-pink-100 active:bg-pink-700 font-bold text-large ${
        className ?? ''
      }`}
      {...props}
    >
      {children}
    </Link>
  )
}

const ButtonSecondary = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <Button
        className={`px-6 py-4 bg-pink-100 text-pink-500 hover:bg-[#EAEBFF] font-bold ${
          className ?? ''
        }`}
        ref={ref}
        {...props}
      />
    )
  },
)

ButtonSecondary.displayName = 'Button'

export { Button, ButtonPrimary, ButtonSecondary }

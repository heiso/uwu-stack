import { Link, type LinkProps } from '@remix-run/react'
import { type ButtonHTMLAttributes } from 'react'

import './button.scss'

export type ButtonProps = (
  | (ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' })
  | (LinkProps & { as: 'link' })
) & { primary?: boolean }

export function ScssButton({ primary, className, children, ...props }: ButtonProps) {
  const buttonClassName = `button ${primary ? 'button-primary' : 'button-secondary'} ${className}`

  if (props.as === 'link') {
    return (
      <Link className={buttonClassName} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button className={buttonClassName} {...props}>
      {children}
    </button>
  )
}

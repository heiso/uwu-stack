import { Link, type LinkProps } from '@remix-run/react'
import { type ButtonHTMLAttributes } from 'react'

import classNames from 'classnames'

import styles from './button.module.scss'

export type ButtonProps = (
  | (ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' })
  | (LinkProps & { as: 'link' })
) & { primary?: boolean }

export function ScssButton({ primary, className, children, ...props }: ButtonProps) {
  const buttonClassName = classNames(styles.button, {
    [styles.buttonPrimary]: primary,
    [styles.buttonSecondary]: !primary,
    className,
  })

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

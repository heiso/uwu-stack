import { Link as RemixLink, type LinkProps } from '@remix-run/react'

type ButtonProps = LinkProps

export function Link({ className, children, ...props }: ButtonProps) {
  return (
    <RemixLink
      className={`font-bold text-large transition hover:scale-105 active:opacity-80 text-pink-500 hover:underline underline-offset-4 ${
        className ?? ''
      }`}
      {...props}
    >
      {children}
    </RemixLink>
  )
}

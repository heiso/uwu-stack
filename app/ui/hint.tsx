import React, { type HTMLAttributes, type ReactNode } from 'react'

const EMPTY_HINT = 'n/a'

export type HintProps = React.PropsWithChildren<
  HTMLAttributes<HTMLElement> & {
    error?: string
    required?: boolean
    hint?: string | ReactNode
  }
>

export function Hint({ className, error, required, hint = EMPTY_HINT }: HintProps) {
  if (error) {
    return <div className={`mt-1 text-small text-red-400 ${className ?? ''}`}>{error}</div>
  }

  if (required) {
    return <div className={`mt-1 text-small text-fuchsia-500 ${className ?? ''}`}>Requis</div>
  }

  return (
    <div
      className={`mt-1 text-small text-gray-400 ${className ?? ''} ${
        hint === EMPTY_HINT ? 'opacity-0' : ''
      }`}
    >
      {hint}
    </div>
  )
}

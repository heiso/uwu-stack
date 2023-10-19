import { type LabelHTMLAttributes } from 'react'

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement>

export function Label({ className, ...props }: LabelProps) {
  return <label className={`block text-gray-200 mb-2 ${className ?? ''}`} {...props} />
}

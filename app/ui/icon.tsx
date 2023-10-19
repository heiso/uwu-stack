import type { SVGProps } from 'react'
import type { IconsSvg } from '../../svgs.ts'

export type IconProps = SVGProps<SVGSVGElement> & { id: IconsSvg }

export function Icon({ id, ...props }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <use href={`/icons.svg#${id}`} />
    </svg>
  )
}

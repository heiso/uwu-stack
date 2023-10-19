import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string
  icon?: ReactNode
}

const defaultStyles =
  'text-pink-500 placeholder:text-pink-300 hover:border-pink-500 focus:border-pink-500'
const errorStyles =
  'text-red-500 placeholder:text-red-300 border-red-500 bg-red-100 hover:border-red-500'

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, icon, ...props }, ref) => {
    const innerRef = useRef<HTMLInputElement>(null)
    useImperativeHandle(ref, () => innerRef.current!, [])

    const [isFilled, setIsFilled] = useState(Boolean(props.defaultValue))

    useEffect(() => {
      setIsFilled(Boolean(innerRef?.current?.value))
    }, [innerRef?.current?.value])

    return (
      <div
        className={`flex flex-row items-center w-full border rounded-lg overflow-hidden ${
          error ? errorStyles : defaultStyles
        } ${isFilled ? 'bg-pink-100' : 'bg-white'} ${className ?? ''}`}
      >
        <input
          className={`w-full h-full px-4 py-3 appearance-none outline-none disabled:pointer-events-none bg-transparent`}
          ref={innerRef}
          {...props}
        />
        {icon && <div className="px-4 select-none">{icon}</div>}
      </div>
    )
  },
)
Input.displayName = 'Input'

export const Checkbox = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, ...props }, ref) => {
    return (
      <input
        className={`border pl-4 pr-4 pt-3 pb-3 rounded-lg outline-none border-fuchsia-500 hover:border-pink-500 focus:border-pink-500 ${
          className ?? ''
        }`}
        ref={ref}
        {...props}
        type="checkbox"
      />
    )
  },
)
Checkbox.displayName = 'Checkbox'

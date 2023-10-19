import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type InputHTMLAttributes,
} from 'react'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & { error?: string }

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, ...props }, ref) => {
    const innerRef = useRef<HTMLInputElement>(null)
    useImperativeHandle(ref, () => innerRef.current!, [])

    const [isFilled, setIsFilled] = useState(Boolean(props.defaultValue))

    useEffect(() => {
      setIsFilled(Boolean(innerRef?.current?.value))
    }, [innerRef?.current?.value])

    return (
      <input
        className={`w-full border px-4 py-3 rounded-lg outline-none ${
          error
            ? 'text-red-500 placeholder:text-red-300 border-red-500 bg-red-100 hover:border-red-500'
            : 'text-pink-500 placeholder:text-pink-300 hover:border-pink-500 focus:border-pink-500'
        } disabled:pointer-events-none ${isFilled ? 'bg-pink-100' : ''} ${className ?? ''}`}
        ref={innerRef}
        {...props}
      />
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

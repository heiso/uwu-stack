import { conform, type FieldConfig } from '@conform-to/react'
import {
  forwardRef,
  useState,
  type HTMLInputTypeAttribute,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react'
import { Hint, type HintProps } from '../ui/hint.tsx'
import { Icon } from '../ui/icon.tsx'
import { Input } from '../ui/input.tsx'
import { Label } from '../ui/label.tsx'

export type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  field: FieldConfig<unknown>
  type?: HTMLInputTypeAttribute
  icon?: ReactNode
  hint?: HintProps['hint']
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ label, field, type, hint, ...props }, ref) => {
    return (
      <div>
        <Label>{label}</Label>
        <Input ref={ref} error={field.error} {...conform.input(field, { type })} {...props} />
        <Hint error={field.error} hint={hint} />
      </div>
    )
  },
)
Field.displayName = 'Field'

export const PasswordField = forwardRef<HTMLInputElement, FieldProps>(
  ({ label, field, type, icon, hint, ...props }, ref) => {
    const [show, setShow] = useState(false)

    return (
      <>
        <Label>{label}</Label>
        <div className="relative">
          <Input
            ref={ref}
            autoComplete="current-password"
            error={field.error}
            {...conform.input(field, { type: show ? 'text' : 'password' })}
            {...props}
            icon={
              show ? (
                <Icon
                  onClick={() => setShow(!show)}
                  id="eye-open"
                  className="self-center fill-pink-500 cursor-pointer"
                />
              ) : (
                <Icon
                  onClick={() => setShow(!show)}
                  id="eye-closed"
                  className="self-center fill-pink-500 cursor-pointer"
                />
              )
            }
          />
        </div>
        <Hint error={field.error} />
      </>
    )
  },
)
PasswordField.displayName = 'Field'

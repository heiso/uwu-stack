import React from 'react'

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => {
    return <label className={`block text-gray-500 mb-2 ${className ?? ''}`} ref={ref} {...props} />
  },
)

Label.displayName = 'Label'

export { Label }

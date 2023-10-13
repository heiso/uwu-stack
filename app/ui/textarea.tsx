import React from 'react'

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string }
>(({ error, className, value, ...props }, ref) => {
  return (
    <textarea
      className={`w-full pl-4 pr-4 pt-3 pb-3 rounded-lg outline-none resize-none ${
        error
          ? 'bg-red-100 text-red-500 placeholder:text-red-300 hover:border-red-500'
          : 'bg-pink-100 text-fuchsia-500 placeholder:text-fuchsia-500  hover:text-pink-500 hover:border-pink-500 focus:border-pink-500'
      } ${className ?? ''}`}
      ref={ref}
      {...props}
    >
      {value}
    </textarea>
  )
})

Textarea.displayName = 'Textarea'

export { Textarea }

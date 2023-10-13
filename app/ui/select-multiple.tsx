import React, { useEffect, useRef, useState, type SelectHTMLAttributes } from 'react'
import ReactSelect from 'react-select'
import { Select } from './select.tsx'

const SelectMultiple = React.forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement> & {
    error?: string
    options: { value: string | number; label: string }[]
  }
>(({ error, className, options, ...props }, ref) => {
  // Show native select if mobile touch device
  // Show native select if mobile touch device
  // Show native select if mobile touch device
  // Show native select if mobile touch device
  // Show native select if mobile touch device
  // Show native select if mobile touch device
  const selectRef = useRef<HTMLSelectElement>(null)
  const [defaultValue, setDefaultValue] = useState<typeof options | null>(null)

  useEffect(() => {
    if (selectRef.current) {
      setDefaultValue(
        Array.from(selectRef.current.selectedOptions).map(({ value, text }) => ({
          value,
          label: text,
        })),
      )
    }
  }, [selectRef])

  return (
    <>
      <noscript>
        <Select className={className ?? ''} multiple ref={ref} {...props}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </noscript>

      <Select className={`hidden select-${props.name}`} multiple ref={selectRef} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
      {selectRef.current && (
        <ReactSelect
          unstyled
          className={className ?? 'text-body-medium'}
          classNames={{
            container: () => '',
            control: () =>
              `border px-4 py-3 rounded-lg ${
                error
                  ? 'text-red-500 border-red-300 bg-red-100 hover:border-red-500'
                  : 'border-fuchsia-500 hover:border-pink-500'
              } disabled:pointer-events-none`,
            valueContainer: () => 'flex flex-rows flex-wrap gap-2 cursor-pointer',
            multiValue: () => 'bg-pink-100 text-pink-500 rounded-lg px-2 py-1',
            multiValueLabel: () => 'font-bold text-ellipsis',
            multiValueRemove: () => 'ml-2 text-fuchsia-500 hover:text-pink-500',
            clearIndicator: () => 'cursor-pointer text-fuchsia-500 hover:text-pink-500',
            dropdownIndicator: () => 'cursor-pointer text-fuchsia-500 hover:text-pink-500',
            placeholder: () => (error ? 'text-red-300' : 'text-fuchsia-500'),
            menu: () =>
              'my-2 border border-fuchsia-500 bg-white rounded-lg shadow-light-blue overflow-hidden cursor-pointer',
            option: () =>
              'w-full px-4 py-2 text-fuchsia-500 hover:bg-pink-100 hover:text-pink-500 cursor-pointer',
          }}
          placeholder={props.placeholder}
          isMulti
          noOptionsMessage={() => (
            <span className="w-full px-4 py-2 text-fuchsia-500">Aucun résultat</span>
          )}
          options={options.map(({ value, label }) => ({ value: value.toString(), label }))}
          defaultValue={defaultValue}
          onChange={(options) => {
            const values = options.map(({ value }) => value.toString())
            ;(
              Array.from(
                document.querySelectorAll(`.select-${props.name} option`),
              ) as HTMLOptionElement[]
            ).forEach((option) => {
              option.selected = values.includes(option.value)
            })
          }}
        />
      )}
    </>
  )
})

SelectMultiple.displayName = 'SelectMultiple'

export { SelectMultiple }

import type { ComponentPropsWithoutRef } from 'react'

type SelectProps = ComponentPropsWithoutRef<'select'> & {
  label: string
  options:
    | readonly (readonly [string, string])[]
    | readonly (readonly [string, (readonly [string, string])[]])[]
}

export function Select({ label, options, ...props }: SelectProps) {
  return (
    <label>
      {label}
      <select {...props}>
        {options.map(([optionLabel, optionValue], index) =>
          typeof optionValue === 'string' ? (
            <option key={index} value={optionValue}>
              {optionLabel}
            </option>
          ) : (
            <optgroup key={index} label={optionLabel}>
              {optionValue.map(([nestedLabel, nestedValue], nestedIndex) => (
                <option key={nestedIndex} value={nestedValue}>
                  {nestedLabel}
                </option>
              ))}
            </optgroup>
          ),
        )}
      </select>
    </label>
  )
}

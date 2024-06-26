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
        {options.map(([optionLabel, optionValue]) =>
          typeof optionValue === 'string' ? (
            <option key={optionValue} value={optionValue}>
              {optionLabel}
            </option>
          ) : (
            <optgroup key={optionLabel} label={optionLabel}>
              {optionValue.map(([nestedLabel, nestedValue]) => (
                <option key={nestedValue} value={nestedValue}>
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

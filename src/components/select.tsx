import type { ComponentPropsWithoutRef } from 'react'

type SelectProps = ComponentPropsWithoutRef<'select'> & {
  label: string
  options: readonly (readonly [string, string])[]
}

export function Select({ label, options, ...props }: SelectProps) {
  return (
    <label>
      {label}
      <select {...props}>
        {options.map(([label, value]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </label>
  )
}

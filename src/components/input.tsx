import type { ComponentPropsWithoutRef } from 'react'

type InputProps = ComponentPropsWithoutRef<'input'> & {
  label: string
}

export function Input({ label, ...props }: InputProps) {
  return (
    <label>
      {label}
      <input {...props} />
    </label>
  )
}

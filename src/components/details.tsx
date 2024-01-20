import type { ComponentPropsWithoutRef } from 'react'

type DetailsProps = ComponentPropsWithoutRef<'details'> & {
  summary: string
}

export function Details({ summary, children, ...props }: DetailsProps) {
  return (
    <details {...props}>
      <summary>{summary}</summary>
      {children}
    </details>
  )
}

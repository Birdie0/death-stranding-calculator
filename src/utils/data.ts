import type { Structure } from './materials-math'
import { structures } from './structures'

export const presetOptions = structures.map(
  ({ name, items }) =>
    [
      name,
      items.map(({ name: nestedName }) => [nestedName, nestedName] as const),
    ] as const,
)

export const availablePresets = new Map<Structure['name'], Structure>()
for (const { items } of structures) {
  for (const item of items) {
    availablePresets.set(item.name, item)
  }
}

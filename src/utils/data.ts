import type { Structure } from './materials-math'
import { structuresDS1, structuresDS2 } from './structures'

export const presetOptionsDS1 = structuresDS1.map(
  ({ name, items }) =>
    [
      name,
      items.map(({ name: nestedName }) => [nestedName, nestedName] as const),
    ] as const,
)

export const presetOptionsDS2 = structuresDS2.map(
  ({ name, items }) =>
    [
      name,
      items.map(({ name: nestedName }) => [nestedName, nestedName] as const),
    ] as const,
)

export const availablePresetsDS1 = new Map<Structure['name'], Structure>()
for (const { items } of structuresDS1) {
  for (const item of items) {
    availablePresetsDS1.set(item.name, item)
  }
}

export const availablePresetsDS2 = new Map<Structure['name'], Structure>()
for (const { items } of structuresDS2) {
  for (const item of items) {
    availablePresetsDS2.set(item.name, item)
  }
}

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { RequirementItem } from '../types'

interface MemoryState {
  memory: RequirementItem[]
  addItem: (value: RequirementItem) => void
  removeItem: (id: RequirementItem['id']) => void
  clearMemory: () => void
}

export const useMemoryStore = create<MemoryState>()(
  devtools(
    persist(
      (set) => ({
        memory: [],
        clearMemory: () => set(() => ({ memory: [] })),
        addItem: (value) =>
          set((state) => ({ memory: [...state.memory, value] })),
        removeItem: (id) =>
          set((state) => ({
            memory: state.memory.filter((value) => value.id !== id),
          })),
      }),
      {
        name: 'memoryStore',
        version: 1,
        migrate(persistedState, version) {
          const state = persistedState as MemoryState

          switch (version) {
            case 0: {
              // @ts-expect-error forcing previous type for migration base
              const memory = state.memory as [
                RequirementItem['material'],
                RequirementItem['total'],
                RequirementItem['resources'],
                RequirementItem['note'],
              ][]
              // @ts-expect-error overwriting memory value
              persistedState.memory = memory.map(
                ([material, total, resources, note]) => ({
                  id: crypto.randomUUID(),
                  material,
                  total,
                  resources,
                  note,
                }),
              )

              return state
            }
          }
        },
      },
    ),
    { name: 'memoryStore' },
  ),
)

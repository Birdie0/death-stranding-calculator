import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { RequirementItem } from '../types'

interface MemoryState {
  memory: RequirementItem[]
  addItem: (value: RequirementItem) => void
  removeItem: (id: RequirementItem['id']) => void
  clearMemory: () => void
}

export const useMemory2Store = create<MemoryState>()(
  devtools(
    persist(
      (set) => ({
        memory: [],
        clearMemory() {
          set(() => ({ memory: [] }))
        },
        addItem(value) {
          set((state) => ({ memory: [...state.memory, value] }))
        },
        removeItem(id) {
          set((state) => ({
            memory: state.memory.filter((value) => value.id !== id),
          }))
        },
      }),
      {
        name: 'memory2Store',
      },
    ),
    { name: 'memory2Store' },
  ),
)

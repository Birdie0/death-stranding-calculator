import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { RequirementItem } from '../types'

interface MemoryState {
  memory: RequirementItem[]
  addItem: (value: RequirementItem) => void
  removeItem: (index: number) => void
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
        removeItem: (index) =>
          set((state) => ({
            memory: state.memory.filter((_v, itemIndex) => itemIndex !== index),
          })),
      }),
      { name: 'memoryStore' },
    ),
    { name: 'memoryStore' },
  ),
)

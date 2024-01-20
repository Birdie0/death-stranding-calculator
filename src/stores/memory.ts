import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface MemoryState {
  memory: [string, number, [number, number][]][]
  setMemory: (value: [string, number, [number, number][]][]) => void
}

export const useMemoryStore = create<MemoryState>()(
  devtools(
    persist(
      (set) => ({
        memory: [],
        setMemory: (value) => set(() => ({ memory: value })),
      }),
      { name: 'memoryStore' },
    ),
  ),
)

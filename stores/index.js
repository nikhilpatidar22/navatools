import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'navahq-theme' }
  )
)

export const useSearchStore = create((set, get) => ({
  query: '',
  results: [],
  isOpen: false,
  setQuery: (query) => set({ query }),
  setResults: (results) => set({ results }),
  setOpen: (isOpen) => set({ isOpen }),
  clear: () => set({ query: '', results: [], isOpen: false }),
}))

export const useToolStore = create(
  persist(
    (set, get) => ({
      recentTools: [],
      savedResults: [],
      addRecent: (tool) => {
        const recent = get().recentTools.filter((t) => t.slug !== tool.slug)
        set({ recentTools: [tool, ...recent].slice(0, 10) })
      },
      addSavedResult: (result) => {
        const saved = get().savedResults
        set({ savedResults: [result, ...saved].slice(0, 50) })
      },
      removeSavedResult: (id) => {
        set({ savedResults: get().savedResults.filter((r) => r.id !== id) })
      },
      clearSaved: () => set({ savedResults: [] }),
    }),
    { name: 'navahq-tools' }
  )
)

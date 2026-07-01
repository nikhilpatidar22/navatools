import { useSearchStore } from '@/stores'
import tools from '@/config/tools'

export function useSearch() {
  const { query, results, isOpen, setQuery, setResults, setOpen, clear } = useSearchStore()

  const search = (q) => {
    setQuery(q)
    if (!q.trim()) {
      setResults([])
      return
    }
    const qLower = q.toLowerCase()
    const filtered = tools.filter((tool) => {
      const searchable = [
        tool.name,
        tool.slug,
        tool.category,
        tool.description,
        ...(tool.keywords || []),
      ].map((s) => s.toLowerCase())
      return searchable.some((s) => s.includes(qLower))
    })
    setResults(filtered)
  }

  return { query, results, isOpen, setOpen, search, clear }
}

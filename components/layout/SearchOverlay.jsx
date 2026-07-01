'use client'
import { useRouter } from 'next/navigation'
import { useSearchStore } from '@/stores'
import { useSearch } from '@/hooks/useSearch'
import { motion, AnimatePresence } from 'framer-motion'
import { Search as SearchIcon, X, ArrowRight } from 'lucide-react'
import { cn } from '@/utils/cn'
import { categoryConfig } from '@/config/site'
import { useEffect, useRef } from 'react'

export function SearchOverlay() {
  const { isOpen, setOpen } = useSearchStore()
  const { query, results, search } = useSearch()
  const router = useRouter()
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setOpen(!isOpen) }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, setOpen])

  const handleSelect = (slug) => {
    setOpen(false)
    router.push(`/${slug}`)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -20 }}
            transition={{ duration: 0.15 }}
            className="absolute top-[15%] left-1/2 -translate-x-1/2 w-full max-w-2xl px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="flex items-center gap-3 p-4 border-b border-gray-100 dark:border-gray-800">
                <SearchIcon className="h-5 w-5 text-gray-400 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search 1000+ tools..."
                  value={query}
                  onChange={(e) => search(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder:text-gray-400 text-lg"
                />
                <kbd className="hidden sm:inline-flex items-center px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-xs text-gray-400 font-mono">ESC</kbd>
                <button onClick={() => setOpen(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="max-h-[400px] overflow-y-auto p-2">
                {!query && (
                  <div className="p-4 text-center text-sm text-gray-400">
                    Start typing to search tools across all categories
                  </div>
                )}
                {query && results.length === 0 && (
                  <div className="p-4 text-center text-sm text-gray-400">
                    No tools found for &ldquo;{query}&rdquo;
                  </div>
                )}
                {results.map((tool, i) => {
                  const Icon = tool.icon
                  const cat = categoryConfig[tool.category]
                  return (
                    <button
                      key={tool.slug}
                      onClick={() => handleSelect(tool.slug)}
                      className={cn(
                        'w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors',
                        'hover:bg-gray-50 dark:hover:bg-gray-800 group'
                      )}
                    >
                      <div className={cn('p-2 rounded-xl bg-gradient-to-br text-white shrink-0', cat?.color)}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 dark:text-white text-sm">{tool.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{tool.description}</div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={cn('text-xs px-2 py-0.5 rounded-full text-white', cat?.color)}>{tool.category}</span>
                        <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-indigo-500 transition-colors" />
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

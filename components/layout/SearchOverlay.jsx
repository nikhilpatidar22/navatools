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
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white dark:bg-[#111113] rounded-[12px] shadow-elevated border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)]">
                <SearchIcon className="h-5 w-5 text-[#6B7280] dark:text-[#A1A1AA] shrink-0" strokeWidth={1.75} />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search 1000+ tools..."
                  value={query}
                  onChange={(e) => search(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-[#111111] dark:text-white placeholder:text-[#6B7280] dark:placeholder:text-[#A1A1AA] text-base"
                />
                <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-md border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] text-[11px] text-[#6B7280] dark:text-[#A1A1AA] font-mono">ESC</kbd>
                <button onClick={() => setOpen(false)} className="p-1 rounded-[10px] hover:bg-[#F3F4F6] dark:hover:bg-[rgba(255,255,255,0.04)] text-[#6B7280] dark:text-[#A1A1AA]">
                  <X className="h-5 w-5" strokeWidth={1.75} />
                </button>
              </div>

              <div className="max-h-[400px] overflow-y-auto p-2">
                {!query && (
                  <div className="p-5 text-center text-sm text-[#6B7280] dark:text-[#A1A1AA]">
                    Start typing to search tools across all categories
                  </div>
                )}
                {query && results.length === 0 && (
                  <div className="p-5 text-center text-sm text-[#6B7280] dark:text-[#A1A1AA]">
                    No tools found for &ldquo;{query}&rdquo;
                  </div>
                )}
                {results.map((tool, i) => {
                  const Icon = tool.icon
                  const cat = categoryConfig[tool.category] || {}
                  return (
                    <button
                      key={tool.slug}
                      onClick={() => handleSelect(tool.slug)}
                      className={cn(
                        'w-full flex items-center gap-3 p-3 rounded-[10px] text-left transition-colors',
                        'hover:bg-[#F3F4F6] dark:hover:bg-[rgba(255,255,255,0.04)] group'
                      )}
                    >
                      <div
                        className="p-2 rounded-[10px] shrink-0"
                        style={{ backgroundColor: `${cat.bg || '#F3F4F6'}` }}
                      >
                        <Icon className="h-4 w-4" strokeWidth={1.75} style={{ color: cat.accent || '#6B7280' }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-[#111111] dark:text-white text-sm">{tool.name}</div>
                        <div className="text-xs text-[#6B7280] dark:text-[#A1A1AA] truncate">{tool.description}</div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className="text-[11px] px-2 py-0.5 rounded-md font-medium"
                          style={{ backgroundColor: `${cat.bg || '#F3F4F6'}`, color: cat.accent || '#6B7280' }}
                        >
                          {tool.category}
                        </span>
                        <ArrowRight className="h-4 w-4 text-[#D1D5DB] dark:text-[rgba(255,255,255,0.15)] group-hover:text-[#6B7280] dark:group-hover:text-[#A1A1AA] transition-colors" strokeWidth={1.75} />
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

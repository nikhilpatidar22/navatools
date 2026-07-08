'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSearchStore } from '@/stores'
import { cn } from '@/utils/cn'
import { Search, Sun, Moon, Menu, X } from 'lucide-react'
import { useTheme } from 'next-themes'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/category/finance', label: 'Finance' },
  { href: '/category/ai', label: 'AI' },
  { href: '/category/pdf', label: 'PDF' },
  { href: '/category/developer', label: 'Developer' },
  { href: '/category/crypto', label: 'Crypto' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { setOpen } = useSearchStore()

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-200',
        scrolled
          ? 'bg-white/80 dark:bg-[#09090B]/80 backdrop-blur-xl border-b border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)]'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-8 h-full flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <img src="/logo.svg" alt="NavaTools" className="h-8 w-8" />
          <span className="text-base font-semibold text-[#111111] dark:text-white">
            Nava<span className="text-[#6B7280]">Tools</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'px-3 py-1.5 rounded-[10px] text-sm font-medium transition-colors duration-150',
                pathname === link.href
                  ? 'text-[#111111] dark:text-white bg-[#F3F4F6] dark:bg-[rgba(255,255,255,0.06)]'
                  : 'text-[#6B7280] dark:text-[#A1A1AA] hover:text-[#111111] dark:hover:text-white hover:bg-[#F3F4F6] dark:hover:bg-[rgba(255,255,255,0.04)]'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded-[10px] text-[#6B7280] dark:text-[#A1A1AA] hover:bg-[#F3F4F6] dark:hover:bg-[rgba(255,255,255,0.04)] transition-colors duration-150"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-[10px] text-[#6B7280] dark:text-[#A1A1AA] hover:bg-[#F3F4F6] dark:hover:bg-[rgba(255,255,255,0.04)] transition-colors duration-150"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-[10px] text-[#6B7280] dark:text-[#A1A1AA] hover:bg-[#F3F4F6] dark:hover:bg-[rgba(255,255,255,0.04)] transition-colors duration-150"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-[#111113]">
          <div className="px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'block px-3 py-2 rounded-[10px] text-sm font-medium transition-colors duration-150',
                  pathname === link.href
                    ? 'text-[#111111] dark:text-white bg-[#F3F4F6] dark:bg-[rgba(255,255,255,0.06)]'
                    : 'text-[#6B7280] dark:text-[#A1A1AA] hover:bg-[#F3F4F6] dark:hover:bg-[rgba(255,255,255,0.04)]'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

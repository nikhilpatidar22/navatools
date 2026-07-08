'use client'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ToolCard } from '@/components/ui/ToolCard'
import { CategoryCard } from '@/components/ui/CategoryCard'
import { FAQ } from '@/components/ui/FAQ'
import { useSearchStore } from '@/stores'
import { categoryConfig } from '@/config/site'
import tools from '@/config/tools'
import { Search, ArrowRight, Zap, Shield, Layers, Gauge } from 'lucide-react'
import toast from 'react-hot-toast'

const categories = Object.entries(categoryConfig).map(([name, config]) => ({ name, count: tools.filter(t => t.category === name).length }))
const popularTools = tools.slice(0, 8)
const financeTools = tools.filter(t => t.category === 'Finance').slice(0, 3)
const aiTools = tools.filter(t => t.category === 'AI').slice(0, 3)
const pdfTools = tools.filter(t => t.category === 'PDF').slice(0, 3)

function shuffleArray(arr) {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function SectionHeader({ title, subtitle, href }) {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold text-[#111111] dark:text-white tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-[#6B7280] dark:text-[#A1A1AA] mt-1">{subtitle}</p>}
      </div>
      {href && (
        <Link href={href} className="hidden sm:flex items-center gap-1 text-sm font-medium text-[#6B7280] dark:text-[#A1A1AA] hover:text-[#111111] dark:hover:text-white transition-colors">
          View all <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
        </Link>
      )}
    </div>
  )
}

export default function HomePage() {
  const { setOpen } = useSearchStore()
  const [trendingTools, setTrendingTools] = useState([])

  useEffect(() => {
    setTrendingTools(shuffleArray(tools).slice(0, 4))
  }, [])

  const faqItems = [
    { q: 'Are all tools completely free?', a: 'Yes, every tool on NavaTools is 100% free to use. No hidden charges, no premium tiers, no credit card required. We believe powerful tools should be accessible to everyone.' },
    { q: 'How do you protect my privacy?', a: 'Privacy is built into our platform. Most tools process data directly in your browser — files never leave your device. We do not store, sell, or share your data with third parties.' },
    { q: 'How often do you add new tools?', a: 'We add new tools every week. Our team continuously builds and improves tools based on user feedback and emerging needs. Follow us on X to stay updated.' },
    { q: 'Do I need to create an account?', a: 'No account or sign-up is required. All tools are accessible instantly without any registration. Just visit the tool you need and start using it.' },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-28 pb-20 md:pt-32 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] text-xs font-medium text-[#6B7280] dark:text-[#A1A1AA] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#111111] dark:bg-white" />
              1000+ Free Online Tools
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-[#111111] dark:text-white leading-[1.05] tracking-tight mb-5">
              Your All-in-One<br />
              <span className="text-[#6B7280] dark:text-[#A1A1AA]">Productivity Platform</span>
            </h1>
            <p className="text-base md:text-lg text-[#6B7280] dark:text-[#A1A1AA] max-w-xl mx-auto mb-8 leading-relaxed">
              Free online tools for finance, AI, PDF, development, and more. Fast, private, and built for real work.
            </p>
            <button onClick={() => setOpen(true)} className="w-full max-w-lg mx-auto group relative">
              <div className="flex items-center gap-3 p-3.5 rounded-[12px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-[#111113] hover:border-[#D1D5DB] dark:hover:border-[rgba(255,255,255,0.15)] hover:-translate-y-0.5 transition-all duration-200 shadow-card">
                <Search className="h-4 w-4 text-[#6B7280] dark:text-[#A1A1AA] shrink-0" strokeWidth={1.75} />
                <span className="flex-1 text-left text-sm text-[#6B7280] dark:text-[#A1A1AA]">Search 1000+ tools...</span>
                <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-md border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] text-[11px] text-[#6B7280] dark:text-[#A1A1AA] font-mono">&#8984;K</kbd>
              </div>
            </button>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-[#6B7280] dark:text-[#A1A1AA]">
              <span className="flex items-center gap-1.5"><Zap className="h-3.5 w-3.5" strokeWidth={1.75} /> Free to use</span>
              <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" strokeWidth={1.75} /> Private & secure</span>
              <span className="flex items-center gap-1.5"><Gauge className="h-3.5 w-3.5" strokeWidth={1.75} /> Lightning fast</span>
              <span className="flex items-center gap-1.5"><Layers className="h-3.5 w-3.5" strokeWidth={1.75} /> 1000+ tools</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-t border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-20">
          <SectionHeader title="Browse by Category" subtitle="Find the right tool for any task" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {categories.map((cat, i) => (
              <FadeIn key={cat.name} delay={i * 0.025}>
                <CategoryCard category={cat.name} count={cat.count} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tools */}
      <section className="border-t border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-20">
          <SectionHeader title="Popular Tools" subtitle="Most used tools by our community" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {popularTools.map((tool, i) => (
              <FadeIn key={tool.slug} delay={i * 0.03}>
                <ToolCard tool={{ ...tool, isPopular: true }} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Finance Tools */}
      <section className="border-t border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-20">
          <SectionHeader title="Finance Tools" subtitle="Calculate loans, investments, and more" href="/category/finance" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {financeTools.map((tool, i) => (
              <FadeIn key={tool.slug} delay={i * 0.04}>
                <ToolCard tool={tool} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Featured AI Tools */}
      <section className="border-t border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-20">
          <SectionHeader title="AI Tools" subtitle="Powered by cutting-edge artificial intelligence" href="/category/ai" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {aiTools.map((tool, i) => (
              <FadeIn key={tool.slug} delay={i * 0.04}>
                <ToolCard tool={tool} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Featured PDF Tools */}
      <section className="border-t border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-20">
          <SectionHeader title="PDF Tools" subtitle="Convert, merge, compress, and edit PDFs" href="/category/pdf" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {pdfTools.map((tool, i) => (
              <FadeIn key={tool.slug} delay={i * 0.04}>
                <ToolCard tool={tool} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Tools */}
      {trendingTools.length > 0 && (
        <section className="border-t border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)]">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-20">
            <SectionHeader title="Trending Now" subtitle="What others are using" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {trendingTools.map((tool, i) => (
                <FadeIn key={tool.slug} delay={i * 0.03}>
                  <ToolCard tool={tool} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stats */}
      <section className="border-t border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Zap, label: 'Lightning Fast', desc: 'All tools work instantly in your browser' },
              { icon: Shield, label: '100% Private', desc: 'Your data never leaves your device' },
              { icon: Layers, label: '1000+ Tools', desc: 'Growing every week with new additions' },
              { icon: Gauge, label: 'AI Powered', desc: 'Smart tools that do the heavy lifting' },
            ].map((item) => (
              <FadeIn key={item.label}>
                <div className="text-center">
                  <div className="inline-flex p-3 rounded-[10px] bg-[#F3F4F6] dark:bg-[rgba(255,255,255,0.04)] text-[#6B7280] dark:text-[#A1A1AA] mb-3">
                    <item.icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-sm font-semibold text-[#111111] dark:text-white">{item.label}</h3>
                  <p className="text-xs text-[#6B7280] dark:text-[#A1A1AA] mt-1">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)]">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 py-16 md:py-20">
          <FAQ items={faqItems} />
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-20">
          <div className="rounded-[12px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-[#111113] p-10 md:p-16 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#111111] dark:text-white mb-2 tracking-tight">Stay Updated</h2>
            <p className="text-sm text-[#6B7280] dark:text-[#A1A1AA] mb-8">Get notified when we add new tools and features.</p>
            <form
              onSubmit={(e) => { e.preventDefault(); toast.success('Thanks for subscribing!'); e.target.reset() }}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-11 px-4 rounded-[10px] border border-[#E5E7EB] dark:border-[rgba(255,255,255,0.08)] bg-white dark:bg-transparent text-sm text-[#111111] dark:text-white placeholder:text-[#6B7280] dark:placeholder:text-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#111111] dark:focus:ring-white focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="h-11 px-6 rounded-[10px] bg-[#111111] dark:bg-white text-white dark:text-[#111111] text-sm font-medium hover:bg-[#2A2A2A] dark:hover:bg-[#E5E7EB] transition-colors duration-150 shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

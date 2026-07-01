'use client'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { ToolCard } from '@/components/ui/ToolCard'
import { CategoryCard } from '@/components/ui/CategoryCard'
import { useSearchStore } from '@/stores'
import { categoryConfig } from '@/config/site'
import tools from '@/config/tools'
import { Search, Sparkles, ArrowRight, Zap, Shield, Layers, Gauge } from 'lucide-react'
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

function Section({ children, className, ...props }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <motion.section ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className={className} {...props}>
      {children}
    </motion.section>
  )
}

function SectionHeader({ title, subtitle, href }) {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">{title}</h2>
        {subtitle && <p className="text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
      </div>
      {href && (
        <Link href={href} className="hidden sm:flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors">
          View All <ArrowRight className="h-4 w-4" />
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

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/50 via-white to-white dark:from-gray-900 dark:via-gray-950 dark:to-gray-950">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] dark:opacity-[0.05]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" /> 1000+ Free Online Tools
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
              Your All-in-One<br />
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Productivity Platform</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Free online tools for finance, AI, PDF, development, and more. Fast, secure, and built for productivity.
            </p>
            <button onClick={() => setOpen(true)} className="w-full max-w-xl mx-auto group relative">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-lg shadow-indigo-500/5 group-hover:shadow-indigo-500/10 group-hover:border-indigo-300 dark:group-hover:border-indigo-700 transition-all duration-200">
                <Search className="h-5 w-5 text-gray-400" />
                <span className="flex-1 text-left text-gray-400">Search 1000+ tools...</span>
                <kbd className="hidden sm:inline-flex items-center px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-xs text-gray-400 font-mono">CTRL + K</kbd>
              </div>
            </button>
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-amber-500" /> Free to use</span>
              <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-green-500" /> Secure & private</span>
              <span className="flex items-center gap-1.5"><Gauge className="h-4 w-4 text-blue-500" /> Lightning fast</span>
              <span className="flex items-center gap-1.5"><Layers className="h-4 w-4 text-purple-500" /> 1000+ tools</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <Section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Browse by Category" subtitle="Find the right tool for any task" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {categories.map((cat) => <CategoryCard key={cat.name} category={cat.name} count={cat.count} />)}
          </div>
        </div>
      </Section>

      {/* Popular Tools */}
      <Section className="py-16 md:py-20 bg-gray-50/50 dark:bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Popular Tools" subtitle="Most used tools by our community" href="/popular" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {popularTools.map((tool, i) => (
              <motion.div key={tool.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <ToolCard tool={tool} />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Featured Finance Tools */}
      <Section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="Finance Tools" subtitle="Calculate loans, investments, and more" href="/category/finance" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {financeTools.map((tool, i) => (
              <motion.div key={tool.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.1 }}>
                <ToolCard tool={tool} />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Featured AI Tools */}
      <Section className="py-16 md:py-20 bg-gradient-to-br from-violet-50/50 to-purple-50/50 dark:from-violet-950/10 dark:to-purple-950/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="AI Tools" subtitle="Powered by cutting-edge artificial intelligence" href="/category/ai" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiTools.map((tool, i) => (
              <motion.div key={tool.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.1 }}>
                <ToolCard tool={tool} />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Featured PDF Tools */}
      <Section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader title="PDF Tools" subtitle="Convert, merge, compress, and edit PDFs" href="/category/pdf" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pdfTools.map((tool, i) => (
              <motion.div key={tool.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.1 }}>
                <ToolCard tool={tool} />
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Trending Tools */}
      {trendingTools.length > 0 && (
        <Section className="py-16 md:py-20 bg-gray-50/50 dark:bg-gray-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader title="Trending Now" subtitle="What others are using" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {trendingTools.map((tool, i) => (
                <motion.div key={tool.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                  <ToolCard tool={tool} />
                </motion.div>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* Newsletter */}
      <Section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 md:p-12 text-center">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
            <div className="relative z-10 max-w-lg mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Stay Updated</h2>
              <p className="text-indigo-200 mb-6">Get notified when we add new tools and features.</p>
              <form onSubmit={(e) => { e.preventDefault(); toast.success('Thanks for subscribing!'); e.target.reset() }} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/50" required />
                <Button type="submit" size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50 shadow-xl shrink-0">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Section>

      {/* Trust Bar */}
      <Section className="pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Zap, label: 'Lightning Fast', desc: 'All tools work instantly' },
              { icon: Shield, label: '100% Secure', desc: 'Your data stays private' },
              { icon: Layers, label: '1000+ Tools', desc: 'Growing every week' },
              { icon: Sparkles, label: 'AI Powered', desc: 'Smart & intelligent tools' },
            ].map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.1 }} className="text-center">
                <div className="inline-flex p-3 rounded-2xl bg-indigo-100 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 mb-3">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{item.label}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  )
}

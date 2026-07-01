'use client'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SearchOverlay } from '@/components/layout/SearchOverlay'

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Navbar />
      <main className="min-h-screen pt-16">{children}</main>
      <Footer />
      <SearchOverlay />
      <Toaster position="bottom-right" toastOptions={{
        style: { borderRadius: '12px', background: '#333', color: '#fff', fontSize: '14px' },
        duration: 3000,
      }} />
    </ThemeProvider>
  )
}

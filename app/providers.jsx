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
      <main className="min-h-screen pt-[72px]">{children}</main>
      <Footer />
      <SearchOverlay />
      <Toaster position="bottom-right" toastOptions={{
        style: {
          borderRadius: '10px',
          background: '#111111',
          color: '#FAFAFA',
          fontSize: '14px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
        },
        duration: 3000,
      }} />
    </ThemeProvider>
  )
}

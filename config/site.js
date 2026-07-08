const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://navahq.in'

export const siteConfig = {
  name: 'NavaTools',
  tagline: 'Your All-in-One Productivity Platform',
  description: 'NavaTools offers 1000+ free online tools for finance, AI, PDF, development, crypto and more. Secure, fast, and 100% free.',
  url: baseUrl,
  ogImage: `${baseUrl}/og.png`,
  links: {
    twitter: 'https://twitter.com/navahq',
    github: 'https://github.com/navahq',
  },
  author: 'NavaTools Team',
  locale: 'en_US',
  keywords: 'free online tools, productivity tools, finance calculators, AI tools, PDF tools, developer tools, crypto tools',
}

export const categoryConfig = {
  Finance: { icon: 'Wallet', accent: '#059669', bg: '#ECFDF5', darkBg: '#052E16' },
  AI: { icon: 'Brain', accent: '#6B7280', bg: '#F3F4F6', darkBg: '#1F2937' },
  PDF: { icon: 'FileText', accent: '#DC2626', bg: '#FEF2F2', darkBg: '#450A0A' },
  Developer: { icon: 'Code2', accent: '#2563EB', bg: '#EFF6FF', darkBg: '#172554' },
  Crypto: { icon: 'Bitcoin', accent: '#D97706', bg: '#FFFBEB', darkBg: '#451A03' },
  Health: { icon: 'Heart', accent: '#DB2777', bg: '#FDF2F8', darkBg: '#4C0519' },
  Education: { icon: 'GraduationCap', accent: '#0891B2', bg: '#ECFEFF', darkBg: '#083344' },
  Marketing: { icon: 'Megaphone', accent: '#B45309', bg: '#FFFBEB', darkBg: '#451A03' },
  Business: { icon: 'Building2', accent: '#4B5563', bg: '#F9FAFB', darkBg: '#1F2937' },
  'Real Estate': { icon: 'Home', accent: '#059669', bg: '#ECFDF5', darkBg: '#022C22' },
  Tax: { icon: 'Landmark', accent: '#6B7280', bg: '#F3F4F6', darkBg: '#1F2937' },
  Travel: { icon: 'Plane', accent: '#0284C7', bg: '#F0F9FF', darkBg: '#082F49' },
  Productivity: { icon: 'Zap', accent: '#B45309', bg: '#FFFBEB', darkBg: '#451A03' },
  Image: { icon: 'Image', accent: '#DB2777', bg: '#FDF2F8', darkBg: '#4C0519' },
  Video: { icon: 'Video', accent: '#DC2626', bg: '#FEF2F2', darkBg: '#450A0A' },
  Audio: { icon: 'Music', accent: '#6B7280', bg: '#F3F4F6', darkBg: '#1F2937' },
  Text: { icon: 'Type', accent: '#6B7280', bg: '#F3F4F6', darkBg: '#1F2937' },
  Utilities: { icon: 'Wrench', accent: '#0D9488', bg: '#F0FDFA', darkBg: '#022C22' },
  Converters: { icon: 'ArrowLeftRight', accent: '#2563EB', bg: '#EFF6FF', darkBg: '#172554' },
  Calculators: { icon: 'Calculator', accent: '#6B7280', bg: '#F3F4F6', darkBg: '#1F2937' },
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://navahq.in'

export const siteConfig = {
  name: 'NavaHQ',
  tagline: 'Your All-in-One Productivity Platform',
  description: 'NavaHQ offers 1000+ free online tools for finance, AI, PDF, development, crypto and more. Secure, fast, and 100% free.',
  url: baseUrl,
  ogImage: `${baseUrl}/og.png`,
  links: {
    twitter: 'https://twitter.com/navahq',
    github: 'https://github.com/navahq',
  },
  author: 'NavaHQ Team',
  locale: 'en_US',
  keywords: 'free online tools, productivity tools, finance calculators, AI tools, PDF tools, developer tools, crypto tools',
}

export const categoryConfig = {
  Finance: { icon: 'Wallet', color: 'from-emerald-500 to-teal-600', gradient: 'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20' },
  AI: { icon: 'Brain', color: 'from-violet-500 to-purple-600', gradient: 'bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20' },
  PDF: { icon: 'FileText', color: 'from-red-500 to-rose-600', gradient: 'bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20' },
  Developer: { icon: 'Code2', color: 'from-blue-500 to-indigo-600', gradient: 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20' },
  Crypto: { icon: 'Bitcoin', color: 'from-orange-500 to-amber-600', gradient: 'bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20' },
  Health: { icon: 'Heart', color: 'from-pink-500 to-rose-600', gradient: 'bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/20 dark:to-rose-950/20' },
  Education: { icon: 'GraduationCap', color: 'from-cyan-500 to-sky-600', gradient: 'bg-gradient-to-br from-cyan-50 to-sky-50 dark:from-cyan-950/20 dark:to-sky-950/20' },
  Marketing: { icon: 'Megaphone', color: 'from-yellow-500 to-orange-600', gradient: 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20' },
  Business: { icon: 'Building2', color: 'from-slate-500 to-slate-700', gradient: 'bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-950/20 dark:to-gray-950/20' },
  'Real Estate': { icon: 'Home', color: 'from-green-500 to-emerald-600', gradient: 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20' },
  Tax: { icon: 'Landmark', color: 'from-indigo-500 to-blue-600', gradient: 'bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20' },
  Travel: { icon: 'Plane', color: 'from-sky-500 to-cyan-600', gradient: 'bg-gradient-to-br from-sky-50 to-cyan-50 dark:from-sky-950/20 dark:to-cyan-950/20' },
  Productivity: { icon: 'Zap', color: 'from-amber-500 to-yellow-600', gradient: 'bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20' },
  Image: { icon: 'Image', color: 'from-pink-500 to-fuchsia-600', gradient: 'bg-gradient-to-br from-pink-50 to-fuchsia-50 dark:from-pink-950/20 dark:to-fuchsia-950/20' },
  Video: { icon: 'Video', color: 'from-red-500 to-orange-600', gradient: 'bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20' },
  Audio: { icon: 'Music', color: 'from-violet-500 to-indigo-600', gradient: 'bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-950/20 dark:to-indigo-950/20' },
  Text: { icon: 'Type', color: 'from-gray-500 to-slate-600', gradient: 'bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-950/20 dark:to-slate-950/20' },
  Utilities: { icon: 'Wrench', color: 'from-teal-500 to-cyan-600', gradient: 'bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20' },
  Converters: { icon: 'ArrowLeftRight', color: 'from-blue-500 to-sky-600', gradient: 'bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-950/20 dark:to-sky-950/20' },
  Calculators: { icon: 'Calculator', color: 'from-purple-500 to-pink-600', gradient: 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20' },
}

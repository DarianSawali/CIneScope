import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'CineScope',
  description: 'A Movie Directory App',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-700 text-gray-900 font-sans">
        <Header />
        <main className="max-w-6xl mx-auto px-4">{children}</main>
      </body>
    </html>
  )
}

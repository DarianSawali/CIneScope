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
      <body className="relative overflow-x-hidden text-gray-900 font-sans">
        <div className="fixed top-0 left-0 w-screen h-screen z-[-1] bg-gradient-to-b from-[#181225] to-[#2c1c2e]" />
          <div className="sticky top-0 z-50 bg-slate-800 shadow">
            <Header />
          </div>
        <main className="max-w-6xl mx-auto px-4 relative z-10">{children}</main>
      </body>
    </html>
  )
}

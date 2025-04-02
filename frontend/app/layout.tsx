import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CineScope',
  description: 'A Movie Directory App',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 font-sans">
        <header className="bg-white shadow p-4 mb-6">
          <div className="max-w-6xl mx-auto flex justify-between">
            <h1 className="text-xl font-bold text-blue-600">🎬 CineScope</h1>
            <nav className="space-x-4">
              <a href="/" className="hover:underline">Home</a>
              <a href="/signup" className="hover:underline">Sign Up</a>
              <a href="/login" className="hover:underline">Login</a>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4">{children}</main>
      </body>
    </html>
  )
}

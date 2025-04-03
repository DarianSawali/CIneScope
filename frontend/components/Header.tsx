'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const userId = localStorage.getItem('user_id')
    setIsLoggedIn(!!userId)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user_id')
    setIsLoggedIn(false)
    window.location.href = '/'
  }

  return (
    <header className="bg-white shadow p-4 mb-6">
      <div className="max-w-6xl mx-auto flex justify-between">
        <h1 className="text-xl font-bold text-blue-600">🎬 CineScope</h1>
        <nav className="space-x-4">
          <Link href="/" className="hover:underline text-black">Home</Link>
          {!isLoggedIn ? (
            <>
                <Link href="/signup" className="hover:underline text-black">Sign Up</Link>
                <Link href="/login" className="hover:underline text-black">Login</Link>
                <Link href="/search" className="hover:underline text-black">Search</Link>
            </>
            ) : (
            <>
                <Link href="/watchlist" className="hover:underline text-black">Bookmarks</Link>
                <button onClick={handleLogout} className="hover:underline text-red-600">
                Logout
                </button>
            </>
            )}
        </nav>
      </div>
    </header>
  )
}

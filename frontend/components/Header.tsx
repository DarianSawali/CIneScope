'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AiFillHome, AiOutlineSearch, AiOutlineUser, AiOutlineHeart, AiOutlineLogout } from 'react-icons/ai'
import { MdLogout} from 'react-icons/md'

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
    <header className="bg-zinc-900 p-4 mb-6 py-8 shadow-2xl shadow-indigo-950">
      <div className="max-w-[100rem] mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold text-white">CINESCOPE</h1>

        <nav className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-1 text-white">
            <AiFillHome size={24} /> 
          </Link>

          <Link href="/search" className="flex items-center gap-1 text-white hover:underline">
            <AiOutlineSearch size={24}/> 
          </Link>

          {!isLoggedIn ? (
            <Link href="/signup" className="flex items-center gap-1 text-white hover:underline">
              <AiOutlineUser size={24}/> 
            </Link>
          ) : (
            <>
              <Link href="/account" className="text-white hover:underline">
                <AiOutlineUser size={24}/> 
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-red-500 hover:underline"
              >
                <MdLogout size={26}/> 
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

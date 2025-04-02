'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type Movie = {
  id: number
  title: string
  genre: string
  release_date: string
}

export default function WatchlistPage() {
  const [bookmarks, setBookmarks] = useState<Movie[]>([])
  const userId = typeof window !== 'undefined' ? localStorage.getItem('user_id') : null

  useEffect(() => {
    if (!userId) return

    fetch(`http://localhost/CineScope/backend/getBookmarks.php?user_id=${userId}`)
      .then(res => res.json())
      .then(data => setBookmarks(data))
  }, [userId])

  if (!userId) {
    return <p className="p-8">Please <Link href="/login" className="text-blue-600 underline">log in</Link> to view your watchlist.</p>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Your Watchlist</h1>
      {bookmarks.length === 0 ? (
        <p>No bookmarks yet.</p>
      ) : (
        <ul className="space-y-4">
          {bookmarks.map(movie => (
            <li key={movie.id}>
              <Link href={`/movie/${movie.id}`}>
                <div className="bg-white p-4 rounded shadow hover:bg-gray-100">
                  <h2 className="text-xl font-semibold">{movie.title}</h2>
                  <p className="text-sm text-gray-500">{movie.genre} | {new Date(movie.release_date).toDateString()}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

'use client'

import { useState } from 'react'

export default function Bookmark({ movieId, userId }: { movieId: number; userId: number }) {
  const [bookmarked, setBookmarked] = useState(false)

  const handleBookmark = async () => {
    await fetch('http://cinescope.free.nf/addToList.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, movie_id: movieId }),
    })

    setBookmarked(true)
  }

  return (
    <button
      onClick={handleBookmark}
      className={`mt-6 px-4 py-2 rounded ${
        bookmarked ? 'bg-green-600' : 'bg-slate-400 hover:bg-slate-700'
      } text-white`}
      disabled={bookmarked}
    >
      {bookmarked ? 'Bookmarked ✓' : 'Add to Watchlist'}
    </button>
  )
}
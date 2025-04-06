'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const GENRES = [
  "Action", "Adventure", "Animation", "Biography", "Comedy", "Crime",
  "Documentary", "Drama", "Fantasy", "History", "Horror", "Musical",
  "Mystery", "Romance", "Sci-Fi", "Sport", "Thriller", "War", "Western"
]

export default function AccountPage() {
  const [userId, setUserId] = useState<number | null>(null)
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [message, setMessage] = useState("")

  useEffect(() => {
    const id = localStorage.getItem('user_id')
    if (id) {
      setUserId(parseInt(id))
      fetch(`http://localhost/CineScope/backend/getPreference.php?user_id=${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.genre_preference) {
            setSelectedGenres(data.genre_preference.split(',').map((s: string) => s.trim()))
          }
        })
    }
  }, [])

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    )
  }

  const handleSave = async () => {
    if (!userId) return
    const genre_preference = selectedGenres.join(',')

    const res = await fetch('http://localhost/CineScope/backend/updatePreference.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, genre_preference })
    })

    const data = await res.json()
    setMessage(data.success ? "✅ Preferences updated!" : "❌ Failed to update preferences.")
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-6 text-white">
      <h2 className="text-3xl font-bold mb-6">Account Settings</h2>

      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-4">Genre Preferences</h3>
        <p className="mb-2 text-sm">Select your preferred genres:</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
          {GENRES.map((genre, idx) => (
            <label key={idx} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedGenres.includes(genre)}
                onChange={() => toggleGenre(genre)}
              />
              <span>{genre}</span>
            </label>
          ))}
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-2 border border-white bg-transparent hover:bg-gradient-to-r rounded-lg hover:from-fuchsia-600 hover:to-violet-900 hover:opacity-90 transition"
        >
          Save Preferences
        </button>

        {message && <p className="mt-4 text-sm text-white italic">{message}</p>}
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4">Your Bookmarks</h3>
        <Link href="/watchlist" className="text-blue-300 underline hover:text-fuchsia-400 transition">
          View Watchlist
        </Link>
      </section>
    </div>
  )
}

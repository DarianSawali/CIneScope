'use client'

import { useEffect, useState } from 'react'

// available genre options
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
            // get user genre preference
            setSelectedGenres(data.genre_preference.split(',').map((s: string) => s.trim()))
          }
        })
    }
  }, [])

  // set genre option to be checked 
  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    )
  }

  const handleSave = async () => {
    if (!userId) return
    // join selected genre preference
    const genre_preference = selectedGenres.join(',')

    const res = await fetch('http://localhost/CineScope/backend/updatePreference.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, genre_preference })
    })

    const data = await res.json()
    if (data.success) {
      setMessage("Preferences updated!")
    } else {
      setMessage("Failed to update preferences.")
    }
  }

  return (
    <div className="max-w-md mx-auto py-10 text-white">
      <h2 className="text-2xl font-bold mb-6">Account Management</h2>

      <p className="mb-2 text-sm">Select your preferred genres:</p>
      <div className="grid grid-cols-2 gap-2 mb-6">
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
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Save Preferences
      </button>

      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  )
}

// account management page

'use client'

import { useEffect, useState } from 'react'

const GENRES = [
    "Action", "Adventure", "Animation", "Biography", "Comedy", "Crime",
    "Documentary", "Drama", "Fantasy", "History", "Horror", "Musical",
    "Mystery", "Romance", "Sci-Fi", "Sport", "Thriller", "War", "Western"
  ]

export default function AccountPage() {
  const [userId, setUserId] = useState<number | null>(null)
  const [genrePreference, setGenrePreference] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const id = localStorage.getItem('user_id')
    if (id) {
      setUserId(parseInt(id))
      fetch(`http://localhost/CineScope/backend/getPreference.php?user_id=${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.genre_preference) {
            setGenrePreference(data.genre_preference)
          }
        })
    }
  }, [])

  const handleSave = async () => {
    if (!userId) return

    // Save preference
    await fetch('http://localhost/CineScope/backend/updatePreference.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, genre_preference: genrePreference })
    })

    // Save password (if provided)
    if (newPassword || confirmPassword) {
      if (newPassword !== confirmPassword) {
        setMessage("❌ Passwords do not match.")
        return
      }

      const res = await fetch('http://localhost/CineScope/backend/updatePassword.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, new_password: newPassword })
      })

      const data = await res.json()
      if (!data.success) {
        setMessage("❌ Failed to update password.")
        return
      }
    }

    setMessage("✅ Changes saved successfully.")
    setNewPassword('')
    setConfirmPassword('')
  }

  return (
    <div className="max-w-md mx-auto py-10 text-white">
      <h2 className="text-2xl font-bold mb-6">Account Settings</h2>

      {/* Genre Preference */}
      <label className="block mb-2 text-sm">Favorite Genre</label>
      <select
        value={genrePreference}
        onChange={(e) => setGenrePreference(e.target.value)}
        className="w-full p-2 border rounded text-black"
      >
        <option value="">-- Select a genre --</option>
        {GENRES.map((genre, idx) => (
          <option key={idx} value={genre}>{genre}</option>
        ))}
      </select>

      {/* New Password */}
      <label className="block mt-6 mb-2 text-sm">New Password</label>
      <input
        type="password"
        className="w-full p-2 border rounded text-black"
        placeholder="Leave blank to keep current password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <label className="block mt-4 mb-2 text-sm">Confirm Password</label>
      <input
        type="password"
        className="w-full p-2 border rounded text-black"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button
        onClick={handleSave}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Save Changes
      </button>

      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  )
}

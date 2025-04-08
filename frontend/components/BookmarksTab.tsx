'use client'

import { useEffect, useState } from "react"
import BookmarkCard from "./BookmarkCard"

type Movie = {
  id: number
  title: string
  release_date: string
}

export default function BookmarksTab() {
  const [bookmarks, setBookmarks] = useState<Movie[]>([])
  const userId = typeof window !== "undefined" ? localStorage.getItem("user_id") : null

  useEffect(() => {
    if (!userId) return

    fetch(`http://s1046814535.online-home.ca/getBookmarks.php?user_id=${userId}`)
      .then(res => res.json())
      .then(data => setBookmarks(data))
      .catch(err => console.error("Failed to load bookmarks", err))
  }, [userId])

  const handleRemove = async (movieId: number) => {
    try {
      await fetch("http://s1046814535.online-home.ca/removeFromList.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: parseInt(userId!),
          movie_id: movieId,
        }),
      })

      // Update UI immediately
      setBookmarks(prev => prev.filter(movie => movie.id !== movieId))
    } catch (err) {
      console.error("Error removing bookmark:", err)
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {bookmarks.map(movie => (
        <BookmarkCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          release_date={movie.release_date}
          onRemove={handleRemove}
        />
      ))}
    </div>
  )
}

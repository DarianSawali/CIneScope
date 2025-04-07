import { useEffect, useState } from "react"

interface Props {
  movieId: number
  userId: number | null
}

export default function BookmarkButton({ movieId, userId }: Props) {
  const [bookmarked, setBookmarked] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const userId = localStorage.getItem("user_id")
    if (!userId) return

    fetch(`http://localhost/CineScope/backend/checkBookmark.php?movie_id=${movieId}&user_id=${userId}`)
      .then(res => res.json())
      .then(data => setBookmarked(data.bookmarked))
      .catch(err => console.error("Error checking bookmark:", err))
  }, [movieId, userId])

  const handleBookmark = async () => {

    if (!userId) {
      setMessage("You must be logged in to bookmark movies.")
      return
    }

    if (bookmarked) return

    try {
      const res = await fetch("http://localhost/CineScope/backend/addToList.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, movie_id: movieId }),
      })

      const data = await res.json()
      if (data.success) {
        setBookmarked(true)
        setMessage("")
      } else {
        setMessage("Failed to bookmark.")
      }
    } catch (err) {
      console.error("Bookmark error:", err)
      setMessage("Error adding bookmark.")
    }
  }

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000)
      return () => clearTimeout(timer)
    }
  }, [message])

  return (
    <div className="text-right">
      <button
        onClick={handleBookmark}
        disabled={bookmarked}
        className={`px-6 py-2 rounded-lg text-sm font-medium transition duration-300 ease-in-out shadow-sm shadow-white
          ${bookmarked
            ? 'border border-white bg-gradient-to-r from-green-600 to-cyan-600 cursor-not-allowed'
            : 'border border-white hover:bg-gradient-to-r hover:from-fuchsia-600 hover:to-violet-900'}
        `}
      >
        {bookmarked ? '✔ Bookmarked' : 'Add to Watchlist'}
      </button>
      {message && <p className="mt-2 text-sm text-red-400">{message}</p>}
    </div>
  )
}
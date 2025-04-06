import { useEffect, useState } from "react"

interface Props {
  movieId: number
}

export default function BookmarkButton({ movieId }: Props) {
  const [bookmarked, setBookmarked] = useState(false)

  useEffect(() => {
    const userId = localStorage.getItem("user_id")
    if (!userId) return

    fetch(`http://localhost/CineScope/backend/checkBookmark.php?movie_id=${movieId}&user_id=${userId}`)
      .then(res => res.json())
      .then(data => setBookmarked(data.bookmarked))
      .catch(err => console.error("Error checking bookmark:", err))
  }, [movieId])

    const handleBookmark = async () => {
    const userId = localStorage.getItem("user_id")
    if (!userId || bookmarked) return

    try {
      await fetch("http://localhost/CineScope/backend/addToList.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: parseInt(userId),
          movie_id: movieId,
        }),
      })

      setBookmarked(true)
    } catch (err) {
      console.error("Bookmark error:", err)
    }
  }


  return (
    <button
      onClick={handleBookmark}
      disabled={bookmarked}
      className={`px-6 py-2 rounded-lg text-sm font-medium transition duration-300 ease-in-out shadow-sm shadow-white
        ${bookmarked
          ? 'bg-green-600 cursor-not-allowed'
          : 'border border-white hover:bg-gradient-to-r hover:from-fuchsia-600 hover:to-violet-900'}
      `}
    >
      {bookmarked ? '✔ Bookmarked' : 'Add to Watchlist'}
    </button>
  )
}
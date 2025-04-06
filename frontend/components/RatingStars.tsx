'use client'

import { useEffect, useState } from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'

type Props = {
  movieId: number
  userId: number | null
}

export default function RatingStars({ movieId, userId }: Props) {
  const [rating, setRating] = useState<number>(0)
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => {
    if (!userId) return
    fetch(`http://localhost/CineScope/backend/getRating.php?user_id=${userId}&movie_id=${movieId}`)
      .then(res => res.json())
      .then(data => setRating(data.score || 0))
      .catch(err => console.error("Error fetching rating:", err))
  }, [movieId, userId])

  const handleRating = async (score: number) => {
    if (!userId) return

    try {
      await fetch("http://localhost/CineScope/backend/rateMovie.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, movie_id: movieId, score }),
      })
      setRating(score)
    } catch (err) {
      console.error("Rating error:", err)
    }
  }

  return (
    <div className="flex gap-1 items-center">
      {[1, 2, 3, 4, 5].map(i => (
        <button
          key={i}
          onClick={() => handleRating(i)}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          className="text-yellow-400"
        >
          {i <= (hovered ?? rating) ? <AiFillStar size={20} /> : <AiOutlineStar size={20} />}
        </button>
      ))}
    </div>
  )
}

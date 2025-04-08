'use client'

import { useEffect, useState } from "react"
import MovieCard from "@/components/MovieCard"
import Link from "next/link"

type Movie = {
  id: number
  title: string
  release_date: string
  poster_path: string
  genre: string
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [recommended, setRecommended] = useState<Movie[]>([])
  const [userId, setUserId] = useState<number | null>(null)

  useEffect(() => {
    fetch('http://s1046814535.online-home.ca/getMovies.php')
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error(err))

    // check for logged-in user
    const id = localStorage.getItem('user_id')
    if (id) {
      setUserId(parseInt(id))

      // preferred genre of user
      fetch(`http://s1046814535.online-home.ca/getPreference.php?user_id=${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.genre_preference) {
            const genres = data.genre_preference.split(',').map((g: string) => g.trim())

            // fetch recommended movies based on preferred genre
            fetch(`http://s1046814535.online-home.ca/getRecommended.php?genres=${genres.join(',')}`)
              .then(res => res.json())
              .then(data => setRecommended(data))
              .catch(err => console.error("Failed to fetch recommended:", err))
          }
        })
    }
  }, [])

  return (
    <div className="py-10">
  {userId && recommended.length > 0 && (
    <>
      <h2 className="text-3xl font-bold mb-6">For You</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {recommended.map(movie => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            release_date={movie.release_date}
          />
        ))}
      </div>
    </>
  )}

  <h2 className="text-3xl font-bold mb-6">Latest Movies</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-8">
    {movies
      .sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime())
      .map(movie => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          release_date={movie.release_date}
        />
      ))}
  </div>
</div>
  )

}

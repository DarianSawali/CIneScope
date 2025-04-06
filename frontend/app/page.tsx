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
    fetch('http://localhost/CineScope/backend/getMovies.php')
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error(err))

    // check for logged-in user
    const id = localStorage.getItem('user_id')
    if (id) {
      setUserId(parseInt(id))

      // preferred genre of user
      fetch(`http://localhost/CineScope/backend/getPreference.php?user_id=${id}`)
        .then(res => res.json())
        .then(data => {
          if (data.genre_preference) {
            const genres = data.genre_preference.split(',').map((g: string) => g.trim())

            // fetch recommended movies based on preferred genre
            fetch(`http://localhost/CineScope/backend/getRecommended.php?genres=${genres.join(',')}`)
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
              <Link key={movie.id} href={`/movie/${movie.id}`}>
                <MovieCard
                  title={movie.title}
                  release_date={movie.release_date}
                />
              </Link>
            ))}
          </div>
        </>
      )}

      <h2 className="text-3xl font-bold mb-6">Latest Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-8">
        {movies
          .sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime())
          .map(movie => (
            <Link key={movie.id} href={`/movie/${movie.id}`}>
              <MovieCard
                title={movie.title}
                release_date={movie.release_date}
              />
            </Link>
          ))}
      </div>
    </div>
  )

}

'use client'

import { useEffect, useState } from "react"
import MovieCard from "@/components/MovieCard"
import Link from "next/link"

type Movie = {
  id: number
  title: string
  release_date: string
  poster_path: string
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    fetch('http://localhost/CineScope/backend/getMovies.php')
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="py-10">
      <h2 className="text-3xl font-bold mb-6 ">Latest Movies</h2>
    
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

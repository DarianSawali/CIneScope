'use client'
import Image from "next/image";
import Link from 'next/link';
import { useEffect, useState } from 'react'

type Movie = {
  id: number
  title: string
  genre: string
  release_date: string
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
      <h2 className="text-3xl font-bold mb-6">Latest Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {movies.map(movie => (
        <Link key={movie.id} href={`/movie/${movie.id}`}>
          <div className="bg-white p-4 rounded shadow hover:bg-gray-100 cursor-pointer transition">
            <h3 className="text-xl font-semibold">{movie.title}</h3>
            <p className="text-sm text-gray-500">{movie.genre}</p>
            <p className="text-sm text-gray-600">
              Released: {new Date(movie.release_date).toDateString()}
            </p>
          </div>
        </Link>
      ))}
      </div>
    </div>
  )
}
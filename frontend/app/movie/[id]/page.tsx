'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Comments from '@/components/Comments'
import Bookmark from '@/components/Bookmark'

type Movie = {
  id: number
  title: string
  genre: string
  cast: string
  overview: string
  release_date: string
  runtime: number
  language: string
}

export default function MoviePage() {
  const { id } = useParams() as { id: string } 
  const [movie, setMovie] = useState<Movie | null>(null)

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost/CineScope/backend/getMovie.php?id=${id}`)
      .then(res => res.json())
      .then(data => setMovie(data))
  }, [id])

  if (!movie) return <p>Loading...</p>

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
      <p className="text-gray-600 mb-4">{movie.genre} | {movie.runtime} mins</p>
      <p className="italic text-gray-700 mb-4">{movie.cast}</p>
      <p className="mb-6">{movie.overview}</p>
      <p className="text-sm text-gray-500">Language: {movie.language}</p>
      <p className="text-sm text-gray-500">Released: {new Date(movie.release_date).toDateString()}</p>

      <Bookmark movieId={parseInt(id)} userId={1} />

      <Comments movieId={parseInt(id)}  />

    </div>

    
  )
}


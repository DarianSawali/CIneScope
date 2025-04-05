'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Comments from '@/components/Comments'
import Bookmark from '@/components/Bookmark'
import Image from 'next/image'

type Movie = {
  id: number
  title: string
  genre: string
  cast: string
  overview: string
  release_date: string
  runtime: number
  language: string
  poster_path?: string
}

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_KEY

export default function MoviePage() {
  const { id } = useParams() as { id: string }
  const [movie, setMovie] = useState<Movie | null>(null)
  const [hasImageError, setHasImageError] = useState(false)
  const [posterPath, setPosterPath] = useState<string>('')

  useEffect(() => {
    if (!id) return

    fetch(`http://localhost/CineScope/backend/getMovie.php?id=${id}`)
      .then(res => res.json())
      .then(async (data: Movie) => {
        setMovie(data)

        try {
          const tmdbRes = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(data.title)}&api_key=${TMDB_API_KEY}`
          )
          const tmdbData = await tmdbRes.json()
          const path = tmdbData.results?.[0]?.backdrop_path
          setPosterPath(path ? `https://image.tmdb.org/t/p/w780${path}` : '/fallback.jpg')
        } catch (err) {
          console.error('TMDb fetch error:', err)
          setPosterPath('/fallback.jpg')
        }
      })
  }, [id])

  if (!movie) return <p className="text-white p-10">Loading...</p>

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
    {/* Info Card including Poster */}
    <div className="bg-slate-800 text-white rounded-lg shadow pb-6 mb-10">
      {/* Poster Image */}
      {posterPath && (
        <img
          src={
            hasImageError || !posterPath
              ? "/fallback_width.png"
              : posterPath
          }
          alt={movie.title}
          onError={() => setHasImageError(true)}
          className="w-full h-auto rounded-lg object-cover mb-6"
        />
      )}

      {/* Flex Container */}
      <div className="flex flex-col md:flex-row md:items-stretch gap-10 p-6">
        {/* Left Section */}
        <div className="flex-1 max-w-2xl">
          <h1 className="text-3xl font-bold mb-3">{movie.title}</h1>
          <p className="text-gray-300 mb-4">{movie.overview}</p>

          {/* Cast at bottom */}
          <div className="mt-6">
            <p className="font-semibold text-gray-400">Cast:</p>
            <p className="text-gray-200 italic">{movie.cast}</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col justify-between text-sm text-right md:ml-auto items-end">
          <div className="space-y-4">
            <div>
              <p className="text-gray-400">Language:</p>
              <p className="font-medium text-white">{movie.language}</p>
            </div>
            <div>
              <p className="text-gray-400">Release Date:</p>
              <p className="font-medium text-white">
                {new Date(movie.release_date).toDateString()}
              </p>
            </div>
          </div>

          {/* Push Bookmark button to bottom */}
          <div className="mt-10">
            <Bookmark movieId={parseInt(id)} userId={1} />
          </div>
        </div>
      </div>
    </div>

    <div className='px-6'>
      <Comments movieId={parseInt(id)} />
    </div>

    
  </div>

  )
}

'use client'

import { useEffect, useState } from 'react'

type MovieCardProps = {
  title: string
  release_date: string
}

export default function MovieCard({ title, release_date }: MovieCardProps) {
  const [posterPath, setPosterPath] = useState("")

  useEffect(() => {
    const fetchPoster = async () => {
      const query = encodeURIComponent(title)
      const year = new Date(release_date).getFullYear()
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&year=${year}&api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`)
      const data = await res.json()
      const poster = data.results?.[0]?.poster_path
      if (poster) setPosterPath(`https://image.tmdb.org/t/p/w500${poster}`)
    }

    fetchPoster()
  }, [title, release_date])

  return (
    <div className="relative rounded overflow-hidden shadow-md group h-[400px]">
      {posterPath && (
        <img
          src={posterPath}
          alt={title}
          className="w-full h-full object-cover rounded group-hover:brightness-50 transition"
        />
      )}
      <div className="absolute bottom-0 w-full p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm">{new Date(release_date).getFullYear()}</p>
      </div>
    </div>
  )
}

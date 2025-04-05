'use client'

import Image from "next/image"
import { useEffect, useState } from "react"

type Props = {
  title: string
  // release_date: string
}

export default function MovieCard({ title }: Props) {
  const [posterPath, setPosterPath] = useState<string | null>(null)

  useEffect(() => {
    const fetchPoster = async () => {
      const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY
      const query = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(title)}`

      try {
        const res = await fetch(query)
        const data = await res.json()

        if (data.results && data.results.length > 0) {
          setPosterPath(data.results[0].poster_path)
        }
      } catch (err) {
        console.error("Error fetching poster:", err)
      }
    }

    fetchPoster()
  }, [title])

  return (
    <div className="relative group rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-300">
      <Image
        src={
          posterPath
            ? `https://image.tmdb.org/t/p/w500${posterPath}`
            : "/fallback.jpg"
        }
        alt={title}
        width={500}
        height={750}
        className="w-full h-auto object-cover"
      />
      <div className="absolute inset-0 flex flex-col justify-end opacity-0 group-hover:opacity-100 text-white p-4 transition bg-black/40">
        <h3 className="text-lg font-bold">{title}</h3>
        {/* <p className="text-sm">{new Date(release_date).getFullYear()}</p> */}
      </div>
    </div>
  )
}

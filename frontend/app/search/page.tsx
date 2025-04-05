'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import MovieCard from '@/components/MovieCard'

type Movie = {
  id: number
  title: string
  genre: string
  language: string
  release_date: string
  poster_path: string
}

const GENRES = [
  "Action", "Adventure", "Animation", "Biography", "Comedy", "Crime",
  "Drama", "Family", "Fantasy", "Game-Show", "History", "Horror",
  "Music", "Musical", "Mystery", "Reality-TV", "Romance", "Sci-Fi",
  "Sport", "Thriller", "War", "Western"
]

const LANGUAGES = [
  "Arabic", "Armenian", "Bulgarian", "Danish", "English", "French", "German",
  "Hebrew", "Hungarian", "Italian", "Japanese", "Latin", "Polish",
  "Romanian", "Russian", "Spanish", "Telugu", "Yiddish"
]

export default function SearchPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('')

  useEffect(() => {
    const url = new URL('http://localhost/CineScope/backend/getSearch.php')
    if (searchTerm) url.searchParams.append('title', searchTerm)
    if (selectedGenre) url.searchParams.append('genre', selectedGenre)
    if (selectedLanguage) url.searchParams.append('language', selectedLanguage)

    fetch(url.href)
      .then(res => res.json())
      .then(async data => {
        // Enrich with TMDb poster
        const enriched = await Promise.all(
          data.map(async (movie: any) => {
            let poster_path = ''
            try {
              const tmdbRes = await fetch(
                `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movie.title)}&api_key=${process.env.NEXT_PUBLIC_TMDB_KEY}`
              )
              const tmdbData = await tmdbRes.json()
              poster_path = tmdbData.results?.[0]?.poster_path || ''
            } catch (err) {
              console.error('TMDb error:', err)
            }

            return {
              ...movie,
              release_date: movie.release_date || '2000-01-01',
              poster_path,
              genreList: movie.genre.split(',').map((g: string) => g.trim()),
              languageList: movie.language.split(',').map((l: string) => l.trim()),
            }
          })
        )

        setMovies(enriched)
      })
      .catch(err => console.error('Search fetch error:', err))
  }, [searchTerm, selectedGenre, selectedLanguage])

  return (
    <div className="py-10 text-white">
      <h2 className="text-3xl font-bold mb-6">Search & Filter Movies</h2>

      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-full sm:w-[300px] bg-black text-white placeholder-gray-400"
        />

        <select
          value={selectedGenre}
          onChange={e => setSelectedGenre(e.target.value)}
          className="p-2 border rounded bg-black text-white"
        >
          <option value="">All Genres</option>
          {GENRES.map((genre, idx) => (
            <option key={idx} value={genre}>{genre}</option>
          ))}
        </select>

        <select
          value={selectedLanguage}
          onChange={e => setSelectedLanguage(e.target.value)}
          className="p-2 border rounded bg-black text-white"
        >
          <option value="">All Languages</option>
          {LANGUAGES.map((lang, idx) => (
            <option key={idx} value={lang}>{lang}</option>
          ))}
        </select>
      </div>

      {/* Movie Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {movies.map(movie => (
          <Link key={movie.id} href={`/movie/${movie.id}`}>
            <MovieCard
              title={movie.title}
            />
          </Link>
        ))}
      </div>
    </div>
  )
}

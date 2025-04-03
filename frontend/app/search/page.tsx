'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Movie = {
  id: number
  title: string
  genre: string
  language: string
}

// Available genres
const GENRES = [
  "Action", "Adventure", "Animation", "Biography", "Comedy", "Crime",
  "Drama", "Family", "Fantasy", "Game-Show", "History", "Horror",
  "Music", "Musical", "Mystery", "Reality-TV", "Romance", "Sci-Fi",
  "Sport", "Thriller", "War", "Western"
]

// Available languages
const LANGUAGES = [
    "Arabic", "Armenian", "Bulgarian", "Danish", "English", "French", "German",
    "Hebrew", "Hungarian", "Italian", "Japanese", "Latin", "Polish",
    "Romanian", "Russian", "Spanish", "Telugu", "Yiddish"
  ];

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

    console.log('Fetching:', url.href)

    fetch(url.href)
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error('Filtered movie fetch error:', err))
  }, [searchTerm, selectedGenre, selectedLanguage])

  const cleanedMovies = movies.map(movie => ({
    ...movie,
    genreList: movie.genre.split(',').map(g => g.trim()),
    languageList: movie.language.split(',').map(l => l.trim()),
  }))

  return (
    <div className="py-10 text-white">
      <h2 className="text-3xl font-bold mb-6">Search & Filter Movies</h2>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-full sm:w-[300px] bg-black text-white placeholder-gray-400"
        />

        {/* Genre dropdown */}
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

        {/* Language dropdown */}
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
        {cleanedMovies.map(movie => (
          <Link key={movie.id} href={`/movie/${movie.id}`}>
            <div className="bg-white p-4 rounded shadow hover:bg-gray-100 cursor-pointer transition">
              <h3 className="text-xl font-semibold text-black">{movie.title}</h3>
              <p className="text-sm text-gray-500">Genres: {movie.genreList.join(', ')}</p>
              <p className="text-sm text-gray-500">Languages: {movie.languageList.join(', ')}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

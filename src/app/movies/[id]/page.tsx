import { notFound } from 'next/navigation'
import { Movie } from '@/types'
import api from '@/lib/api'
import Link from 'next/link'

interface MovieDetailPageProps {
  params: { id: string }
}

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  const movieId = params.id

  try {
    const res = await api.get<Movie>(`/movies/${movieId}`)
    const movie = res.data

    return (
      <div className="p-4 max-w-2xl mx-auto space-y-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">{movie.title}</h1>
          <Link href="/movies" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-sm transition duration-150 ease-in-out">
            Back to Movies
          </Link>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Actors</h2>
          <ul className="list-disc list-inside text-sm">
            {movie.actors?.map((actor) => (
              <li key={actor.id}>{actor.name}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Ratings</h2>
          <ul className="space-y-3">
            {movie.ratings?.map((r) => (
              <li key={r.id} className="border rounded-md p-3 bg-white shadow-sm">
                <p className="text-black font-medium">Score: {r.score}/10</p>
                <p className="text-gray-600 text-sm">{r.comment}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Movie not found:', error)
    return notFound()
  }
}

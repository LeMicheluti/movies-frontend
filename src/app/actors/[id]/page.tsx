import { notFound } from 'next/navigation'
import { Actor } from '@/types'
import Link from 'next/link'
import api from '@/lib/api'

interface ActorDetailPageProps {
    params: { id: string }
}

export default async function ActorDetailPage({ params }: ActorDetailPageProps) {
    const actorId = Number(params.id)

    try {
        const res = await api.get<Actor>(`/actors/${actorId}`)

        const actor = res.data

        return (
            <div className="p-4 max-w-3xl mx-auto space-y-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">{actor.name}</h1>
                    <Link href="/actors" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-sm transition duration-150 ease-in-out">
                        Back to Actors
                    </Link>
                </div>

                <div>
                    <h2 className="text-lg font-semibold mb-2">Movies</h2>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                        {actor.movies?.length ? (
                            actor.movies.map((movie) => (
                                <li key={movie.id}>
                                    <Link href={`/movies/${movie.id}`}>
                                        <span className="text-blue-600 hover:underline">{movie.title}</span>
                                    </Link>
                                </li>
                            ))
                        ) : (
                            <li className="italic text-gray-400">No movies found</li>
                        )}
                    </ul>
                </div>
            </div>
        )
    } catch (error) {
        console.error('Failed to fetch actor:', error)
        return notFound()
    }
}

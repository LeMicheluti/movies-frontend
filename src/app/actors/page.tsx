'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import api from '@/lib/api'
import { Actor } from '@/types'

export default function ActorsPage() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const initialQuery = searchParams.get('q') || ''
    const initialPage = Number(searchParams.get('page')) || 1
    const limit = 9

    const [query, setQuery] = useState(initialQuery)
    const [page, setPage] = useState(initialPage)
    const [actors, setActors] = useState<Actor[]>([])
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchActors = async () => {
            setLoading(true)
            try {
                const params = new URLSearchParams()
                if (query) params.set('q', query)
                if (page > 1) params.set('page', page.toString())

                const urlParams = params.toString()
                const newUrl = urlParams ? `?${urlParams}` : window.location.pathname

                router.replace(newUrl, { scroll: false })

                const response = await api.get('/actors', {
                    params: {
                        q: query,
                        page: page,
                        limit: limit,
                    },
                })
                setActors(response.data.data)
                setTotalPages(response.data.lastPage)
            } catch (error) {
                console.error('Failed to fetch actors:', error)
                setActors([])
                setTotalPages(1)
            } finally {
                setLoading(false)
            }
        }

        fetchActors()
    }, [query, page, router, limit])

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setPage(1)
    }

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold mb-4">Actors</h1>
                <Link href="/" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-sm transition duration-150 ease-in-out">
                    Back to Home
                </Link>
            </div>

            <form onSubmit={handleSearchSubmit} className="mb-6 flex gap-2">
                <input
                    type="text"
                    placeholder="Search actors..."
                    className="flex-1 p-2 border rounded"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Search
                </button>
            </form>

            {loading ? (
                <p>Loading actors...</p>
            ) : actors.length === 0 ? (
                <p>No actors found.</p>
            ) : (
                <>
                    <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                        {actors.map((actor) => (
                            <li
                                key={actor.id}
                                className="border p-4 rounded-lg shadow bg-white"
                            >
                                <Link href={`/actors/${actor.id}`}>
                                    <h2 className="text-lg font-semibold text-blue-600 hover:underline">
                                        {actor.name}
                                    </h2>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="flex justify-center mt-6 gap-4">
                        <button
                            onClick={() => setPage((p) => Math.max(p - 1, 1))}
                            disabled={page === 1}
                            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 text-black"
                        >
                            Previous
                        </button>
                        <span className="px-4 py-2">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                            disabled={page === totalPages}
                            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 text-black"
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 max-w-5xl mx-auto">
      <h1 className="text-4xl font-extrabold text-white-900 mb-6 text-center leading-tight sm:text-5xl">
        Welcome to the Movie & Actor Hub!
      </h1>
      <p className="text-lg text-white-800 mb-8 text-center max-w-2xl px-4">
        Discover and explore a vast collection of movies and the talented actors who bring them to life. Search, view details, and enjoy!
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md px-4">
        <Link href="/movies" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out text-lg text-center transform hover:scale-105">
          Explore Movies
        </Link>
        <Link href="/actors" className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out text-lg text-center transform hover:scale-105">
          Discover Actors
        </Link>
      </div>
    </div>
  );
}
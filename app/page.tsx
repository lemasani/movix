'use client'
import { useState } from 'react';
import HeroCarousel from '@/components/heroCarousel';
import MovieCard from '@/components/movieCard';
import SeriesCard from '@/components/seriesCard';

export default function Home() {
  const [view, setView] = useState('movies');

  return (
    <>
      <main className="mx-auto min-h-screen">
        <section className="hero h-[500px]">
          <HeroCarousel />
        </section>
        <section className='container mt-1 trending-movies-shows'>
          <div className="container mx-auto  px-5">
            <h1 className='text-2xl font-bold'>Trending</h1>
            <div className="toggle-option flex gap-2 mt-4">
              <button
                className={`px-4 py-2 rounded ${view === 'movies' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setView('movies')}
              >
                Movies
              </button>
              <button
                className={`px-4 py-2 rounded ${view === 'series' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setView('series')}
              >
                Series
              </button>
            </div>
            <div className="trending-content mt-10">
              {view === 'movies' ?(
                <>
                  <h2 className='text-xl italic font-light'>Trending Movies</h2>
                  <MovieCard />
                </>
              ): (
                <>
                  <h2 className='text-xl italic font-light'>Trending Series</h2>
                  <SeriesCard />
                </>
              )}
            </div>

          </div>
        </section>
      </main>
    </>
  );
}
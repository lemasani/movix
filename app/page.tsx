'use client'
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';

import HeroCarousel from '@/components/heroCarousel';
import MovieCard from '@/components/movieCard';
import SeriesCard from '@/components/seriesCard';

export default function Home() {
  const [view, setView] = useState('movies');
  const { user } = useUser();

  useEffect(() => {
    // Only initiate the TMDb process if the user is signed in and doesn't have the session ID yet
    if (user && !user.publicMetadata.tmdbSessionId) {
      initiateTMDbAuth();
    }
  }, [user]);

 console.log('TMDb session ID:', user?.publicMetadata.tmdbSessionId);

  const initiateTMDbAuth = async () => {
    try {
      const response = await fetch('/api/clerk', { method: 'POST' });
      const data = await response.json();

      if (data.success) {
        // Redirect user to TMDb with a return URL
        const returnUrl = encodeURIComponent(window.location.origin + '/');
        window.location.href = `${data.authUrl}&redirect_to=${returnUrl}`;
      } else {
        console.error('Error initiating TMDb authorization:', data.error);
      }
    } catch (error) {
      console.error('Error fetching TMDb auth URL:', error);
    }
  };

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
              {view === 'movies' ? (
                <>
                  <h2 className='text-xl italic font-light'>Trending Movies</h2>
                  <MovieCard />
                </>
              ) : (
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
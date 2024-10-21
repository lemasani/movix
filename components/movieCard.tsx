import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { getTrending } from '@/lib/trending';

import { Plus } from 'lucide-react';
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

export default function MovieCard() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      const data = await getTrending('movie');
      const filteredMovies = data.filter((movie: Movie) => movie.vote_average > 7);
      setTrendingMovies(filteredMovies);
    };
    fetchTrendingMovies();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-2">
      {trendingMovies.map((movie) => (
        <Card key={movie.id} className="relative">
          <CardHeader className="relative w-full h-64">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-md"
            />
          </CardHeader>
          <CardContent className='relative p-2 pb-16'>
            <div className="date-ratings text-center flex justify-between items-center ">
                <p className="text-blue-500 flex">⭐ {movie.vote_average.toFixed(1)}</p>
                <p className="text-gray-600">{new Date(movie.release_date).getFullYear()}</p>
            </div>
            <h2 className="text font-bold mt-4 ">{movie.title}</h2>
          </CardContent>
          <CardFooter className='absolute left-0 w-full mb-0 bottom-0'>
            <button 
                className=" -mb-5 flex p-2 text-blue-600 border-red-500 rounded"
            >
              <Plus /> Watchlist
            </button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
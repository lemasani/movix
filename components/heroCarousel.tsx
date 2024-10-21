"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { Carousel,  CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from './ui/carousel';
import { getTrending } from '@/lib/trending';

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
}

const HeroCarousel: React.FC = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
     await getTrending('movie').then(setTrendingMovies)
    };
    fetchTrendingMovies();
  }, []);

  return (
    
    <Carousel className="h-[500px] relative overflow-hidden">
  <CarouselContent className="h-full flex">
    {trendingMovies.map((movie) => (
      <CarouselItem key={movie.id} className="relative w-full h-full">
        <Image
          src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`} 
          width={1280}
          height={500}
          alt={movie.title}
          className="w-full h-full object-cover -z-10" 
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white w-full text-center">
          <div className="movie -mt-20 p-2">
            <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
            <p className="mb-2">Release Date: {movie.release_date}</p>
            <p>Rating: {movie.vote_average}/10</p>

          </div>

        </div>
      </CarouselItem>
    ))}
  </CarouselContent>

  <CarouselPrevious className="text-white absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 rounded-full">
    &lt;
  </CarouselPrevious>
  
  <CarouselNext className="text-white absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 rounded-full">
    &gt;
  </CarouselNext>
</Carousel>

  
  );
};

export default HeroCarousel;

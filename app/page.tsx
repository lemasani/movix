'use client'
import HeroCarousel from '@/components/heroCarousel';

export default function Home() {

  return (
    <>
      <main className="mx-auto min-h-screen">
        <section className="hero  h-[500px]">
          <HeroCarousel />
        </section>
      </main>
    </>
  );
}
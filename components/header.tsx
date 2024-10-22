import React from 'react';
import Link from 'next/link';
import { auth } from '@clerk/nextjs/server';
import { UserButton } from '@clerk/nextjs';

export default function Header() {
  const { userId } = auth();

  return (
    <header className="relative top-0 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-black hover:text-gray-700">
          Movix
        </Link>
        <nav className="flex items-center gap-4">
          {userId ? (
            <UserButton />
          ) : (
            <>
              <Link href="/sign-in" className="text-white bg-blue-500 p-2 rounded-md hover:text-gray-700">
                Sign In
              </Link>
              <Link href="/sign-up" className="text-black hover:text-gray-700">
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
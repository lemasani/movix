import React from 'react'

export default function Header() {
  return (
   <>
     <header className="relative top-0">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black">Movix</h1>
          <div className="flex items-center gap-4">
            <button className="text-black">Sign In</button>
          </div>
        </div>
      </header>
   </>
  )
}

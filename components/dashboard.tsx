'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search, User, LogOut } from 'lucide-react'

// Mock data for trending content
const trendingContent = [
  { id: 1, title: "Stranger Things", type: "show", image: "/placeholder.svg?height=200&width=150", genres: ["Sci-Fi", "Horror"] },
  { id: 2, title: "The Witcher", type: "show", image: "/placeholder.svg?height=200&width=150", genres: ["Fantasy", "Action"] },
  { id: 3, title: "Inception", type: "movie", image: "/placeholder.svg?height=200&width=150", genres: ["Sci-Fi", "Action"] },
  { id: 4, title: "Breaking Bad", type: "show", image: "/placeholder.svg?height=200&width=150", genres: ["Drama", "Crime"] },
  { id: 5, title: "Interstellar", type: "movie", image: "/placeholder.svg?height=200&width=150", genres: ["Sci-Fi", "Drama"] },
  { id: 6, title: "The Crown", type: "show", image: "/placeholder.svg?height=200&width=150", genres: ["Drama", "History"] },
]

const allGenres = ["Action", "Crime", "Drama", "Fantasy", "History", "Horror", "Sci-Fi"]

export function Dashboard() {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])

  const handleSignInOut = () => {
    setIsSignedIn(!isSignedIn)
  }

  const handleGenreChange = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre)
        ? prev.filter(g => g !== genre)
        : [...prev, genre]
    )
  }

  const filteredContent = trendingContent.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedGenres.length === 0 || selectedGenres.some(genre => item.genres.includes(genre)))
  )

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Movix</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={handleSignInOut}>
              {isSignedIn ? <LogOut /> : <User />}
            </Button>
            <span>{isSignedIn ? 'Sign Out' : 'Sign In'}</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Input
            type="search"
            placeholder="Search for movies and shows..."
            className="max-w-sm mx-auto"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Filter by Genre</h2>
          <div className="flex flex-wrap gap-4">
            {allGenres.map(genre => (
              <div key={genre} className="flex items-center space-x-2">
                <Checkbox
                  id={genre}
                  checked={selectedGenres.includes(genre)}
                  onCheckedChange={() => handleGenreChange(genre)}
                />
                <Label htmlFor={genre}>{genre}</Label>
              </div>
            ))}
          </div>
        </div>

        <Tabs defaultValue="trending" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>
          <TabsContent value="trending">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {filteredContent.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-0">
                    <img src={item.image} alt={item.title} className="w-full h-auto object-cover rounded-t-lg" />
                  </CardContent>
                  <CardFooter className="p-2 flex-col items-start">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.genres.join(', ')}</p>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="favorites">
            <Card>
              <CardHeader>
                <CardTitle>Favorites</CardTitle>
                <CardDescription>Your favorite movies and shows will appear here.</CardDescription>
              </CardHeader>
              <CardContent>
                {isSignedIn ? (
                  <p>You haven't added any favorites yet.</p>
                ) : (
                  <p>Please sign in to view your favorites.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
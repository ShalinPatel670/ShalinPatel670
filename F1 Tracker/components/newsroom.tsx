"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import type { Driver, Team, Tweet, RaceResult } from "@/lib/types"
import { Newspaper, RefreshCw, MessageCircle, Repeat2, Heart } from "lucide-react"
import { races } from "@/lib/f1-data"

interface NewsroomProps {
  drivers: Driver[]
  teams: Team[]
  currentRaceIndex: number
  raceResults: RaceResult[][]
}

export default function Newsroom({ drivers, teams, currentRaceIndex, raceResults }: NewsroomProps) {
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [usedTweetIds, setUsedTweetIds] = useState<string[]>([])

  // Load saved tweets and used tweet IDs from localStorage on component mount
  useEffect(() => {
    // Load saved tweets
    const savedData = localStorage.getItem("f1TrackerNewsroom")
    if (savedData) {
      try {
        const { savedTweets, savedRaceIndex } = JSON.parse(savedData)
        // Only use saved tweets if they're from the current race
        if (savedRaceIndex === currentRaceIndex) {
          setTweets(savedTweets)
        }
      } catch (e) {
        console.error("Error loading saved tweets:", e)
      }
    }

    // Load used tweet IDs
    const savedUsedTweets = localStorage.getItem("f1TrackerUsedTweets")
    if (savedUsedTweets) {
      try {
        setUsedTweetIds(JSON.parse(savedUsedTweets))
      } catch (e) {
        console.error("Error loading used tweet IDs:", e)
      }
    }
  }, [currentRaceIndex])

  // Save tweets to localStorage
  const saveTweets = (newTweets: Tweet[]) => {
    const dataToSave = {
      savedTweets: newTweets,
      savedRaceIndex: currentRaceIndex,
    }
    localStorage.setItem("f1TrackerNewsroom", JSON.stringify(dataToSave))

    // Update used tweet IDs
    const newUsedTweetIds = [...usedTweetIds, ...newTweets.map((tweet) => tweet.id)]
    setUsedTweetIds(newUsedTweetIds)
    localStorage.setItem("f1TrackerUsedTweets", JSON.stringify(newUsedTweetIds))
  }

  // Reset used tweets for a new season
  const resetUsedTweets = () => {
    if (currentRaceIndex === 0) {
      setUsedTweetIds([])
      localStorage.removeItem("f1TrackerUsedTweets")
    }
  }

  // Generate new tweets
  const generateNews = async () => {
    setLoading(true)
    setError(null)
    resetUsedTweets()

    try {
      const response = await fetch("/api/generate-news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          drivers,
          teams,
          currentRaceIndex,
          raceResults,
          usedTweetIds,
        }),
      })

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`)
      }

      const data = await response.json()
      setTweets(data.tweets)
      saveTweets(data.tweets)
    } catch (err: any) {
      console.error("Error generating news:", err)
      setError(err.message || "Failed to generate news. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="bg-[#1e1e1e] border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center text-white">
            <Newspaper className="h-5 w-5 mr-2 text-[#e10600]" />
            F1 Newsroom
          </div>
          <Button onClick={generateNews} disabled={loading} className="bg-[#e10600] hover:bg-[#b30500]" size="sm">
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh News
              </>
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && <div className="mb-4 p-3 bg-red-900/30 border border-red-800 rounded-md text-red-300">{error}</div>}

        <div className="text-sm text-gray-400 mb-4">
          Latest commentary about {races[currentRaceIndex]} and the championship standings
        </div>

        {loading ? (
          // Loading skeletons
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="border border-gray-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : tweets.length > 0 ? (
          // Tweets display
          <div className="space-y-6">
            {tweets.map((tweet) => (
              <div
                key={tweet.id}
                className="border border-gray-800 rounded-lg p-4 hover:bg-[#252525] transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-800">
                    <img
                      src={tweet.avatar || `/placeholder.svg?height=48&width=48&text=${tweet.author.charAt(0)}`}
                      alt={tweet.author}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-white">{tweet.author}</span>
                      <span className="text-gray-500">
                        @{tweet.handle} · {tweet.timestamp}
                      </span>
                    </div>
                    <div className="mt-1 text-white whitespace-pre-line">{tweet.content}</div>
                    <div className="mt-3 flex items-center gap-6 text-gray-500">
                      <div className="flex items-center gap-1 hover:text-blue-400 cursor-pointer">
                        <MessageCircle className="h-4 w-4" />
                        <span>{tweet.replies}</span>
                      </div>
                      <div className="flex items-center gap-1 hover:text-green-400 cursor-pointer">
                        <Repeat2 className="h-4 w-4" />
                        <span>{tweet.retweets}</span>
                      </div>
                      <div className="flex items-center gap-1 hover:text-red-400 cursor-pointer">
                        <Heart className="h-4 w-4" />
                        <span>{tweet.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty state
          <div className="text-center py-12 border border-gray-800 rounded-lg">
            <Newspaper className="h-12 w-12 mx-auto text-gray-600 mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">No news yet</h3>
            <p className="text-gray-400 mb-4">Generate the latest F1 commentary from pundits and journalists</p>
            <Button onClick={generateNews} className="bg-[#e10600] hover:bg-[#b30500]">
              Generate News
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

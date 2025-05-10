import { NextResponse } from "next/server"
import type { Driver, RaceResult, Team } from "@/lib/types"
import { races } from "@/lib/f1-data"
import { commentatorImages } from "@/lib/commentators"
import { tweetPool } from "@/lib/tweet-pool"

export async function POST(request: Request) {
  try {
    const { drivers, teams, currentRaceIndex, raceResults } = await request.json()

    // Get used tweet IDs from localStorage (if available on client)
    let usedTweetIds: string[] = []
    try {
      const savedUsedTweets = localStorage.getItem("f1TrackerUsedTweets")
      if (savedUsedTweets) {
        usedTweetIds = JSON.parse(savedUsedTweets)
      }
    } catch (e) {
      // If localStorage is not available (server-side), we'll start with an empty array
      console.log("Could not access localStorage for used tweets")
    }

    // Generate tweets using the expanded tweet pool
    const tweets = generateTweetsFromPool(drivers, teams, currentRaceIndex, raceResults, usedTweetIds)

    // Save the newly used tweet IDs
    const newUsedTweetIds = tweets.map((tweet) => tweet.id)
    try {
      localStorage.setItem("f1TrackerUsedTweets", JSON.stringify([...usedTweetIds, ...newUsedTweetIds]))
    } catch (e) {
      console.log("Could not save used tweets to localStorage")
    }

    // Add additional tweet metadata and match with commentator images
    const processedTweets = tweets.map((tweet: any, index: number) => {
      // Find the commentator image or use a default
      const commentatorImage = commentatorImages.find(
        (c) =>
          c.name.toLowerCase() === tweet.author.toLowerCase() ||
          (tweet.handle && c.handle.toLowerCase() === tweet.handle.toLowerCase()),
      )

      return {
        ...tweet,
        timestamp: getRandomTimestamp(),
        likes: Math.floor(Math.random() * 2000) + 100,
        retweets: Math.floor(Math.random() * 500) + 50,
        replies: Math.floor(Math.random() * 200) + 20,
        avatar:
          commentatorImage?.image ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(tweet.author)}&background=random`,
      }
    })

    return NextResponse.json({ tweets: processedTweets, usingFallback: true })
  } catch (error) {
    console.error("Error generating news:", error)
    return NextResponse.json({ error: "Failed to generate news" }, { status: 500 })
  }
}

// Helper function to get a driver's name by ID
function getDriverNameById(drivers: Driver[], id: string): string {
  const driver = drivers.find((d) => d.id === id)
  return driver ? driver.name : "Unknown Driver"
}

// Helper function to get driver ID by position
function getDriverIdByPosition(results: RaceResult[], position: number): string {
  const result = results.find((r) => r.position === position)
  return result ? result.driverId : "unknown"
}

// Helper function to generate a random recent timestamp
function getRandomTimestamp(): string {
  const now = new Date()
  const minutesAgo = Math.floor(Math.random() * 120) + 1 // 1-120 minutes ago
  const timestamp = new Date(now.getTime() - minutesAgo * 60000)

  // Format as "2h" or "45m" ago
  if (minutesAgo >= 60) {
    return `${Math.floor(minutesAgo / 60)}h`
  } else {
    return `${minutesAgo}m`
  }
}

// Function to generate tweets from the expanded pool
function generateTweetsFromPool(
  drivers: Driver[],
  teams: Team[],
  currentRaceIndex: number,
  raceResults: RaceResult[][],
  usedTweetIds: string[],
) {
  // Sort drivers and teams by points
  const sortedDrivers = [...drivers].sort((a, b) => b.points - a.points)
  const sortedTeams = [...teams].sort((a, b) => b.points - a.points)

  // Get top drivers and teams
  const topDriver = sortedDrivers[0] || { name: "the championship leader", teamName: "the top team" }
  const secondDriver = sortedDrivers[1] || { name: "the second-place driver", teamName: "their team" }
  const thirdDriver = sortedDrivers[2] || { name: "the third-place driver", teamName: "their team" }
  const topTeam = sortedTeams[0] || { name: "the top team" }
  const secondTeam = sortedTeams[1] || { name: "the second-place team" }

  // Get lowest drivers and teams (for bottom of standings tweets)
  const lowestDriver = sortedDrivers[sortedDrivers.length - 1] || {
    name: "the driver at the back",
    teamName: "their team",
  }
  const lowestTeam = sortedTeams[sortedTeams.length - 1] || { name: "the team at the back" }

  // Get Americar info
  const americarTeam = teams.find((team) => team.id === "americar")
  const americarDrivers = drivers.filter((driver) => driver.team === "americar")
  const americarDriver1 = americarDrivers[0]?.name || "the Americar driver"
  const americarDriver2 = americarDrivers[1]?.name || "the other Americar driver"

  // Get Americar position in constructor standings
  const americarPosition = sortedTeams.findIndex((team) => team.id === "americar") + 1
  const isAmericarTopHalf = americarPosition <= Math.ceil(teams.length / 2)

  // Get last race winner if available
  let lastRaceWinner = topDriver.name
  let lastRaceSecond = secondDriver.name
  let lastRaceThird = thirdDriver.name
  if (currentRaceIndex > 0 && raceResults[currentRaceIndex - 1]) {
    const winnerId = getDriverIdByPosition(raceResults[currentRaceIndex - 1], 1)
    lastRaceWinner = getDriverNameById(drivers, winnerId)

    const secondId = getDriverIdByPosition(raceResults[currentRaceIndex - 1], 2)
    lastRaceSecond = getDriverNameById(drivers, secondId)

    const thirdId = getDriverIdByPosition(raceResults[currentRaceIndex - 1], 3)
    lastRaceThird = getDriverNameById(drivers, thirdId)
  }

  // Current race
  const currentRace = races[currentRaceIndex]
  // Next race (if available)
  const nextRace = currentRaceIndex < races.length - 1 ? races[currentRaceIndex + 1] : "the final race"

  // Determine season state
  const totalRaces = races.length
  const isPreSeason = currentRaceIndex === 0 && !raceResults[0] // Before first race
  const isMidSeasonBreak = currentRaceIndex === Math.floor(totalRaces / 2) // Middle of season
  const isAbuDhabi = currentRaceIndex === totalRaces - 1 && !raceResults[currentRaceIndex] // Before final race
  const isPostSeason = currentRaceIndex === totalRaces - 1 && raceResults[currentRaceIndex] // After final race

  // Filter tweets based on season state
  let filteredTweetPool = [...tweetPool]

  // If we're in a special period, only use tweets for that period
  if (isPreSeason) {
    filteredTweetPool = tweetPool.filter((tweet) => tweet.id.startsWith("preseason-"))
    console.log("Using pre-season tweets")
  } else if (isMidSeasonBreak) {
    filteredTweetPool = tweetPool.filter((tweet) => tweet.id.startsWith("midseason-"))
    console.log("Using mid-season break tweets")
  } else if (isAbuDhabi) {
    filteredTweetPool = tweetPool.filter((tweet) => tweet.id.startsWith("preabudhabi-"))
    console.log("Using pre-Abu Dhabi tweets")
  } else if (isPostSeason) {
    filteredTweetPool = tweetPool.filter((tweet) => tweet.id.startsWith("postseason-"))
    console.log("Using post-season tweets")
  } else {
    // For regular races, exclude special period tweets
    filteredTweetPool = tweetPool.filter(
      (tweet) =>
        !tweet.id.startsWith("preseason-") &&
        !tweet.id.startsWith("midseason-") &&
        !tweet.id.startsWith("preabudhabi-") &&
        !tweet.id.startsWith("postseason-"),
    )
    console.log("Using regular race tweets")
  }

  // Create a large pool of tweets with dynamic content
  const dynamicTweetPool = filteredTweetPool.map((tweet) => {
    // Replace placeholders with actual data
    let content = tweet.content
      .replace(/\{topDriver\}/g, topDriver.name)
      .replace(/\{topDriverTeam\}/g, topDriver.teamName)
      .replace(/\{topDriverPoints\}/g, topDriver.points.toString())
      .replace(/\{secondDriver\}/g, secondDriver.name)
      .replace(/\{thirdDriver\}/g, thirdDriver.name)
      .replace(/\{topTeam\}/g, topTeam.name)
      .replace(/\{secondTeam\}/g, secondTeam.name)
      .replace(/\{lowestDriver\}/g, lowestDriver.name)
      .replace(/\{lowestTeam\}/g, lowestTeam.name)
      .replace(/\{americarDriver1\}/g, americarDriver1)
      .replace(/\{americarDriver2\}/g, americarDriver2)
      .replace(/\{americarTeam\}/g, americarTeam?.name || "Americar")
      .replace(/\{lastRaceWinner\}/g, lastRaceWinner)
      .replace(/\{lastRaceSecond\}/g, lastRaceSecond)
      .replace(/\{lastRaceThird\}/g, lastRaceThird)
      .replace(/\{currentRace\}/g, currentRace)
      .replace(/\{nextRace\}/g, nextRace)
      .replace(/\{currentRaceIndex\}/g, (currentRaceIndex + 1).toString())
      .replace(/\{totalRaces\}/g, races.length.toString())
      .replace(/\{americarPosition\}/g, americarPosition.toString())

    // Filter out tweets that make claims about Americar being a midfield team if they're not
    if (content.includes("midfield") && content.includes("Americar") && !isAmericarTopHalf) {
      // Replace with a more factual statement
      content = content
        .replace(/midfield contenders/g, "showing improvement")
        .replace(/midfield battle/g, "improving their performance")
        .replace(/midfield team/g, "developing team")
    }

    return {
      ...tweet,
      content,
    }
  })

  // Filter out already used tweets
  const availableTweets = dynamicTweetPool.filter((tweet) => !usedTweetIds.includes(tweet.id))

  // If we've used all tweets, reset the pool
  const tweetsToUse = availableTweets.length >= 7 ? availableTweets : dynamicTweetPool

  // Randomly select 7 tweets from the pool
  const shuffledTweets = [...tweetsToUse].sort(() => 0.5 - Math.random())
  return shuffledTweets.slice(0, 7)
}

import { NextResponse } from "next/server"
import type { Driver, RaceResult, Team } from "@/lib/types"
import { races } from "@/lib/f1-data"
import { commentatorImages } from "@/lib/commentators"
import { tweetPool } from "@/lib/tweet-pool"

export async function POST(request: Request) {
  try {
    const { drivers, teams, currentRaceIndex, raceResults, usedTweetIds = [] } = await request.json()

    // Generate tweets using the expanded tweet pool
    const tweets = generateTweetsFromPool(drivers, teams, currentRaceIndex, raceResults, usedTweetIds)

    // Add additional tweet metadata and match with commentator images
    const processedTweets = tweets.map((tweet) => {
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

    return NextResponse.json({ tweets: processedTweets })
  } catch (error) {
    console.error("Error generating news:", error)
    return NextResponse.json({ error: "Failed to generate news", details: String(error) }, { status: 500 })
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
  usedTweetIds: string[] = [],
) {
  try {
    // Sort drivers and teams by points
    const sortedDrivers = [...drivers].sort((a, b) => b.points - a.points)
    const sortedTeams = [...teams].sort((a, b) => b.points - a.points)

    // Get top drivers and teams
    const topDriver = sortedDrivers[0] || { name: "the championship leader", teamName: "the top team", points: 0 }
    const secondDriver = sortedDrivers[1] || { name: "the second-place driver", teamName: "their team", points: 0 }
    const thirdDriver = sortedDrivers[2] || { name: "the third-place driver", teamName: "their team", points: 0 }
    const fourthDriver = sortedDrivers[3] || { name: "the fourth-place driver", teamName: "their team", points: 0 }
    const fifthDriver = sortedDrivers[4] || { name: "the fifth-place driver", teamName: "their team", points: 0 }
    const sixthDriver = sortedDrivers[5] || { name: "the sixth-place driver", teamName: "their team", points: 0 }
    const seventhDriver = sortedDrivers[6] || { name: "the seventh-place driver", teamName: "their team", points: 0 }
    const eighthDriver = sortedDrivers[7] || { name: "the eighth-place driver", teamName: "their team", points: 0 }
    const ninthDriver = sortedDrivers[8] || { name: "the ninth-place driver", teamName: "their team", points: 0 }
    const tenthDriver = sortedDrivers[9] || { name: "the tenth-place driver", teamName: "their team", points: 0 }

    const topTeam = sortedTeams[0] || { name: "the top team", points: 0 }
    const secondTeam = sortedTeams[1] || { name: "the second-place team", points: 0 }

    // Get midfield teams (3rd to 7th)
    const thirdTeam = sortedTeams[2] || { name: "the third-place team", points: 0 }
    const fourthTeam = sortedTeams[3] || { name: "the fourth-place team", points: 0 }
    const fifthTeam = sortedTeams[4] || { name: "the fifth-place team", points: 0 }
    const sixthTeam = sortedTeams[5] || { name: "the sixth-place team", points: 0 }
    const seventhTeam = sortedTeams[6] || { name: "the seventh-place team", points: 0 }

    // Get lowest drivers and teams (for bottom of standings tweets)
    const lowestDriver = sortedDrivers[sortedDrivers.length - 1] || {
      name: "the driver at the back",
      teamName: "their team",
      points: 0,
    }
    const lowestTeam = sortedTeams[sortedTeams.length - 1] || { name: "the team at the back", points: 0 }

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
    const currentRace = races[currentRaceIndex] || "the current race"
    // Next race (if available)
    const nextRace = currentRaceIndex < races.length - 1 ? races[currentRaceIndex + 1] : "the final race"

    // Determine season state
    const totalRaces = races.length
    const racesRemaining = Math.max(0, totalRaces - currentRaceIndex)
    const isPreSeason = currentRaceIndex === 0 && !raceResults[0] // Before first race
    const isMidSeasonBreak = currentRaceIndex === Math.floor(totalRaces / 2) // Middle of season
    const isAbuDhabi = currentRaceIndex === totalRaces - 1 && !raceResults[currentRaceIndex] // Before final race
    const isPostSeason = currentRaceIndex === totalRaces - 1 && raceResults[currentRaceIndex] // After final race

    // Champion info for post-season tweets
    const championDriver = topDriver.name
    const championTeam = topTeam.name
    const championDriverTitles = "first" // This would need to be determined based on historical data

    // Pre-calculate all the math expressions that might be used in tweets
    const pointsDiffTop1Top2 = Math.abs((sortedDrivers[0]?.points || 0) - (sortedDrivers[1]?.points || 0))
    const pointsDiffTop2Top3 = Math.abs((sortedDrivers[1]?.points || 0) - (sortedDrivers[2]?.points || 0))
    const pointsDiffTeam1Team2 = Math.abs((sortedTeams[0]?.points || 0) - (sortedTeams[1]?.points || 0))
    const pointsDiffTeam2Team3 = Math.abs((sortedTeams[1]?.points || 0) - (sortedTeams[2]?.points || 0))
    const pointsDiffTeam3Team4 = Math.abs((sortedTeams[2]?.points || 0) - (sortedTeams[3]?.points || 0))
    const pointsDiffTeam3Team5 = Math.abs((sortedTeams[2]?.points || 0) - (sortedTeams[4]?.points || 0))
    const pointsDiffTeam4Team5 = Math.abs((sortedTeams[3]?.points || 0) - (sortedTeams[4]?.points || 0))
    const pointsDiffTeam5Team6 = Math.abs((sortedTeams[4]?.points || 0) - (sortedTeams[5]?.points || 0))
    const pointsDiffTeam6Team7 = Math.abs((sortedTeams[5]?.points || 0) - (sortedTeams[6]?.points || 0))

    // Calculate positions needed to secure championship
    const pointsNeededForTitle = (sortedDrivers[1]?.points || 0) - (sortedDrivers[0]?.points || 0) + 25
    const positionNeededForTitle = Math.max(1, Math.ceil(pointsNeededForTitle / 25))

    // Filter tweets based on season state
    let filteredTweetPool = [...tweetPool]

    // If we're in a special period, only use tweets for that period
    if (isPreSeason) {
      filteredTweetPool = tweetPool.filter((tweet) => tweet.id.startsWith("preseason-"))
    } else if (isMidSeasonBreak) {
      filteredTweetPool = tweetPool.filter((tweet) => tweet.id.startsWith("midseason-"))
    } else if (isAbuDhabi) {
      filteredTweetPool = tweetPool.filter((tweet) => tweet.id.startsWith("preabudhabi-"))
    } else if (isPostSeason) {
      filteredTweetPool = tweetPool.filter((tweet) => tweet.id.startsWith("postseason-"))
    } else {
      // For regular races, exclude special period tweets
      filteredTweetPool = tweetPool.filter(
        (tweet) =>
          !tweet.id.startsWith("preseason-") &&
          !tweet.id.startsWith("midseason-") &&
          !tweet.id.startsWith("preabudhabi-") &&
          !tweet.id.startsWith("postseason-"),
      )
    }

    // Create a large pool of tweets with dynamic content
    const dynamicTweetPool = filteredTweetPool.map((tweet) => {
      // Replace placeholders with actual data
      let content = tweet.content
        // Top drivers and teams
        .replace(/\{topDriver\}/g, topDriver.name)
        .replace(/\{topDriverTeam\}/g, topDriver.teamName)
        .replace(/\{topDriverPoints\}/g, String(topDriver.points))
        .replace(/\{secondDriver\}/g, secondDriver.name)
        .replace(/\{thirdDriver\}/g, thirdDriver.name)
        .replace(/\{thirdDriverPoints\}/g, String(thirdDriver.points))

        // Midfield drivers
        .replace(/\{fourthDriver\}/g, fourthDriver.name)
        .replace(/\{fifthDriver\}/g, fifthDriver.name)
        .replace(/\{sixthDriver\}/g, sixthDriver.name)
        .replace(/\{seventhDriver\}/g, seventhDriver.name)
        .replace(/\{eighthDriver\}/g, eighthDriver.name)
        .replace(/\{ninthDriver\}/g, ninthDriver.name)
        .replace(/\{tenthDriver\}/g, tenthDriver.name)

        // Teams
        .replace(/\{topTeam\}/g, topTeam.name)
        .replace(/\{secondTeam\}/g, secondTeam.name)
        .replace(/\{thirdTeam\}/g, thirdTeam.name)
        .replace(/\{fourthTeam\}/g, fourthTeam.name)
        .replace(/\{fifthTeam\}/g, fifthTeam.name)
        .replace(/\{sixthTeam\}/g, sixthTeam.name)
        .replace(/\{seventhTeam\}/g, seventhTeam.name)

        // Bottom of the grid
        .replace(/\{lowestDriver\}/g, lowestDriver.name)
        .replace(/\{lowestTeam\}/g, lowestTeam.name)

        // Americar team
        .replace(/\{americarDriver1\}/g, americarDriver1)
        .replace(/\{americarDriver2\}/g, americarDriver2)
        .replace(/\{americarTeam\}/g, americarTeam?.name || "Americar")
        .replace(/\{americarPosition\}/g, String(americarPosition))

        // Race results
        .replace(/\{lastRaceWinner\}/g, lastRaceWinner)
        .replace(/\{lastRaceSecond\}/g, lastRaceSecond)
        .replace(/\{lastRaceThird\}/g, lastRaceThird)

        // Race info
        .replace(/\{currentRace\}/g, currentRace)
        .replace(/\{nextRace\}/g, nextRace)
        .replace(/\{currentRaceIndex\}/g, String(currentRaceIndex + 1))
        .replace(/\{totalRaces\}/g, String(totalRaces))

        // Champion info (for post-season)
        .replace(/\{championDriver\}/g, championDriver)
        .replace(/\{championTeam\}/g, championTeam)
        .replace(/\{championDriverTitles\}/g, championDriverTitles)

        // Pre-calculated math expressions
        .replace(
          /\{Math\.abs$$sortedDrivers\[0\]\.points - sortedDrivers\[1\]\.points$$\}/g,
          String(pointsDiffTop1Top2),
        )
        .replace(
          /\{Math\.abs$$sortedDrivers\[1\]\.points - sortedDrivers\[2\]\.points$$\}/g,
          String(pointsDiffTop2Top3),
        )
        .replace(/\{Math\.abs$$sortedTeams\[0\]\.points - sortedTeams\[1\]\.points$$\}/g, String(pointsDiffTeam1Team2))
        .replace(/\{Math\.abs$$sortedTeams\[1\]\.points - sortedTeams\[2\]\.points$$\}/g, String(pointsDiffTeam2Team3))
        .replace(/\{Math\.abs$$sortedTeams\[2\]\.points - sortedTeams\[3\]\.points$$\}/g, String(pointsDiffTeam3Team4))
        .replace(/\{Math\.abs$$sortedTeams\[2\]\.points - sortedTeams\[5\]\.points$$\}/g, String(pointsDiffTeam3Team5))
        .replace(/\{Math\.abs$$sortedTeams\[3\]\.points - sortedTeams\[4\]\.points$$\}/g, String(pointsDiffTeam4Team5))
        .replace(/\{Math\.abs$$sortedTeams\[4\]\.points - sortedTeams\[5\]\.points$$\}/g, String(pointsDiffTeam5Team6))
        .replace(/\{Math\.abs$$sortedTeams\[5\]\.points - sortedTeams\[6\]\.points$$\}/g, String(pointsDiffTeam6Team7))

        // Position needed for title
        .replace(
          /\{Math\.ceil$$\(sortedDrivers\[1\]\.points - sortedDrivers\[0\]\.points \+ 25$$ \/ 25\)\}/g,
          String(positionNeededForTitle),
        )

        // Races remaining calculation
        .replace(/\{totalRaces - currentRaceIndex\}/g, String(racesRemaining))

        // Team points
        .replace(/\{sortedTeams\[2\]\.points\}/g, String(sortedTeams[2]?.points || 0))
        .replace(
          /\{Math\.abs$$sortedTeams\[3\]\.points - sortedTeams\[4\]\.points$$ \+ 1\}/g,
          String(pointsDiffTeam4Team5 + 1),
        )

        // Driver points
        .replace(/\{currentRaceIndex - 1\}/g, String(Math.max(0, currentRaceIndex - 1)))
        .replace(/\{currentRaceIndex - 2\}/g, String(Math.max(0, currentRaceIndex - 2)))
        .replace(/\{currentRaceIndex - 3\}/g, String(Math.max(0, currentRaceIndex - 3)))
        .replace(/\{currentRaceIndex - 5\}/g, String(Math.max(0, currentRaceIndex - 5)))

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

    // Determine how many tweets to show (between 7-12 depending on availability)
    const numTweets = Math.min(12, Math.max(7, tweetsToUse.length / 3))

    // Randomly select tweets from the pool
    const shuffledTweets = [...tweetsToUse].sort(() => 0.5 - Math.random())
    return shuffledTweets.slice(0, numTweets)
  } catch (error) {
    console.error("Error in generateTweetsFromPool:", error)
    // Return a few basic tweets as fallback
    return [
      {
        id: "fallback-1",
        author: "F1 News",
        handle: "F1News",
        content: "The race weekend is underway! Stay tuned for more updates.",
      },
      {
        id: "fallback-2",
        author: "F1 News",
        handle: "F1News",
        content: "Teams are preparing for the upcoming sessions. Weather conditions look favorable.",
      },
      {
        id: "fallback-3",
        author: "F1 News",
        handle: "F1News",
        content: "The championship battle continues to heat up as we approach the next race.",
      },
    ]
  }
}

import { tweetPool } from "./tweet-pool"

interface SeasonState {
  currentRaceIndex: number
  totalRaces: number
  isPreSeason: boolean
  isMidSeasonBreak: boolean
  isPostSeason: boolean
  isAbuDhabi: boolean
}

// Keep track of used tweets
const usedTweets = new Set<string>()

export function getTweetsForCurrentState(state: SeasonState) {
  const { currentRaceIndex, totalRaces, isPreSeason, isMidSeasonBreak, isPostSeason, isAbuDhabi } = state

  // Filter tweets based on season state
  const relevantTweets = tweetPool.filter((tweet) => {
    // Always include non-time-specific tweets
    if (
      !tweet.id.startsWith("preseason-") &&
      !tweet.id.startsWith("midseason-") &&
      !tweet.id.startsWith("preabudhabi-") &&
      !tweet.id.startsWith("postseason-")
    ) {
      return true
    }

    // Include pre-season tweets only before the first race
    if (isPreSeason && tweet.id.startsWith("preseason-")) {
      return true
    }

    // Include mid-season break tweets during the break
    if (isMidSeasonBreak && tweet.id.startsWith("midseason-")) {
      return true
    }

    // Include pre-Abu Dhabi tweets before the final race
    if (isAbuDhabi && tweet.id.startsWith("preabudhabi-")) {
      return true
    }

    // Include post-season tweets after the final race
    if (isPostSeason && tweet.id.startsWith("postseason-")) {
      return true
    }

    return false
  })

  // Filter out used tweets
  let unusedTweets = relevantTweets.filter((tweet) => !usedTweets.has(tweet.id))

  // If we've used all tweets, reset the used tweets set
  if (unusedTweets.length === 0) {
    usedTweets.clear()
    unusedTweets = relevantTweets
  }

  // Shuffle the unused tweets
  const shuffledTweets = shuffleArray(unusedTweets)

  // Mark the first tweet as used (assuming we'll use it)
  if (shuffledTweets.length > 0) {
    usedTweets.add(shuffledTweets[0].id)
  }

  return shuffledTweets
}

// Helper function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

// Helper function to determine season state
export function determineSeasonState(currentRaceIndex: number, totalRaces: number, currentRace: string): SeasonState {
  return {
    currentRaceIndex,
    totalRaces,
    isPreSeason: currentRaceIndex === 0,
    isMidSeasonBreak: currentRaceIndex === Math.floor(totalRaces / 2),
    isPostSeason: currentRaceIndex > totalRaces,
    isAbuDhabi: currentRace.toLowerCase() === "abu dhabi",
  }
}

// Function to reset used tweets (useful for testing or when starting a new season)
export function resetUsedTweets() {
  usedTweets.clear()
}

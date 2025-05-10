export interface Driver {
  id: string
  name: string
  code: string
  team: string
  teamName: string
  points: number
  raceResults?: {
    position: number
    points: number
  }[]
}

export interface Team {
  id: string
  name: string
  points: number
}

export interface RaceResult {
  driverId: string
  position: number
}

export interface Tweet {
  id: string
  author: string
  handle: string
  content: string
  timestamp: string
  avatar: string
  likes: number
  retweets: number
  replies: number
}

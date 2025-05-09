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

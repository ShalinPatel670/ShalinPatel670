"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Driver, RaceResult } from "@/lib/types"
import { getTeamColor } from "@/lib/utils"
import { Clock, Trophy } from "lucide-react"
import { races } from "@/lib/f1-data"

interface PastResultsProps {
  drivers: Driver[]
  raceResults: RaceResult[][]
  fastestLaps: (string | null)[]
}

export default function PastResults({ drivers, raceResults, fastestLaps }: PastResultsProps) {
  const [selectedSeason, setSelectedSeason] = useState("1")
  const [selectedRace, setSelectedRace] = useState<string | null>(null)
  const [completedRaces, setCompletedRaces] = useState<number[]>([])

  // Find races that have results
  useEffect(() => {
    const racesWithResults = raceResults
      .map((result, index) => (result && result.length > 0 ? index : -1))
      .filter((index) => index !== -1)

    setCompletedRaces(racesWithResults)

    // Auto-select the most recent race if none is selected
    if (!selectedRace && racesWithResults.length > 0) {
      setSelectedRace(racesWithResults[racesWithResults.length - 1].toString())
    }
  }, [raceResults, selectedRace])

  // Get race results for the selected race
  const getSelectedRaceResults = () => {
    if (!selectedRace) return []

    const raceIndex = Number.parseInt(selectedRace)
    if (isNaN(raceIndex) || !raceResults[raceIndex] || raceResults[raceIndex].length === 0) return []

    return raceResults[raceIndex]
  }

  // Get driver details by ID
  const getDriverById = (driverId: string) => {
    return drivers.find((driver) => driver.id === driverId) || null
  }

  // Get fastest lap driver name
  const getFastestLapDriver = () => {
    if (!selectedRace) return "N/A"

    const raceIndex = Number.parseInt(selectedRace)
    if (isNaN(raceIndex) || !fastestLaps[raceIndex]) return "N/A"

    const driverId = fastestLaps[raceIndex]
    if (!driverId) return "N/A"

    const driver = getDriverById(driverId)
    return driver ? driver.name : "N/A"
  }

  // Calculate points for a position
  const calculatePoints = (position: number, hasFastestLap: boolean): number => {
    const pointsSystem = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1]
    const positionPoints = position <= 10 ? pointsSystem[position - 1] : 0
    const fastestLapPoint = hasFastestLap && position <= 10 ? 1 : 0
    return positionPoints + fastestLapPoint
  }

  const selectedRaceResults = getSelectedRaceResults()
  const fastestLapDriverId = selectedRace ? fastestLaps[Number.parseInt(selectedRace)] : null

  return (
    <Card className="bg-[#1e1e1e] border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-white">
          <Trophy className="h-5 w-5 mr-2 text-[#e10600]" />
          Past Race Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Season</label>
            <Select value={selectedSeason} onValueChange={setSelectedSeason}>
              <SelectTrigger className="w-full bg-[#252525] border-gray-700 text-white">
                <SelectValue placeholder="Select season" />
              </SelectTrigger>
              <SelectContent className="bg-[#252525] border-gray-700">
                <SelectItem value="1" className="text-white hover:bg-[#333333]">
                  Season 1
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Race</label>
            <Select value={selectedRace || ""} onValueChange={setSelectedRace}>
              <SelectTrigger className="w-full bg-[#252525] border-gray-700 text-white">
                <SelectValue placeholder="Select race" />
              </SelectTrigger>
              <SelectContent className="bg-[#252525] border-gray-700">
                {completedRaces.map((raceIndex) => (
                  <SelectItem key={raceIndex} value={raceIndex.toString()} className="text-white hover:bg-[#333333]">
                    Race {raceIndex + 1}: {races[raceIndex]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedRace && selectedRaceResults.length > 0 ? (
          <>
            <h3 className="text-xl font-bold mb-4 text-white">{races[Number.parseInt(selectedRace)]} Results</h3>

            <div className="mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-purple-400" />
              <span className="text-gray-300">Fastest Lap: </span>
              <span className="ml-2 font-bold text-white">{getFastestLapDriver()}</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left border-b border-gray-800">
                    <th className="py-2 px-4 font-mono text-gray-400 w-12">POS</th>
                    <th className="py-2 px-4 font-mono text-gray-400">DRIVER</th>
                    <th className="py-2 px-4 font-mono text-gray-400">TEAM</th>
                    <th className="py-2 px-4 font-mono text-gray-400 text-right">PTS</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedRaceResults.map((result) => {
                    const driver = getDriverById(result.driverId)
                    if (!driver) return null

                    const hasFastestLap = fastestLapDriverId === driver.id
                    const points = calculatePoints(result.position, hasFastestLap)

                    return (
                      <tr key={result.driverId} className="border-b border-gray-800 hover:bg-[#252525]">
                        <td className="py-3 px-4 font-mono font-bold text-white">{result.position}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            <div
                              className="w-1 h-12 mr-3 rounded-sm"
                              style={{ backgroundColor: getTeamColor(driver.team) }}
                            ></div>
                            <div>
                              <div className="font-bold text-white">
                                {driver.name}
                                {hasFastestLap && <span className="ml-2 text-purple-400 text-sm">(FL)</span>}
                              </div>
                              <div className="text-sm text-gray-400">{driver.code}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-gray-300">{driver.teamName}</td>
                        <td className="py-3 px-4 font-mono font-bold text-right text-white">{points}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="text-center py-12 border border-gray-800 rounded-lg">
            <Trophy className="h-12 w-12 mx-auto text-gray-600 mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">No race selected</h3>
            <p className="text-gray-400">
              {completedRaces.length > 0
                ? "Select a race from the dropdown to view results"
                : "No race results available yet"}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

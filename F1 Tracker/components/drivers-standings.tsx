"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Driver, RaceResult } from "@/lib/types"
import { getTeamColor } from "@/lib/utils"

interface DriversStandingsProps {
  drivers: Driver[]
  isSeasonComplete: boolean
  raceResults: RaceResult[][]
  fastestLaps: (string | null)[]
}

export default function DriversStandings({
  drivers,
  isSeasonComplete,
  raceResults,
  fastestLaps,
}: DriversStandingsProps) {
  const [hoveredDriver, setHoveredDriver] = useState<string | null>(null)

  // Sort drivers by points (descending)
  const sortedDrivers = [...drivers].sort((a, b) => b.points - a.points)

  return (
    <Card className="bg-[#1e1e1e] border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-white">
          <div className="flex-1">Drivers Championship</div>
          {isSeasonComplete && <div className="text-[#e10600] text-sm font-normal">FINAL STANDINGS</div>}
        </CardTitle>
      </CardHeader>
      <CardContent>
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
              {sortedDrivers.map((driver, index) => (
                <tr
                  key={driver.id}
                  className={`border-b border-gray-800 hover:bg-[#252525] ${index === 0 ? "bg-[#252525]" : ""}`}
                  onMouseOver={() => setHoveredDriver(driver.id)}
                  onMouseOut={() => setHoveredDriver(null)}
                >
                  <td className="py-3 px-4 font-mono font-bold text-white">{index + 1}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div
                        className="w-1 h-12 mr-3 rounded-sm"
                        style={{ backgroundColor: getTeamColor(driver.team) }}
                      ></div>
                      <div>
                        <div className="font-bold text-white">{driver.name}</div>
                        <div className="text-sm text-gray-400">{driver.code}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-300">{driver.teamName}</td>
                  <td className="py-3 px-4 font-mono font-bold text-right text-white">{driver.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

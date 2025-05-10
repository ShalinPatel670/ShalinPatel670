"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Driver, RaceResult } from "@/lib/types"
import { getTeamColor } from "@/lib/utils"
import { Flag, Clock } from "lucide-react"

interface RaceInputProps {
  drivers: Driver[]
  onSubmit: (results: RaceResult[], fastestLap: string | null) => void
}

export default function RaceInput({ drivers, onSubmit }: RaceInputProps) {
  // Instead of storing positions by driver ID, we store driver IDs by position
  const [selectedDrivers, setSelectedDrivers] = useState<Record<number, string>>({})
  const [fastestLap, setFastestLap] = useState<string | null>(null)
  const [errors, setErrors] = useState<string[]>([])

  // Check if a driver is already assigned to another position
  const isDriverSelected = (driverId: string, currentPosition: number): boolean => {
    return Object.entries(selectedDrivers).some(
      ([position, id]) => id === driverId && Number.parseInt(position) !== currentPosition,
    )
  }

  // Handle driver selection for a position
  const handleDriverSelection = (position: number, driverId: string) => {
    setSelectedDrivers((prev) => ({
      ...prev,
      [position]: driverId,
    }))
  }

  // Submit race results
  const handleSubmit = () => {
    // Validate that all positions have drivers
    const newErrors: string[] = []

    // Check if all positions from 1 to drivers.length have a driver assigned
    for (let i = 1; i <= drivers.length; i++) {
      if (!selectedDrivers[i]) {
        newErrors.push(`Position ${i} must have a driver assigned`)
        break // Just show one error for missing positions
      }
    }

    if (!fastestLap) {
      newErrors.push("Fastest lap must be assigned to a driver")
    }

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    // Format results
    const results: RaceResult[] = Object.entries(selectedDrivers).map(([position, driverId]) => ({
      driverId,
      position: Number.parseInt(position),
    }))

    onSubmit(results, fastestLap)
  }

  // Get driver name by ID
  const getDriverName = (driverId: string): string => {
    const driver = drivers.find((d) => d.id === driverId)
    return driver ? driver.name : ""
  }

  // Get driver team color by ID
  const getDriverTeamColor = (driverId: string): string => {
    const driver = drivers.find((d) => d.id === driverId)
    return driver ? getTeamColor(driver.team) : "#CCCCCC"
  }

  // Get driver team name by ID
  const getDriverTeamName = (driverId: string): string => {
    const driver = drivers.find((d) => d.id === driverId)
    return driver ? driver.teamName : ""
  }

  return (
    <div>
      {errors.length > 0 && (
        <div className="mb-6 p-4 bg-red-900/30 border border-red-800 rounded-md">
          <h3 className="text-red-400 font-bold mb-2">Please fix the following errors:</h3>
          <ul className="list-disc pl-5 text-red-300">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-4 mb-8">
        {Array.from({ length: drivers.length }, (_, i) => i + 1).map((position) => (
          <div key={position} className="flex items-center gap-4">
            <div className="w-12 font-mono font-bold text-white">P{position}</div>

            {selectedDrivers[position] ? (
              <div className="flex-1 flex items-center">
                <div
                  className="w-1 h-12 mr-3 rounded-sm"
                  style={{ backgroundColor: getDriverTeamColor(selectedDrivers[position]) }}
                ></div>
                <div>
                  <div className="font-bold text-white">{getDriverName(selectedDrivers[position])}</div>
                  <div className="text-sm text-gray-400">{getDriverTeamName(selectedDrivers[position])}</div>
                </div>
              </div>
            ) : (
              <div className="flex-1 text-gray-500 italic">Select driver</div>
            )}

            <Select
              value={selectedDrivers[position] || ""}
              onValueChange={(value) => handleDriverSelection(position, value)}
            >
              <SelectTrigger className="w-48 bg-[#252525] border-gray-700 text-white">
                <SelectValue placeholder="Select driver" className="text-white" />
              </SelectTrigger>
              <SelectContent className="bg-[#252525] border-gray-700">
                {drivers.map((driver) => (
                  <SelectItem
                    key={driver.id}
                    value={driver.id}
                    disabled={isDriverSelected(driver.id, position)}
                    className="hover:bg-[#333333] text-white"
                  >
                    {driver.name} ({driver.code})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-bold mb-4 flex items-center text-white">
          <Clock className="h-5 w-5 mr-2 text-purple-400" />
          Fastest Lap
        </h3>
        <Select value={fastestLap || ""} onValueChange={setFastestLap}>
          <SelectTrigger className="w-full bg-[#252525] border-gray-700 text-white">
            <SelectValue placeholder="Select driver with fastest lap" className="text-white" />
          </SelectTrigger>
          <SelectContent className="bg-[#252525] border-gray-700">
            {drivers.map((driver) => (
              <SelectItem key={driver.id} value={driver.id} className="hover:bg-[#333333]">
                {driver.name} ({driver.code})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleSubmit} className="w-full bg-[#e10600] hover:bg-[#b30500] py-6">
        <Flag className="h-5 w-5 mr-2" />
        Submit Race Results
      </Button>
    </div>
  )
}

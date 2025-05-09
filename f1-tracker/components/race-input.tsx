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
  const [positions, setPositions] = useState<Record<string, number>>({})
  const [fastestLap, setFastestLap] = useState<string | null>(null)
  const [errors, setErrors] = useState<string[]>([])

  // Check if a position is already assigned to another driver
  const isPositionTaken = (pos: number, currentDriverId: string): boolean => {
    return Object.entries(positions).some(([driverId, position]) => position === pos && driverId !== currentDriverId)
  }

  // Handle position change for a driver
  const handlePositionChange = (driverId: string, position: number) => {
    setPositions((prev) => ({
      ...prev,
      [driverId]: position,
    }))
  }

  // Submit race results
  const handleSubmit = () => {
    // Validate that all drivers have positions
    const newErrors: string[] = []

    if (Object.keys(positions).length !== drivers.length) {
      newErrors.push("All drivers must have a position assigned")
    }

    // Check for duplicate positions
    const positionValues = Object.values(positions)
    const uniquePositions = new Set(positionValues)
    if (positionValues.length !== uniquePositions.size) {
      newErrors.push("Each position can only be assigned to one driver")
    }

    if (!fastestLap) {
      newErrors.push("Fastest lap must be assigned to a driver")
    }

    if (newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    // Format results
    const results: RaceResult[] = drivers.map((driver) => ({
      driverId: driver.id,
      position: positions[driver.id] || 0,
    }))

    onSubmit(results, fastestLap)
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
        {drivers.map((driver) => (
          <div key={driver.id} className="flex items-center gap-4">
            <div className="w-1 h-12 rounded-sm" style={{ backgroundColor: getTeamColor(driver.team) }}></div>
            <div className="flex-1">
              <div className="font-bold text-white">{driver.name}</div>
              <div className="text-sm text-gray-400">{driver.teamName}</div>
            </div>
            <Select
              value={positions[driver.id]?.toString() || ""}
              onValueChange={(value) => handlePositionChange(driver.id, Number.parseInt(value))}
            >
              <SelectTrigger className="w-24 bg-[#252525] border-gray-700 text-white">
                <SelectValue placeholder="Pos" className="text-white" />
              </SelectTrigger>
              <SelectContent className="bg-[#252525] border-gray-700">
                {Array.from({ length: 22 }, (_, i) => i + 1).map((pos) => (
                  <SelectItem
                    key={pos}
                    value={pos.toString()}
                    disabled={isPositionTaken(pos, driver.id)}
                    className="hover:bg-[#333333] text-white"
                  >
                    {pos}
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

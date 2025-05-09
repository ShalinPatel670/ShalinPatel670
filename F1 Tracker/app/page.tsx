"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Flag, Users, ChevronRight, Save, RotateCcw } from "lucide-react"
import DriversStandings from "@/components/drivers-standings"
import ConstructorsStandings from "@/components/constructors-standings"
import RaceInput from "@/components/race-input"
import { initialDrivers, initialTeams, races } from "@/lib/f1-data"
import type { Driver, Team, RaceResult } from "@/lib/types"

export default function F1Tracker() {
  const [currentRaceIndex, setCurrentRaceIndex] = useState(0)
  const [drivers, setDrivers] = useState<Driver[]>(initialDrivers)
  const [teams, setTeams] = useState<Team[]>(initialTeams)
  const [raceResults, setRaceResults] = useState<RaceResult[][]>([])
  const [fastestLapDriver, setFastestLapDriver] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("race")
  // Check if there's unsaved data
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("f1TrackerData")
    if (savedData) {
      const { savedDrivers, savedTeams, savedRaceResults, savedCurrentRaceIndex } = JSON.parse(savedData)
      setDrivers(savedDrivers)
      setTeams(savedTeams)
      setRaceResults(savedRaceResults)
      setCurrentRaceIndex(savedCurrentRaceIndex)
    }
  }, [])

  // Save data to localStorage
  const saveData = () => {
    const dataToSave = {
      savedDrivers: drivers,
      savedTeams: teams,
      savedRaceResults: raceResults,
      savedCurrentRaceIndex: currentRaceIndex,
    }
    localStorage.setItem("f1TrackerData", JSON.stringify(dataToSave))
    setHasUnsavedChanges(false)

    // Add visual confirmation
    const saveButton = document.querySelector(".save-button")
    if (saveButton) {
      const originalText = saveButton.innerHTML
      saveButton.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>Saved!'
      setTimeout(() => {
        saveButton.innerHTML = originalText
      }, 2000)
    }
  }

  // Reset all data
  const resetData = () => {
    if (confirm("Are you sure you want to reset all data? This cannot be undone.")) {
      setDrivers(initialDrivers)
      setTeams(initialTeams)
      setRaceResults([])
      setCurrentRaceIndex(0)
      localStorage.removeItem("f1TrackerData")
    }
  }

  // Calculate points based on race position
  const calculatePoints = (position: number): number => {
    const pointsSystem = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1]
    return position <= 10 ? pointsSystem[position - 1] : 0
  }

  // Submit race results
  const submitRaceResults = (results: RaceResult[], fastestLap: string | null) => {
    // Create a copy of the current race results
    const updatedRaceResults = [...raceResults]
    updatedRaceResults[currentRaceIndex] = results
    setRaceResults(updatedRaceResults)
    setFastestLapDriver(fastestLap)
    setHasUnsavedChanges(true)

    // Update drivers points
    const updatedDrivers = [...drivers]
    updatedDrivers.forEach((driver) => {
      const driverResult = results.find((result) => result.driverId === driver.id)
      if (driverResult) {
        const positionPoints = calculatePoints(driverResult.position)
        const fastestLapPoint = fastestLap === driver.id && driverResult.position <= 10 ? 1 : 0
        driver.points += positionPoints + fastestLapPoint

        // Update race history
        if (!driver.raceResults) driver.raceResults = []
        driver.raceResults[currentRaceIndex] = {
          position: driverResult.position,
          points: positionPoints + fastestLapPoint,
        }
      }
    })
    setDrivers(updatedDrivers)

    // Update teams points
    const updatedTeams = [...teams]
    updatedTeams.forEach((team) => {
      const teamDrivers = updatedDrivers.filter((driver) => driver.team === team.id)
      team.points = teamDrivers.reduce((total, driver) => total + driver.points, 0)
    })
    setTeams(updatedTeams)

    // Auto-save data
    setTimeout(() => {
      saveData()
    }, 100)

    // Switch to standings tab
    setActiveTab("drivers")
  }

  // Move to next race
  const goToNextRace = () => {
    if (hasUnsavedChanges) {
      saveData()
    }

    if (currentRaceIndex < races.length - 1) {
      setCurrentRaceIndex(currentRaceIndex + 1)
      setActiveTab("race")
    }
  }

  const isSeasonComplete = currentRaceIndex === races.length - 1 && raceResults[currentRaceIndex]

  // Add useEffect to handle beforeunload event
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault()
        e.returnValue = ""
        return ""
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [hasUnsavedChanges])

  return (
    <div className="min-h-screen bg-[#121212] text-white p-4 md:p-8">
      <header className="mb-8">
        <h1
          className="text-3xl md:text-4xl font-bold text-[#e10600] mb-2"
          style={{ fontFamily: "Optician Sans, sans-serif" }}
        >
          F1 Championship Tracker
        </h1>
        <p className="text-gray-400">Track the Drivers' and Constructors' Championships race by race</p>
      </header>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Flag className="h-5 w-5 text-[#e10600]" />
          <h2 className="text-xl font-bold">
            {currentRaceIndex < races.length
              ? `Race ${currentRaceIndex + 1}: ${races[currentRaceIndex]}`
              : "Season Complete"}
          </h2>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={saveData}
            className={`bg-transparent border-gray-700 hover:bg-gray-800 save-button ${hasUnsavedChanges ? "border-[#e10600]" : ""}`}
          >
            <Save className={`h-4 w-4 mr-2 ${hasUnsavedChanges ? "text-[#e10600]" : ""}`} />
            {hasUnsavedChanges ? "Save*" : "Save"}
          </Button>
          <Button variant="destructive" size="sm" onClick={resetData} className="bg-[#e10600] hover:bg-[#b30500]">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="bg-[#1e1e1e] border-b border-gray-800 w-full justify-start">
          <TabsTrigger value="race" className="data-[state=active]:bg-[#e10600]">
            <Flag className="h-4 w-4 mr-2" />
            Race Input
          </TabsTrigger>
          <TabsTrigger value="drivers" className="data-[state=active]:bg-[#e10600]">
            <Trophy className="h-4 w-4 mr-2" />
            Drivers Championship
          </TabsTrigger>
          <TabsTrigger value="constructors" className="data-[state=active]:bg-[#e10600]">
            <Users className="h-4 w-4 mr-2" />
            Constructors Championship
          </TabsTrigger>
        </TabsList>

        <TabsContent value="race">
          <Card className="bg-[#1e1e1e] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Enter Race Results</CardTitle>
              <CardDescription className="text-white">
                Input the finishing positions for {races[currentRaceIndex]}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {raceResults[currentRaceIndex] ? (
                <div className="text-center py-8">
                  <p className="mb-4">Results for this race have already been submitted.</p>
                  {currentRaceIndex < races.length - 1 ? (
                    <Button onClick={goToNextRace} className="bg-[#e10600] hover:bg-[#b30500]">
                      Next Race <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <p className="text-[#e10600] font-bold">Season Complete!</p>
                  )}
                </div>
              ) : (
                <RaceInput drivers={drivers} onSubmit={submitRaceResults} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drivers">
          <DriversStandings drivers={drivers} isSeasonComplete={isSeasonComplete} />
          {!isSeasonComplete && raceResults[currentRaceIndex] && currentRaceIndex < races.length - 1 && (
            <div className="mt-6 text-center">
              <Button onClick={goToNextRace} className="bg-[#e10600] hover:bg-[#b30500]">
                Next Race <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="constructors">
          <ConstructorsStandings teams={teams} isSeasonComplete={isSeasonComplete} />
          {!isSeasonComplete && raceResults[currentRaceIndex] && currentRaceIndex < races.length - 1 && (
            <div className="mt-6 text-center">
              <Button onClick={goToNextRace} className="bg-[#e10600] hover:bg-[#b30500]">
                Next Race <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Trophy,
  Flag,
  Users,
  ChevronRight,
  Save,
  RotateCcw,
  Newspaper,
  Download,
  Upload,
  AlertCircle,
} from "lucide-react"
import DriversStandings from "@/components/drivers-standings"
import ConstructorsStandings from "@/components/constructors-standings"
import RaceInput from "@/components/race-input"
import Newsroom from "@/components/newsroom"
import { initialDrivers, initialTeams, races } from "@/lib/f1-data"
import type { Driver, Team, RaceResult } from "@/lib/types"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function F1Tracker() {
  const [currentRaceIndex, setCurrentRaceIndex] = useState(0)
  const [drivers, setDrivers] = useState<Driver[]>(initialDrivers)
  const [teams, setTeams] = useState<Team[]>(initialTeams)
  const [raceResults, setRaceResults] = useState<RaceResult[][]>([])
  const [fastestLapDriver, setFastestLapDriver] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("race")
  // Check if there's unsaved data
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  // Alert for file operations
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null)

  // Reference to file input element
  const fileInputRef = useRef<HTMLInputElement>(null)

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
      localStorage.removeItem("f1TrackerNewsroom")
    }
  }

  // Export data to a file
  const exportData = () => {
    try {
      // Create data object to export
      const dataToExport = {
        drivers,
        teams,
        raceResults,
        currentRaceIndex,
        version: "1.0", // Adding version for future compatibility
        timestamp: new Date().toISOString(),
      }

      // Convert to JSON string
      const jsonString = JSON.stringify(dataToExport, null, 2)

      // Create a blob
      const blob = new Blob([jsonString], { type: "application/json" })

      // Create download link
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url

      // Create filename with date
      const date = new Date().toISOString().split("T")[0]
      link.download = `f1-tracker-save-${date}.json`

      // Trigger download
      document.body.appendChild(link)
      link.click()

      // Clean up
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      // Show success message
      setAlert({
        type: "success",
        message: "Save file downloaded successfully!",
      })

      // Clear alert after 3 seconds
      setTimeout(() => setAlert(null), 3000)
    } catch (error) {
      console.error("Error exporting data:", error)
      setAlert({
        type: "error",
        message: "Failed to export data. Please try again.",
      })
      setTimeout(() => setAlert(null), 3000)
    }
  }

  // Import data from a file
  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        const importedData = JSON.parse(content)

        // Validate imported data
        if (!importedData.drivers || !importedData.teams || !Array.isArray(importedData.raceResults)) {
          throw new Error("Invalid save file format")
        }

        // Apply imported data
        setDrivers(importedData.drivers)
        setTeams(importedData.teams)
        setRaceResults(importedData.raceResults)
        setCurrentRaceIndex(importedData.currentRaceIndex || 0)

        // Save to localStorage
        const dataToSave = {
          savedDrivers: importedData.drivers,
          savedTeams: importedData.teams,
          savedRaceResults: importedData.raceResults,
          savedCurrentRaceIndex: importedData.currentRaceIndex || 0,
        }
        localStorage.setItem("f1TrackerData", JSON.stringify(dataToSave))

        // Show success message
        setAlert({
          type: "success",
          message: "Save file loaded successfully!",
        })
        setTimeout(() => setAlert(null), 3000)
      } catch (error) {
        console.error("Error importing data:", error)
        setAlert({
          type: "error",
          message: "Failed to import data. Invalid save file format.",
        })
        setTimeout(() => setAlert(null), 3000)
      }
    }

    reader.onerror = () => {
      setAlert({
        type: "error",
        message: "Error reading file. Please try again.",
      })
      setTimeout(() => setAlert(null), 3000)
    }

    reader.readAsText(file)

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Trigger file input click
  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
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

      // Clear newsroom data when moving to a new race to ensure fresh tweets
      localStorage.removeItem("f1TrackerNewsroom")

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

      {alert && (
        <Alert
          className={`mb-4 ${alert.type === "success" ? "bg-green-900/20 border-green-800" : "bg-red-900/20 border-red-800"}`}
        >
          <AlertCircle className={`h-4 w-4 ${alert.type === "success" ? "text-green-400" : "text-red-400"}`} />
          <AlertTitle className={alert.type === "success" ? "text-green-400" : "text-red-400"}>
            {alert.type === "success" ? "Success" : "Error"}
          </AlertTitle>
          <AlertDescription className="text-gray-300">{alert.message}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Flag className="h-5 w-5 text-[#e10600]" />
          <h2 className="text-xl font-bold">
            {currentRaceIndex < races.length
              ? `Race ${currentRaceIndex + 1}: ${races[currentRaceIndex]}`
              : "Season Complete"}
          </h2>
        </div>
        <div className="flex gap-2 flex-wrap justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={saveData}
            className={`bg-transparent border-gray-700 hover:bg-gray-800 save-button ${hasUnsavedChanges ? "border-[#e10600]" : ""}`}
          >
            <Save className={`h-4 w-4 mr-2 ${hasUnsavedChanges ? "text-[#e10600]" : ""}`} />
            {hasUnsavedChanges ? "Save*" : "Save"}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={exportData}
            className="bg-transparent border-gray-700 hover:bg-gray-800"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleImportClick}
            className="bg-transparent border-gray-700 hover:bg-gray-800"
          >
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>

          <input type="file" ref={fileInputRef} onChange={importData} accept=".json" className="hidden" />

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
          <TabsTrigger value="newsroom" className="data-[state=active]:bg-[#e10600]">
            <Newspaper className="h-4 w-4 mr-2" />
            Newsroom
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

        <TabsContent value="newsroom">
          <Newsroom drivers={drivers} teams={teams} currentRaceIndex={currentRaceIndex} raceResults={raceResults} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

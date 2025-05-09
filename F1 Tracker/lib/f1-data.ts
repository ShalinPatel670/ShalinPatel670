import type { Driver, Team } from "./types"

// 2021 F1 race calendar
export const races = [
  "Bahrain Grand Prix",
  "Emilia Romagna Grand Prix",
  "Portuguese Grand Prix",
  "Spanish Grand Prix",
  "Monaco Grand Prix",
  "Azerbaijan Grand Prix",
  "French Grand Prix",
  "Styrian Grand Prix",
  "Austrian Grand Prix",
  "British Grand Prix",
  "Hungarian Grand Prix",
  "Belgian Grand Prix",
  "Dutch Grand Prix",
  "Italian Grand Prix",
  "Russian Grand Prix",
  "Turkish Grand Prix",
  "United States Grand Prix",
  "Mexico City Grand Prix",
  "São Paulo Grand Prix",
  "Qatar Grand Prix",
  "Saudi Arabian Grand Prix",
  "Abu Dhabi Grand Prix",
]

// 2021 F1 teams data with added Americar team
export const initialTeams: Team[] = [
  { id: "mercedes", name: "Mercedes", points: 0 },
  { id: "redbull", name: "Red Bull Racing", points: 0 },
  { id: "ferrari", name: "Ferrari", points: 0 },
  { id: "mclaren", name: "McLaren", points: 0 },
  { id: "alpine", name: "Alpine", points: 0 },
  { id: "alphatauri", name: "AlphaTauri", points: 0 },
  { id: "aston", name: "Aston Martin", points: 0 },
  { id: "williams", name: "Williams", points: 0 },
  { id: "alfa", name: "Alfa Romeo Racing", points: 0 },
  { id: "haas", name: "Haas F1 Team", points: 0 },
  { id: "americar", name: "Americar", points: 0 }, // New team
]

// 2021 F1 drivers data with added Americar drivers
export const initialDrivers: Driver[] = [
  { id: "ham", name: "Lewis Hamilton", code: "HAM", team: "mercedes", teamName: "Mercedes", points: 0 },
  { id: "bot", name: "Valtteri Bottas", code: "BOT", team: "mercedes", teamName: "Mercedes", points: 0 },
  { id: "ver", name: "Max Verstappen", code: "VER", team: "redbull", teamName: "Red Bull Racing", points: 0 },
  { id: "per", name: "Sergio Perez", code: "PER", team: "redbull", teamName: "Red Bull Racing", points: 0 },
  { id: "lec", name: "Charles Leclerc", code: "LEC", team: "ferrari", teamName: "Ferrari", points: 0 },
  { id: "sai", name: "Carlos Sainz", code: "SAI", team: "ferrari", teamName: "Ferrari", points: 0 },
  { id: "nor", name: "Lando Norris", code: "NOR", team: "mclaren", teamName: "McLaren", points: 0 },
  { id: "ric", name: "Daniel Ricciardo", code: "RIC", team: "mclaren", teamName: "McLaren", points: 0 },
  { id: "alo", name: "Fernando Alonso", code: "ALO", team: "alpine", teamName: "Alpine", points: 0 },
  { id: "oco", name: "Esteban Ocon", code: "OCO", team: "alpine", teamName: "Alpine", points: 0 },
  { id: "gas", name: "Pierre Gasly", code: "GAS", team: "alphatauri", teamName: "AlphaTauri", points: 0 },
  { id: "tsu", name: "Yuki Tsunoda", code: "TSU", team: "alphatauri", teamName: "AlphaTauri", points: 0 },
  { id: "vet", name: "Sebastian Vettel", code: "VET", team: "aston", teamName: "Aston Martin", points: 0 },
  { id: "str", name: "Lance Stroll", code: "STR", team: "aston", teamName: "Aston Martin", points: 0 },
  { id: "rus", name: "George Russell", code: "RUS", team: "williams", teamName: "Williams", points: 0 },
  { id: "lat", name: "Nicholas Latifi", code: "LAT", team: "williams", teamName: "Williams", points: 0 },
  { id: "rai", name: "Kimi Räikkönen", code: "RAI", team: "alfa", teamName: "Alfa Romeo Racing", points: 0 },
  { id: "gio", name: "Antonio Giovinazzi", code: "GIO", team: "alfa", teamName: "Alfa Romeo Racing", points: 0 },
  { id: "msc", name: "Mick Schumacher", code: "MSC", team: "haas", teamName: "Haas F1 Team", points: 0 },
  { id: "maz", name: "Nikita Mazepin", code: "MAZ", team: "haas", teamName: "Haas F1 Team", points: 0 },
  { id: "spa", name: "Shalin Patel", code: "SPA", team: "americar", teamName: "Americar", points: 0 }, // New driver
  { id: "ppa", name: "Praneel Patel", code: "PPA", team: "americar", teamName: "Americar", points: 0 }, // New driver
]

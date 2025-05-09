import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Get team color based on team ID
export function getTeamColor(teamId: string): string {
  const teamColors: Record<string, string> = {
    redbull: "#0600EF",
    ferrari: "#F91536",
    mercedes: "#00D2BE",
    mclaren: "#FF8700",
    aston: "#006F62",
    alpine: "#0090FF",
    williams: "#005AFF",
    alphatauri: "#2B4562",
    alfa: "#900000",
    haas: "#FFFFFF",
    americar: "#FF0000", // New team color (red)
  }

  return teamColors[teamId] || "#CCCCCC"
}

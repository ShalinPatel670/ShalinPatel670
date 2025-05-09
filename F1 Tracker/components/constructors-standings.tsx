import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Team } from "@/lib/types"
import { getTeamColor } from "@/lib/utils"

interface ConstructorsStandingsProps {
  teams: Team[]
  isSeasonComplete: boolean
}

export default function ConstructorsStandings({ teams, isSeasonComplete }: ConstructorsStandingsProps) {
  // Sort teams by points (descending)
  const sortedTeams = [...teams].sort((a, b) => b.points - a.points)

  return (
    <Card className="bg-[#1e1e1e] border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center text-white">
          <div className="flex-1">Constructors Championship</div>
          {isSeasonComplete && <div className="text-[#e10600] text-sm font-normal">FINAL STANDINGS</div>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left border-b border-gray-800">
                <th className="py-2 px-4 font-mono text-gray-400 w-12">POS</th>
                <th className="py-2 px-4 font-mono text-gray-400">TEAM</th>
                <th className="py-2 px-4 font-mono text-gray-400 text-right">PTS</th>
              </tr>
            </thead>
            <tbody>
              {sortedTeams.map((team, index) => (
                <tr
                  key={team.id}
                  className={`border-b border-gray-800 hover:bg-[#252525] ${index === 0 ? "bg-[#252525]" : ""}`}
                >
                  <td className="py-3 px-4 font-mono font-bold text-white">{index + 1}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div
                        className="w-1 h-12 mr-3 rounded-sm"
                        style={{ backgroundColor: getTeamColor(team.id) }}
                      ></div>
                      <div className="font-bold text-white">{team.name}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-right text-white">{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

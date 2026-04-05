
export function matchKey(tournamentId: string, round: number, p1: string, p2: string) {
  return `${tournamentId}-${round}-${[p1, p2].sort().join("-")}`
}

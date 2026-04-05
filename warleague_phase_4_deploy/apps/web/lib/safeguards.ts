export function matchKey(tournamentId: string, round: number, p1: string, p2: string | null) {
  return `${tournamentId}-${round}-${[p1, p2 || "BYE"].sort().join("-")}`
}

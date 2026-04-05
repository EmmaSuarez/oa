export const FIXED_WIN_VP = 50
export const FIXED_LOSS_VP = 20

export type EntryLike = {
  playerId: string
  wins: number
  losses: number
  roundsPlayed: number
  adjustedSos: number
  vpDiff: number
  vpScored: number
}

export type MatchLike = {
  player1Id: string
  player2Id: string | null
  type: "NORMAL" | "FORFEIT_WIN" | "FORFEIT_LOSS" | "BYE"
  played: boolean
}

export function calculateAdjustedSos(
  playerId: string,
  matches: MatchLike[],
  entries: Array<EntryLike & { playerId: string }>
) {
  const avgWins = entries.length ? entries.reduce((a, e) => a + e.wins, 0) / entries.length : 0
  let sos = 0

  for (const m of matches) {
    if (m.type !== "NORMAL" || !m.played) continue
    if (m.player1Id !== playerId && m.player2Id !== playerId) continue

    const oppId = m.player1Id === playerId ? m.player2Id : m.player1Id
    if (!oppId) continue
    const opp = entries.find(e => e.playerId === oppId)
    if (!opp) continue

    sos += opp.roundsPlayed < 2 ? avgWins : opp.wins
  }

  return sos
}

export function isPrizeEligible(roundsPlayed: number, totalRounds: number) {
  return roundsPlayed >= Math.ceil(totalRounds * 0.66)
}

export function sortStandings<T extends EntryLike>(entries: T[]) {
  return [...entries].sort((a, b) =>
    b.wins - a.wins ||
    b.adjustedSos - a.adjustedSos ||
    b.vpDiff - a.vpDiff ||
    b.vpScored - a.vpScored
  )
}

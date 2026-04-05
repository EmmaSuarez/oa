export type Pairable = {
  playerId: string
  wins: number
  adjustedSos: number
  vpDiff: number
  active: boolean
}

export type PriorMatch = {
  player1Id: string
  player2Id: string | null
}

function havePlayed(a: string, b: string, prior: PriorMatch[]) {
  return prior.some(m =>
    (m.player1Id === a && m.player2Id === b) ||
    (m.player1Id === b && m.player2Id === a)
  )
}

export function swissPair(players: Pairable[], prior: PriorMatch[]) {
  const active = players
    .filter(p => p.active)
    .sort((a, b) =>
      b.wins - a.wins ||
      b.adjustedSos - a.adjustedSos ||
      b.vpDiff - a.vpDiff
    )

  const used = new Set<string>()
  const out: Array<{ p1: string; p2: string | null; type: "NORMAL" | "BYE" }> = []

  for (let i = 0; i < active.length; i++) {
    const p1 = active[i]
    if (used.has(p1.playerId)) continue

    let found = false
    for (let j = i + 1; j < active.length; j++) {
      const p2 = active[j]
      if (used.has(p2.playerId)) continue
      if (havePlayed(p1.playerId, p2.playerId, prior)) continue

      out.push({ p1: p1.playerId, p2: p2.playerId, type: "NORMAL" })
      used.add(p1.playerId)
      used.add(p2.playerId)
      found = true
      break
    }

    if (!found) {
      out.push({ p1: p1.playerId, p2: null, type: "BYE" })
      used.add(p1.playerId)
    }
  }

  return out
}

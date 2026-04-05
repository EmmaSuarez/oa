import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { swissPair } from "@/lib/swiss"
import { matchKey } from "@/lib/safeguards"

export async function POST(req: Request) {
  const { tournamentId } = await req.json()

  const tournament = await db.tournament.findUnique({
    where: { id: tournamentId },
    include: { entries: true, matches: true }
  })

  if (!tournament) return NextResponse.json({ error: "Tournament not found" }, { status: 404 })

  const nextRound = (tournament.matches.reduce((m, x) => Math.max(m, x.round), 0) || 0) + 1

  const pairings = swissPair(
    tournament.entries.map(e => ({
      playerId: e.playerId,
      wins: e.wins,
      adjustedSos: e.adjustedSos,
      vpDiff: e.vpDiff,
      active: e.active
    })),
    tournament.matches.map(m => ({ player1Id: m.player1Id, player2Id: m.player2Id }))
  )

  for (const p of pairings) {
    const key = matchKey(tournamentId, nextRound, p.p1, p.p2)
    await db.match.create({
      data: {
        tournamentId,
        round: nextRound,
        player1Id: p.p1,
        player2Id: p.p2,
        type: p.type,
        played: false,
        result: p.type === "BYE" ? "P1" : "PENDING",
        uniqueKey: key
      }
    })
  }

  return NextResponse.json({ ok: true, nextRound, pairings })
}

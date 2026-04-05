import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { calculateAdjustedSos, isPrizeEligible, sortStandings } from "@/lib/standings"
import { pointsForPlace } from "@/lib/league"

export async function POST(req: Request) {
  const { tournamentId } = await req.json()

  const tournament = await db.tournament.findUnique({
    where: { id: tournamentId },
    include: { entries: true, matches: true }
  })

  if (!tournament) return NextResponse.json({ error: "Tournament not found" }, { status: 404 })

  const enriched = tournament.entries.map(e => ({
    ...e,
    adjustedSos: calculateAdjustedSos(
      e.playerId,
      tournament.matches.map(m => ({
        player1Id: m.player1Id,
        player2Id: m.player2Id,
        type: m.type,
        played: m.played
      })),
      tournament.entries.map(x => ({
        playerId: x.playerId,
        wins: x.wins,
        losses: x.losses,
        roundsPlayed: x.roundsPlayed,
        adjustedSos: x.adjustedSos,
        vpDiff: x.vpDiff,
        vpScored: x.vpScored
      }))
    )
  }))

  const sorted = sortStandings(enriched)

  for (let i = 0; i < sorted.length; i++) {
    const row = sorted[i]
    await db.tournamentEntry.update({
      where: { tournamentId_playerId: { tournamentId, playerId: row.playerId } },
      data: {
        adjustedSos: row.adjustedSos,
        finalPosition: i + 1,
        eligibleForPrizes: isPrizeEligible(row.roundsPlayed, tournament.roundCount)
      }
    })

    await db.leaguePoint.upsert({
      where: { leagueId_playerId: { leagueId: tournament.leagueId, playerId: row.playerId } },
      create: { leagueId: tournament.leagueId, playerId: row.playerId, points: pointsForPlace(i + 1) },
      update: { points: { increment: pointsForPlace(i + 1) } }
    })
  }

  await db.tournament.update({
    where: { id: tournamentId },
    data: { status: "COMPLETED" }
  })

  return NextResponse.json({ ok: true })
}

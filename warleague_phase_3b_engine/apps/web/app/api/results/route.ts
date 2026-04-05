import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { FIXED_LOSS_VP, FIXED_WIN_VP } from "@/lib/standings"

export async function POST(req: Request) {
  const { matchId, type, vp1, vp2 } = await req.json()

  const match = await db.match.findUnique({ where: { id: matchId } })
  if (!match) return NextResponse.json({ error: "Match not found" }, { status: 404 })
  if (match.played) return NextResponse.json({ error: "Match already reported" }, { status: 400 })

  let finalVp1 = Number(vp1 || 0)
  let finalVp2 = Number(vp2 || 0)

  if (type === "FORFEIT_WIN" || type === "BYE") {
    finalVp1 = FIXED_WIN_VP
    finalVp2 = FIXED_LOSS_VP
  }
  if (type === "FORFEIT_LOSS") {
    finalVp1 = FIXED_LOSS_VP
    finalVp2 = FIXED_WIN_VP
  }

  const result = finalVp1 >= finalVp2 ? "P1" : "P2"
  const played = type === "NORMAL"

  await db.match.update({
    where: { id: matchId },
    data: {
      type,
      vp1: finalVp1,
      vp2: finalVp2,
      result,
      played
    }
  })

  const p1Win = result === "P1"
  const p2Win = result === "P2"

  await db.tournamentEntry.update({
    where: { tournamentId_playerId: { tournamentId: match.tournamentId, playerId: match.player1Id } },
    data: {
      wins: { increment: p1Win ? 1 : 0 },
      losses: { increment: p1Win ? 0 : 1 },
      roundsPlayed: { increment: played ? 1 : 0 },
      vpFor: { increment: finalVp1 },
      vpAgainst: { increment: finalVp2 },
      vpDiff: { increment: finalVp1 - finalVp2 },
      vpScored: { increment: finalVp1 }
    }
  })

  if (match.player2Id) {
    await db.tournamentEntry.update({
      where: { tournamentId_playerId: { tournamentId: match.tournamentId, playerId: match.player2Id } },
      data: {
        wins: { increment: p2Win ? 1 : 0 },
        losses: { increment: p2Win ? 0 : 1 },
        roundsPlayed: { increment: played ? 1 : 0 },
        vpFor: { increment: finalVp2 },
        vpAgainst: { increment: finalVp1 },
        vpDiff: { increment: finalVp2 - finalVp1 },
        vpScored: { increment: finalVp2 }
      }
    })
  }

  return NextResponse.json({ ok: true })
}

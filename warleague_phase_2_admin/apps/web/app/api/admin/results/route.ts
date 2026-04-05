
import { db } from "@/lib/db"
import { matchKey } from "@/lib/safeguards"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const data = await req.json()

  const key = matchKey(data.tournamentId, data.round, data.p1, data.p2)

  try {
    await db.match.create({
      data: {
        tournamentId: data.tournamentId,
        player1Id: data.p1,
        player2Id: data.p2,
        vp1: data.vp1,
        vp2: data.vp2,
        uniqueKey: key
      }
    })
  } catch {
    return NextResponse.json({ error: "Duplicate match blocked" })
  }

  return NextResponse.json({ ok: true })
}

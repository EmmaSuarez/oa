
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const data = await req.json()
  await db.tournament.create({
    data: { name: data.name, leagueId: data.leagueId }
  })
  return NextResponse.json({ ok: true })
}

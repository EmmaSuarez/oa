
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const data = await req.json()
  await db.league.create({ data: { name: data.name } })
  return NextResponse.json({ ok: true })
}

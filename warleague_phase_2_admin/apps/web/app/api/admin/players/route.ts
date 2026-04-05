
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const data = await req.json()
  await db.user.create({
    data: {
      email: data.email,
      passwordHash: "dev",
      displayName: data.name,
      player: { create: {} }
    }
  })
  return NextResponse.json({ ok: true })
}

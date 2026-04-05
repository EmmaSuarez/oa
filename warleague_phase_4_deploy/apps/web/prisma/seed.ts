import { PrismaClient } from "@prisma/client"

const db = new PrismaClient()

async function main() {
  await db.match.deleteMany()
  await db.tournamentEntry.deleteMany()
  await db.leaguePoint.deleteMany()
  await db.tournament.deleteMany()
  await db.league.deleteMany()
  await db.player.deleteMany()
  await db.user.deleteMany()

  const league = await db.league.create({
    data: { name: "2026 League I" }
  })

  const names = ["Alice", "Bruno", "Cato", "Diana", "Elena", "Faris", "Gala", "Hector"]
  const players = []

  for (const name of names) {
    const user = await db.user.create({
      data: {
        email: `${name.toLowerCase()}@example.com`,
        displayName: name,
        role: "PLAYER",
        player: { create: {} }
      },
      include: { player: true }
    })
    players.push(user.player!)
  }

  const tournament = await db.tournament.create({
    data: {
      name: "April Open",
      leagueId: league.id,
      roundCount: 3,
      status: "OPEN"
    }
  })

  for (const p of players) {
    await db.tournamentEntry.create({
      data: {
        tournamentId: tournament.id,
        playerId: p.id
      }
    })
  }

  console.log("Seed complete", tournament.id)
}

main().finally(() => db.$disconnect())

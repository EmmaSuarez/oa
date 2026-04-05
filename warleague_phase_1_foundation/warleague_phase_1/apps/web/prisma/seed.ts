import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

async function main() {
  await db.leaguePoint.deleteMany();
  await db.tournament.deleteMany();
  await db.league.deleteMany();
  await db.membership.deleteMany();
  await db.player.deleteMany();
  await db.user.deleteMany();

  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD || "ChangeMe123!", 10);

  const admin = await db.user.create({
    data: {
      email: process.env.ADMIN_EMAIL || "admin@example.com",
      passwordHash,
      displayName: "Admin",
      emailVerifiedAt: new Date(),
      role: "ADMIN",
      player: { create: {} }
    }
  });

  const names = ["Alice", "Bruno", "Cato", "Dante", "Elena", "Faris", "Gael", "Helena"];
  for (const [index, name] of names.entries()) {
    await db.user.create({
      data: {
        email: `${name.toLowerCase()}@example.com`,
        passwordHash,
        displayName: name,
        emailVerifiedAt: new Date(),
        player: { create: { glickoRating: 1500 + index * 12 } },
        memberships: {
          create: {
            tier: index < 2 ? "COMMANDER" : index < 6 ? "VETERAN" : "RECRUIT",
            billingMonth: "2026-04",
            status: "ACTIVE"
          }
        }
      }
    });
  }

  const league = await db.league.create({
    data: {
      year: 2026,
      seasonNumber: 1,
      name: "2026 League I",
      startDate: new Date("2026-04-01T00:00:00Z"),
      endDate: new Date("2026-06-30T23:59:59Z"),
      tournaments: {
        create: [
          { name: "April Open", startsAt: new Date("2026-04-12T13:00:00Z"), roundCount: 3 },
          { name: "May Open", startsAt: new Date("2026-05-10T13:00:00Z"), roundCount: 3 },
          { name: "June Open", startsAt: new Date("2026-06-14T13:00:00Z"), roundCount: 3 }
        ]
      }
    }
  });

  const players = await db.player.findMany();
  for (const player of players) {
    await db.leaguePoint.create({
      data: { leagueId: league.id, playerId: player.id, points: Math.floor(Math.random() * 180) }
    });
  }

  console.log(`Seed complete. Admin id: ${admin.id}`);
}

main().finally(async () => {
  await db.$disconnect();
});

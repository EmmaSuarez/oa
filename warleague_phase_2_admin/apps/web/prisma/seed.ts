
import { PrismaClient } from "@prisma/client"
const db = new PrismaClient()

async function main() {
  await db.user.create({
    data: {
      email: "admin@test.com",
      passwordHash: "dev",
      displayName: "Admin",
      role: "ADMIN",
      player: { create: {} }
    }
  })
}
main()

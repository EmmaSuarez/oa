import Link from "next/link"
import { db } from "@/lib/db"

export default async function HomePage() {
  const tournaments = await db.tournament.findMany({ orderBy: { createdAt: "desc" } })
  return (
    <div className="grid">
      <div className="card">
        <h1>Warleague Phase 3B</h1>
        <p>This build adds real tournament engine logic: Swiss-lite pairings, byes, forfeits, adjusted SoS, and finalize flow.</p>
      </div>
      <div className="card">
        <h2>Tournaments</h2>
        {tournaments.map(t => (
          <div key={t.id} style={{marginBottom: 10}}>
            <Link href={`/tournaments/${t.id}`}>{t.name}</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

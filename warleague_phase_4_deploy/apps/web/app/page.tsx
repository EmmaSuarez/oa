import Link from "next/link"
import { db } from "@/lib/db"

export default async function HomePage() {
  const tournaments = await db.tournament.findMany({
    orderBy: { createdAt: "desc" },
    include: { league: true }
  })

  return (
    <div className="grid">
      <section className="hero">
        <div className="small">Warhammer league platform</div>
        <h1 style={{fontSize: 42, margin: "12px 0"}}>Global ranking. Seasonal leagues. Tournament engine included.</h1>
        <p className="small" style={{maxWidth: 780}}>
          This build is the deploy-ready polish pass: public pages, cleaner styling, standings, rules,
          current league overview, and tournament details with pairings, forfeits, byes, adjusted SoS, and finalize flow.
        </p>
      </section>

      <section className="card">
        <h2>Current tournaments</h2>
        <div className="grid">
          {tournaments.map(t => (
            <div key={t.id} className="round-card">
              <div style={{fontSize: 20, fontWeight: 700}}>
                <Link href={`/tournaments/${t.id}`}>{t.name}</Link>
              </div>
              <div className="small">{t.league.name} · {t.status} · {t.roundCount} rounds</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

import Link from "next/link"
import { db } from "@/lib/db"

export default async function CurrentLeaguePage() {
  const league = await db.league.findFirst({
    orderBy: { createdAt: "desc" },
    include: {
      points: {
        include: { player: { include: { user: true } } },
        orderBy: { points: "desc" }
      },
      tournaments: { orderBy: { createdAt: "asc" } }
    }
  })

  if (!league) {
    return <div className="card">No league found.</div>
  }

  return (
    <div className="grid">
      <section className="card">
        <h1>{league.name}</h1>
        <p className="small">League ranking is based on tournament placement points. Global Glicko is separate.</p>
      </section>

      <section className="card">
        <h2>League standings</h2>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Player</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {league.points.map((row, i) => (
              <tr key={row.id}>
                <td>{i + 1}</td>
                <td>{row.player.user.displayName}</td>
                <td>{row.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="card">
        <h2>Tournaments</h2>
        <div className="grid">
          {league.tournaments.map(t => (
            <div key={t.id} className="round-card">
              <div style={{fontWeight: 700}}>
                <Link href={`/tournaments/${t.id}`}>{t.name}</Link>
              </div>
              <div className="small">{t.status} · {t.roundCount} rounds</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

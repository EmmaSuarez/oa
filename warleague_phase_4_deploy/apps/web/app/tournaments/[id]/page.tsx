import { db } from "@/lib/db"
import { notFound } from "next/navigation"

export default async function TournamentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const tournament = await db.tournament.findUnique({
    where: { id },
    include: {
      league: true,
      entries: { include: { player: { include: { user: true } } } },
      matches: { orderBy: [{ round: "asc" }, { id: "asc" }] }
    }
  })

  if (!tournament) notFound()

  const standings = [...tournament.entries].sort((a, b) =>
    b.wins - a.wins ||
    b.adjustedSos - a.adjustedSos ||
    b.vpDiff - a.vpDiff ||
    b.vpScored - a.vpScored
  )

  const byRound = new Map<number, typeof tournament.matches>()
  for (const m of tournament.matches) {
    const list = byRound.get(m.round) || []
    list.push(m)
    byRound.set(m.round, list)
  }

  return (
    <div className="grid">
      <section className="card">
        <h1>{tournament.name}</h1>
        <p className="small">{tournament.league.name} · {tournament.status} · {tournament.roundCount} rounds</p>

        <div className="kpis" style={{marginTop: 20}}>
          <div className="kpi">
            <div className="kpi-label">Entries</div>
            <div className="kpi-value">{tournament.entries.length}</div>
          </div>
          <div className="kpi">
            <div className="kpi-label">Rounds posted</div>
            <div className="kpi-value">{byRound.size}</div>
          </div>
          <div className="kpi">
            <div className="kpi-label">Status</div>
            <div className="kpi-value" style={{fontSize: 22}}>{tournament.status}</div>
          </div>
          <div className="kpi">
            <div className="kpi-label">League</div>
            <div className="kpi-value" style={{fontSize: 22}}>{tournament.league.name}</div>
          </div>
        </div>
      </section>

      <section className="card">
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "end", gap: 16, marginBottom: 16}}>
          <div>
            <h2 style={{marginBottom: 4}}>Live standings</h2>
            <div className="small">Wins → Adjusted SoS → VP Diff → VP Scored</div>
          </div>
          <div className="badge">Testing build</div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Player</th>
              <th>W</th>
              <th>SoS</th>
              <th>VP Diff</th>
              <th>VP</th>
              <th>Eligible</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((e, i) => (
              <tr key={e.id}>
                <td>{i + 1}</td>
                <td>{e.player.user.displayName}</td>
                <td>{e.wins}</td>
                <td>{e.adjustedSos.toFixed(2)}</td>
                <td>{e.vpDiff}</td>
                <td>{e.vpScored}</td>
                <td>{e.eligibleForPrizes ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="card">
        <h2>Rounds</h2>
        <div className="grid">
          {[...byRound.entries()].map(([round, matches]) => (
            <div key={round} className="round-card">
              <div style={{display:"flex", justifyContent:"space-between", marginBottom: 10}}>
                <strong>Round {round}</strong>
                <span className="small">{matches.length} pairings</span>
              </div>

              {matches.map(m => (
                <div key={m.id} style={{padding: "10px 0", borderBottom: "1px solid #2a3a4f"}}>
                  <div style={{fontWeight: 700}}>{m.player1Id} vs {m.player2Id || "BYE"}</div>
                  <div className="small">{m.vp1} - {m.vp2} · {m.type} · {m.played ? "played" : "pending"}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

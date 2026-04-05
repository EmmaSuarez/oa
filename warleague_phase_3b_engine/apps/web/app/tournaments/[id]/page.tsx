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
      <div className="card">
        <h1>{tournament.name}</h1>
        <p>{tournament.league.name} · {tournament.status} · {tournament.roundCount} rounds</p>
        <div style={{display:"flex", gap:12, marginTop:16}}>
          <form action="/api/pairings" method="post">
            <input type="hidden" name="tournamentId" value={tournament.id} />
            <button type="submit">Generate next round via API client</button>
          </form>
        </div>
      </div>

      <div className="card">
        <h2>Live standings</h2>
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
      </div>

      <div className="card">
        <h2>Rounds</h2>
        {[...byRound.entries()].map(([round, matches]) => (
          <div key={round} style={{marginBottom: 18}}>
            <h3>Round {round}</h3>
            {matches.map(m => (
              <div key={m.id} style={{padding:"10px 0", borderBottom:"1px solid #2a364a"}}>
                {m.player1Id} vs {m.player2Id || "BYE"} — {m.vp1}-{m.vp2} — {m.type} — {m.played ? "played" : "pending"}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

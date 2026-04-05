import { db } from "@/lib/db"

export default async function StandingsPage() {
  const players = await db.player.findMany({
    include: { user: true },
    orderBy: { glickoRating: "desc" }
  })

  return (
    <div className="grid">
      <section className="card">
        <h1>Global standings</h1>
        <p className="small">Persistent global ranking by Glicko rating.</p>

        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Player</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {players.map((p, i) => (
              <tr key={p.id}>
                <td>{i + 1}</td>
                <td>{p.user.displayName}</td>
                <td>{Math.round(p.glickoRating)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

import { db } from "@/lib/db";

export default async function CurrentLeaguePage() {
  const league = await db.league.findFirst({
    orderBy: [{ year: "desc" }, { seasonNumber: "desc" }],
    include: {
      tournaments: { orderBy: { startsAt: "asc" } },
      leaguePoints: { include: { player: { include: { user: true } } } }
    }
  });

  if (!league) return <div>No league found.</div>;

  const standings = [...league.leaguePoints].sort((a, b) => b.points - a.points);

  return (
    <div className="stack">
      <div>
        <h1 style={{ fontSize: 34, marginBottom: 8 }}>{league.name}</h1>
        <div className="muted">3 monthly tournaments. League ranking by league points.</div>
      </div>
      <div className="grid grid-3">
        <section className="card section">
          <h2>League standings</h2>
          <table className="table">
            <thead>
              <tr><th>#</th><th>Player</th><th>Points</th></tr>
            </thead>
            <tbody>
              {standings.map((row, i) => (
                <tr key={row.id}>
                  <td>{i + 1}</td>
                  <td>{row.player.user.displayName}</td>
                  <td>{row.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="card section">
          <h2>Tournaments</h2>
          <div className="stack">
            {league.tournaments.map((t) => (
              <div key={t.id} className="card section" style={{ padding: 16 }}>
                <div style={{ fontWeight: 700 }}>{t.name}</div>
                <div className="muted" style={{ fontSize: 14 }}>{new Date(t.startsAt).toLocaleString()} · {t.roundCount} rounds</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

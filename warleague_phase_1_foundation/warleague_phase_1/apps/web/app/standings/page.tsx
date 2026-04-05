import { db } from "@/lib/db";

export default async function StandingsPage() {
  const players = await db.player.findMany({ include: { user: true }, orderBy: { glickoRating: "desc" } });

  return (
    <div className="stack">
      <div>
        <h1 style={{ fontSize: 34, marginBottom: 8 }}>Global standings</h1>
        <div className="muted">Persistent global ranking by Glicko rating.</div>
      </div>
      <div className="card section">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Player</th>
              <th>Rating</th>
              <th>RD</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={player.id}>
                <td>{index + 1}</td>
                <td>{player.user.displayName}</td>
                <td>{Math.round(player.glickoRating)}</td>
                <td>{Math.round(player.glickoRd)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

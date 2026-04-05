import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user?.player) redirect("/login");

  const league = await db.league.findFirst({
    orderBy: [{ year: "desc" }, { seasonNumber: "desc" }],
    include: { leaguePoints: { where: { playerId: user.player.id } } }
  });

  return (
    <div className="stack">
      <div>
        <h1 style={{ fontSize: 34, marginBottom: 8 }}>Welcome, {user.displayName}</h1>
        <div className="muted">Your current player dashboard.</div>
      </div>
      <div className="grid grid-3">
        <div className="card section">
          <div className="muted">Global Glicko</div>
          <div style={{ fontSize: 38, fontWeight: 700, marginTop: 8 }}>{Math.round(user.player.glickoRating)}</div>
        </div>
        <div className="card section">
          <div className="muted">Current tier</div>
          <div style={{ fontSize: 32, fontWeight: 700, marginTop: 8 }}>{user.memberships[0]?.tier || "NONE"}</div>
        </div>
        <div className="card section">
          <div className="muted">Current league points</div>
          <div style={{ fontSize: 38, fontWeight: 700, marginTop: 8 }}>{league?.leaguePoints[0]?.points || 0}</div>
        </div>
      </div>
    </div>
  );
}

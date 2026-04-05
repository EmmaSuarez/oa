import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/login");

  return (
    <div className="stack">
      <div>
        <h1 style={{ fontSize: 34, marginBottom: 8 }}>Admin</h1>
        <div className="muted">Phase 1 foundation. Full CRUD arrives in the next zip.</div>
      </div>
      <div className="grid grid-3">
        <div className="card section"><strong>Players</strong><div className="muted">Coming in phase 2</div></div>
        <div className="card section"><strong>Leagues</strong><div className="muted">Coming in phase 2</div></div>
        <div className="card section"><strong>Tournaments</strong><div className="muted">Coming in phase 2</div></div>
      </div>
    </div>
  );
}

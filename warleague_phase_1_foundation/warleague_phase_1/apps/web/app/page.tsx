import Link from "next/link";

export default function HomePage() {
  return (
    <div className="stack">
      <section className="card hero">
        <div className="muted" style={{ letterSpacing: 3, textTransform: "uppercase", fontSize: 12 }}>Competitive Warhammer platform</div>
        <h1 style={{ margin: "12px 0", fontSize: 42 }}>Global Glicko. Seasonal leagues. Player accounts.</h1>
        <p className="muted" style={{ maxWidth: 800, lineHeight: 1.6 }}>
          A platform for running 4 leagues per year, with 3 monthly tournaments per league,
          a persistent global Glicko rating, and member tiers for prize eligibility.
        </p>
        <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
          <Link className="button" href="/standings">View global standings</Link>
          <Link className="button-secondary" href="/register">Create account</Link>
        </div>
      </section>
    </div>
  );
}

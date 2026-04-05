export default function RulesPage() {
  return (
    <div className="grid">
      <section className="card">
        <h1>Competition rules</h1>
        <p className="small">
          This page is the site-facing one-page ruleset for standings, tiebreaks, league points, eligibility,
          forfeits, byes, drops, and global Glicko behavior.
        </p>
      </section>

      <section className="card">
        <h2>Tournament standings</h2>
        <p>Standings are ordered by <strong>Wins → Adjusted SoS → VP Differential → VP Scored</strong>.</p>
      </section>

      <section className="card">
        <h2>Forfeits, byes, and drops</h2>
        <p>
          Forfeits and byes count as wins or losses where applicable, but use fixed VP values instead of mission-max values.
          This avoids inflation from free wins. Players who stop attending may be marked inactive for future pairings.
        </p>
      </section>

      <section className="card">
        <h2>Adjusted Strength of Schedule</h2>
        <p>
          Strength of Schedule only considers actually played normal games. Opponents with too little participation are normalized
          so drops do not unfairly damage other players' tiebreaks.
        </p>
      </section>

      <section className="card">
        <h2>League points</h2>
        <p>
          Each league contains three tournaments. Tournament placement converts into league points.
          League standings are based on total points across that league’s three events.
        </p>
      </section>

      <section className="card">
        <h2>Prize eligibility</h2>
        <p>
          Prize eligibility may require an eligible membership tier and minimum participation.
          By default, a player must complete at least two-thirds of tournament rounds to be prize-eligible.
        </p>
      </section>

      <section className="card">
        <h2>Global Glicko</h2>
        <p>
          Glicko is global and persistent across all tournaments. It reflects long-term competitive performance and does not reset with each league.
        </p>
      </section>
    </div>
  )
}

export type StatsCardProps = {
  label: string
  value: string
  hint?: string
}

/** One scannable investor metric. Mock only — this component does not load data. */
export function StatsCard({ label, value, hint }: StatsCardProps) {
  return (
    <article className="stats-card">
      <p className="stats-card-mock">Mock</p>
      <h3 className="stats-card-label">{label}</h3>
      <p className="stats-card-value">{value}</p>
      {hint ? <p className="stats-card-hint">{hint}</p> : null}
    </article>
  )
}

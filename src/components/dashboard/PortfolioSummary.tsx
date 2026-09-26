export type AllocationLine = {
  label: string
  share: string
}

export const MOCK_PORTFOLIO_ALLOCATION: AllocationLine[] = [
  { label: 'Single-family', share: '40%' },
  { label: 'Multi-family', share: '30%' },
  { label: 'Commercial', share: '20%' },
  { label: 'Land', share: '10%' },
]

export type PortfolioSummaryProps = {
  lines?: AllocationLine[]
}

/** Allocation mix only. Not a headline metric and not the holdings table. */
export function PortfolioSummary({
  lines = MOCK_PORTFOLIO_ALLOCATION,
}: PortfolioSummaryProps) {
  const showingPlaceholder = lines === MOCK_PORTFOLIO_ALLOCATION

  return (
    <article className="dashboard-widget">
      {showingPlaceholder ? (
        <p className="sample-banner" role="note">
          Sample data — not a live portfolio mix.
        </p>
      ) : null}
      <h3 className="dashboard-widget-title">Portfolio mix</h3>
      <ul className="allocation-list">
        {lines.map((line) => (
          <li key={line.label}>
            <span>{line.label}</span>
            <span>{line.share}</span>
          </li>
        ))}
      </ul>
    </article>
  )
}

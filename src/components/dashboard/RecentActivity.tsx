export type ActivityItem = {
  date: string
  summary: string
}

export const MOCK_RECENT_ACTIVITY: ActivityItem[] = [
  {
    date: '2026-03-18',
    summary: 'A live listing moved to under offer.',
  },
  {
    date: '2026-03-12',
    summary: 'A sold listing was added to your recent deals.',
  },
  {
    date: '2026-03-04',
    summary: 'Your profile contact was reviewed.',
  },
]

export type RecentActivityProps = {
  items?: ActivityItem[]
}

/** One date and one line per event. Not deal cards or holding rows. */
export function RecentActivity({
  items = MOCK_RECENT_ACTIVITY,
}: RecentActivityProps) {
  const showingPlaceholder = items === MOCK_RECENT_ACTIVITY

  return (
    <article className="dashboard-widget">
      {showingPlaceholder ? (
        <p className="sample-banner" role="note">
          Sample data — not live account activity.
        </p>
      ) : null}
      <h3 className="dashboard-widget-title">Recent activity</h3>
      <ul className="activity-list">
        {items.map((item) => (
          <li key={`${item.date}-${item.summary}`}>
            <time dateTime={item.date}>{item.date}</time>
            <p>{item.summary}</p>
          </li>
        ))}
      </ul>
    </article>
  )
}

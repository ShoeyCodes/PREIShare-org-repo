export type ActivityItem = {
  id: string
  title: string
  detail: string
  dateLabel: string
}

export type RecentActivityProps = {
  title?: string
  items: ActivityItem[]
  isSampleData?: boolean
}

export const DEFAULT_MOCK_ACTIVITY: ActivityItem[] = [
  {
    id: 'a1',
    title: 'Distribution posted (sample)',
    detail: 'Sample Multifamily Fund A',
    dateLabel: 'Mar 1, 2026',
  },
  {
    id: 'a2',
    title: 'Capital call notice (sample)',
    detail: 'Sample Industrial Note B',
    dateLabel: 'Feb 18, 2026',
  },
  {
    id: 'a3',
    title: 'Profile document uploaded (sample)',
    detail: 'Accreditation letter',
    dateLabel: 'Feb 5, 2026',
  },
]

export function RecentActivity({
  title = 'Recent activity',
  items = DEFAULT_MOCK_ACTIVITY,
  isSampleData = true,
}: RecentActivityProps) {
  return (
    <section className="recent-activity" aria-labelledby="recent-activity-heading">
      <div className="recent-activity__header">
        <h2 id="recent-activity-heading">{title}</h2>
        {isSampleData ? (
          <p className="sample-data-banner" role="note">
            Sample activity — not connected to a live feed
          </p>
        ) : null}
      </div>
      <ol className="recent-activity__list">
        {items.map((item) => (
          <li key={item.id} className="recent-activity__item">
            <div className="recent-activity__body">
              <p className="recent-activity__title">{item.title}</p>
              <p className="recent-activity__detail">{item.detail}</p>
            </div>
            <time className="recent-activity__date">{item.dateLabel}</time>
          </li>
        ))}
      </ol>
    </section>
  )
}

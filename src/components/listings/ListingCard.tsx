// Presentational card. Props in, no data access.

export type ListingCardProps = {
  listing: {
    id: string
    title: string
    city: string
    status: string
  }
}

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <article
      aria-label={listing.title}
      className="rounded border border-slate-200 bg-white p-4"
    >
      <h2 className="text-lg font-semibold text-slate-900">{listing.title}</h2>
      <p className="mt-1 text-sm text-slate-700">{listing.city}</p>
      <p className="mt-1 text-sm text-slate-600">Status: {listing.status}</p>
    </article>
  )
}

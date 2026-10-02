// List page under the protected dashboard layout.
import { createFileRoute, Link } from '@tanstack/react-router'
import { ListingCard } from '../../../components/listings/ListingCard'
import { listMyListings } from '../../../server/listings'

export const Route = createFileRoute('/dashboard/listings/')({
  loader: () => listMyListings(),
  pendingComponent: ListingsPending,
  component: ListingsIndexPage,
})

function ListingsPending() {
  return (
    <section aria-labelledby="listings-heading" className="p-4 md:p-6">
      <h1 id="listings-heading" className="text-2xl font-semibold text-slate-900">
        Your property listings
      </h1>
      <p className="mt-2 text-sm text-slate-600">Loading your listings…</p>
    </section>
  )
}

function ListingsIndexPage() {
  const result = Route.useLoaderData()

  if (!result.ok) {
    return (
      <section aria-labelledby="listings-heading" className="p-4 md:p-6">
        <h1 id="listings-heading" className="text-2xl font-semibold text-slate-900">
          Your property listings
        </h1>
        <p role="alert" className="mt-4 text-sm text-red-700">
          {result.error}
        </p>
        <AddListingLink />
      </section>
    )
  }

  if (result.listings.length === 0) {
    return (
      <section aria-labelledby="listings-heading" className="p-4 md:p-6">
        <h1 id="listings-heading" className="text-2xl font-semibold text-slate-900">
          Your property listings
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          No properties yet. Add your first listing to get started.
        </p>
        <AddListingLink />
      </section>
    )
  }

  return (
    <section aria-labelledby="listings-heading" className="p-4 md:p-6">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 id="listings-heading" className="text-2xl font-semibold text-slate-900">
          Your property listings
        </h1>
        <AddListingLink />
      </header>
      <ul className="mt-6 space-y-3">
        {result.listings.map((listing) => (
          <li key={listing.id}>
            <ListingCard listing={listing} />
          </li>
        ))}
      </ul>
    </section>
  )
}

function AddListingLink() {
  return (
    <p className="mt-4">
      <Link
        to="/dashboard/listings/new"
        className="text-sm font-medium text-slate-900 underline"
      >
        Add listing
      </Link>
    </p>
  )
}
